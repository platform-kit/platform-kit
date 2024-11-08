const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Starting Postgres");

// MacOS
if (process.platform == "darwin") {
  commands.push("colima start");
}

var dir = process.cwd() + '/data';
console.log('Database Data Directory: ' + dir)

commands.push(
  "docker run --name pgsql-dev -d -e POSTGRES_PASSWORD=test1234 -e PGDATA=/var/lib/postgresql/data/pgdata -v postgres_data:/var/lib/postgresql/data -p 5432:5432 postgres"
);

console.log(
  "Local dev database now running at postgresql://postgres:test1234@127.0.0.1/postgres"
);

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
