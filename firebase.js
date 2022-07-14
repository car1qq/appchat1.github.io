// import firebase from 'firebase';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWE35aaxuDE11NeYmpW8hWnmqP5WDfv-0",
  authDomain: "gitclone-chat-app.firebaseapp.com",
  databaseURL: "https://gitclone-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gitclone-chat-app",
  storageBucket: "gitclone-chat-app.appspot.com",
  messagingSenderId: "875650023505",
  appId: "1:875650023505:web:59c2233d0c1eb9d0493870",
  measurementId: "G-2BSHJ1ZBXQ"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();


  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };