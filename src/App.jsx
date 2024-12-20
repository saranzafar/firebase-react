import { useState } from "react";
import { UseFirebase } from "./context/Firebase"

function App() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const firebase = UseFirebase()
    console.log("firebase = ", firebase);

    return (
        <div>
            <h1>Firebase</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="enter your email" />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="enter your password" />

            <button
                onClick={() => {
                    firebase.signupUserWithEmailAndPassword(email, password)
                    firebase.putData("storedataincorrectway/test", { email, password })
                }}>
                Signup
            </button>
        </div>
    )
}

export default App