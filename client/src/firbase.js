//import * as firebase from 'firebase'
  import firebase from "firebase/app"
import "firebase/auth"
  
  // Your web app's Firebase configuration
  
  const firebaseConfig = {
    apiKey: "AIzaSyC3B0UQj6M-PcTzXYkPEVn_WbBJqagwEeY",
    authDomain: "carcare-123b3.firebaseapp.com",
    databaseURL: "https://carcare-123b3.firebaseio.com",
    projectId: "carcare-123b3",
    storageBucket: "carcare-123b3.appspot.com",
    messagingSenderId: "661553588683",
    appId: "1:661553588683:web:e78f665eebad21acdaae4e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()

  export const googleAuthProvider =  new firebase.auth.GoogleAuthProvider()