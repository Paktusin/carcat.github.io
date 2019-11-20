const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://carcat-3a3fb.firebaseio.com"
});

const app = express();

app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300');
    return next();
});

app.get('/brand', (req, res) => {
    admin.database().ref('brand/').once('value').then(snapshot => {
        return res.json(snapshot.val())
    })
});

app.use((req, res, next) => {
    res.statusCode = 404;
    return res.send();
});

exports.carcat = functions.https.onRequest(app);
