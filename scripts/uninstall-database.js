const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Deleting Postgres Data");

commands.push("docker volume rm postgres_data");

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
