const functions = require("firebase-functions");
const express = require("express");


const app = express();

app.use((req, res, next) => {
    res.set("Cache-Control", 'public, max-age=300');
    return next();
});

app.use("/brand", require('./src/brand'));

app.use((req, res) => {
    res.statusCode = 404;
    return res.send();
});

exports.carcat = functions.https.onRequest(app);
