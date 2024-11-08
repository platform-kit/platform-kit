var fs = require("fs");
var path = require("path");
var keyPath = path.resolve(__dirname + "/../keys");

var selfsigned = require("selfsigned");
var attrs = [{ name: "commonName", value: "contoso.com" }];
var pems = selfsigned.generate(attrs, { days: 365 });

console.log("Generating Keys:");
console.log(pems);

fs.writeFileSync(keyPath + "/private.pem", pems.private, null);
fs.writeFileSync(keyPath + "/public.pem", pems.public, null);
fs.writeFileSync(keyPath + "/cert.pem", pems.cert, null);
