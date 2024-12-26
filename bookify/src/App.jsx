import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom"
import { Login, Register } from "./pages/index"


function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App