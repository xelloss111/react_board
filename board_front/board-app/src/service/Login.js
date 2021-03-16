import React, { Component } from "react";
import { Button, Modal, handleClose } from 'react-bootstrap';

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  loginHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };  

  loginClickHandler = () => {
    const { email, password } = this.state;
    fetch("http://localhost:3030/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }; 

  render() {
    const { isOpen, close } = this.props;   

    return (
        <div>
            <Modal show={isOpen}>
                <Modal.Header closeButton onClick={close}>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group has-feedback required">
                    <label htmlFor="login-email" className="col-sm-5">이메일</label>
                    <div className="col-sm-7">
                        <span className="form-control-feedback" aria-hidden="true"></span>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Example@exam.com"
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group has-feedback required">
                    <label htmlFor="login-password" className="col-sm-5">비밀번호</label>
                    <div className="col-sm-7">
                        <span className="form-control-feedback" aria-hidden="true"></span>
                        <div className="login-password-wrapper">
                            <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="*****"
                            required
                            onChange={this.onChange}
                            />
                        </div>
                    </div>  
                </div>            
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

         </div>
     );
  }
}
export default Login;