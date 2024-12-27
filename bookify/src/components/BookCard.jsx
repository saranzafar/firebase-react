import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function BookCard(props) {
    return (
        <Card className="shadow-sm h-100">
            <Card.Img
                variant="top"
                src={props.coverPic}
                alt={`${props.name} cover`}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title className="mb-2">{props.name}</Card.Title>
                <Card.Text className="mb-3">
                    <span className="d-block text-muted mb-1">
                        Sold by: <strong>{props.displayName}</strong>
                    </span>
                    <Badge bg="success" className="me-1">
                        Price: ${props.price}
                    </Badge>
                    <Badge bg="secondary">
                        ISBN: {props.isbn}
                    </Badge>
                </Card.Text>
                <Button variant="primary" className="w-100">
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;
