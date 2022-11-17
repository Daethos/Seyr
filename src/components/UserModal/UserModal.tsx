import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form'
import { FloatingLabel } from 'react-bootstrap';
import userService from '../../utils/userService'

interface Props {
    user: any;
    setUser: any;
}

const UserModal = ({ user, setUser }: Props) => {
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleUser = async () => {
        if (!newName && !newEmail) return


        try {
            setLoading(true)

            const response = await userService.updateUser({
                username: newName,
                // email: newEmail 
            })
            console.log(response.data, 'Response Updating User')
            setUser(response.data)
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Updating User')
        }
     }

    //  if (loading) {
    //     return (
    //         <Loading Combat={true} />
    //     )
    //  }
    return (
        <>
        <h3 className='mb-4' style={{ color: 'red' }}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h3>           
        <Form.Group className='my-3' >
        <FloatingLabel label={`User Name`} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                // name='chatName'
                placeholder='Group Chat Name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
            />
        </FloatingLabel>
        </Form.Group>
        {/* <Form.Group className='my-2' >
        <FloatingLabel label={`Email Address`} className="mb-3" controlId='floatingInput'>
            <Form.Control
                type='name'
                // name='chatName'
                placeholder='Email Address'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
        </FloatingLabel>
        </Form.Group> */}
        <br />

        {
            loading 
            ? 
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
                Update {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
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
    )
}

export default UserModal