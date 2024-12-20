import { getAuth } from "firebase/auth"
import { app } from "./firebase"
import { useEffect, useState } from "react"
import SignUp from "./pages/Signup"


function App() {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)


    // useEffect(()=>{},[])

    return (

        <div>
            <h1>Firebase</h1>
            <SignUp />
        </div>
    )
}

export default App