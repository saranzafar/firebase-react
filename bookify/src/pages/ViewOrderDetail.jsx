import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseFirebase } from "../context/firebase";
import { Container, Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import toast from "react-hot-toast";

function ViewOrderDetail() {
    const params = useParams();
    const firebase = UseFirebase();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderDocs = await firebase.getOrders(params.bookId);
                const fetchedOrders = orderDocs.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(fetchedOrders);
            } catch (error) {
                toast.error("Failed to fetch orders. Please try again.");
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [firebase, params.bookId]);

    const handleDelete = async (orderId) => {
        try {
            await firebase.deleteOrder(params.bookId, orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            toast.success("Order deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete the order. Please try again.");
            console.error("Error deleting order:", error);
        }
    };

    if (orders.length === 0) {
        return (
            <Container className="text-center my-5">
                <h3 className="text-primary">No Orders Found</h3>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="text-center text-primary mb-4">Order Details</h1>
            <Row className="justify-content-center">
                <Col lg={10}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead className="table-dark">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer Name</th>
                                        <th>Email</th>
                                        <th>Quantity</th>
                                        <th>Order Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <Badge bg="primary">{order.id}</Badge>
                                            </td>
                                            <td>{order.username || "N/A"}</td>
                                            <td>{order.userEmail || "N/A"}</td>
                                            <td>{order.qty || "N/A"}</td>
                                            <td>
                                                {order.orderDate && order.orderDate.seconds
                                                    ? new Date(order.date.seconds * 1000).toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(order.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ViewOrderDetail;
