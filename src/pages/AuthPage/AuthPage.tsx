import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import userService from '../../utils/userService';
import { useNavigate } from "react-router-dom";
import ToastAlert from '../../components/ToastAlert/ToastAlert';

interface AuthProps {
    handleSignUpOrLogin: () => void;
    handleGuest: () => void;
};

export default function AuthPage({ handleSignUpOrLogin, handleGuest }: AuthProps) {
    const [showSignUp, setShowSignUp]  = useState(false);
    const [error, setError] = useState<any>({})
    const navigate = useNavigate();

    async function tryDemo(e: any): Promise<void> {
        e.preventDefault();
        try {
            await userService.demo();
            handleSignUpOrLogin();
            navigate("/");
        } catch (err: any) {
            setError({
                title: 'Demo Login Error',
                content: err.message
            });
        };
    };

    return (
        <Container fluid>
        <Row>
        <h2 className='welcome-text'>
            Ascea
        </h2>
        <h6 className='welcome-explanation'>
            Welcome one and all to the greatest spectacle this world has seen, a coliseum holding tests of triumph between the steeliest souls across
            the land, arriving in the beautiful fields of Licivitas to have a hand at capturing glory and renown, with the winner achieving the title
            known as the <br /><br /> 
            <div className='ascean'>
            'Ascean va'Esai.'
            </div>
            <br />
            <div className="game">
            Test your will against others in turn-based, rpg combat utilizing a series of weapons and skills to prove you are
            </div>
            <br />
            <div className="aenservaesai">
            'worthy of the preservation of being.'
            </div>
        </h6>
        </Row>
        <Row className="auth mt-3 justify-content-center">
        <ToastAlert error={error} setError={setError} />
            <Form className="auth-form" onSubmit={tryDemo}>
            <p style={{ width: '100%', textAlign: 'center' }}>
                <Button variant='' style={{ color: '#fdf6d8', fontSize: '25px' }} onClick={tryDemo} className='btn-lg mt-3'>Try the Demo</Button>
            </p>
            </Form>
        {/* <Button variant='' style={{ color: 'gold', fontSize: 25 + 'px' }} onClick={trialVersion} className='btn-lg'>Trial [Demo]</Button> */}
        { showSignUp ? (
            <>
            <Button variant="" style={{ color: 'red', fontSize: '25px', maxWidth: '50%', marginLeft: '0%' }} className="btn-lg mb-5" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button>
            <SignUpForm handleSignUpOrLogin={handleSignUpOrLogin} />
            </>
        ) : (
            <>
            <Button variant="" style={{ color: 'red', fontSize: '25px', maxWidth: '50%', marginLeft: '0%' }} className="btn-lg mb-5" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button>
            <LoginForm handleSignUpOrLogin={handleSignUpOrLogin} />
            </>
        ) }
        </Row>
        </Container>
    );
};
