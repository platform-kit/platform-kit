const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");

var commands = [];


try {

    if (process.env.DEV_ENVIRONMENT == "devcontainer") {

        if (process.env.GIT_REPO_TOKEN != null) {
            // command = 'cd .workspace/repo; git remote git@' + process.env.GIT_REPO + '.git; git push';
            // commands.push(command);
            // console.log("Running command: " + command);
            commands.push('cd .workspace/repo; git push');
        }
        else {
            commands.push('cd .workspace/repo; git push');
        }

    }

    const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });

}
catch (err) {
    console.log(err)
}