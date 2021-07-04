const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello from Express.js');
});

// logger middleware
function logger() {    
  return (req, res, next) => { 
    console.log("Middleware:", req.url);
    next();
  }
}

// guard middleware
function guard() {    
  return (req, res, next) => {    
    if(req.query.name) {
      req.user = req.query.name;
      next()
    } else {
      const err = new Error('ForbiddenError: This route is restricted');
      err.statusCode = 403;
      next(err);
    }
  }
}

// error handler middleware
function errorHandler() {    
  return (err, req, res, next) => {    
    if(!res.headersSent){
      const status = err.statusCode || 500;
      res.status(status).json({status, err});
    }
  }
}

app.get('/user', 
  logger(),
  guard(),
  function (req, res) {
    res.json({message: 'Hi ' + req.user + '! Welcome to Express.js'})
  },
  errorHandler()
)

exports.expressApp = app;

// app.listen(3000, () => console.log(`Example app listening on port 3000!`));
