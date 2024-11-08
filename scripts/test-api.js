const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Running API Tests");

var string = "";

async function testWithEnvVars() {
  var envVars = await import("../api-tests/environments/dev.mjs");
  envVars = envVars.default();
  // console.log(envVars);
  for (const [key, value] of Object.entries(envVars)) {
    // console.log(`${key}: ${value}`);
    string = string + " --env-var " + key + '=' + value + '';
  }
  console.log(string);
  commands.push("cd api-tests; bru run" + string);
  const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
}

testWithEnvVars();
