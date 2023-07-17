import React, { useState } from "react";
import "./LoginForm.css";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToastAlert from "../ToastAlert/ToastAlert";

interface LoginProps {
    handleSignUpOrLogin: () => any;
};

export default function LoginPage({ handleSignUpOrLogin }: LoginProps) {
  const [show, setShow] = useState<boolean>(false)
  const [error, setError] = useState<any>({})
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
  };

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    try {
      await userService.login(state);
      handleSignUpOrLogin();
      navigate("/");
    } catch (err: any) {
      setError({
        title: 'Login User Error',
        content: err.message
      });
    };
  };

  const handleReveal = () => setShow(!show);

  return (
    <Col className="stat-block wide" id="signup">
      <Form onSubmit={handleSubmit} className="signup-form">
          <hr className="orange-border" />
          <ToastAlert error={error} setError={setError} />
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
              <FloatingLabel controlId="floatingInput" label={` Email Address`} className="mb-3" >
              <Form.Control type="email" name="email"  placeholder="email" value={state.email} onChange={handleChange} required />
              </FloatingLabel>
              </Form.Group>
              <div className="property-line last">
                  <h3>Password</h3>
              </div> 
              <Form.Group className="my-2" style={{ width: 87.5 + '%' }} controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                  />
              </FloatingLabel>
              </Form.Group>
                <Button variant='' onClick={handleReveal} style={{ float: 'right', marginTop: -16 + '%', marginRight: -2 + '%', color: 'purple' }}>
                  { show ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                    </svg>
                  :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                    </svg>
                  }
                </Button>
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
          <hr className="orange-border bottom" />
      </Form>
    </Col>
  );
};