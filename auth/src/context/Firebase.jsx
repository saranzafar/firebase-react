import { createContext, useContext } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAacuIpGYOm3EU0mA9YfptKTRdLBtYJtck",
    authDomain: "app-6f096.firebaseapp.com",
    projectId: "app-6f096",
    storageBucket: "app-6f096.firebasestorage.app",
    messagingSenderId: "1078550867685",
    appId: "1:1078550867685:web:fcd47b1b6e1741a557ae0c",
    databaseURL: "https://app-6f096-default-rtdb.firebaseio.com/",
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp)

const FirebaseContext = createContext(null)

export const UseFirebase = () => useContext(FirebaseContext)

const putData = (key, data) => set(ref(database, key), data)

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}