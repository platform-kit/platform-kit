
// Export Module
var output = {
  // Subscriptions  
  plans: [
    {
      id: "basic",
      name: "Basic",
      currency: "USD",
      prefix: "$",
      price: "15",
      stripeIds: [
        "price_1MCGluGQPPOg9Tbd8n38qzMs", // First in array will be used for new subscriptions - $0.10 / unit
        "price_1M9LkrGQPPOg9Tbd44ALfXCZ",
      ],
      period: "month",
      keyFeatures: [
        "Create Docs with AI",
        "Create Images with AI",
        "Create Speech with AI",
        "Clone 1 Voice",
        "Non-Commercial Use",
      ],
      permissions: {
        tts: { voiceClones: 1, proVoiceClones: 0 },
      },
    },
  ],
};

module.exports = output;
