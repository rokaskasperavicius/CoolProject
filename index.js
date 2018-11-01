const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sslRedirect = require('heroku-ssl-redirect');
const { Client } = require('pg');
let app = express();

const connection = "postgres://mqglvnqrxxuzzd:57c4f33d213519e1465951146a50a0a1cd92974d58545c09929e18fe6e077ff5@ec2-75-101-138-26.compute-1.amazonaws.com:5432/d8ae1lbnpucq8l";

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

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const client = new Client({
    connectionString: connection,
    ssl: true,
  });
  
  client.connect();

  client.query('SELECT * FROM users WHERE username LIKE \'' + username + '\'', function(err, result) {
    if (err)
      console.log(err);

    if (result.rows[0] && result.rows[0].password === password) {
      res.json(result.rows[0]);
    } else {
      res.json('Wrong credentials!');
    }
  });
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
