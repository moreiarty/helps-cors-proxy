const index = require('../controllers/index.controller');

module.exports = function (app) {
  app.post('/createWorkshop', index.createWorkshop);
  app.get('/', index.someMethod);
  app.get('/getWorkshops', index.getWorkshops);
};