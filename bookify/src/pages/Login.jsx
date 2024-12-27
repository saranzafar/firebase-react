import { useEffect, useState } from "react";
import { UseFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form, Button } from "react-bootstrap";

function Login() {
    const firebase = UseFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await firebase.signinUserWithEmailAndPassword(email, password);
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleGoogleLogin = async () => {
        await firebase.signinWithGoogle();
        navigate("/");
    };

    useEffect(() => {
        if (firebase.isLoggedin) {
            navigate("/");
        }
    }, [firebase.isLoggedin, navigate]);

    return (
        <div className="container mt-5">
            <Toaster />
            <h1>Login</h1>
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
                    <Form.Text className="text-muted">
                        We&apos;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <h2 className="my-3">Or</h2>
            <Button variant="danger" onClick={handleGoogleLogin}>
                Sign in with Google
            </Button>
        </div>
    );
}

export default Login;
