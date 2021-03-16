import React, { Component } from 'react';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Login from '../service/Login'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen : false
        }
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
      };
    
      closeModal = () => {
        this.setState({ isModalOpen: false });
      };

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
                        <Button variant="outline-light" onClick={this.openModal}> 로그인</Button>
                        <Login isOpen={this.state.isModalOpen} close={this.closeModal} />
                    </Navbar>    
                </header>
            </div>
        );
    }
}

export default HeaderComponent;