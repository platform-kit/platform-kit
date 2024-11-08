
// Export Module
var output = {

  globals: {
    siteName: process.env.SITE_NAME || "PlatformKit",
    baseURL:
      process.env.DOMAIN || process.env.BASEURL,
    webhookDomain: process.env.WEBHOOK_DOMAIN
  },
  branding: {
    logo: process.env.LOGO || "/images/logo.png",
    icon: process.env.ICON || "/images/icon.png",
    favicon: process.env.FAVICON || "/images/favicon.png",
  },
  seo: {
    socialThumbnail: "/images/social_thumbnail.jpg",
    socialDescription:
      "Built with PlatformKit.",
  },
};

module.exports = output;
