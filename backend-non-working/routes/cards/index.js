const addProject = require('./addCard');
const fetchCard = require('./fetchCard');
const deleteCard = require('./deleteCard');

module.exports = (app) => {
    app.post('/card', addProject);
    app.get('/card', fetchCard);
    app.delete('/card', deleteCard);
};
