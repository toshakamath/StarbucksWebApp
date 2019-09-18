let knex = require('knex');

module.exports = knex({
    client: 'mysql2',
    connection: {
        host: "localhost",
        user: "root",
        password: "password",
        database: "starbucks_db"
    }
});
console.log("in db.js");