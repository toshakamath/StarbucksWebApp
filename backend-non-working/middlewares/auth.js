const knex = require('../db');
const decrypt = require('../cipher/decrypt');

module.exports = (req, res, next) => {
    if (req.url !== '/signin' && req.url !== '/signup' && req.url !== '/ping') {
        console.log( ">>> ",req.headers);
        console.log(decrypt(req.headers.token))
        console.log(decrypt(req.headers.token).split("|"))
        const credentials = decrypt(req.headers.token).split("|");
        req.body.credentials = credentials;
        knex('users')
            .where({
                USER_ID: credentials[0],
                PASSWORD_HASH: credentials[1]
            })
            .then(data => {
                if (data.length < 1)
                    res.status(403).json({message: "unauthorized"})
            })
    }
    next()
};

console.log("in auth.js");