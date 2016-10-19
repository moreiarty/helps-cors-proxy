const express = require('express');  
const request = require('request');
const cors = require('cors');
const morgan = require('morgan');
const smtpMail = require('./jason_mail');
import { sendSMS } from './helpers/sms.helper';
const schedule = require('node-schedule');
const apiServerHost = process.argv[2];
const app = express();
const bodyParser = require('body-parser');

require('./helpers/db.helper');

//Setup timezone
process.env.TZ = 'Australia/Sydney';

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({
  limit: '150mb',
  extended: true,
}));
app.use('/api/', function(req, res) {
  console.log('routing correctly');
  console.log(req.url);
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

require('./routes/index.routes')(app);

console.log('YOUR AWESOME APP STARTED AT: ');
var date = new Date();
console.log('hour', date.getYear());
console.log('month', date.getMonth());
console.log('date', date.getDate());
console.log('hours', date.getHours());
console.log('minutes', date.getMinutes());
console.log('seconds', date.getSeconds());


app.listen(4000);