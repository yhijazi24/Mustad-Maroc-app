// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMUMKwV8Y4ZS6efWX_zIAKbJefCPPsN3I",
  authDomain: "mustad-maroc.firebaseapp.com",
  projectId: "mustad-maroc",
  storageBucket: "mustad-maroc.appspot.com",
  messagingSenderId: "165790013621",
  appId: "1:165790013621:web:fac28bebca7d31d2a246fc",
  measurementId: "G-HKQQXRP5CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage }; 
export default app;