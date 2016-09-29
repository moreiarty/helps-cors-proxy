const express = require('express');  
const request = require('request');
const cors = require('cors');
const morgan = require('morgan');
const mail = require('mail');
const schedule = require('node-schedule');
const apiServerHost = process.argv[2];

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/api/', function(req, res) {
  console.log(req.url);
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.use('/mail/setReminder', function(req, res){
  var year = parseInt(req.query.year);
  var month = parseInt(req.query.month);
  var day  = parseInt(req.query.date);
  var hour = parseInt(req.query.hour);
  var minute = parseInt(req.query.minute);
  var second = parseInt(req.query.second);

  var responseSuccess = {
    message: 'You have successfully scheduled a job bro'
  };

  var responseError = {
    message: 'You cannot execute this method without fullfilling all parameters. year, month, day, hour, minute, second required'
  };


  //TODO: Find proper status code
  //TODO: Stronger validation required
  if(req.query === undefined || year === undefined || month === undefined || day === undefined
  || hour === undefined || minute === undefined || second === undefined){
    res.statusCode = 404;
    res.write(JSON.stringify(responseError));
    req.pipe(res);
    return this;
  } else {

    //Calculating offset vals  http://www.w3schools.com/js/js_date_methods.asp
    //TODO: Double check hour minute second offset values
    month = month - 1;
    /*hour = hour - 1;
    minute = minute - 1;
    second = second - 1;*/

    var date = new Date(year, month, day, hour, minute, second);

    schedule.scheduleJob(date, function() {
      console.log('schedule works!?@!?');
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