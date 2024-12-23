import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "./firebase"
import { useEffect, useState } from "react"
import SignUp from "./pages/Signup"
import Signin from "./pages/Signin"


function App() {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("You are signed in: ", user);
                setUser(user)
            }
            else {
                console.log("You are signed out");
                setUser(null)
            }
        })
    }, [auth])

    if (user) {
        return (
            <div>
                <h1>Welcome {user.email}</h1>
                <button onClick={() => auth.signOut()}>Sign Out</button>
            </div>
        )
    }

    return (
        <div>
            {/* <SignUp /> */}
            <Signin />
        </div>
    )
}

export default App