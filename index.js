const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sslRedirect = require('heroku-ssl-redirect');
let app = express();

let apiRouter = require('./routes/api');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sslRedirect());

//CORS bypass
app.use(function(req, res, next) {
  //must be included these first two
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api', apiRouter);

app.get('/test', (req, res) => {
  res.send('NOTT THE HELLO WORLD');
});

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
