import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import * as chatAPI from '../../utils/chatApi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';

interface Props {
    selectedChat: any;
    user: any;
}

const ChatBox = ({ user, selectedChat }: Props) => {
    

    
    return (
        <div className='Chat-Window'>
        <div className='Chat-Header my-2'>Live Chat</div>
        <div className="Class-Body">
        <ScrollToBottom className="message-container">

        </ScrollToBottom> 
        </div>
    </div>
    )
}

export default ChatBox