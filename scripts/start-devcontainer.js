const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");
var hostfolder = path.resolve(__dirname + "/..");
var appFolder = path.resolve(__dirname + "/..").split('/').pop();

var commands = ['echo "Starting devcontainer..."']
if (process.env.DEV_ENVIRONMENT != 'devcontainer') {

  var vsCodeCommand =
    "path=" +
    hostfolder +
    ' && p=$(printf "%s" "$path" | xxd -p) && code --folder-uri "vscode-remote://dev-container+${p//[[:space:]]/}"' + '/workspaces/' + appFolder;


  commands = [vsCodeCommand];
  commands.push('npm run start-supabase')


}
else {

  commands.push("npm run build-api-spec;");
  commands.push("npm run build-functions;");  
  commands.push("npm run build-keys;");
  commands.push("npm run dev-ui;");  
  commands.push("npm run serve;");

}
const { result } = concurrently(commands, { raw: true, maxProcesses: 2 });