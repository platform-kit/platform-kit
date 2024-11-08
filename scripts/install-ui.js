const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

var buildCommand = process.env.UI_BUILD_COMMAND || "cd ui && npm i --production=false";

const concurrently = require("concurrently");

var commands = [];

var command = buildCommand;

commands = [command];
const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
