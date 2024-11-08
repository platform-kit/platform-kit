const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Installing Devpod for Platform:" + process.platform);

// MacOS
if (process.platform == "darwin") {
  commands.push("colima delete");
  commands.push("colima start");
}

commands.push("devpod up ./");

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
