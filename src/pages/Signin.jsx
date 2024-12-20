import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const auth = getAuth(app);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log("REsponse", response);
                alert("User Signin successfully");
            }).catch((error) => {
                console.log("Error", error);
                alert("Error occurred");
            }).finally(() => {
                setEmail('')
                setPassword('')
                setIsSubmitting(false)
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;