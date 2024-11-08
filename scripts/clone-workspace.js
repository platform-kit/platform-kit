const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });

const concurrently = require("concurrently");

var commands = [];

var repoName = process.env.GIT_REPO.split('/').slice(-1);
if (repoName.includes('.git')) {
    repoName = repoName.split('.git')[0];
}

commands.push('rm -rf .workspace/' + repoName + '; rm -rf .workspace/repo')


try {

    if (process.env.DEV_ENVIRONMENT == "devcontainer") {
        console.log("Cloning Repo into Workspace:");
        commands.push(' curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash; sudo apt-get install git-lfs; git lfs install');
        var command = 'cd .workspace; git clone ' + process.env.GIT_REPO;
        if (process.env.GIT_REPO_TOKEN != null) {
            command = 'cd .workspace; git clone https://' + process.env.GIT_REPO_TOKEN + '@' + process.env.GIT_REPO + ' repo';
        }
        commands.push(command);
    }
    else {
        commands = ["echo 'Run this command inside Docker/DevContainer.'"]
        const { result } = concurrently(commands, { raw: true, maxProcesses: 3 });
    }


    const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });

}
catch (err) {
    console.log(err)
}