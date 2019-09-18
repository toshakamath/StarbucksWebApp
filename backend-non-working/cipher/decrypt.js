const crypto = require('crypto');
const config = require('./config');


module.exports = (encrypted) => {
    let decipher = crypto.createDecipher(config.algorithm, config.key);
    let s = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    return s;
}

console.log("in decrypt.js");