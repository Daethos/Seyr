import SingleChat from './SingleChat';

interface Props {
    selectedChat: any;
    user: any;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedChat: any;
    notification: any[];
    setNotification: React.Dispatch<React.SetStateAction<any[]>>;
    socketConnected: boolean;
    isTyping: boolean;
    socket: any;
};

const ChatBox = ({ user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain, notification, setNotification, socketConnected, isTyping, socket }: Props) => {

    return (
        <>
            <SingleChat socket={socket} notification={notification} setNotification={setNotification} socketConnected={socketConnected} isTyping={isTyping} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </>  
    );
};

export default ChatBox;