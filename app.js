const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const emailRouter = require('./routes/email');
const paymentRouter = require('./routes/payment');

const app = express();

if (process.env.NODE_ENV === 'staging') {
  require('dotenv').config();
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // TODO: Update to reflect origin domain
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/email', emailRouter);
app.use('/payment', paymentRouter);

module.exports = app;
