const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://carcat-3a3fb.firebaseio.com",
});

module.exports = admin.database();
