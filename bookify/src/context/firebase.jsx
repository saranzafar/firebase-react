import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCM8pP_oV6cTZtP_sYnK_Pfw4iWTHWNSqA",
    authDomain: "bookify-87949.firebaseapp.com",
    projectId: "bookify-87949",
    storageBucket: "bookify-87949.firebasestorage.app",
    messagingSenderId: "619748433959",
    appId: "1:619748433959:web:172331a2e4e0ea2287ae02",
    measurementId: "G-8XFEH96W7Z"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider()

const FirebaseContext = createContext(null);
export const UseFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            console.log("Signed in user:: ", user);
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])
    const isLoggedin = user ? true : false;

    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    };
    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    };
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)



    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signinWithGoogle, isLoggedin }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}