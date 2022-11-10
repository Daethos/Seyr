import React, { useState } from "react";
import "./LoginForm.css";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

interface LoginProps {
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
}

export default function LoginPage({ handleSignUpOrLogin, setUser }: LoginProps) {
  const [error, setError] = useState<string>("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: { target: { name: any; value: any; }; }) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    try {
      await userService.login(state);
      // Route to wherever you want!
      console.log('Did we log in?')
      handleSignUpOrLogin();
      navigate("/");
    } catch (err: any) {
      console.log('Did we fail log in?')
      // Invalid user data (probably duplicate email)
      // this is from the throw block in the userService.login first then function
      setError(err.message);
    }
  }
  return (
    <Col className="stat-block wide" id="signup">
        <Form onSubmit={handleSubmit} className="signup-form">
            <hr className="orange-border" />
            <div className="section-left">
                <div className="creature-heading">
                    <h1>Login Form</h1>
                </div>
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="actions">
                <div className="property-line first">
                    <h3>Email Address</h3>
                </div>
                <Form.Group className="my-2" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label={` Email Address`}
                  className="mb-3"
                >
                <Form.Control
                    // style={{ marginLeft: -5 + '%', width: 105 + '%' }}
                    type="email"
                    name="email"
                    placeholder="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                </FloatingLabel>
                </Form.Group>
                <div className="property-line last">
                    <h3>Password</h3>
                </div> 
                <Form.Group className="my-2" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                    // style={{ marginLeft: -5 + '%', width: 105 + '%' }}
                    name="password"
                    type="password"
                    placeholder="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                </FloatingLabel>
                </Form.Group>
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                </div>
                <div className="property-line last">
                </div>
                </div>  
                <Button variant='' type="submit" style={{ color: 'red', fontSize: 25 + 'px', width: 100 + '%', marginLeft: 0 + '%' }} className="btn btn-lg">
                    Login
                </Button>
            </div> 
            {/* <img src={BUCKET_START + 'ancient-red-dragon.png'} alt="Vampire" id="" style={{ maxWidth: 50 + '%', maxHeight: 50 + '%'}} /> */}
            <hr className="orange-border bottom" />
        </Form>
        {/* <p className="error-message">&nbsp;{error}</p> */}
    </Col>
  );
}
