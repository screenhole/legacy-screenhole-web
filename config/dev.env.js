'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_BASE: process.env.PRODUCTION_MODE === 'staging' ? '"https://staging-api.screenhole.net"' : '"https://screenhole-api.ngrok.io"',
  NODE_ENV: '"development"'
})
