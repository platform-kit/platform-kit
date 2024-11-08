const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Installing Devpod for Platform:" + process.platform);

//TODO: Add to docs - https://github.com/dokku/dokku/blob/cb964179d0267d6552bf95d0bd3f747db6d37aeb/docs/deployment/remote-commands.md?plain=1#L29

// Windows
if (process.platform == "win32") {
  console.log("Dokku can only be installed on a Unix OS.");
}
// MacOS
if (process.platform == "darwin") {
  commands.push(
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
  );
  commands.push("brew install dokku/repo/dokku");
}

// Linux
if (process.platform == "linux") {
  commands.push(`wget -NP . https://dokku.com/install/v0.34.6/bootstrap.sh`);
  commands.push(`sudo DOKKU_TAG=v0.34.6 bash bootstrap.sh`);
}

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
