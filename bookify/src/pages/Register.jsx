import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { UseFirebase } from "../context/firebase";

// Enhanced Register Component
function Register() {
    const firebase = UseFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await firebase.signupUserWithEmailAndPassword(email, password);
            toast.success("Account created successfully! Welcome!");
            console.log("Signup success ", response);
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error(error.message || "Signup failed. Please try again.");
        }
    };

    useEffect(() => {
        if (firebase.isLoggedin) {
            navigate("/");
        }
    }, [firebase.isLoggedin, navigate]);

    return (
        <div className="container mt-5">
            <Toaster />
            <h1>Create an Account</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter email"
                        required
                    />
                    <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        minLength="6"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    );
}

export default Register;