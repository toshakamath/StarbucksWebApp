const knex = require('../../db');
const hash = require('../../cipher/hash');

module.exports = (req, res) => {
    knex('users')
        .insert({
            USER_ID: req.body.username,
            PASSWORD_HASH: hash(req.body.password),
            USER_NAME: req.body.name
        })
        .then(data => {
            res.status(200).send(data);
        })
};
