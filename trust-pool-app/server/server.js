const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = require('./routers/api');

const db = require(path.join('${__dirname}', './../../database'));

const setupRouters = require('./routers');
const { setupPassport } = require('./passport');
const authenticated = require('./passport/authenticated');
const { PUBLIC_PATH } = require('./config');

const app = express();
const server = http.Server(app);
app.use(cors());
app.use(require('cookie-parser')());

app.use(logger('dev'));
app.use('/api', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupPassport(app);
setupRouters(app);
// app.use(authenticated);
app.use(express.static(PUBLIC_PATH));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports.server = server;
