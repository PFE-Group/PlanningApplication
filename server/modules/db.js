const firebase = require("firebase-admin");
var serviceAccount = require('../firebase-access.json')

serviceAccount.private_key = process.env.FIREBASE_PKEY.replace(/\\n/g, '\n');
serviceAccount.client_email = process.env.FIREBASE_CLIENT_EMAIL;
serviceAccount.client_id = process.env.FIREBASE_CLIENT_ID;
serviceAccount.private_key_id = process.env.FIREBASE_KEY_ID;
serviceAccount.project_id = process.env.FIREBASE_PROJECT_ID;

//Initialize Firebase and Cloud Firestore
exports.connect = () => {
    new Promise( (resolve, reject) => {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        });
        
        var db = firebase.firestore();
    
        //Disable deprecated features
        db.settings({
            timestampsInSnapshots: true
        });

        exports.db = db;
        resolve(exports.db);
        
        console.log("Connected to Firestore!");
    })
}

exports.db = null;
