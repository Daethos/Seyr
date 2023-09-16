import { useState } from "react";
import Form from 'react-bootstrap/Form';
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import ToastAlert from "../ToastAlert/ToastAlert";
import { Symbols } from "../SolaAscean/SolaAscean";

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
                    <div className="mt-3" style={{ textAlign: 'center', color: 'gold', fontVariant: 'small-caps' }}>
                        <h1>Signup Form</h1>
                    </div>
                    {Symbols.space}
                    <div className="actions">
                    <div className="property-line first">
                        <h3>Username</h3>
                    </div>
                    <FloatingLabel controlId="floatingPassword" label="Username">
                        <Form.Control type="text" name="username" placeholder="username" value={state.username} onChange={handleChange} required />
                    </FloatingLabel>
                    <div className="property-line last">
                        <h3>Email</h3>
                    </div> 
                    <Form.Group className="my-2" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Email address">
                        <Form.Control type="email" name="email" placeholder="Email Address" value={state.email} onChange={handleChange} required />
                    </FloatingLabel>
                    </Form.Group>
                    <div className="property-line first">
                        <h3>Password</h3>
                    </div>
                    <Form.Group className="my-2" controlId="formBasicPassword" style={{ width: '87.5%' }}>
                    <FloatingLabel controlId="floatingPassword" label="Password" >
                        <Form.Control name="password" type={show ? "text" : "password"} placeholder="password" value={state.password} onChange={handleChange} required />
                    </FloatingLabel>
                    </Form.Group>
                    <Button variant='' onClick={handleReveal} style={{ float: 'right', marginTop: '-16%', marginRight: '-2%', color: 'purple' }}>
                        { show ? ( Symbols.unlocked ) : ( Symbols.locked ) }
                    </Button>
                    <div className="property-line last">
                        <h3>Confirmation</h3>
                    </div>  
                    <Form.Group className="my-2" controlId="formBasicPasswordConfirm" style={{ width: '87.5%' }}>
                    <FloatingLabel controlId="" label="Confirm Password">
                        <Form.Control name="passwordConf" type={showTwo ? "text" : "password"} placeholder="Confirm Password" value={state.passwordConf} onChange={handleChange} required />
                    </FloatingLabel>
                    </Form.Group>
                    <Button variant='' onClick={handleRevealTwo} style={{ float: 'right', marginTop: '-16%', marginRight: '-2%', color: 'purple' }}>
                        { showTwo ? ( Symbols.unlocked ) : ( Symbols.locked ) }
                    </Button>
                    <div className="property-line first">
                        <h3>Profile Bio</h3>
                    </div>
                    <Form.Group className="my-2" controlId="formBasicUser">
                    <FloatingLabel controlId="" label="A Little About Yourself">
                        <Form.Control type="textarea" name="bio" placeholder="Anything you'd like to say?" value={state.bio} onChange={handleChange} />
                    </FloatingLabel>
                    </Form.Group>
                    <div className="property-line last">
                        <h3>Profile Picture</h3>
                    </div> 
                    <Form.Group className="my-2" controlId="formBasicPhoto">
                        <Form.Control type="file" name="photoUrl" placeholder="upload image" onChange={handleFileInput} />
                    </Form.Group>
                    </div> 
                    {Symbols.space}
                    <Button variant='' disabled={disable} type="submit" style={{ color: 'red', fontSize: '25px', width: '100%' }} className="btn btn-lg">
                        {disable ? 'Passwords Do Not Match'  : 'Sign Up'}
                    </Button>
                    </div> 
                <ToastAlert error={error} setError={setError}  />
                <hr className="orange-border bottom" />
            </Form>
        </Col>
    );
};