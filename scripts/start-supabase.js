const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");

var commands = [];

if (process.env.DEV_ENVIRONMENT == "devcontainer") {
  console.log("Running in devcontainer... skipping Supabase.")
}
else {
  commands = ["npx supabase start"]
  const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
}