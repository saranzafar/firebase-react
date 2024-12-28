import { Toaster } from "react-hot-toast";
import MinimalNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import { Login, Register, AddListing, Home, BookDetails, Orders, ViewOrderDetail } from "./pages/index"

export default function App() {
  return (
    <>
      <Toaster />
      <MinimalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:bookId" element={<ViewOrderDetail />} />
      </Routes>
    </>
  );
}
