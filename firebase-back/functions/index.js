const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

let serviceAccount = require("../key");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://carcat-3a3fb.firebaseio.com"
});

const app = express();

app.get('/brand', (req, res) => {
    admin.database().ref('brand/').once('value').then(snapshot => {
        console.log(snapshot.val());
        return res.json(snapshot.val())
    })
});

exports.carcat = functions.https.onRequest(app);
