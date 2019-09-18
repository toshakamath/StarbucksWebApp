const crypto = require('crypto');
const config = require('./config');

module.exports = (passwordText) =>
    crypto.createHmac('sha256', config.key)
        .update(passwordText)
        .digest('hex');

console.log("in hash.js");