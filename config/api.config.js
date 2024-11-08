// Export Module
var output = {
    // API Config
    whiteList: ["helloworld"],
    blackList: null,
    rateLimit: {
        limit: 100,
        ms: 5 /* number of minutes*/ * 60000 /* milliseconds per minute */,
    }
};
module.exports = output;
