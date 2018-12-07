const firebase = require("firebase-admin");
var serviceAccount = require('../firebase-access.json')

serviceAccount.private_key = process.env.FIREBASE_PKEY.replace(/\\n/g, '\n');
serviceAccount.client_email = process.env.FIREBASE_CLIENT_EMAIL;
serviceAccount.client_id = process.env.FIREBASE_CLIENT_ID;
serviceAccount.private_key_id = process.env.FIREBASE_KEY_ID;
serviceAccount.project_id = process.env.FIREBASE_PROJECT_ID;

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