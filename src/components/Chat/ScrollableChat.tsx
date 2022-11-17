import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from 'react-bootstrap/Button'
import * as chatLogic from '../../config/chatLogics'
import Spinner from 'react-bootstrap/Spinner'

interface Props {
    user: any;
    messages: any;
    isTyping: boolean;
}
const ScrollableChat = ({ user, messages, isTyping }: Props) => {
    return (
        <div className="Class-Body" id="Chat-Body">
        <ScrollToBottom className="message-container">
        { messages ?
            messages.map((message: any, index: number) => {
                return (
                    // <div className="message" key={index} id={user._id === message.sender._id ? "you" : "other"}>
                    // <div>
                    // <div className='message-content'>
                    //     <p>{message.content}</p>
                    // </div>
                    //     <img src={message.sender.photoUrl} alt={message.sender.username} style={{
                    //         width: 20 + 'px',
                    //         height: 20 + 'px',
                    //         borderRadius: 50 + '%',
                    //         float: 'right',
                    //     }} />
                    // <div className="message-meta">
                    //     <p>{message.sender.username.charAt(0).toUpperCase() + message.sender.username.slice(1)} [{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}]</p>
                    // </div>
                    // </div>
                    // </div>
                    <div className="message" id={user._id === message.sender._id ? "you" : "other"}>
                        <div>
                        <div className='message-content'>
                        <p>{message.content}</p>
                        </div>
                        {(chatLogic.isSameSender(messages, message, index, user._id)
                            || chatLogic.isLastMessage(messages, index, user._id)
                            ? (
                                <img src={message.sender.photoUrl} alt={message.sender.username} style={{
                                    width: 20 + 'px',
                                    height: 20 + 'px',
                                    borderRadius: 50 + '%',
                                    float: 'right',
                                }} />
                            ) : (
                                ''
                            )
                            )}
                        <div className="message-meta">
                        <p>
                        {(chatLogic.isSameSender(messages, message, index, user._id)
                            || chatLogic.isLastMessage(messages, index, user._id)
                            ?
                            <>{message.sender.username.charAt(0).toUpperCase() + message.sender.username.slice(1)}{' '}</>
                            : ''
                        )}
                            [{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}]
                            </p>
                        </div>
                        </div>
                    </div>
                )
            })
            : <p>'No Messages'</p>
        }
            { isTyping ? <div style={{ float: 'left', marginLeft: 3 + '%' }} className='mb-1'>
                
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
                </div> : '' }
        </ScrollToBottom> 
        </div>
    )
}

export default ScrollableChat