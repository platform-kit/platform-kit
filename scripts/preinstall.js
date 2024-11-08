const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var nodeVersion = process.env.NODE_VERSION || 22;

var commands = []
try {
  commands.push('echo "Running preinstall..."');
  


  if (nodeVersion != null && process.env.DEV_ENVIRONMENT == 'devcontainer') {
    commands.push('echo "Context: Devcontainer.')    
    console.log("Specified Node Version:" + nodeVersion);
    commands = ["echo 'Installing NVM...'"];
    commands.push(
      "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash;"
    );
    if (process.env.DEV_ENVIRONMENT == 'devcontainer') {
      commands.push('echo "Context: Devcontainer.')
      commands = ["echo 'Installing NVM...'"];
      commands.push(`export NVM_DIR="/usr/local/share/nvm"`)
      commands.push(`. $NVM_DIR/nvm.sh install ` + nodeVersion)
      commands.push(`. $NVM_DIR/nvm.sh use ` + nodeVersion)
    }

  } else {
    commands.push('echo "Installing NVM..."')
    commands.push("source ~/.nvm/nvm.sh; nvm install " + nodeVersion + "; nvm use " + nodeVersion);

  }
  commands.push("npm run build-keys;");
  commands.push('npm install -g nodemon')

  const { result } = concurrently(commands, { raw: true, maxProcesses: 1 })
}
catch (err) {
  console.log(err)
}
