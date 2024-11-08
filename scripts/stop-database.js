const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Starting Postgres");

commands.push("docker kill pgsql-dev");
commands.push("docker rm /pgsql-dev");

console.log(
  "Stopping database at postgresql://postgres:test1234@127.0.0.1/postgres"
);

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
