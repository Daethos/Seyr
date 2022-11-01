import React, { useState } from "react";
import './SignUpForm.css'
import Form from 'react-bootstrap/Form';
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function isPasswordMatch(passwordOne: string, passwordConf: string) {
  return passwordOne === passwordConf;
}

interface SignUpProps {
    handleSignUpOrLogin: () => any;
    setUser: React.Dispatch<any>;
}

export default function SignUpPage({ handleSignUpOrLogin, setUser }: SignUpProps) {
  const [error, setError] = useState({
    message: '',
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
  }


  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault(); // this stop the browser from submitting the form!

    if (!isPasswordMatch(state.password, state.passwordConf)) return setError({message: 'Passwords Must Match!', passwordError: true});
    setError({message: '', passwordError: false})

    const formData = new FormData();
    formData.append("photo", selectedFile);
    for (let key in state) {
      formData.append(key, (state as any)[key]);
    }
    console.log(
      formData.forEach((item) => console.log(item)),
      " < This lets you see the key values in formData"
    );

    try {
      await userService.signup(formData); 
      handleSignUpOrLogin(); 
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setError({message: err.message, passwordError: false});
    }
  }

  function handleFileInput(e: any) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }
  const disable = state.password !== state.passwordConf;

    return (
    <Col className="stat-block wide" id="signup" >
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
                <Form.Group className="my-2" controlId="formBasicUsername">
                <FloatingLabel controlId="floatingPassword" label="Username">
                    <Form.Control
                    type="text"
                    name="username"
                    placeholder="username"
                    value={state.username}
                    onChange={handleChange}
                    required
                    />
                </FloatingLabel>
                </Form.Group>
                </div>
                <div className="property-line last">
                    <h3>Email</h3>
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
                </div> 
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                    <h3>Password</h3>
                <Form.Group className="my-2" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                  name="password"
                  type="password"
                  placeholder="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                  />
                </FloatingLabel>
                </Form.Group>
                </div>
                <div className="property-line last">
                    <h3>Confirmation</h3>
                <Form.Group className="my-2" controlId="formBasicPasswordConfirm">
                <FloatingLabel controlId="" label="Confirm Password">
                    <Form.Control
                    name="passwordConf"
                    type="password"
                    placeholder="Confirm Password"
                    value={state.passwordConf}
                    onChange={handleChange}
                    required
                    />
                </FloatingLabel>
                </Form.Group>
                </div>  
                <svg height="5" width="100%" className="tapered-rule mt-4">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                    <h3>Profile Bio</h3>
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
                </div>
                <div className="property-line last">
                    <h3>Profile Picture</h3>
                <Form.Group className="my-2" controlId="formBasicPhoto">
                    <Form.Control
                    type="file"
                    name="photoUrl"
                    placeholder="upload image"
                    onChange={handleFileInput}
                    />
                </Form.Group>
                </div> 
                </div> 
                <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <button type="submit" className="btn btn-lg btn-outline-danger m-1">
                    Sign Up
                </button>
                </div> 
                {/* <img src={BUCKET_START + 'vampire-vampire.png'} alt="Vampire" id="" style={{ maxWidth: 50 + '%', maxHeight: 50 + '%'}} /> */}
            <hr className="orange-border bottom" />
        </Form>
    </Col>
    );
}
