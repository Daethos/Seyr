import { RefAttributes, useEffect, useState } from 'react'
import * as chatAPI from '../../utils/chatApi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import userService from "../../utils/userService";
import UserListItem from './UserListItem';

interface Props {
    handleSearch: Function;
    // accessChat: (userId: string) => Promise<void>;
    searchResult: any;
    loading: boolean;
    setSelectedChat: any;
    chats: any;
    setChats: any;
    // loadingChat: boolean;
    // search: string; 
    // setSearch: any;
}

const SideDrawer = ({ handleSearch, searchResult, loading, setChats, chats, setSelectedChat }: Props) => {
    const [search, setSearch] = useState("")
    // const [searchResult, setSearchResult] = useState([])
    // const [selectedChat, setSelectedChat] = useState([])
    // const [loading, setLoading] = useState<boolean>(false)
    const [loadingChat, setLoadingChat] = useState(false)
    // const [chats, setChats] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="button-tooltip" {...props}>
          Create or Find Current Group
        </Tooltip>
      );

    // const handleSearch = async () => {
    //     if (!search) {
    //         return
    //     }
    //     try {
    //         setLoading(true)
    //         const response = await userService.searchUser(search);
    //         console.log(response)

    //         setLoading(false)
    //         setSearchResult(response)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Searching for Users')
    //     }
    // }

    const accessChat = async (userId: string) => {

        try {
            setLoadingChat(true)
            const response = await chatAPI.accessChat(userId)
            console.log(response, 'Response Accessing or Creating Chat')
            if (!chats.find((c: { _id: any; }) => c._id === response._id)) setChats([response.data, ...chats])

            console.log(response, 'Response in Accessing Chat')
            setSelectedChat(response)
            setLoadingChat(false)
            handleClose()
        } catch (err: any) {
            console.log(err.message, 'Error Accessing Chat')
        }
    }

    return (
        <>
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Button variant="" onClick={handleShow} style={{ color: '#fdf6d8' }}>
                Search Users
            </Button>
        </OverlayTrigger>

        <Offcanvas show={show} onHide={handleClose} id="offcanvas">
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className=''><Button variant="" onClick={handleClose} style={{ color: '#fdf6d8' }}>Chat Groups</Button></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ color: '#fdf6d8' }}>
            <input 
                style={{ backgroundColor: 'black', color: '#fdf6d8', border: 1 + 'px' + ' solid ' + 'purple', width: 80 + '%' }} 
                placeholder="Search by Username or Email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => { e.key === "Enter" && handleSearch(search) }}
            />
            <Button variant="" onClick={() => handleSearch(search)} style={{ color: '#fdf6d8' }}>Go</Button>
            {
                loading 
                ? (
                <Loading Combat={true} />
                ) : (
                    searchResult?.map((user: any, index: number) => {
                        // console.log(user, 'User found in Search')
                        return (
                            <UserListItem key={index} user={user} 
                            accessChat={() => accessChat(user._id)} 
                            />
                        )
                    })
            )}
            {
                loadingChat
                ? 
                <Loading Combat={true} />
                :
                ''
            }
        </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default SideDrawer