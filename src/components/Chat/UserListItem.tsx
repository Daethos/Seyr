import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface Props {
    user: any;
    accessChat: any;
}

const UserListItem = ({ user, accessChat }: Props) => {

  return (
    <div className='friend-block my-3'>
            <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'purple', fontVariant: 'small-caps', marginTop: -3.5 + 'px' }}>
        <Link to={`/${user.username}`}>
            <img 
                    src={user.photoUrl} 
                    alt={user.username} 
                    style={{ 
                        textDecoration: 'none', 
                        // marginLeft: 30 + 'px',
                        // marginRight: 10 + 'px'
                        
                    }} 
                    className="friend-pic"
                    />
        </Link>
                {/* <Form 
                    onSubmit={() => accessChat}
                > */}

                <span id='user-card'>
                <Button 
                    onClick={accessChat}
                    // value={user._id}
                    // type='submit'
                    variant="" size="lg" 
                    style={{ fontWeight: 500, fontSize: 25 + 'px', color: '#fdf6d8', fontVariant: 'small-caps' }}
                    >
                    <u>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</u>
                        <p style={{ 
                            // marginLeft: 25 + '%', 
                            fontSize: 14 + 'px' 
                            }}>{user.email}</p>
                </Button>
                </span>

                    {/* </Form> */}
            </h3>
    </div>
  )
}

export default UserListItem