const firebase = require("firebase/app");
require('firebase/firestore');

//TODO .env pour apiKey, etc ??
//Initialize firebase
let connect = () => {
    var config = {
        apiKey: "AIzaSyAllrr8fQmSbiL0QOBa9w0cey_060AHfhQ",
        authDomain: "pfe01-6c98e.firebaseapp.com",
        databaseURL: "https://pfe01-6c98e.firebaseio.com",
        projectId: "pfe01-6c98e",
        storageBucket: "pfe01-6c98e.appspot.com",
        messagingSenderId: "521992410400"
    };
    
    firebase.initializeApp(config);
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