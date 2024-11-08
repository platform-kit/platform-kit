const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");

var commands = [];

if (process.env.DEV_ENVIRONMENT == "devcontainer" || process.env.DEV_ENVIRONMENT == 'testing' || process.env.DEV_ENVIRONMENT == 'staging' || process.env.ENVIRONMENT == 'production') {

  var command = "cd ui; npx nuxi@latest devtools enable; npm run dev; rm -rf ./ui/.nuxt; rm -rf ./ui/.output; npm run build-keys; cd ui && npm run dev;";
  if (process.env.UI_DEV_COMMAND != null) {
    command = 'cd .workspace/repo; ' + process.env.UI_DEV_COMMAND;
  }

  commands = [command];
  const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
}
else {
  console.log("To start API, run from devcontainer. (npm run devcontainer)")
}


