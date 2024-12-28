import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UseFirebase } from "../context/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Spinner, Form, Alert } from "react-bootstrap";

function BookDetails() {
    const params = useParams();
    const firebase = UseFirebase();
    const [bookData, setBookData] = useState(null);
    const [qty, setQty] = useState(1);
    const [orderStatus, setOrderStatus] = useState(null);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const data = await firebase.getBookById(params.bookId);
                setBookData(data);
            } catch (error) {
                console.error("Error fetching book data:", error);
                setBookData(null);
            }
        };
        fetchBookData();
    }, [firebase, params.bookId]);

    if (!bookData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    const placeOrder = async () => {
        try {
            const result = await firebase.placeOrder(params.bookId, qty);
            setOrderStatus({ success: true, message: "Order placed successfully!" });
        } catch (error) {
            console.error("Error placing order:", error);
            setOrderStatus({ success: false, message: "Failed to place order. Please try again." });
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow border-0">
                        <Card.Img
                            variant="top"
                            src={bookData.coverPic}
                            alt={bookData.name}
                            className="img-fluid"
                        />
                        <Card.Body className="p-4">
                            <Card.Title className="text-center fw-bold text-primary mb-3">
                                {bookData.name}
                            </Card.Title>
                            <Card.Text className="text-muted text-center mb-4">
                                <small>
                                    By{" "}
                                    <Link
                                        className="text-decoration-none text-primary"
                                        to={"https://saranzafar.github.io"}
                                        target="_blank"
                                    >
                                        {bookData.displayName}
                                    </Link>
                                </small>
                            </Card.Text>
                            <Card.Text>
                                <strong>Price:</strong> ${bookData.price}
                            </Card.Text>
                            <Card.Text>
                                <strong>ISBN:</strong> {bookData.isbn}
                            </Card.Text>
                            <Card.Text>
                                <strong>Seller Email:</strong> {bookData.userEmail}
                            </Card.Text>
                            <Card.Text>
                                <strong>Posted On:</strong>{" "}
                                {new Date(bookData.date.seconds * 1000).toLocaleDateString()}
                            </Card.Text>

                            <Form.Group className="mb-3" controlId="formBasicQty">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    type="number"
                                    placeholder="Enter Quantity"
                                    min={1}
                                />
                            </Form.Group>

                            {orderStatus && (
                                <Alert
                                    variant={orderStatus.success ? "success" : "danger"}
                                    className="mt-3"
                                >
                                    {orderStatus.message}
                                </Alert>
                            )}

                            <div className="d-flex justify-content-between mt-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    href="https://saranzafar.github.io"
                                    target="_blank"
                                >
                                    Contact Seller
                                </Button>
                                <Button variant="success" size="lg" onClick={placeOrder}>
                                    Buy Now
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default BookDetails;
