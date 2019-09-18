const knex = require('../../db');

module.exports = (req, res) => {
    console.log("inside payment");
    if (!req.body.number) {
        res.status(500).send({message: "Please provide required fields"});
    } else
    // in table orders, find user_id = decoded.email
    // if user is present then select * from cards table where card = req.cardnumber, 
    // in backend only update cardbalance if cardbalance is negative then return messgae not enouhg money
    // else update cardbalance in card table
    // also delete order in orders table using userid
    //  and then send res payment success
    
        knex('orders')
            .where({
                USER_ID: req.body.credentials[0]
            })
            .then(async data => {
                let card = null;
                await knex('cards')
                    .where({
                        CARD_NUMBER: req.body.number
                    })
                    .then(data => {
                        card = data[0]
                    });

                const newBalance = card.CARD_BALANCE - data[0].COST;

                if (newBalance < 0) res.status(500).json({message: "not enough money"})

                await knex('cards')
                    .where({
                        CARD_NUMBER: req.body.number
                    })
                    .update({
                        CARD_BALANCE: newBalance
                    })

                await knex('orders')
                    .where({
                        USER_ID: req.body.credentials[0]
                    })
                    .del()

            })
            .then(() => res.send({message: "success"}))
};

