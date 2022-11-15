import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css'

interface Props {
    user: any;
    room: any;
    ascean: any;
    socket: any;
}

const GameChat = ({ user, ascean, room, socket }: Props) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState<any>([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: user.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data]);
        })
    }, [socket])

    return (
    <div className='Chat-Window'>
        <div className='Chat-Header my-2'>Live Chat</div>
        <div className='Chat-Body'>
        <ScrollToBottom className="message-container">
           {
            messageList.map((message: any, index: number) => {
                // console.log(messageList)
                return (
                    <div className="message" key={index} id={user.username === message.author ? "you" : "other"}>
                        <div>
                        <div className='message-content'>
                            <p>{message.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id=''>{message.author.charAt(0).toUpperCase() + message.author.slice(1)} [{message.time}]</p>
                        </div>
                        </div>

                    </div>
                )
            })
           }
        </ScrollToBottom>
        </div>
        <div>
            <p className='text-white my-1'>Room: {room}</p>
        </div>
        <div className="chat-footer">
            <Form.Control as="textarea" style={{ maxHeight: 75 + 'px' }} type="text" placeholder='Warning, no profanity filter...' value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }}
            onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
            />
            <Button variant="outline-info" onClick={sendMessage}>Submit</Button>
        </div>
    </div>
  )
}

export default GameChat