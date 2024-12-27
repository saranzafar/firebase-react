import React, { useEffect, useState } from 'react';
import { UseFirebase } from "../context/firebase";
import BookCard from '../components/BookCard';
import { Row, Col, Spinner } from 'react-bootstrap';

function Home() {
    const firebase = UseFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.listAllBooks().then((books) => {
            setBooks(books.docs);
            setLoading(false);
        });
    }, [firebase]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Available Books</h1>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : books?.length > 0 ? (
                <Row className="g-3">
                    {books.map((book) => (
                        <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
                            <BookCard {...book.data()} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">No books found.</p>
            )}
        </div>
    );
}

export default Home;
