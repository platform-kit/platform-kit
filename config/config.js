// Global Config
const config = require('config');
var defer = require('config/defer').deferConfig;

var siteConfig = require('./site.config.js');
var subscriptionsConfig = require('./subscriptions.config.js');
var apiConfig = require('./api.config.js');

// Check for overwritten config values in workspace
const fsPromises = require('fs/promises');
async function checkConfigs() {
    // Check for site config
    var hasApiConfig = null;
    try {
        await fsPromises.access('../.workspace/config/api.config.js');
        hasApiConfig = true;
        siteConfig = require('../workspace/config/api.config.js');
    } catch (err) {
        hasApiConfig = false;
    }
    var hasSiteConfig = null;
    try {
        await fsPromises.access('../.workspace/config/site.config.js');
        hasSiteConfig = true;
        siteConfig = require('../workspace/config/subscriptions.config.js');
    } catch (err) {
        hasSiteConfig = false;
    }
    var hasSubscriptionsConfig = null;
    try {
        await fsPromises.access('../.workspace/config/site.config.js');
        hasSubscriptionsConfig = true;
        subscriptionsConfig = require('../.workspace/config/subscriptions.config.js');
    } catch (err) {
        hasSubscriptionsConfig = false;
    }
}

checkConfigs().catch(err => {
    console.error(err);
    process.exit(-1);
});


// Export Module
var output = {
    directories: {
        functions: "functions",
        components: "ui/components",
        pages: "ui/pages",
        docs: "content/docs",
        sdk: "sdk",
        templates: "templates",
        cli: "cli",
        cliCommands: "cli/src/commands",
        workspace: ".workspace"
    },
    api: apiConfig,
    site: siteConfig,
    subscriptions: subscriptionsConfig
};

module.exports = output;

// console.log(output)