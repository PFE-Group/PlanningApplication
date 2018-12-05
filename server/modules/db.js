const firebase = require("firebase-admin");
var serviceAccount = require('../firebase-access.json')

//Initialize firebase
let connect = () => {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });
}

//Initialize Cloud Firestore through Firebase
let connectFirestore = () => {
    return new Promise( (resolve, reject) => {
        var db = firebase.firestore();
    
        //Disable deprecated features
        db.settings({
            timestampsInSnapshots : true
        })

        exports.dbFirestore = db;
        resolve(exports.dbFirestore)
    })
}

//Initialize Realtime Database through Firebase
let connectRealTimeDB = () => {
    return new Promise( (resolve, reject) => {
        var db = firebase.database();
        exports.dbRealTimeDB = db;
        resolve(exports.dbRealTimeDB)
    })
}

exports.connect = connect;
exports.connectFirestore = connectFirestore;
exports.dbFirestore = null;
exports.connectRealTimeDB = connectRealTimeDB;
exports.dbRealTimeDB = null;