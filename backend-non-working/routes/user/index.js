const signin = require('./signin');
const signup = require('./signup');

module.exports = (app) => {
    app.post('/signin', signin);
    app.post('/signup', signup);
};


