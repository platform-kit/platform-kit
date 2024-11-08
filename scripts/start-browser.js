const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

if (process.env.DEV_ENVIRONMENT != 'devcontainer') {

  var browser = process.env.BROWSER || "default browser";
  console.log("Opening :" + browser);

  const open = "../node_modules/open/index.js";

  import(open).then((module) => {
    // console.log(module);
    module.default("https://localhost:3000");
    module.default("http://localhost:54323");
  });
}

console.log("Opening browser...")