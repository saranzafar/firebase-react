import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { UseFirebase } from "../context/firebase"

function Login() {
    const firebase = UseFirebase();
    console.log("firebase", firebase);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logining user");
        await firebase.signinUserWithEmailAndPassword(email, password)
        console.log("Login success");
    }

    useEffect(() => {
        if (firebase.isLoggedin) {
            navigate("/")
        }
    }, [firebase.isLoggedin, navigate])


    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We&apos;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
            <h1 className='my-3'>Or</h1>
            <Button variant='danger' onClick={firebase.signinWithGoogle}>Signin with google</Button>
        </div>
    )
}

export default Login