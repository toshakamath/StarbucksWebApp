const knex = require('../../db');

module.exports = (req, res) => {
    if (!req.body.total) {
        res.status(500).send({message: "Please provide required fields"});
    } else
        knex('orders')
            .insert({
                COST: req.body.total,
                USER_ID: req.body.credentials[0]
            })
            .then(() => res.send({"message": "orders placed"}))
            .catch(data => {
                res.status(500).send(data)
            });

};
