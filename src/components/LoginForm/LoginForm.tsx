import React, { useState } from "react";
import "./LoginForm.css";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const BUCKET_START = 'https://collectionbucketman.s3.amazonaws.com/dungeons/';
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
      handleSignUpOrLogin();
      navigate("/");
    } catch (err: any) {
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
                <Form.Group className="my-2" controlId="formBasicEmail">
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                </Form.Group>
                </div>
                <div className="property-line last">
                    <h3>Password</h3>
                <Form.Group className="my-2" controlId="formBasicPassword">
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                </Form.Group>
                </div> 
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                </div>
                <div className="property-line last">
                </div>
                </div>  
                <button type="submit" className="btn btn-lg btn-outline-danger m-1">
                    Login
                </button>
            </div> 
            {/* <img src={BUCKET_START + 'ancient-red-dragon.png'} alt="Vampire" id="" style={{ maxWidth: 50 + '%', maxHeight: 50 + '%'}} /> */}
            <p className="error-message">&nbsp;{error}</p>
            <hr className="orange-border bottom" />
        </Form>
        {/* <p className="error-message">&nbsp;{error}</p> */}
    </Col>
  );
}
