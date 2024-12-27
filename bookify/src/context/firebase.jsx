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
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey: "AIzaSyCM8pP_oV6cTZtP_sYnK_Pfw4iWTHWNSqA",
    authDomain: "bookify-87949.firebaseapp.com",
    projectId: "bookify-87949",
    storageBucket: "bookify-87949.firebaseapp.com",
    messagingSenderId: "619748433959",
    appId: "1:619748433959:web:172331a2e4e0ea2287ae02",
    measurementId: "G-8XFEH96W7Z",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const UseFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            setLoading(true);
            const response = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            toast.success("Account created successfully!");
            return response;
        } catch (error) {
            toast.error(error.message || "Signup failed. Please try again.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signinUserWithEmailAndPassword = async (email, password) => {
        try {
            setLoading(true);
            const response = await signInWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            toast.success("Login successful! Welcome back!");
            return response;
        } catch (error) {
            toast.error(error.message || "Login failed. Please check your credentials.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signinWithGoogle = async () => {
        try {
            setLoading(true);
            const response = await signInWithPopup(firebaseAuth, googleProvider);
            toast.success("Logged in with Google successfully!");
            return response;
        } catch (error) {
            toast.error(error.message || "Google login failed. Please try again.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        try {
            setLoading(true);
            firebaseAuth.signOut()
            toast.success("Logout successfully!");
        } catch (error) {
            toast.error(error.message || "Logout failed. Please try again.");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailAndPassword,
                signinUserWithEmailAndPassword,
                signinWithGoogle,
                logoutUser,
                isLoggedin: !!user,
                user,
                loading,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
