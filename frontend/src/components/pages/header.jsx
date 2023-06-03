import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default (props) => {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">Client Frontend</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/clients">Clients</Nav.Link>
                            <Nav.Link href="/newclient">Create Client</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}