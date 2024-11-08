var fs = require("fs");
var path = require("path");
const concurrently = require("concurrently");
var functionPath = path.resolve(__dirname + "/../functions");
const functions = fs.readdirSync(functionPath, null);
var appConfig = require("../config/config.js");

var commands = [];
var port = 3001;

function buildCommand(input) {    
  if (typeof appConfig.api.whiteList == 'array') {
      functions = functions.filter((fn) => appConfig.api.whiteList.includes(fn));

  var command =
    "echo '\n\ninstalling /functions/" +
    input +
    "'; " +
    "cd functions/" +
    input +
    "; npm i  --no-optional --quiet;";
  port = port + 1;
  commands.push(command);
  }
}

commands.push("cd server; npm i --no-optional --quiet;");
functions.forEach((element) => buildCommand(element));

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
