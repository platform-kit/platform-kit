const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");
var functionPath = path.resolve(__dirname + "/../functions");
const functions = fs.readdirSync(functionPath, null);
var commands = [];

if (process.env.USE_SUPABASE == "true" || process.env.USE_SUPABASE == "TRUE") {
  commands.push("npm run stop-supabase; npm run start-supabase");  
} else {
  commands.push("npm run stop-database; npm run start-database");  
}

commands.push("npm run serve;");
commands.push("npm run start-browser;");


const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
