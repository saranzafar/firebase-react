import React from 'react'
import { getDatabase, ref, set } from "firebase/database"
import { app } from "./firebase"

function App() {
  const db = getDatabase(app)

  const putData = () => {
    set(ref(db, 'users/saran'), {
      id: 1,
      name: 'Saran Zafar',
      age: 21,
      occupation: 'Software Engineer'
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: "center" }}>
      <div>Firebase</div>
      <button onClick={putData}>Put Data</button>
    </div>
  )
}

export default App