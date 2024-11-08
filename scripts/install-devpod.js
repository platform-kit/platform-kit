const path = require("path");
const fs = require("fs");
var envPath = path.resolve(__dirname + "/..");
require("dotenv").config({ path: envPath + "/.env" });
const concurrently = require("concurrently");

var commands = [];
console.log("Installing Devpod for Platform:" + process.platform);

// Windows
if (process.platform == "win32") {
  commands.push(
    `md -Force "$Env:APPDATA\devpod"; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]'Tls,Tls11,Tls12';
    Invoke-WebRequest -URI "https://github.com/loft-sh/devpod/releases/latest/download/devpod-windows-amd64.exe" -o $Env:APPDATA\devpod\devpod.exe;
    $env:Path += ";" + $Env:APPDATA + "\devpod";
    [Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User);`
  );
}
// MacOS
if (process.platform == "darwin") {
  commands.push("brew install colima");
  commands.push(
    `curl -L -o devpod "https://github.com/loft-sh/devpod/releases/latest/download/devpod-darwin-amd64" && sudo install -c -m 0755 devpod /usr/local/bin && rm -f devpod`
  );
}

// Linux
if (process.platform == "linux" && process.arch == "arm") {
  commands.push(
    `curl -L -o devpod "https://github.com/loft-sh/devpod/releases/latest/download/devpod-linux-arm64" && sudo install -c -m 0755 devpod /usr/local/bin && rm -f devpod`
  );
}
if (process.platform == "linux" && process.arch != "arm") {
  commands.push(
    `curl -L -o devpod "https://github.com/loft-sh/devpod/releases/latest/download/devpod-linux-amd64" && sudo install -c -m 0755 devpod /usr/local/bin && rm -f devpod`
  );
}

const { result } = concurrently(commands, { raw: true, maxProcesses: 1 });
