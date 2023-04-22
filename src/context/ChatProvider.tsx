import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext<{} | null>(null);

interface Props {
    children: any;
};

const ChatProvider = ({ children }: Props) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
        setUser(userInfo);

        if (!userInfo) {
            navigate('/');
        };
    }, [navigate])
    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    useContext(ChatContext);
};

export default ChatProvider;