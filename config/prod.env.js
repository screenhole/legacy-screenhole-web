'use strict'
module.exports = {
  API_BASE: process.env.PRODUCTION_MODE === 'staging' ? '"https://staging-api.screenhole.net"' : '"https://api.screenhole.net"',
  NODE_ENV: '"production"'
}
