import { RefAttributes, useState } from 'react';
import * as chatAPI from '../../utils/chatApi';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import UserListItem from './UserListItem';

interface Props {
    handleSearch: Function;
    searchResult: any;
    loading: boolean;
    setSelectedChat: React.Dispatch<React.SetStateAction<never[]>>;
    chats: any;
    setChats: any;
};

const SideDrawer = ({ handleSearch, searchResult, loading, setChats, chats, setSelectedChat }: Props) => {
    const [search, setSearch] = useState("");
    const [loadingChat, setLoadingChat] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="button-tooltip" {...props}>
          Search Users to Chat
        </Tooltip>
      );

    const accessChat = async (userId: string) => {
        try {
            setLoadingChat(true);
            const response = await chatAPI.accessChat(userId);
            if (!chats.find((c: { _id: any; }) => c._id === response._id)) setChats([response.data, ...chats]);
            setSelectedChat(response);
            setLoadingChat(false);
            handleClose();
        } catch (err: any) {
            console.log(err.message, 'Error Accessing Chat');
        };
    };

    return (
        <>
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Button variant="" onClick={handleShow} style={{ color: '#fdf6d8' }}>
                Users {' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search mb-1" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </Button>
        </OverlayTrigger>

        <Offcanvas show={show} onHide={handleClose} id="offcanvas">
        <Offcanvas.Header closeButton closeVariant='white'>
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
            { loading ? (
                <Loading Combat={true} />
            ) : (
                searchResult?.map((user: any, index: number) => {
                    return (
                        <UserListItem key={index} user={user} accessChat={() => accessChat(user._id)} />
                    )
                })
            )}
            { loadingChat ? 
                <Loading Combat={true} />
            : '' }
        </Offcanvas.Body>
        </Offcanvas>
        </>
    );
};

export default SideDrawer;