const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");
var commands = [];

if (process.env.DEV_ENVIRONMENT != 'devcontainer') {
  if (process.env.USE_SUPABASE == "true" || process.env.USE_SUPABASE == "TRUE") {
    commands.push("npm run start-supabase");
  } else {
    commands.push("npm run start-database");
  }
}

commands.push("npm run start-devcontainer;");


const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
