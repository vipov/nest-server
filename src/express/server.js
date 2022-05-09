const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

let counter = 0;

app.get('/', function (req, res) {
  counter++;
  console.log('UPDATE COUNTER', counter);
  res.send('Hello from Express.js!');
});
app.get(
  '/user',
  function (req, res, next) {
    // logger middleware
    console.log(req.url);
    next();
  },
  function (req, res, next) {
    // guard middleware
    req.user = req.query.name;
    req.user ? next() : next(new Error('forbidden'));
  },
  function (req, res) {
    // request handler
    res.send('Hi ' + req.user);
  },
  function (err, req, res, next) {
    // error handler
    res.json({ status: 500, err: err.message });
  },
);

app.get('/users/:userId/books/:bookId', 
cookieParser(), 
function (req, res) {
  res.json({
    params: req.params,
    query: req.query,
    cookies: req.cookies,
    headers: req.headers,
  });
});

console.log('counter1', counter);

exports.expressApp = app;

// app.listen(3001, () => console.log('Listening on port 3001!'));
