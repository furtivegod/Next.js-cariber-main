const path = require('path')
require("dotenv").config();
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  sentry: {
    disableServerWebpackPlugin: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    loader: 'imgix',
    path: ''
  },
};

const sentryWebpackPluginOptions = {
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN || "7c1da6903aea47e893dd30962e9b717c8fa246449e804163bdc9805a212ebb72",
  include: ".",
  ignore: ["node_modules", "webpack.config.js"],
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
