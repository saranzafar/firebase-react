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
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

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
const fireStore = getFirestore(firebaseApp);

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

    const uploadToCloudinary = async (file) => {
        console.log("File: ", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react-firebase");
        formData.append("folder", "react-firebase");
        console.log("Form data: ", formData);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dcuepeix8/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            if (data.secure_url) {
                return data.secure_url;
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }
        } catch (error) {
            console.error("Cloudinary Upload Error: ", error);
            throw error;
        }
    };

    const handleCreateNewListing = async (name, isbn, price, coverPic) => {
        try {
            setLoading(true);
            let imageUrl = null;

            if (coverPic) {
                imageUrl = await uploadToCloudinary(coverPic);
            }

            const response = await addDoc(collection(fireStore, "books"), {
                name: name,
                isbn: isbn,
                price: price,
                coverPic: imageUrl,
                userID: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                date: Timestamp.now(),
            });
            toast.success("Book added successfully!");
            return response;
        } catch (error) {
            toast.error(error.message || "Adding Book failed. Please try again.");
            throw error;
        } finally {
            setLoading(false);
        }
    };


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
                handleCreateNewListing,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
