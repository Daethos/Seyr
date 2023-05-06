import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import userService from '../../utils/userService';
import ToastAlert from '../ToastAlert/ToastAlert';

interface Props {
    user: any;
    setUser: any;
};

const UserModal = ({ user, setUser }: Props) => {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newBio, setNewBio] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingBio, setLoadingBio] = useState(false);
    const [error, setError] = useState<any>({});

    const handleUser = async () => {
        if (!newName) return;
        try {
            setLoading(true)
            const response = await userService.updateUser({
                username: newName,
            });
            console.log(response.data, 'Response Updating User');
            setUser(response.data);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Updating User');
            setError({
                title: 'Updating Username Error',
                content: err.message
            });
        };
     }
     const handleBio = async () => {
        if (!newBio) return;
        try {
            setLoadingBio(true)
            const response = await userService.updateBio({
                bio: newBio,
            })
            console.log(response.data, 'Response Updating User')
            setUser(response.data)
            setLoadingBio(false)
        } catch (err: any) {
            console.log(err.message, 'Error Updating User')
            setError({
                title: 'Updating Bio Error',
                content: err.message
            });
        };
     };

    return (
        <>
        <ToastAlert error={error} setError={setError} />
        <h3 className='mb-4' style={{ color: 'red' }}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h3>           
        <Form.Group className='my-3' >
        <FloatingLabel style={{ color: "black" }} label={user.username} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                placeholder='Group Chat Name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
            />
        </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-2' >
        <FloatingLabel style={{ color: "black" }} label={user.bio} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                placeholder='User Bio'
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
            />
        </FloatingLabel>
        </Form.Group>
        {/* <Form.Group className='my-2' >
        <FloatingLabel style={{ color: "black" }} label={`Email Address`} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                placeholder='Email Address'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
        </FloatingLabel>
        </Form.Group> */}
        <br />
        { loadingBio ? 
            <div className='mb-2' style={{ float: 'left', marginRight: 10 + '%' }}>
                <Loading Modal={true} /> 
            </div>
        : 
            <Button variant='outline-warning' 
            onClick={handleBio}
            className=''
            style={{ 
                float: 'left',
                fontWeight: 550, 
                fontVariant: 'small-caps', 
                color: 'red', 
                fontSize: 15 + 'px',
                border: 2 + 'px' + ' solid ' + 'red' 
            }}>
                Update Bio
            </Button>
        }
        { loading ? 
            <div className='mb-2' style={{ float: 'right', marginRight: 10 + '%' }}>
                <Loading Modal={true} /> 
            </div>
        : 
            <Button variant='outline-warning' 
            onClick={handleUser}
            className=''
            style={{ 
                float: 'right',
                fontWeight: 550, 
                fontVariant: 'small-caps', 
                color: 'red', 
                fontSize: 15 + 'px',
                border: 2 + 'px' + ' solid ' + 'red' 
            }}>
                Update Name
            </Button>
        }
        {/* <Button variant='outline-warning' 
        onClick={() => handleUser}
        className='mt-5'
        style={{ 
            float: 'right',
            fontWeight: 550, 
            fontVariant: 'small-caps', 
            color: 'red', 
            fontSize: 15 + 'px',
            border: 2 + 'px' + ' solid ' + 'red' 
        }}>
            Update {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </Button> */}
        </>
    );
};

export default UserModal;