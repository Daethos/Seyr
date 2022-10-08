import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { setUser, handleSignUpOrLogin } from '../App/App';

interface AuthProps {
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
}

export default function AuthPage({ setUser, handleSignUpOrLogin }: AuthProps) {

  

  const [showSignUp, setShowSignUp]  = useState(false);
  return (
    <Row className="auth my-5 justify-content-center" 
    xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }
    // xs={ 1 | 'auto' } sm={ 1 | 'auto' } md={ 2 | 'auto' } lg={ 2 | 'auto' } xl={ 2 | 'auto' } xxl={ 3 | 'auto' }
    >
      {/* <Button variant="danger" className="btn-lg text-white" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button> */}
      { showSignUp ?
        <>
          {/* <svg height="5" width="100%" className="tapered-rule">
                <polyline vector-effect="non-scaling-stroke" points="0,0 400,2.5 0,5"></polyline>
            </svg>
        <h1 className="display-1" style={{color: '#922610'}}>Signup Page</h1>
        <svg height="5" width="100%" className="tapered-rule my-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg> */}
            <Row>
        <Button variant="danger" className="btn-lg text-white" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button>
        </Row>
        <SignUpForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
        </>
        :
        <>
        
        <Button variant="danger" className="btn-lg text-white" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button>
        
        <LoginForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
        </>
      }
      
    </Row>
  );
}
