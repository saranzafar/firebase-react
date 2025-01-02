import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BookCard({ id, name, coverPic, displayName, price, isbn, link }) {
    const navigate = useNavigate();

    return (
        <Card className="shadow-sm h-100">
            <Card.Img
                variant="top"
                src={coverPic}
                alt={`${name} cover`}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title className="mb-2">{name}</Card.Title>
                <Card.Text className="mb-3">
                    <span className="d-block text-muted mb-1">
                        Sold by: <strong>{displayName}</strong>
                    </span>
                    <Badge bg="success" className="me-1">
                        Price: ${price}
                    </Badge>
                    <Badge bg="secondary">
                        ISBN: {isbn}
                    </Badge>
                </Card.Text>
                <Button variant="primary" className="w-100" onClick={() => navigate(link)}>
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;
