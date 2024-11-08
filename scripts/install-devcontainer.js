const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [
  "(curl -sf -L https://download.daytona.io/daytona/install.sh | sudo bash) && daytona server -y && daytona",  
];

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
