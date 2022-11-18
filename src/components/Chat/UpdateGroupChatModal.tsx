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
import ToastAlert from '../ToastAlert/ToastAlert';

interface Props {
    fetchAgain: boolean;
    setFetchAgain: any;
    user: any;
    selectedChat: any;
    setSelectedChat: any;
    fetchMessages: any;
}
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, user, selectedChat, setSelectedChat, fetchMessages }: Props) => {
    const [modalShow, setModalShow] = useState(false)
    const [groupChatName, setGroupChatName] = useState('')
    const [selectedUsers, setSelectedUsers] = useState<any>([])
    const [searchResult, setSearchResult] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [renameLoading, setRenameLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>({})

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

    const handleDelete = async (userToDelete: any) => {
        console.log(userToDelete, 'Buh-Bye!')
        setSelectedUsers(
            selectedUsers.filter((sel: any) => sel._id !== userToDelete._id)
        )
    }

    const handleAddUser = async (userToAdd: any) => {
        if (selectedChat.users.find((user: any) => user._id === userToAdd._id)) {
            setError({
                title: 'Group Chat Add Error',
                content: 'They Already Exist In The Group'
            })
            return
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            setError({
                title: 'Group Chat Add Error',
                content: 'You Are Not The Admin!'
            })
            return
        }
        try {
            setLoading(true)

            const response = await chatAPI.addToGroup({
                chatId: selectedChat._id,
                userId: userToAdd._id
            });

            setSelectedChat(response.data)
            setFetchAgain(!fetchAgain)

            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Adding User to Group')
        }
    }

    const handleRemove = async (userToRemove: any) => {

        if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
            setError({
                title: 'Group Chat Remove Error',
                content: 'You are not the Admin!'
            })
            return
        }
        try {
            setLoading(true)

            const response = await chatAPI.removeFromGroup({
                chatId: selectedChat._id,
                userId: userToRemove._id
            });

            userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(response.data)
            // setSelectedChat(response.data)
            setFetchAgain(!fetchAgain)
            fetchMessages();
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Adding User to Group')
        }
    }

    const handleRename = async (newGroupName: any) => {
        console.log(newGroupName, 'Buh-Bye!')
        if (!newGroupName) {
            setError({
                title: 'Group Chat Rename Error',
                content: 'You do not have a Group Name Written!'
            })
            return
        }
        try {
            setRenameLoading(true)

            const response = await chatAPI.renameGroup({
                chatId: selectedChat._id,
                chatName: groupChatName
            })
            console.log(response.data.chatName, 'New Name Response in Handle Rename')
            setFetchAgain(!fetchAgain)
            setSelectedChat(response.data)
            setRenameLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Renaming Group')
        }
        setSelectedUsers(
            selectedUsers.filter((sel: any) => sel._id !== newGroupName._id)
        )
    }
  return (
    <>
    {/* <Form onSubmit={handleSubmit}> */}
                <ToastAlert error={error} setError={setError} />
                    <h3 className='mb-4' style={{ color: 'red' }}>{selectedChat.chatName}</h3>
                    {
                        selectedChat.users.map((user: any, index: number) => {
                            return (
                                <UserBadgeItem key={index} user={user} handleFunction={() => handleRemove(user)} />
                            )
                        })
                    }
                    
                    <Form.Group className='my-3' >
                    <FloatingLabel label={`Group Name`} className="mb-3" controlId='floatingInput'>
                        <Form.Control
                            type='name'
                            name='chatName'
                            placeholder='Group Chat Name'
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <Button onClick={handleRename} variant='outline-warning' className='my-3' style={{ 
                        fontWeight: 550, 
                        fontVariant: 'small-caps', 
                        color: 'purple', 
                        fontSize: 20 + 'px',
                        border: 2 + 'px' + ' solid ' + 'purple' 
                    }}>
                        Update Name
                    </Button>
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
                                    <UserListItem user={user} accessChat={() => handleAddUser(user)} key={index} />
                                )
                            })
                        )
                    }

                    {/* <Button type='submit' variant='outline-warning' size='lg' className='my-3'
                    style={{ 
                        fontWeight: 550, 
                        fontVariant: 'small-caps', 
                        color: 'purple', 
                        fontSize: 20 + 'px',
                        border: 2 + 'px' + ' solid ' + 'purple' 
                    }}>Create Chat</Button> */}
                    <br />
                    <Button variant='outline-warning' 
                    onClick={() => handleRemove(user)}
                    className='mt-5'
                    style={{ 
                        float: 'right',
                        fontWeight: 550, 
                        fontVariant: 'small-caps', 
                        color: 'red', 
                        fontSize: 15 + 'px',
                        border: 2 + 'px' + ' solid ' + 'red' 
                    }}>
                        Leave Group
                    </Button>
                {/* </Form> */}
    </>
  )
}

export default UpdateGroupChatModal