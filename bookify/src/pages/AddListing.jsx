import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { UseFirebase } from "../context/firebase";

function AddListing() {
    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null);
    const [status, setStatus] = useState(null);
    const firebase = UseFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!coverPic) {
            setStatus({ success: false, message: "Please upload a cover photo." });
            return;
        }

        try {
            setStatus(null); // Clear previous status
            await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
            setStatus({ success: true, message: "Book added successfully!" });
        } catch (error) {
            console.error("Error while adding the book:", error);
            setStatus({ success: false, message: "Failed to add book. Please try again." });
        } finally {
            setName("");
            setIsbnNumber("");
            setPrice("");
            setCoverPic(null);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Add Book Listing</h1>

                {status && (
                    <Alert
                        variant={status.success ? "success" : "danger"}
                        className="text-center"
                    >
                        {status.message}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter book name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicIsbnNumber">
                        <Form.Label>Book ISBN Number</Form.Label>
                        <Form.Control
                            value={isbnNumber}
                            onChange={(e) => setIsbnNumber(e.target.value)}
                            type="number"
                            placeholder="Enter book ISBN number"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Book Price</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            placeholder="Enter book price"
                            min="1"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicCoverPic">
                        <Form.Label>Upload Cover Photo</Form.Label>
                        <Form.Control
                            onChange={(e) => setCoverPic(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            required
                        />
                        {coverPic && (
                            <small className="text-muted mt-2 d-block">
                                Selected file: {coverPic.name}
                            </small>
                        )}
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={firebase.loading}>
                            {firebase.loading ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        className="me-2"
                                    />
                                    Adding...
                                </>
                            ) : (
                                "Add Book"
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddListing;
