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
import {
    getFirestore,
    collection,
    addDoc,
    Timestamp,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    deleteDoc,
} from "firebase/firestore";

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
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react-firebase");
        formData.append("folder", "react-firebase");

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

    const listAllBooks = async () => {
        try {
            return getDocs(collection(fireStore, "books"))
        } catch (error) {
            toast.error(error.message || "Failed to fetch Books. Please try again.");
            throw error;
        }
    }

    const getBookById = async (id) => {
        const docRef = doc(fireStore, "books", id);
        try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                return {
                    id: docSnapshot.id, // Add the document ID
                    ...docSnapshot.data(), // Spread the document's data
                };
            } else {
                throw new Error("Book not found!"); // Handle case where document doesn't exist
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch the book. Please try again.");
            throw error;
        }
    };

    const placeOrder = async (id, qty) => {

        try {
            if (!user || !user.uid) {
                console.error("User  is not authenticated");
                throw new Error("Please Login to Place the Order");
            }

            const collectionRef = collection(fireStore, "books", id, "orders")
            const result = await addDoc(collectionRef, {
                usernID: user.uid,
                username: user.displayName,
                userEmail: user.email,
                photoURL: user.photoURL,
                qty: Number(qty),
            });
            toast.success("Order Placed");
            return result;

        } catch (error) {
            toast.error(error.message || "Failed to Place Order. Please try again.");
            throw error;
        }
    }

    const fetchMyBooks = async (userId) => {
        if (!user || !user.uid) {
            throw new Error("User is Not Authenticated!");
        }

        try {
            const collectionRef = collection(fireStore, "books");
            const q = query(collectionRef, where("userID", "==", user.uid));
            const result = await getDocs(q);
            return result;
        } catch (error) {
            console.error("Error fetching orders: ", error);
            toast.error(error.message || "Error fetching orders. Please try again.");
            return null;
        }

    }

    const getOrders = async (bookId) => {
        try {
            const collectionRef = collection(fireStore, "books", bookId, "orders");
            const result = await getDocs(collectionRef);
            return result;
        } catch (error) {
            console.error("Error fetching orders: ", error);
            return null;
        }

    }

    const deleteOrder = async (bookId, orderId) => {
        try {
            const orderRef = doc(fireStore, "books", bookId, "orders", orderId);
            await deleteDoc(orderRef);
            toast.success(`Order with ID ${orderId} deleted successfully!`);
        } catch (error) {
            toast.error("Failed to delete the order. Please try again.");
            console.error("Error deleting the order:", error);
            throw error;
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
                listAllBooks,
                getBookById,
                placeOrder,
                fetchMyBooks,
                getOrders,
                deleteOrder,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
