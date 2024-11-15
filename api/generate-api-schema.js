import {
  OpenApiGeneratorV3,
  // The exact same can be achieved by importing OpenApiGeneratorV31 instead:
  // OpenApiGeneratorV31
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import * as yaml from "yaml";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { existsSync } from 'node:fs';
import * as lib  from '../lib/index.mjs';
import { exit } from "process";

console.log(lib.lib.functions.hasUserFunctions());
process.exit(1);



// Load ENV variables
dotenv.config({ path: path.resolve(process.cwd() + "/.env") });

// Setup Zod
extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();

const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// Generate Schema
var __dirname = path.resolve(process.cwd());
var functionPath = path.resolve(__dirname + "/functions");
var userFunctionsPath = path.resolve(__dirname + "/.workspace/repo/functions");
var functions = fs.readdirSync(functionPath, null);
if (existsSync(userFunctionsPath)) {
  console.log("Loading user functions from... " + userFunctionsPath)
  var userFunctions = fs.readdirSync(userFunctionsPath, null);
}

var apiPaths = [];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadSchema(directory, functionPath) {
  if (fs.existsSync(functionPath + "/" + directory + "/schema/schema.mjs")) {
    var schemaPath = functionPath + "/" + directory + "/schema/schema.mjs";
    console.log("\n");
    console.log("Schema Exists: " + schemaPath);

    const schema = await import(schemaPath);
    var urlPath = "/" + directory;
    var verbs = ["post"];
    console.log("Verbs", schema.default.verbs);
    if (schema.default.verbs != null) {
      verbs = schema.default.verbs;
    }

    for (const verb of verbs) {
      var apiPath = {
        method: verb,
        path: urlPath,
        summary: schema.default.summary || "api/" + directory,
        description: schema.default.description || "API Endpoint",
        request: {},
        responses: schema.default.responses || {},
      };

      if (schema.security != null && schema.security == "bearer") {
        apiPath.security = [{ [bearerAuth.name]: [] }];
      } else if (schema.security != null && schema.security != "bearer") {
        apiPath.security = schema.security;
      }
      if (schema.default.headers != null) {
        apiPath.request.headers = schema.default.headers;
      }
      if (
        schema.default.params != null &&
        typeof schema.default.params == "object"
      ) {
        var params = Object.entries(schema.default.params);
        for (const param of params) {
          /*
          var fieldName = param[0];
          var paramSchema = param[1];
          var paramName =
            directory + capitalizeFirstLetter(fieldName) + "Param";
          var newParam = null;
          
          // Register Parameters in UI?
          if (paramSchema.openapi == null) {
            newParam = registry.registerParameter(
              paramName,
              paramSchema.openapi({
                param: {
                  name: "id",
                  in: "query",
                  $ref: "#/components/parameters/" + paramName,
                },
              })
            );
          } else {
            newParam = registry.registerParameter(paramName, paramSchema);
          }
            */
        }
      }
      if (schema.default.query != null) {
        apiPath.request.query = schema.default.query;
      }
      if (schema.default.body != null) {
        apiPath.request.body = schema.default.body;
      }

      if (schema.default.tags != null) {
        apiPath.tags = schema.default.tags;
      }

      // console.log(apiPath);
      // apiPaths.push(apiPath);
      registry.registerPath(apiPath);
    }
  }
}

for (const fn of functions) {
  await loadSchema(fn, functionPath);
}


if (userFunctions != null && userFunctions.length > 0) {
  for (const fn of userFunctions) {
    await loadSchema(fn, userFunctionsPath);
  }
}



function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  generator.generateComponents();

  var description = "API Documentation";
  if (process.env.BASE_URL != null) {
    description = description + " for " + process.env.BASE_URL;
  }

  var urlPrefix = 'api';

  if (process.env.BASE_URL != null && process.env.ENVIRONMENT == 'production') {
    urlPrefix = process.env.BASE_URL + '/api';
  }

  else {
    urlPrefix = 'https://localhost:8000/api'
  }

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "API Documentation",
      description: description,
    },
    servers: [{ url: urlPrefix }],
  });
}

function writeDocumentation() {
  // OpenAPI JSON
  const docs = getOpenApiDocumentation();

  fs.writeFileSync(
    `${__dirname}/api/openapi-spec.json`,
    JSON.stringify(docs, null, 2),
    {
      encoding: "utf-8",
    }
  );

  // YAML equivalent
  const fileContent = yaml.stringify(docs);

  fs.writeFileSync(`${__dirname}/api/openapi-spec.yml`, fileContent, {
    encoding: "utf-8",
  });

  // Nuxt Public  
  var path = __dirname + '/ui/public';
  if (fs.existsSync(path)) {
    fs.writeFileSync(`${__dirname}/ui/public/openapi-spec.yml`, fileContent, {
      encoding: "utf-8",
    });
  }

}

console.log("Generated OpenAPI schema.");
console.log("\n");

writeDocumentation();
