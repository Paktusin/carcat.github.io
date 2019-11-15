const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const rest = require('./routes/rest');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://paktusin.github.io");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/brand', rest(require('autoParser/model/Brand')));
app.use('/model', rest(require('./model/Model')));
app.use('/gen', rest(require('./model/Gen')));
app.use('/body', rest(require('./model/Body')));

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
