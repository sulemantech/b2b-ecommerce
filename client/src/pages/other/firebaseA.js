
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAadKzER2L6BEy5V4s0nNP5SPfpCRfrPdE",
  authDomain: "otp-generator-app.firebaseapp.com",
  projectId: "otp-generator-app",
  storageBucket: "otp-generator-app.appspot.com",
  messagingSenderId: "818241245795",
  appId: "1:818241245795:web:0c4b922b64897702a35e56",
  measurementId: "G-NNYFC6V48X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
