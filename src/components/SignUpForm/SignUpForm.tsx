import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function isPasswordMatch(passwordOne, passwordConf) {
  return passwordOne === passwordConf;
}

export default function SignUpPage({ handleSignUpOrLogin, setUser }) {
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
  const BUCKET_START = 'https://collectionbucketman.s3.amazonaws.com/dungeons/';
  // initialized the react router hook, which allows you to programatically
  // change routes, aka after our signup call in the handleSubmit
  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  // async function handleColor(e) {
  //   //setLoading(true);
  //   e.preventDefault();
  //   console.log(e.target.name, '<- New Png?')
  //   const background = BUCKET_START + e.target.name + ".png";
  //   console.log(background, '<- New background selected!')
  //   try {
  //     //await colores(background);
  //     //console.log(backgroundState, '<- And what is the state of the background at the end?')
  //     //setLoading(false);
  //   } catch (err) {
  //     console.log(err.message, ' <- Error handling Color!')
  //     //setLoading(false);
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault(); // this stop the browser from submitting the form!

    if (!isPasswordMatch(state.password, state.passwordConf)) return setError({message: 'Passwords Must Match!', passwordError: true});
    setError({message: '', passwordError: false})
    // Create formData, so we can send over our file, using multipart/formdata header
    // which sends over the basic inputs, and then the file

    const formData = new FormData(); //< - this constructor from the browser allows us to create data
    // now we can set key value pairs on the formData
    formData.append("photo", selectedFile);
    // Line by line tactic
    // formData.append('username', state.username);
    // formData.append('email', state.email);
    // and so on for the rest or our state

    // A more robust way to generate the rest of the formData is using a loop!
    // loop over our state object using a for ... in loop
    for (let key in state) {
      formData.append(key, state[key]);
    }

    console.log(
      formData,
      " <- form Data, you cant see this!",
      "you have to loop over it"
    );
    console.log(
      formData.forEach((item) => console.log(item)),
      " < This lets you see the key values in formData"
    );

    try {
      await userService.signup(formData); // THIS IS WHERE WE ARE MAKING A REQUEST TO THE SERVER, the response is handled inside function .thens, go at the look at the function
      // After the line above,
      // the new token is in localstorage,
      // so now we can update state
      handleSignUpOrLogin(); // <- call the function from the app component
      // that gets the token from localstorage, and sets in our App's state

      // navigate whereever after the user has logged in
      navigate("/"); // this accepts a route you defined in your App.js
    } catch (err) {
      // the error comes from the throw statement in the signup functions
      // .then
      console.log(err);
      setError({message: err.message, passwordError: false});
    }
  }

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }
  const disable = state.password !== state.passwordConf;


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
                    <Form.Group className="my-2 display-6" controlId="formBasicUsername">
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="username"
                            value={state.username}
                            onChange={handleChange}
                            required
                          />
                    </Form.Group>
                </div>
                    <div className="property-line last">
                        <h3>Email</h3>
                        <Form.Group className="my-2 display-6" controlId="formBasicEmail">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={state.email}
                          onChange={handleChange}
                          required
                        />
                        </Form.Group>
                    </div> 
                    <svg height="5" width="100%" className="tapered-rule mt-4">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <div className="property-line first">
                        <h3>Password</h3>
                        <Form.Group className="my-2 display-6" controlId="formBasicPassword">
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
                    
                    <div className="property-line last">
                        <h3>Confirmation</h3>
                        <Form.Group className="my-2 display-6" controlId="formBasicPasswordConfirm">
                          <Form.Control
                            name="passwordConf"
                            type="password"
                            placeholder="Confirm Password"
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                          />
                          </Form.Group>
                    </div>  
                    <svg height="5" width="100%" className="tapered-rule mt-4">
                        <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <div className="property-line first">
                        <h3>Profile Bio</h3>
                        <Form.Group className="my-2 display-6" controlId="formBasicUser">
                        <Form.Control
                          type="textarea"
                          label="bio"
                          name="bio"
                          placeholder="Are you a DM or fledgling Player perhaps?"
                          value={state.bio}
                          onChange={handleChange}
                        />
                        </Form.Group>
                        
                    </div>
                    
                    <div className="property-line last">
                        <h3>Profile Picture</h3>
                        <Form.Group className="my-2 display-6" controlId="formBasicPhoto">
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
                <div className="property-block">
                     <h4>  </h4>
                     <p>  <br /> </p>
                    
                </div> 
                <button type="submit" className="btn btn-lg btn-outline-danger m-1">
                Sign Up
            </button>
            
            </div> 
            <img src={BUCKET_START + 'vampire-vampire.png'} alt="Vampire" id="" style={{ maxWidth: 50 + '%', maxHeight: 50 + '%'}} />
            
            <hr className="orange-border bottom" />
            </Form>
            
            </Col>
  );
}
