import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import * as chatLogic from '../../config/chatLogics';
import { groupBy } from 'lodash';

interface Props {
    user: any;
    notification: any;
    setSelectedChat: any;
    setNotification: any;
};

const Notifications = ({ user, notification, setSelectedChat, setNotification }: Props) => {
    const notificationPopover = (
        <Popover className='text-info' id='popover'>
            <Popover.Header id='popover-header' as='h3'>
                Notifications <span id="popover-image"><img src={user.photoUrl} alt={user.username} style={{ width: 25 + 'px', height: 25 + 'px', borderRadius: 50 + '%'}} /></span>
            </Popover.Header> 
            
            <Popover.Body id='popover-body'>
            {notification.length === 0 ? (
                <p style={{ color: 'purple' }}>No New Messages</p>
            ) : (
                <>
                {Object.entries(groupBy(notification, 'chat.id')).map(
                    ([chatId, notes]) => {
                    const chat = notes[0].chat;
                    const count = notes.length;
                    return (
                        <Dropdown.Item
                        key={chatId}
                        style={{ color: 'purple' }}
                        onClick={() => {
                            setSelectedChat(chat);
                            setNotification(notification.filter((n: { chat: { id: any; }; }) => n.chat.id !== chat.id));
                        }}
                        >
                        {`${count} new message${count > 1 ? 's' : ''} from ${
                            chat.isGroupChat ? chat.chatName : chatLogic.getSender(user, chat.users)
                        }`}
                        </Dropdown.Item>
                    );
                    }
                )}
                </>
            )}
            </Popover.Body>

        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={notificationPopover}>
            <Button variant='' style={{ fontSize: 10 + 'px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#fdf6d8' }}  width="24" height="24" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
            <Badge bg='danger' style={{ marginLeft: -5 + 'px' }}>{notification.length}</Badge>
            </Button>
        </OverlayTrigger>
    );
};

export default Notifications;