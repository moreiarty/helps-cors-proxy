const express = require('express');  
const request = require('request');
const cors = require('cors');

const apiServerHost = 'https://utsapi.me';

const app = express();
app.use(cors());

app.use('/', function(req, res) {  
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 80);