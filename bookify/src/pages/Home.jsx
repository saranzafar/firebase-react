import React, { useEffect, useState } from "react";
import { UseFirebase } from "../context/firebase";
import BookCard from "../components/BookCard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

function Home() {
    const firebase = UseFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await firebase.listAllBooks();
                setBooks(booksData.docs);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [firebase]);

    return (
        <Container className="mt-5">
            <h1 className="text-center text-primary mb-4">Available Books</h1>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : books.length > 0 ? (
                <Row className="g-4">
                    {books.map((book) => (
                        <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
                            <BookCard
                                {...book.data()}
                                id={book.id}
                                link={`/book/${book.id}`}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="info" className="text-center">
                    <h4>No Books Available</h4>
                    <p>Check back later for new additions!</p>
                </Alert>
            )}
        </Container>
    );
}

export default Home;
