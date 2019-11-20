const admin = require("firebase-admin");
const HttpsProxyAgent = require('https-proxy-agent');

const agent = process.env.PROXY ? new HttpsProxyAgent(process.env.PROXY) : undefined;

admin.initializeApp({
    credential: admin.credential.applicationDefault(agent),
    databaseURL: "https://carcat-3a3fb.firebaseio.com",
});

const db = admin.database();

function where(path, key, value) {
    return db.ref('/' + path).orderByChild(key).equalTo(value).once('value');
}

function all(path) {
    return db.ref('/' + path).once('value');
}

function find(path, key) {
    return db.ref('/' + path + '/' + key).once('value');
}

module.exports = {where, all, find};
