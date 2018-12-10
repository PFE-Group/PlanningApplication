import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAllrr8fQmSbiL0QOBa9w0cey_060AHfhQ",
    authDomain: "pfe01-6c98e.firebaseapp.com",
    databaseURL: "https://pfe01-6c98e.firebaseio.com",
    projectId: "pfe01-6c98e",
    storageBucket: "pfe01-6c98e.appspot.com",
    messagingSenderId: "521992410400"
};
firebase.initializeApp(config);

export class AuthService {
    isAuth = false;

    storeToken(token) {
        const serialized = JSON.stringify(token);
        localStorage.setItem("token", serialized);
    }

    retrieveToken() {
        const serialized = localStorage.getItem("token");
        return JSON.parse(serialized);
    }

    clearToken() {
        localStorage.removeItem("token");
    }

    logIn(token) {
        this.storeToken(token)
        this.isAuth = true;
        firebase.auth().signInWithCustomToken(token);
    }

    logOut() {
        this.clearToken()
        this.isAuth = false;
        firebase.auth().signOut()
    }

    checkIfAuth() {
        return this.retrieveToken() !== null;
    }
}