import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface AuthProps {
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
}

export default function AuthPage({ setUser, handleSignUpOrLogin }: AuthProps) {

  

  const [showSignUp, setShowSignUp]  = useState(false);
  return (
    <Container fluid>
      <Row>
      <h1 className='welcome-text mt-3'>
        Ascea
      </h1>
      <h3 className='welcome-explanation'>
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
      </h3>
      </Row>
    <Row className="auth mt-3 justify-content-center" 
    // xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }
    >
      { 
        showSignUp 
        ?
          <>
            <Button variant="" style={{ color: 'red', fontSize: 25 + 'px', maxWidth: 50 + '%', marginLeft: 0 + '%' }} className="btn-lg mb-5" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button>
            <SignUpForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
          </>
        :
          <>
            <Button variant="" style={{ color: 'red', fontSize: 25 + 'px', maxWidth: 50 + '%', marginLeft: 0 + '%' }} className="btn-lg mb-5" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Need to Log In?' : 'Need to Sign Up?'}</Button>
            <LoginForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
          </>
      }
      
    </Row>

    </Container>
  );
}
