import { Toaster } from "react-hot-toast";
import MinimalNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import { Login, Register, AddListing } from "./pages/index"

export default function App() {
  return (
    <>
      <Toaster />
      <MinimalNavbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-listing" element={<AddListing />} />
      </Routes>
    </>
  );
}
