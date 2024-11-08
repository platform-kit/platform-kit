import { addToDevServer, startDevServer, wrapLambda } from "convert-lambda-to-express";
import express from "express";
import https from 'https';
import bodyParser from "body-parser";
import fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as appConfig from "../config/config.js"
import chalk from "chalk";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import * as winston from 'winston'
import { rateLimit } from 'express-rate-limit'
import { createProxyMiddleware } from 'http-proxy-middleware';
import { existsSync } from 'node:fs';

dotenv.config({ path: path.resolve(process.cwd() + "../../.env") });

// Logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}



// Error Reporting
if (process.env.SENTRY_DSN)
  console.log(chalk.gray("Logging Errors with Sentry."));
// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// Express Router Setup
const app = express();
var keysPath = path.join(process.cwd(), "/../keys");
var functionsPath = path.join(process.cwd(), "/../functions");
var userFunctionsPath = path.join(process.cwd(), "/../.workspace/functions");
var staticPath = path.join(process.cwd(), "/../ui/dist");
var userStaticPathRelative = process.env.UI_OUTPUT_PATH;
var userStaticPath = path.join(process.cwd(), "/../.workspace/.output/public");
if (userStaticPathRelative != null) {
  userStaticPath = path.join(process.cwd(), "/../.workspace/" + userStaticPathRelative);
}
var docsPath = path.join(process.cwd(), "/../api");
console.log(chalk.gray("Loading functions from: \n" + functionsPath));
if (existsSync(userFunctionsPath)) {
  console.log("and " + userFunctionsPath)
}
if (existsSync(userFunctionsPath) && userStaticPathRelative != null) {
  hotReloadDirectories.push(userStaticPath)
  console.log("and " + userStaticPath)
}
app.use(bodyParser());

// Hot Module Reload
if (process.env.DEV_ENVIRONMENT == 'devcontainer') {
  var hotReloadDirectories = [docsPath]
  if (existsSync(staticPath)) {
    hotReloadDirectories.push(staticPath)
  }
  // it accepts multiple folders optionally or if none is passed it will defaults to `.src`
  // app.use(hotReloadMiddleware({ watchFolders: hotReloadDirectories, verbose: true }));
}

// Apply the rate limiting middleware to all requests.
if (process.env.DEV_ENVIRONMENT != 'devcontainer') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  })
  app.use(limiter)
}

// Dev Proxy
if (process.env.DEV_ENVIRONMENT == 'devcontainer') {
  const pathFilter = function (path, req) {
    return !path.match('^/api')
  };

  // HTTP PROXY
  var proxyTarget = process.env.DEV_UI_URL || 'http://localhost:3000';
  const apiProxy = createProxyMiddleware({
    target: proxyTarget,
    changeOrigin: true, // for vhosted sites
    pathFilter: pathFilter,

  });
  app.use('/', apiProxy);

}

// Setup Static Docs Serving
fs.readFile(docsPath + "/index.html", (err, data) => {
  if (!err && data) {
    console.log("\n");
    console.log("Static docs exist in path:");
    console.log(docsPath);
    console.log("\n");
    console.log(chalk.blue("Serving static docs..."));
    console.log("\n");
  }
  app.use("/api", express.static(docsPath));
});

// Setup Static File Serving
if (
  process.env.DEV_ENVIRONMENT != 'devcontainer' && process.env.ENVIRONMENT == 'production'
) {
  fs.readFile(staticPath + "/index.html", (err, data) => {
    if (!err && data) {
      console.log("\n");
      console.log("Static files exist in path:");
      console.log(staticPath);
      console.log("\n");
      console.log(chalk.blue("Serving static files..."));
      console.log("\n");
    }
    app.use("/", express.static(staticPath));
  });
}

// Load Functions
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

var functions = getDirectories(functionsPath);

if (functions.length > 0) {
  console.log("\n");
  console.log(chalk.blue("Serving API endpoints..."));
  console.log("\n");
}
let i = 0;

var allowedFunctions = functions;
if (typeof appConfig.default.api.whiteList == 'array') {
  functions = functions.filter((fn) => appConfig.api.whiteList.includes(fn));
}

const handlers = [];
functions.forEach(async (directory) => {
  i++;
  var functionPath = functionsPath + "/" + directory + "/" + directory + ".js";
  var fn = await import(functionPath);
  var logMessage = i + ". /api/" + directory;
  console.log(chalk.green(logMessage));
  logMessage = functionPath;
  var functionOptions = {
    timeoutInSeconds: 26, // sets actual timeout for handler
    logger: logger, // Winston logger
    finalize: () => {
      // do some cleanup here after function runs but before
      // response is sent to client
    }
  };
  if ((process.env.SERVER_HMR != "true" && process.env.SERVER_HMR != "TRUE")) {
    app.all("/api/" + directory, wrapLambda(await fn.handler, functionOptions));
  } else {
    var handler = {
      region: 'us-west-1', // sets AWS_REGION for sdk calls in handler
      method: 'GET',
      path: '/api/' + directory,
      handler: functionPath,
      codeDirectory: functionsPath + '/' + directory, // where function folder is located
      environment: {
        ENV_TEST_VAR: 'test_value'
      }
    };
    handlers.push(handler);
    addToDevServer(handler);
  }
});

var port = 8000;

// serve the API with signed certificate on 443 (SSL/HTTPS) port

if (process.env.USE_HTTPS == 'true' || process.env.USE_HTTPS == 'TRUE') {
  const httpsServer = https.createServer({
    key: fs.readFileSync(keysPath + '/private.pem'),
    cert: fs.readFileSync(keysPath + '/cert.pem'),
  }, app);

  // Start Server
  httpsServer.listen(port, () => {
    console.log("\n");
    console.log(chalk.gray("Listening on port 8000"));
    console.log("\n");
  });

  // httpsServer.on('upgrade', wsProxy.upgrade); // <-- subscribe to http 'upgrade'
  // app.on('upgrade', wsProxy.upgrade); // <-- subscribe to http 'upgrade'

}
else {
  // Start Server
  app.listen(port, () => {
    console.log("\n");
    console.log(chalk.gray("Listening on port 8000"));
    console.log("\n");
  });
}
