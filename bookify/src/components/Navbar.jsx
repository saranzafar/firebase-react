import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { UseFirebase } from "../context/firebase";
import toast from "react-hot-toast";

function MinimalNavbar() {
    const firebase = UseFirebase();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await firebase.logoutUser();
            navigate("/login");
        } catch (error) {
            console.log("Error while logout: ", error);
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <div className="container">
                <Navbar.Brand as={Link} to="/">
                    Bookify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {!firebase.isLoggedin && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                        {firebase.isLoggedin && (
                            <>
                                <Nav.Link as={Link} to="/add-listing">
                                    Add Listing
                                </Nav.Link>
                                <Nav.Link as={Link} to="/orders">
                                    Orders
                                </Nav.Link>
                            </>
                        )}

                    </Nav>
                    {firebase.isLoggedin && (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default MinimalNavbar;
