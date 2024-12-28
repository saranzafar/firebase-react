import { useEffect, useState } from "react";
import { UseFirebase } from "../context/firebase";
import BookCard from "../components/BookCard";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";

function Orders() {
    const firebase = UseFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (firebase.isLoggedin) {
                    const booksData = await firebase.fetchMyBooks(firebase.user.uid);
                    setBooks(booksData.docs);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [firebase]);

    if (!firebase.isLoggedin) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="warning">
                    <h4>Please Login to View Your Orders</h4>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4 text-primary">My Orders</h1>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading your orders...</p>
                </div>
            ) : books.length === 0 ? (
                <Alert variant="info" className="text-center">
                    <h4>No Orders Found</h4>
                    <p>It seems like you haven't placed any orders yet.</p>
                </Alert>
            ) : (
                <Row className="g-4">
                    {books.map((book) => (
                        <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
                            <BookCard
                                id={book.id}
                                {...book.data()}
                                link={`/orders/${book.id}`}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Orders;
