const functions = require('firebase-functions');
const firebase = require('firebase');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

exports.carcat = functions.https.onRequest(app);
