import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form'
import { FloatingLabel } from 'react-bootstrap';
import * as chatAPI from '../../utils/chatApi'
import userService from '../../utils/userService'
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';

interface Props {
    user: any;
    chats: any;
    setChats: any;
}

const GroupChatModal = ({ user, chats, setChats }: Props) => {
    const [modalShow, setModalShow] = useState(false)
    const [groupChatName, setGroupChatName] = useState('')
    const [selectedUsers, setSelectedUsers] = useState<any>([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    // Need TO use Toast Here for issues and errors

    const handleSearch = async (query: string) => {
        console.log(query, 'The search is on!')
        if (!query) {
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
            //TODO:FIXME: TOAST!
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

    // if (loading) {
    //     return (
    //         <Loading Combat={true} />
    //     )
    // }
    return (
        <span style={{ float: 'right' }}>
            <Button variant='' style={{ color: '#fdf6d8', marginTop: -10 + 'px' }} onClick={() => setModalShow(true)}>
                {/* //TODO:FIXME: Make the Modal for Create Group! //TODO:FIXME: */}
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

                    <Button type='submit' variant='warning' size='lg' className='my-3'
                    style={{ 
                        fontWeight: 550, 
                        fontVariant: 'small-caps', 
                        color: 'purple', 
                        fontSize: 20 + 'px',
                        border: 2 + 'px' + ' solid ' + 'purple' 
                    }}>Create Chat</Button>
                </Form>
            </Modal.Body>
            </Modal>
        </span>
    )
}

export default GroupChatModal