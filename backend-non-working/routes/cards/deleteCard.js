const knex = require('../../db');

module.exports = (req, res) => {
    if (!req.query.number) {
        res.status(500).send({message: "Please provide required fields"});
    } else
        knex('cards')
            .where({
                CARD_NUMBER: req.query.number
            })
            .del()
            .then(data => res.send({message: "success"}))
            .catch(data => {
                res.status(500).send(data)
            });
};