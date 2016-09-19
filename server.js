const express = require('express');  
const request = require('request');
const cors = require('cors');

const apiServerHost = 'https://utsapi.me';

const app = express();
app.use(cors());

app.use('/', function(req, res) {  
  console.log(req.url);
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(4000);