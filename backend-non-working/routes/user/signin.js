const knex = require('../../db');
const hash = require('../../cipher/hash');
const encrypt = require('../../cipher/encrypt');

module.exports = (req, res) => {
    knex('users')
        .where({
            USER_ID: req.body.username,
            PASSWORD_HASH: hash(req.body.password)
        })
        .then(data => {
            if (!!data.length)
                res.status(200).json({token: encrypt(req.body.username + "|" + hash(req.body.password))});
            else
                res.status(403).json({message: "unauthorized"});
        })
};
