import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UseFirebase } from "../context/firebase";

function AddListing() {
    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null);
    const firebase = UseFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
        } catch (error) {
            console.log("Error while adding the book: ", error);
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
                <h1>Add Book Listing</h1>
                <Form onSubmit={handleSubmit}>
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
                            placeholder="Enter Book Price"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCoverPic">
                        <Form.Label>Upload Cover Photo</Form.Label>
                        <Form.Control
                            onChange={(e) => setCoverPic(e.target.files[0])}
                            type="file"
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={firebase.loading}>
                        Add Book
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddListing;
