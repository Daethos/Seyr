import { useState } from 'react'
import Loading from '../Loading/Loading';
import './Messages.css'

interface Props {
    message: any
    user: any;
    friend: any
}

const MessagesCard = ({ friend, message, user }:Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    if (loading) {
        <Loading />
    }

    return (
        <div>
            { message.username === friend.username ? 
                <div className="section-left">
                    <span className="friend-message my-1">[{message.createdAt.substring(5, 10) + ' ' + message.createdAt.substring(11, 16)}] {message.message}</span>
                </div>
            : 
                <div className="section-right"> 
                    <span className="user-message my-3">[{message.createdAt.substring(5, 10) + ' ' + message.createdAt.substring(11, 16)}] {message.message}</span>
                </div>
            }
            { message.username === user.username ? 
                <span className="user-message my-3">[{message.createdAt.substring(5, 10) + ' ' + message.createdAt.substring(11, 16)}] {message.message}</span>
            : ''
            }
        </div>
    )
}

export default MessagesCard