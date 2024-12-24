import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<p>About</p>} />
    </Routes>
  )
}

export default App