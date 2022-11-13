import { useEffect, useState } from 'react'

// import * as io from 'socket.io-client'
// const socket: any = io.connect()

interface Props {
    user: any;
}
const GameLobby = ({ user }: Props) => {

    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")

    // const joinRoom = () => {
    //     if (username !== '' && room !== '') {
    //         console.log(`Connecting to Room: ${room}`)
    //         console.log(socket.io)
    //         socket.io.emit("join_room", room)
    //         socket.io.on("join_room", () => {
    //             console.log('Socket working on the Front-End')
    //         })
    //     }
    // }

    return (
        <>
            <input className='my-1' type='text' placeholder={user.username.charAt(0).toUpperCase() + user.username.slice(1)} onChange={(e) => { setUsername(e.target.value) }} />
            <input className='my-1' type='text' placeholder='Room ID...' onChange={(e) => { setRoom(e.target.value) }} />
            {/* <button onClick={joinRoom}> Join Room </button> */}
        </>
  )
}

export default GameLobby