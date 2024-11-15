import fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as appConfig from "../../config/config.js"
import { existsSync } from 'node:fs';

dotenv.config({ path: path.resolve(process.cwd() + "/.env") });

export function getAppConfig() {
  console.log(appConfig)
  return appConfig;
}

export function getEnvironment() {
  console.log(process.env)
  return process.env
}

export function getEnvironmentPath() {
  var envPath = path.resolve(process.cwd() + "/.env")
  console.log(envPath)
  return envPath
}

export function getUserFunctionsPath() {
  var userFunctionsPath = path.join(process.cwd(), "/.workspace/repo/functions");
  return userFunctionsPath;
}

export function hasUserFunctions() {
  var userFunctionsPath = path.join(process.cwd(), "/.workspace/repo/functions");
  if (existsSync(userFunctionsPath)) {
    console.log("User functions found at: " + userFunctionsPath)
    return true;
  }
  return false;
}

function symlinkFunctions() {
  var userFunctionsTempPath = path.join(process.cwd(), "/.functions");
  if (hasUserFunctions() == true) {
    fs.symlinkSync(userFunctionsTempPath,
      getUserFunctionsPath(), 'dir');
  }
}
