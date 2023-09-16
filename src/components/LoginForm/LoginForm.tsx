import { useState } from "react";
import "./LoginForm.css";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToastAlert from "../ToastAlert/ToastAlert";
import { Symbols } from "../SolaAscean/SolaAscean";

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

    function handleChange(e: { target: { name: any; value: any; }; }): void {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e: { preventDefault: () => void; }): Promise<void> {
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
                <div className='mt-3' style={{ textAlign: 'center', color: 'gold', fontVariant: 'small-caps' }}>
                    <h1>Login Form</h1>
                </div>
                {Symbols.space}
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
                <Form.Group className="my-2" style={{ width: '87.5%' }} controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="password"
                    value={state.password}
                    onChange={handleChange}
                    required />
                </FloatingLabel>
                </Form.Group>
                    <Button variant='' onClick={handleReveal} style={{ float: 'right', marginTop: '-16%', marginRight: '-2%', color: 'purple' }}>
                        { show ? ( Symbols.unlocked ) : ( Symbols.locked ) }
                    </Button>
                <div className="property-line first">
                </div>
                <div className="property-line last">
                </div>
                </div>  
                {Symbols.space}
                <Button variant='' type="submit" style={{ color: 'red', fontSize: '25px', width: '100%' }} className="btn btn-lg">
                    Login
                </Button>
            </div> 
            <hr className="orange-border bottom" />
        </Form>
        </Col>
    );
};