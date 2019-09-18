const addOrder = require('./addOrder');

module.exports = (app) => {
    app.post('/order', addOrder);
};