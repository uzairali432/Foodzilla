import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (userData) => {
  const { email, password, role, extraData } = userData;

  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredentials.user.uid;

  await setDoc(doc(db, "users", uid), {
    ...extraData, 
    email,
    role, 
    createdAt: new Date(),
  });

  return userCredentials;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
