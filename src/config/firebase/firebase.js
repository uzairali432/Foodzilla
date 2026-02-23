import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBNROhuSqoIx5MOLL5dGihSky6zYVQN3JY",
  authDomain: "food-delivery-applicatio-18559.firebaseapp.com",
  projectId: "food-delivery-applicatio-18559",
  storageBucket: "food-delivery-applicatio-18559.firebasestorage.app",
  messagingSenderId: "587881713842",
  appId: "1:587881713842:web:129e4cdad5bc80ef7a39ab"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

