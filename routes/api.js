let express = require('express');
let app = express.Router();
let randomstring = require('randomstring');
let { Client } = require('pg');

const connection = "postgres://mqglvnqrxxuzzd:57c4f33d213519e1465951146a50a0a1cd92974d58545c09929e18fe6e077ff5@ec2-75-101-138-26.compute-1.amazonaws.com:5432/d8ae1lbnpucq8l";

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = randomstring.generate(30);
 
    const client = new Client({
      connectionString: connection,
      ssl: true,
    });
   
    client.connect();
 
    client.query('SELECT * FROM users WHERE username LIKE \'' + username + '\'', function(err, result) {
      if (err) throw err;
      
      const value = result.rows[0];
      const error = 'Wrong credentials!';
 
      if (value && value.password === password) {
        client.end();
        res.json({ value, token });
      } else {
        client.end();
        res.json({ error, token });
      }
    });
});

app.post('/userAdd', (req, res) => {
  const values = req.body;

  const client = new Client({
    connectionString: connection,
    ssl: true,
  });
 
  client.connect();

  client.query('INSERT INTO users(name, lastname, password, role, username, firstime) values(\'' + values.name + '\', \'' + values.lastname + '\', \'' + values.password + '\', \'' + values.role + '\', \'' + values.username + '\', \'' + 'true' + '\')', (err, result) => {
    if (err) throw err;

    client.end();
    res.json('Success');
  })
})

app.post('/userUpdate', (req, res) => {
  const values = req.body;
  console.log(values);

  const client = new Client({
    connectionString: connection,
    ssl: true,
  });

  client.connect();

  client.query('UPDATE users SET name=\'' + values.name + '\', lastname=\'' + values.lastname + '\', password=\'' + values.password + '\', username=\'' + values.username + '\', firstime=\'' + 'false' + '\' WHERE id = ' + values.id, (err, resulr) => {
    if (err) throw err;

    client.end();
    res.json('Success');
  })
})

app.post('/data', (req, res) => {
  const values = req.body;

  const client = new Client({
    connectionString: connection,
    ssl: true,
  });
 
  client.connect();

  client.query('UPDATE data SET name=\'' + values.name + '\', lastname=\'' + values.lastname + '\', age=\'' + values.age + '\', height=\'' + values.height + '\', weight=\'' + values.weight + '\' WHERE id = ' + values.id, (err, resulr) => {
    if (err) throw err;

    client.end();
    res.json('Success');
  })
})

app.get('/data', (req, res) => {
  const client = new Client({
   connectionString: connection,
    ssl: true,
  });

  client.connect();

  client.query('SELECT * FROM data', (err, result) => {
    if (err) throw err;

    client.end();
    res.json(result.rows);
  })
})

module.exports = app;