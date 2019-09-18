const doPayment = require('./payment');

module.exports = (app) => {
    app.post('/payment', doPayment);
};


