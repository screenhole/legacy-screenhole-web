'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    API_BASE: '"https://screenhole-api.ngrok.io"',
    NODE_ENV: '"development"'
})
