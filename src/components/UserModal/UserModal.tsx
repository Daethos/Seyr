import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import userService from '../../utils/userService';
import ToastAlert from '../ToastAlert/ToastAlert';

interface Props {
    user: any;
};

const UserModal = ({ user }: Props) => {
    const [newName, setNewName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [newBio, setNewBio] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingBio, setLoadingBio] = useState<boolean>(false);
    const [error, setError] = useState<{ title: string; content: string; }>({ title: '', content: '' });

    const handleUser = async () => {
        if (!newName) return;
        try {
            setLoading(true)
            const response = await userService.updateUser({
                username: newName,
            });
            console.log(response.data, 'Response Updating Username');
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
            setLoadingBio(true);
            const response = await userService.updateBio({
                bio: newBio,
            });
            console.log(response.data, 'Response Updating User Bio')
            setLoadingBio(false);
        } catch (err: any) {
            console.log(err.message, 'Error Updating User')
            setError({
                title: 'Updating Bio Error',
                content: err.message
            });
        };
    };

    const handlePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError({
                title: 'Updating Password Error',
                content: 'Passwords do not match'
            });
            return;
        };
        try {
            setLoading(true);
            const response = await userService.updatePassword({
                id: user._id,
                password: newPassword,
                confirmPassword: confirmPassword
            });
            console.log(response.data, 'Response Updating Password')
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Updating Password')
            setError({
                title: 'Updating Password Error',
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
        <Form.Group className='my-2' >
        <FloatingLabel style={{ color: "black" }} label={'Set New Password'} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                placeholder='User Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
        </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-2' >
        <FloatingLabel style={{ color: "black" }} label={'Confirm New Password'} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                placeholder='User Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
        { loadingBio ? (
            <div className='mb-2' style={{ float: 'left', marginRight: '10%' }}>
                <Loading Modal={true} /> 
            </div>
        ) : (
            <Button variant='outline-warning' onClick={handleBio}
                style={{ 
                    float: 'left',
                    fontWeight: 550, 
                    fontVariant: 'small-caps', 
                    color: 'red', 
                    fontSize: '15px',
                    border: '2px solid red' 
            }}>
                Update Bio
            </Button>
        ) }
                { loading ? (
            <div className='mb-2' style={{ float: 'right', marginRight: '10%' }}>
                <Loading Modal={true} /> 
            </div>
        ) : (
            <Button variant='outline-warning' onClick={handlePassword}
                style={{ 
                    fontWeight: 550, 
                    fontVariant: 'small-caps', 
                    color: 'red', 
                    fontSize: '15px',
                    border: '2px solid red' 
            }}>
                Update Password
            </Button>
        ) }
        { loading ? (
            <div className='mb-2' style={{ float: 'right', marginRight: '10%' }}>
                <Loading Modal={true} /> 
            </div>
        ) : (
            <Button variant='outline-warning' onClick={handleUser}
                style={{ 
                    float: 'right',
                    fontWeight: 550, 
                    fontVariant: 'small-caps', 
                    color: 'red', 
                    fontSize: '15px',
                    border: '2px solid red' 
            }}>
                Update Name
            </Button>
        ) }
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