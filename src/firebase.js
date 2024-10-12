import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyATs363IJhc21Af2DgLdotCY45TYGbxy-E",
  authDomain: "olx-clone-822ea.firebaseapp.com",
  projectId: "olx-clone-822ea",
  storageBucket: "olx-clone-822ea.appspot.com",
  messagingSenderId: "185558768433",
  appId: "1:185558768433:web:7c1cc1ffbe9479066d2e10"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

let auth = getAuth(app)
let db = getFirestore(app)

let signUp = async (username, email, phone, password) => {
    try {
        let res = await createUserWithEmailAndPassword(auth, email, password)
        let user = res.user
        await addDoc(collection(db, 'users'), {
            uid : user.uid,
            username,
            authProvider : 'Local',
            email,
            phone
        })
    } catch (err) {
        console.log(err);
        alert(err)
    }
}

let login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.log(err);
        alert(err.message)
    }
}

let logout = () => {
    signOut(auth)
}

export {auth, db, login, signUp, logout, storage}
