const knex = require('../../db');

module.exports = (req, res) => {

    knex('cards')
        .where({
            USER_ID: req.body.credentials[0]
        })
        .then(data => res.send(data))
        .catch(data => {
            res.status(500).send(data)
        });
};