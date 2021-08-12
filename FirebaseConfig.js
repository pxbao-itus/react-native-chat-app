import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDd-cQ-X4yqG2XlXxKsJDuZHnyfo24ThbQ",
    authDomain: "chat-app-2562b.firebaseapp.com",
    projectId: "chat-app-2562b",
    storageBucket: "chat-app-2562b.appspot.com",
    messagingSenderId: "557950134913",
    appId: "1:557950134913:web:2edcfa4ad4f1cc5ccdbb80",
    measurementId: "G-978CQ2CELY"
  };

export default firebaseApp = firebase.initializeApp(firebaseConfig);
