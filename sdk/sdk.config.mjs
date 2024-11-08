import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/swagger-ts";
import { pluginClient } from "@kubb/swagger-client";
import * as path from "path";

var rootPath = path.resolve(process.cwd());
var specPath = path.resolve(process.cwd() + "/api/openapi-spec.yml");
var exportPath = path.resolve(process.cwd() + "/sdk/src/gen");

console.log("\n");
console.log("Root: " + rootPath + "\n");
console.log("Spec: " + specPath + "\n");
console.log("Export: " + exportPath + "\n");

export default defineConfig({
  root: rootPath,
  input: {
    path: specPath,
  },
  output: {
    path: exportPath,
    clean: true,
  },
  plugins: [
    pluginClient({
      output: {
        path: "./axios",
      },
    }),
    pluginOas({
      output: true,
      validate: true,
    }),
    pluginTs({
      output: {
        path: "models",
      },
    }),
  ],
});
