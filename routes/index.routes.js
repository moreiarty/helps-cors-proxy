const index = require('../controllers/index.controller');

module.exports = function (app) {
  app.post('/createWorkshop', index.createWorkshop);
  app.get('/', index.someMethod);
  app.get('/getWorkshops', index.getWorkshops);
  app.post('/emailNotification', index.emailNotification);
  app.post('/mail/setReminder', index.mailReminder);
  app.post('/sms/setReminder', index.smsReminder);
};