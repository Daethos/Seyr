import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form'
import { FloatingLabel } from 'react-bootstrap';
import * as chatAPI from '../../utils/chatApi'
import userService from '../../utils/userService'
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';
import ToastAlert from '../../components/ToastAlert/ToastAlert'

interface Props {
    user: any;
    chats: any;
    setChats: any;
}

const GroupChatModal = ({ user, chats, setChats }: Props) => {
    const [modalShow, setModalShow] = useState(false)
    const [groupChatName, setGroupChatName] = useState('')
    const [selectedUsers, setSelectedUsers] = useState<any>([])
    const [searchResult, setSearchResult] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>({})

    const handleSearch = async (query: string) => {
        console.log(query, 'The search is on!')
        if (!query) {
            setError({
                title: 'Search Error',
                content: 'You have not typed anything to search for!'
            })
            return
        }
        try {
            setLoading(true)
            const response = await userService.searchUser(query);
            console.log(response)

            setLoading(false)
            setSearchResult(response)
        } catch (err: any) {
            console.log(err.message, 'Error Searching for Users')
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!groupChatName || selectedUsers.length <= 1 ) {
            setError({
                title: 'Group Chat Creation Error',
                content: 'Either you have not chosen a group name or have too few users to create a group (3)'
            })
            console.log('You do not have enough people or have a group name!')
            return
        }
        try {
            const response = await chatAPI.createGroupChat({
                name: groupChatName,
                users: selectedUsers.map((user: any) => user._id)
            })
            console.log(response.data, 'Response in Creating Group')
            setChats([response.data, ...chats])
            setModalShow(false)
        } catch (err: any) {
            console.log(err.message, 'Error Creating Group')
        }
        
    }

    const handleGroup = async (userToAdd: any) => {
        if (selectedUsers.includes(userToAdd)) {
            setError({
                title: 'Group Chat Add Person Error',
                content: 'You have already selected this person to join your group.'
            })
            return
        }
        setSelectedUsers([...selectedUsers, userToAdd])
    }

    const handleDelete = async (userToDelete: any) => {
        console.log(userToDelete, 'Buh-Bye!')
        setSelectedUsers(
            selectedUsers.filter((sel: any) => sel._id !== userToDelete._id)
        )
    }

    return (
        <span style={{ float: 'right' }}>
            <Button variant='' style={{ color: '#fdf6d8', marginTop: -10 + 'px' }} onClick={() => setModalShow(true)}>
                <h6>New Group {' '}
                    <b style={{ fontSize: 25 + 'px' }}>&#43;</b>
                </h6>
            </Button>    
            <Modal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
                id="modal-weapon"
            >
            <Modal.Body id="modal-weapon">
                <ToastAlert error={error} setError={setError} />
                {
                    error ? ''
                    : ''
                }
                <Form onSubmit={handleSubmit}>
                    <h3 className='mb-4' style={{ color: 'red' }}>Create Group Chat Form</h3>
                    <Form.Group className='my-2' >
                    <FloatingLabel label={`Group Name`} className="mb-3" controlId='floatingInput'>
                        <Form.Control
                            type='name'
                            name='chatName'
                            placeholder='Group Chat Name'
                            onChange={(e) => setGroupChatName(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    </Form.Group>
                    <Form.Group className='my-2' >
                    <FloatingLabel label={`Add Users`} className="mb-3" controlId='floatingInput'>
                        <Form.Control
                            type='name'
                            name='chatName'
                            placeholder='Group Chat Name'
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </FloatingLabel>
                    </Form.Group>
                    {selectedUsers.map((u: any, index: number) => {
                        return (
                            <UserBadgeItem key={index} user={u} handleFunction={() => handleDelete(u)} />
                        )
                    })}
                    
                    {
                        loading
                        ? <Loading Combat={true} />
                        : (
                            searchResult?.slice(0, 4).map((user: any, index: number) => {
                                return (
                                    <UserListItem user={user} accessChat={() => handleGroup(user)} key={index} />
                                )
                            })
                        )
                    }

                    <Button type='submit' variant='outline-warning' size='lg' className='my-3'
                    style={{ 
                        fontWeight: 550, 
                        fontVariant: 'small-caps', 
                        color: 'red', 
                        fontSize: 20 + 'px',
                        border: 2 + 'px' + ' solid ' + 'red' 
                    }}>Create Chat</Button>
                </Form>
            </Modal.Body>
            </Modal>
        </span>
    )
}

export default GroupChatModal