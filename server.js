const express = require('express');  
const request = require('request');
const cors = require('cors');
const morgan = require('morgan');
const apiServerHost = process.argv[2];

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/api', function(req, res) {
  console.log(req.url);
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.use('/mail', function(req, res){
  console.log('yo bro');
  console.log(req.query);
  console.log('yo bro2');
  res.write(JSON.stringify({
    hehe: 'lol'
  }));
  req.pipe(res);
});

app.listen(4000);