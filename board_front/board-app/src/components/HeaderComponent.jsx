import React, { Component } from 'react';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <header>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="http://localhost:3000  ">라마의 React-Board</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="http://localhost:3000">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>    
                    {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://localhost:3000" className="navbar-brand"> Board-FullStack-App</a></div>
                    </nav> */}
                </header>
            </div>
        );
    }
}

export default HeaderComponent;