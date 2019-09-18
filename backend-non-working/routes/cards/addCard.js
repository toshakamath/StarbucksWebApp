const knex = require('../../db');

module.exports = (req, res) => {

    if (!req.body.number ||
        !req.body.cvv ||
        !req.body.balance) {
        res.status(500).send({message: "Please provide required fields"});
    } else
        knex('cards').insert({
            CARD_NUMBER: req.body.number,
            CARD_CVV: req.body.cvv,
            CARD_BALANCE: req.body.balance,
            USER_ID: req.body.credentials[0],
        })
            .then(() => res.send({"message": "card successfully added."}))
            .catch(data => {
                if (data.code === "ER_DUP_ENTRY")
                    res.status(500).send({message: "CARD already exists"});
                else
                    res.status(500).send(data)
            });
};

