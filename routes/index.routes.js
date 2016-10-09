const index = require('../controllers/index.controller');

module.exports = function (app) {
  app.post('/workshop/create', index.createWorkshop);
  app.get('/', index.someMethod);
  app.get('/getWorkshops', index.getWorkshops);
};