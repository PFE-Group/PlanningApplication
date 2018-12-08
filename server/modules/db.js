const firebase = require("firebase-admin");
var serviceAccount = require('../firebase-access.json')


//Initialize Firebase and Cloud Firestore
exports.connect = () => {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });

    var db = firebase.firestore();

    //Disable deprecated features
    db.settings({
        timestampsInSnapshots: true
    })

}
