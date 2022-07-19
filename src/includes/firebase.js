import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBXWOhRLNw7-V36PYykNmll55tAdAeTA9M",
    authDomain: "music-a5a7b.firebaseapp.com",
    projectId: "music-a5a7b",
    storageBucket: "music-a5a7b.appspot.com",
    appId: "1:292982807674:web:8bcca79115f68d7cfc2fc3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
    console.log(`Firebase persistence error ${error.code}`)
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
    auth,
    db,
    usersCollection,
    songsCollection,
    commentsCollection,
    storage,
}