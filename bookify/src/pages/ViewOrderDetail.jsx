import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseFirebase } from "../context/firebase";
import { Table, Button, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";

function ViewOrderDetail() {
    const { bookId } = useParams();
    const firebase = UseFirebase();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderSnapshots = await firebase.getOrders(bookId);
                setOrders(orderSnapshots.docs);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [firebase, bookId]);

    const handleDelete = async (orderId) => {
        try {
            await firebase.deleteOrder(bookId, orderId);
            setOrders(orders.filter((order) => order.id !== orderId));
            toast.success("Order deleted successfully.");
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error("Failed to delete order.");
        }
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "50vh" }}
            >
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Orders</h1>
            {orders?.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => {
                            const orderData = order._document.data.value.mapValue.fields;

                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{orderData.username?.stringValue || "N/A"}</td>
                                    <td>{orderData.userEmail?.stringValue || "N/A"}</td>
                                    <td>{orderData.qty?.integerValue || "N/A"}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(order.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No orders found.</p>
            )}
        </div>
    );
}

export default ViewOrderDetail;
