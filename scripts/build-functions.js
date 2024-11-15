var fs = require("fs");
const fse = require('fs-extra');
var path = require("path");
const concurrently = require("concurrently");
var functionPath = path.resolve(__dirname + "/../functions");
const functions = fs.readdirSync(functionPath, null);
var appConfig = require("../config/config.js");
const { waitUntil } = require('async-wait-until/dist/commonjs');

var lib = null;

(async () => {
  lib = await import('../lib/index.mjs')
  // YOUR CODE HERE
  console.log("TEST!")
  console.log(lib)
})().catch(console.error)

waitUntil(() => lib != null);



var commands = [];

var __dirname = path.resolve(process.cwd());
    var functionsPath = path.resolve(__dirname + "/functions");
    var userFunctionsPath = path.resolve(__dirname + "/.workspace/repo/functions");
    var tempFunctionsPath = path.resolve(__dirname + "/.functions");

function buildCommand(input) {
  if ((['true', 'TRUE'].includes(process.env.USE_API_WHITELIST) && typeof appConfig.api.whiteList == 'array') || ['true', 'TRUE'].includes(process.env.USE_API_WHITELIST) == false) {
    
    if (typeof appConfig.api.whiteList == 'array' && appConfig.api.whiteList.length > 0) {
      functions = functions.filter((fn) => appConfig.api.whiteList.includes(fn));
    }

    var command =
      "echo '\n\ninstalling /functions/" +
      input +
      "'; " +
      "cd .functions/" +
      input +
      "; npm i  --no-optional --quiet;";
    port = port + 1;
    commands.push(command);
  }
}





if (fs.existsSync(userFunctionsPath)) {
  console.log("Loading user functions from... " + userFunctionsPath)
  var userFunctions = fs.readdirSync(userFunctionsPath, null);
}


commands.push("cd server; npm i --no-optional --quiet;");
functions.forEach((element) => buildCommand(element));

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
