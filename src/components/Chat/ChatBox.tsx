import SingleChat from './SingleChat';

interface Props {
    selectedChat: any;
    user: any;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedChat: any;
    notification: any[];
    setNotification: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatBox = ({ user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain, notification, setNotification }: Props) => {

    return (
        <>
            <SingleChat notification={notification} setNotification={setNotification} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </>  
    )
}

export default ChatBox