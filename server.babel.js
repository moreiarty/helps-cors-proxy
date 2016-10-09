const express = require('express');  
const request = require('request');
const cors = require('cors');
const morgan = require('morgan');
const smtpMail = require('./jason_mail');
import { sendSMS } from './helpers/sms.helper';
const schedule = require('node-schedule');
const apiServerHost = process.argv[2];
const app = express();

//Setup timezone
process.env.TZ = 'Australia/Sydney';

app.use(cors());
app.use(morgan('dev'));
app.use('/api/', function(req, res) {
  console.log('routing correctly');
  console.log(req.url);
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});


app.use('/sms/setReminder', function(req, res) {
  var year = req.query.year;
  var month = req.query.month;
  var date  = req.query.date;
  var hour = req.query.hour;
  var minute = req.query.minute;
  var second = req.query.second;

  var number = req.query.number;
  var message = req.query.message;

  var responseSuccess = {
    message: 'You have successfully scheduled an sms job bro'
  };

  var responseError = {
    message: 'You cannot execute this method without fullfilling all parameters. year, month, day, hour, minute, second required'
  };

  //TODO: Find proper status code
  //TODO: Stronger validation required
  if(req.query === undefined || year === undefined || month === undefined || date === undefined
  || hour === undefined || minute === undefined || second === undefined){
    res.statusCode = 404;
    res.write(JSON.stringify(responseError));
    req.pipe(res);
    return this;
  } else {

    //Parsing date to int
    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);
    hour = parseInt(hour);
    minute = parseInt(minute);
    second = parseInt(second);

    //Calculating offset vals  http://www.w3schools.com/js/js_date_methods.asp
    //TODO: Double check hour minute second offset values
    month = month - 1;
    /*hour = hour - 1;
     minute = minute - 1;
     second = second - 1;*/
    var date = new Date(year, month, date, hour, minute, second);

    schedule.scheduleJob(date, function() {
      console.log('SMS Scheduled');
      sendSMS(number, message);
    });
    
    res.statusCode = 200;
    res.write(JSON.stringify(responseSuccess));
    req.pipe(res);
    return this;
  }
});

app.use('/mail/setReminder', function(req, res){
  var year = req.query.year;
  var month = req.query.month;
  var date  = req.query.date;
  var hour = req.query.hour;
  var minute = req.query.minute;
  var second = req.query.second;

  var to = req.query.to;
  var subject = req.query.subject;
  var content = req.query.content;

  var responseSuccess = {
    message: 'You have successfully scheduled a job bro'
  };

  var responseError = {
    message: 'You cannot execute this method without fullfilling all parameters. year, month, day, hour, minute, second required'
  };

  //TODO: Find proper status code
  //TODO: Stronger validation required
  if(req.query === undefined || year === undefined || month === undefined || date === undefined
  || hour === undefined || minute === undefined || second === undefined){
    res.statusCode = 404;
    res.write(JSON.stringify(responseError));
    req.pipe(res);
    return this;
  } else {

    //Parsing date to int
    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);
    hour = parseInt(hour);
    minute = parseInt(minute);
    second = parseInt(second);

    //Calculating offset vals  http://www.w3schools.com/js/js_date_methods.asp
    //TODO: Double check hour minute second offset values
    month = month - 1;
    /*hour = hour - 1;
     minute = minute - 1;
     second = second - 1;*/
    var date = new Date(year, month, date, hour, minute, second);

    console.log('passed in date');
    console.log('hour', date.getYear());
    console.log('month', date.getMonth());
    console.log('date', date.getDate());
    console.log('hours', date.getHours());
    console.log('minutes', date.getMinutes());
    console.log('seconds', date.getSeconds());

    schedule.scheduleJob(date, function() {
      console.log('schedule invoked!');
      smtpMail.mail('pranavandfriends@gmail.com', to, 'subject: '+subject+'\r\n\r\n'+content,
          function() {
            console.log('sent email successfully');
          },
          function() {
            console.log('failed at sending email!');
          });

    });
    
    res.statusCode = 200;
    res.write(JSON.stringify(responseSuccess));
    req.pipe(res);
    return this;
  }
});

console.log('YOUR AWESOME APP STARTED AT: ');
var date = new Date();
console.log('hour', date.getYear());
console.log('month', date.getMonth());
console.log('date', date.getDate());
console.log('hours', date.getHours());
console.log('minutes', date.getMinutes());
console.log('seconds', date.getSeconds());


app.listen(4000);