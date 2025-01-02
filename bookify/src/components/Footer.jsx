import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-light py-4 mt-auto">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} <Link to={"https://saranzafar.github.io"} target='_blank'>saranzafar</Link>. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
