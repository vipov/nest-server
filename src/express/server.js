const express = require('express')
// const bodyparser = require('body-parser');
const app = express();

// app.use(bodyparser())

// app.get('/', function (req, res) {
//   // TODO write domain logic
//   res.send('Hello from Express.js')
// })

app.get('/user', 
  function (req, res, next) {    // logger middleware
    console.log(req.url);
    next();
  },
  function (req, res, next) {    // guard middleware
    req.user = req.query.name;
    (req.user) ? next() : next(new Error('forbidden'));
  },
  function (req, res) {          // request handler
    res.send('Hi ' + req.user)
  },
  function (err, req, res, next) {    // error handler
    // TODO logger & raport
    res.status(500);
    res.json({status: 500, message: err.message})
  }
)

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.json({params: req.params})
})


exports.expressApp = app;

// app.listen(3000, () => console.log(`Example app listening on port 3000!`));
