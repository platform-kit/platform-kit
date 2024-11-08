const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");

var commands = [];

if (process.env.DEV_ENVIRONMENT == "devcontainer" || process.env.DEV_ENVIRONMENT == 'testing' || process.env.DEV_ENVIRONMENT == 'staging' || process.env.ENVIRONMENT == 'production') {
  commands = ["cd server; npm run start;"]
  const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
}
else {
  console.log("To start API, run from devcontainer. (npm run devcontainer)")
}