import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import ToastAlert from "../ToastAlert/ToastAlert";


function isPasswordMatch(passwordOne: string, passwordConf: string) {
  return passwordOne === passwordConf;
};

interface SignUpProps {
    handleSignUpOrLogin: () => any;
};

export default function SignUpPage({ handleSignUpOrLogin }: SignUpProps) {
  const [show, setShow] = useState<boolean>(false)
  const [showTwo, setShowTwo] = useState<boolean>(false)
  const [error, setError] = useState({
    title: '',
    content: '',
    passwordError: false
  });

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
    color: ""
  });

  const [selectedFile, setSelectedFile] = useState("");
  const navigate = useNavigate();

  function handleChange(e: { target: { name: string; value: string; }; }) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };


  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault(); // this stop the browser from submitting the form!

    if (!isPasswordMatch(state.password, state.passwordConf)) return setError({title: 'Signup User Error', content: 'The Password and its Confirmation Do Not Match in either Case or Type', passwordError: true});
    setError({title: '', content: '', passwordError: false});

    const formData = new FormData();
    formData.append("photo", selectedFile);
    for (let key in state) {
      formData.append(key, (state as any)[key]);
    };

    try {
      await userService.signup(formData); 
      handleSignUpOrLogin(); 
      navigate("/Ascean");
    } catch (err: any) {
      console.log(err);
      setError({ title: 'Signup User Error', content: err.message, passwordError: false});
    };
  };

  function handleFileInput(e: any) {
    setSelectedFile(e.target.files[0]);
  };
  const disable = state.password !== state.passwordConf;
  const handleReveal = () => setShow(!show);
  const handleRevealTwo = () => setShowTwo(!showTwo);

  return (
    <Col className="stat-block wide" id="signup">
        <Form onSubmit={handleSubmit} className="signup-form">
            <hr className="orange-border" />
            <div className="section-left">
                <div className="creature-heading">
                    <h1>Signup Form</h1>
                </div>
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="actions">
                <div className="property-line first">
                    <h3>Username</h3>
                  </div>
                <FloatingLabel controlId="floatingPassword" label="Username" className=''>
                    <Form.Control 
                    type="text"
                    name="username"
                    placeholder="username"
                    value={state.username}
                    onChange={handleChange}
                    required
                    />
                </FloatingLabel>
                <div className="property-line last">
                    <h3>Email</h3>
                </div> 
                <Form.Group className="my-2" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className=""
                >
                <Form.Control 
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                </FloatingLabel>
                </Form.Group>
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                    <h3>Password</h3>
                </div>
                <Form.Group className="my-2" controlId="formBasicPassword" style={{ width: 87.5 + '%' }}>
                <FloatingLabel controlId="floatingPassword" label="Password" >
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
                <div className="property-line last">
                    <h3>Confirmation</h3>
                </div>  
                <Form.Group className="my-2" controlId="formBasicPasswordConfirm" style={{ width: 87.5 + '%' }}>
                <FloatingLabel controlId="" label="Confirm Password">
                    <Form.Control 
                    name="passwordConf"
                    type={showTwo ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={state.passwordConf}
                    onChange={handleChange}
                    required
                    />
                </FloatingLabel>
                </Form.Group>
                <Button variant='' onClick={handleRevealTwo} style={{ float: 'right', marginTop: -16 + '%', marginRight: -2 + '%', color: 'purple' }}>
                      {
                        showTwo ?
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
                    <h3>Profile Bio</h3>
                </div>
                <Form.Group className="my-2" controlId="formBasicUser">
                <FloatingLabel controlId="" label="A Little About Yourself">
                <Form.Control 
                    type="textarea"
                    name="bio"
                    placeholder="Anything you'd like to say?"
                    value={state.bio}
                    onChange={handleChange}
                />
                </FloatingLabel>
                </Form.Group>
                <div className="property-line last">
                    <h3>Profile Picture</h3>
                </div> 
                <Form.Group className="my-2" controlId="formBasicPhoto">
                    <Form.Control 
                    type="file"
                    name="photoUrl"
                    placeholder="upload image"
                    onChange={handleFileInput}
                    />
                </Form.Group>
                </div> 
                <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <Button variant='' disabled={disable} type="submit" style={{ color: 'red', fontSize: 25 + 'px', width: 100 + '%', marginLeft: 0 + '%' }} className="btn btn-lg">
                    {disable ? 'Passwords Do Not Match'  : 'Sign Up'}
                </Button>
                </div> 
            <ToastAlert error={error} setError={setError}  />
            <hr className="orange-border bottom" />
        </Form>
    </Col>
  );
};