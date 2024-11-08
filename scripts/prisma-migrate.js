var fs = require("fs");
var path = require("path");
const concurrently = require("concurrently");
var functionPath = path.resolve(__dirname + "/../functions");
const functions = fs.readdirSync(functionPath, null);
var commands = [];
var port = 3001;

if (process.env.NODE_ENVIRONMENT == "production") {
  commands = ["prisma migrate deploy --schema=./database/prisma/schema.prisma"];
}

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
