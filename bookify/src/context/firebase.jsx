import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCM8pP_oV6cTZtP_sYnK_Pfw4iWTHWNSqA",
    authDomain: "bookify-87949.firebaseapp.com",
    projectId: "bookify-87949",
    storageBucket: "bookify-87949.firebasestorage.app",
    messagingSenderId: "619748433959",
    appId: "1:619748433959:web:172331a2e4e0ea2287ae02",
    measurementId: "G-8XFEH96W7Z"
};

export const UseFirebase = () => useContext(FirebaseContext);

const firebasrApp = initializeApp(firebaseConfig);

export const FirebaseProvider = (props) => {
    return (
        <FirebaseContext.Provider>
            {props.children}
        </FirebaseContext.Provider>
    )
}