import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
    const navigate = useNavigate();

    return (
        <Card className="shadow-sm h-100">
            <Card.Img
                variant="top"
                src={props.coverPic}
                alt={`${props.name} cover`}
                style={{
                    height: "200px",
                    objectFit: "cover",
                    borderBottom: "2px solid #f0f0f0",
                }}
            />
            <Card.Body>
                <Card.Title className="text-primary mb-3">{props.name}</Card.Title>
                <Card.Text>
                    <span className="d-block text-muted mb-2">
                        Sold by: <strong>{props.displayName}</strong>
                    </span>
                    <Badge bg="success" className="me-2">
                        ${props.price}
                    </Badge>
                    <Badge bg="secondary">ISBN: {props.isbn}</Badge>
                </Card.Text>
                <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={() => navigate(props.link)}
                >
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;
