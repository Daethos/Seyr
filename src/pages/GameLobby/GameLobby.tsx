import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import * as io from 'socket.io-client'
import GameChat from '../../components/GameCompiler/GameChat';
let socket: any;
// const socket: any = io.connect("http://localhost:3001")
let selectedChatCompare;

interface Props {
    user: any;
}

const GameLobby = ({ user }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [asceanVaEsai, setAsceanVaEsai] = useState<any>([])
    const [username, setUsername] = useState<any>({})
    const [ascean, setAscean] = useState<any>({})
    const [room, setRoom] = useState<any>("")
    const [showChat, setShowChat] = useState<boolean>(false)
    const [socketConnected, setSocketConnected] = useState<boolean>(false)

    useEffect(() => {
        socket = io.connect("http://localhost:3001")
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true))
    }, [])

    useEffect(() => {
        getUserAscean();
    }, [])

    useEffect(() => {
        const findAscean = asceanVaEsai.filter(
            (ascean: { _id: any }) => ascean._id === username
        );
        const response = findAscean
        console.log(response[0], 'Response in Filtering Ascean')
        setAscean(response[0])
    }, [username])
    


    const getUserAscean = async () => {
        try {
            const response = await asceanAPI.getAllAscean();
            console.log(response.data, 'User Ascean in Game Lobby')
            setAsceanVaEsai([...response.data.reverse()])
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Retrieving User Ascean')
        }
    }

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            console.log(`Connecting to Room: ${room}`)
            // console.log(socket.io)
            socket.emit("join_room", room)
            socket.on("join_room", () => {
                console.log('Socket working on the Front-End inside room: ' + room)
            })
            setShowChat(true)
        }
    }

    function handleRoom(e: any) {
        console.log(e.target.value)
        setRoom(e.target.value)
    }

    function handleAscean(e: any) {
        console.log(e.target.value, 'What do we have here?')
        setUsername(e.target.value)
    }

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }
    return (
        <Container className="Game-Lobby-Chat">
            { !showChat 
            ? 
            <>
            <select value={username} onChange={handleAscean}>
                <option>Ascean</option>
                {asceanVaEsai.map((ascean: any, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name}</option>
                    )
                })}
            </select>
            <input className='my-1' type='text' placeholder='Room ID...' onChange={handleRoom} />
            <button onClick={joinRoom}> Join Room </button>
            </>
            : 
            <GameChat user={user} ascean={ascean} room={room} socket={socket} />
            }
        </Container>
  )
}

export default GameLobby