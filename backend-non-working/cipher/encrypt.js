const crypto = require('crypto');
const config = require('./config');

module.exports = (text) => {
    let cipher = crypto.createCipher(config.algorithm, config.key);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
};

console.log("in encrypt.js");