var http = require("http"),
  httpProxy = require("http-proxy");

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

var uiServer = "http://localhost:3000";
var apiServer = "http://localhost:8000";

var server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log(req.url);
  if (req.url.substr(0, 4).includes("/api/")) {
    console.log("Proxying to " + apiServer + req.url);
    proxy.web(req, res, { target: apiServer });
  } else {
    console.log("Proxying to " + uiServer + req.url);
    proxy.web(req, res, { target: uiServer });
  }
});

console.log("Proxy server listening on port 8888.");
server.listen(8888);
