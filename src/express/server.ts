const express = require('express');
import { Request } from 'express';

const app = express();

const users = [];

app.get('/', function (req: Request, res) {
  res.send('Hello from Express.js');
});

app.get(
  '/user',
  function (req: Request, res, next) {
    // logger middleware
    console.log(req.url);
    next();
  },
  function (req: Request, res, next) {
    // guard middleware
    req.userName = req.query.name as string;
    users.push(req.userName);
    req.userName ? next() : next(new Error('forbidden'));
  },
  function (req: Request, res) {
    // request handler
    console.log('USERS', users);
    res.send('Hi ' + req.userName);
  },
  function (err, req, res, next) {
    // error handler
    res.json({ status: 500, err });
  },
);

exports.expressApp = app;

export { app as expressApp };

// app.listen(3000, () => console.log(`Example app listening on port 3000!`));
