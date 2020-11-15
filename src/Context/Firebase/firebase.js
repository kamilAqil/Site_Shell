// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase";

// Add the Firebase products that you want to use

let logger = 1

var firebaseConfig = {
  apiKey: process.env.STAT_FIREBASE_API_KEY,
  authDomain: process.env.STAT_AUTHDOMAIN,
  databaseURL: process.env.STAT_DATABASE_URL,
  projectId: process.env.STAT_PROJECT_ID,
  storageBucket: process.env.STAT_STORAGEBUCKET,
  messagingSenderId: process.env.STAT_MESSAGINGSENDERID,
  appId: process.env.STAT_APPID,
  measurementId: process.env.STAT_MEASURMENT_ID
};



!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
class Firebase {

  
  constructor() {
    
    this.auth = firebase.auth()
    this.database = firebase.database()
    
  }




  
}

export default Firebase;
