const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
if (process.env.DEV_WORKSPACE != null) {
  console.log("Setting Up Devpod for Project:" + process.env.DEV_WORKSPACE);
  commands.push(`devpod provider add docker`);
  commands.push(`devpod up ./`);
} else {
  console.log("Add DEV_WORKSPACE to .env before using DevPod.");
}

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
