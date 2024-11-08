const path = require("path");
const fs = require("fs");
const { exec } = require('child_process');

var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

var port = process.env.PORT || 8000;
console.log(`Server listening on port ${port} ...`);

var command = 'npm run build-api-spec; cd server; node index.mjs'


exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Output: ${stdout}`);
});