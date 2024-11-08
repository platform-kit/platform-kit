const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Deleting Postgres Data");

var projectDirectory = path.resolve("./").split(path.sep).pop();
console.log(projectDirectory);

commands.push("rm -rf supabase; ");

commands.push("docker volume rm " + "supabase_config_" + projectDirectory);
commands.push("docker volume rm " + "supabase_db_" + projectDirectory);
commands.push(
  "docker volume rm " + "supabase_edge_runtime_" + projectDirectory
);
commands.push("docker volume rm " + "supabase_inbucket_" + projectDirectory);
commands.push("docker volume rm " + "supabase_storage_" + projectDirectory);

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
