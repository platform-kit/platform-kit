const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var pgVersion = 16.9

if(process.env.POSTGRES_VERSION != null) {
    pgVersion = process.env.POSTGRES_VERSION
}

pgVersion = 'postgres:' + pgVersion; 

var commands = [];
console.log("Installing Postgres");

commands.push("docker pull postgres");

commands.push("docker volume create postgres_data");

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
