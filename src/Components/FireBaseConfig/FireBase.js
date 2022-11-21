import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database"



function StartFirebase(){

  const firebaseConfig = {
    apiKey: "AIzaSyArACTyw5M3n8JyM3CbF6eYTHFVua4t3mU",
    authDomain: "reactjsdemo-34cbc.firebaseapp.com",
    databaseURL: "https://reactjsdemo-34cbc-default-rtdb.firebaseio.com",
    projectId: "reactjsdemo-34cbc",
    storageBucket: "reactjsdemo-34cbc.appspot.com",
    messagingSenderId: "376670286945",
    appId: "1:376670286945:web:d71f7012da1458587ae620"
  };
  
  const app = initializeApp(firebaseConfig);
  return getDatabase(app); 
}

export default StartFirebase;