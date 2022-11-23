import { RefAttributes, useEffect, useState, useCallback } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import * as io from 'socket.io-client'
import userService from "../../utils/userService";
import Container from 'react-bootstrap/Container'
import Loading from '../../components/Loading/Loading'
import GameChat from '../../components/GameCompiler/GameChat';


let socket: any;

interface Props {
    user: any;
}

const GamePvPLobby = ({ user }: Props) => {
    const [asceanVaEsai, setAsceanVaEsai] = useState<any>([])
    const [ascean, setAscean] = useState<any>({})
    const [opponent, setOpponent] = useState<any>({})
    const [username, setUsername] = useState<any>('')
    const [enemyPlayer, setEnemyPlayer] = useState<any>({})
    const [yourData, setYourData] = useState<any>([])
    const [enemyData, setEnemyData] = useState<any>([])
    const [room, setRoom] = useState<any>("")
    const [showChat, setShowChat] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [socketConnected, setSocketConnected] = useState<boolean>(false)
    const [typing, setTyping] = useState<boolean>(false)
    const [isTyping, setIsTyping] = useState<boolean>(false)

    const [loadingAscean, setLoadingAscean] = useState<boolean>(false)
    const [undefinedStats, setUndefinedStats] = useState<boolean>(false)
    const [undefinedComputer, setUndefinedComputer] = useState<boolean>(false)

    const [playerOneWeaponOne, setPlayerOneWeaponOne] = useState<any>({})
    const [playerOneWeaponTwo, setPlayerOneWeaponTwo] = useState<any>({})
    const [playerOneWeaponThree, setPlayerOneWeaponThree] = useState<any>({})
    const [playerOneWeapons, setPlayerOneWeapons] = useState<any>([])

    const [totalPlayerOneHealth, setTotalPlayerOneHealth] = useState<number>(0)
    const [currentPlayerOneHealth, setCurrentPlayerOneHealth] = useState<number>(-5)

    const [playerOneAttributes, setPlayerOneAttributes] = useState<any>([])
    const [playerOneDefense, setPlayerOneDefense] = useState<any>([])

    const [playerTwoWeaponOne, setPlayerTwoWeaponOne] = useState<any>({})
    const [playerTwoWeaponTwo, setPlayerTwoWeaponTwo] = useState<any>({})
    const [playerTwoWeaponThree, setPlayerTwoWeaponThree] = useState<any>({})
    const [playerTwoWeapons, setPlayerTwoWeapons] = useState<any>({})

    const [playerTwoAttributes, setPlayerTwoAttributes] = useState<any>([])
    const [playerTwoDefense, setPlayerTwoDefense] = useState<any>([])
    const [totalPlayerTwoHealth, setTotalPlayerTwoHealth] = useState<number>(-5)
    const [currentPlayerTwoHealth, setCurrentPlayerTwoHealth] = useState<number>(0)

    const [preCombatData, setPreCombatData] = useState<any>({
        room: '',
        action: '',
        player_one: '',
        player_one_action: '',
        player_one_counter_guess: '',
        player_one_health: currentPlayerOneHealth,
        player_one_weapons: [],
        player_one_weapon_one: playerOneWeaponOne,
        player_one_weapon_two: playerOneWeaponTwo,
        player_one_weapon_three: playerOneWeaponThree,
        player_one_defense: playerOneDefense,
        player_one_attributes: playerOneAttributes,
        current_player_one_health: currentPlayerOneHealth,
        new_player_one_health: currentPlayerOneHealth,

        player_one_religious_success: false,
        player_one_dual_wielding: false,
        player_one_critical_success: false,
        player_one_counter_success: false,
        player_one_roll_success: false,
        player_one_win: false,

        player_one_start_description: '',
        player_one_special_description: '',
        player_one_action_description: '',
        player_one_influence_description: '',
        player_one_influence_description_two: '',


        player_two: '',
        player_two_health: 0,
        player_two_action: '',
        player_two_counter_guess: '',
        player_two_weapons: [],
        player_two_weapon_one: playerTwoWeaponOne,
        player_two_weapon_two: playerTwoWeaponTwo,
        player_two_weapon_three: playerTwoWeaponThree,
        player_two_defense: playerTwoDefense,
        player_two_attributes: playerTwoAttributes,
        player_two_start_description: '',
        player_two_special_description: '',
        player_two_action_description: '',
        player_two_influence_description: '',
        player_two_influence_description_two: '',

        current_player_two_health: currentPlayerTwoHealth,
        new_player_two_health: currentPlayerTwoHealth,

        player_two_critical_success: false,
        player_two_dual_wielding: false,
        player_two_roll_success: false,
        player_two_counter_success: false,
        player_two_win: false,
    })

    const [preCombatDataUser, setPreCombatDataUser] = useState<any>({
        room: '',
        action: '',
        player_one: '',
        player_one_action: '',
        player_one_counter_guess: '',
        player_one_health: currentPlayerOneHealth,
        player_one_weapons: [],
        player_one_weapon_one: playerOneWeaponOne,
        player_one_weapon_two: playerOneWeaponTwo,
        player_one_weapon_three: playerOneWeaponThree,
        player_one_defense: playerOneDefense,
        player_one_attributes: playerOneAttributes,
        current_player_one_health: currentPlayerOneHealth,
        new_player_one_health: currentPlayerOneHealth,

        player_one_religious_success: false,
        player_one_dual_wielding: false,
        player_one_critical_success: false,
        player_one_counter_success: false,
        player_one_roll_success: false,
        player_one_win: false,

        player_one_start_description: '',
        player_one_special_description: '',
        player_one_action_description: '',
        player_one_influence_description: '',
        player_one_influence_description_two: '',


        player_two: '',
        player_two_health: 0,
        player_two_action: '',
        player_two_counter_guess: '',
        player_two_weapons: [],
        player_two_weapon_one: playerTwoWeaponOne,
        player_two_weapon_two: playerTwoWeaponTwo,
        player_two_weapon_three: playerTwoWeaponThree,
        player_two_defense: playerTwoDefense,
        player_two_attributes: playerTwoAttributes,
        player_two_start_description: '',
        player_two_special_description: '',
        player_two_action_description: '',
        player_two_influence_description: '',
        player_two_influence_description_two: '',

        current_player_two_health: currentPlayerTwoHealth,
        new_player_two_health: currentPlayerTwoHealth,

        player_two_critical_success: false,
        player_two_dual_wielding: false,
        player_two_roll_success: false,
        player_two_counter_success: false,
        player_two_win: false,
    })

    const [combatData, setCombatData] = useState<any>({
        room: '',
        action: '',
        player_one: '',
        player_one_action: '',
        player_one_counter_guess: '',
        player_one_health: currentPlayerOneHealth,
        player_one_weapons: [],
        player_one_weapon_one: playerOneWeaponOne,
        player_one_weapon_two: playerOneWeaponTwo,
        player_one_weapon_three: playerOneWeaponThree,
        player_one_defense: playerOneDefense,
        player_one_attributes: playerOneAttributes,
        current_player_one_health: currentPlayerOneHealth,
        new_player_one_health: currentPlayerOneHealth,

        player_one_religious_success: false,
        player_one_dual_wielding: false,
        player_one_critical_success: false,
        player_one_counter_success: false,
        player_one_roll_success: false,
        player_one_win: false,

        player_one_start_description: '',
        player_one_special_description: '',
        player_one_action_description: '',
        player_one_influence_description: '',
        player_one_influence_description_two: '',


        player_two: '',
        player_two_health: 0,
        player_two_action: '',
        player_two_counter_guess: '',
        player_two_weapons: [],
        player_two_weapon_one: playerTwoWeaponOne,
        player_two_weapon_two: playerTwoWeaponTwo,
        player_two_weapon_three: playerTwoWeaponThree,
        player_two_defense: playerTwoDefense,
        player_two_attributes: playerTwoAttributes,
        player_two_start_description: '',
        player_two_special_description: '',
        player_two_action_description: '',
        player_two_influence_description: '',
        player_two_influence_description_two: '',

        current_player_two_health: currentPlayerTwoHealth,
        new_player_two_health: currentPlayerTwoHealth,

        player_two_critical_success: false,
        player_two_dual_wielding: false,
        player_two_roll_success: false,
        player_two_counter_success: false,
        player_two_win: false,
    })

    useEffect(() => {
        socket = io.connect("http://localhost:3001") 
        // "http://localhost:3001" When Tinkering Around 
        // "https://ascea.herokuapp.com" When Deploying
        socket.emit("setup", user);
        socket.on("Connected", () => setSocketConnected(true))

        socket.on('typing', () => setIsTyping(true))
        socket.on('stop_typing', () => setIsTyping(false))
        socket.on('new_user', async (userData: any) => {
            await socket.emit(`combatData_update`)
            // console.log(userData, 'New User')
            // setCombatData({...combatData, 'room': userData.room})
            // await setPlayerData(userData)
            // await sortPlayers(userData)
        })
        socket.on(`update_ascean`, (asceanData: any) => {
            console.log(asceanData, 'Did the opponent make it?')
            setOpponentAscean(asceanData.ascean)
            setEnemyPlayer(asceanData.user)
        })
        socket.on(`updated_combatData`, async (newData: any) => {
            console.log(newData, 'Updated Combat Data?')
            await setPlayerData(newData)
        })
    }, [])

    const setPlayerData = async (userData: any) => {
        setLoading(true)
        try {
            // setPreCombatData({...preCombatData, ...userData.combatData})
            console.log(
                user._id, 'User _id',
                userData.user._id, 'User Data _id', 
                userData.combatData.player_one.name, 'User Data Combat Data Player One Name',
                userData.combatData.player_two.name, 'User Data Combat Data Player Two Name'
                )
                
            if (user._id === userData.user._id) {
                console.log('Setting Your Data')
                setYourData(userData)
            } else {
                console.log('Setting Enemy Data')
                setEnemyData(userData)
            }

            if (user._id === userData.user._id && userData.player === 1) { // Asking if your Ascean is slotted as Player One
                console.log('You are Player One!')
                setPreCombatDataUser({...preCombatDataUser, ...userData.combatData})
                //TODO:FIXME: Set Function For (You) Being Player One (setCombatData)
                // if (preCombatData.player_two !== '') {
                //     console.log('Setting the Opponent to Player Two Manually')
                //     setPreCombatDataUser({...preCombatDataUser, 
                //                     'player_two': userData.combatData.ascean,
                //                     'player_two_health': userData.combatData.attributes.healthTotal,
                //                     'current_player_two_health': userData.combatData.attributes.healthTotal,
                //                     'new_player_two_health': userData.combatData.attributes.healthTotal,
                //                     'player_two_weapons': [userData.combatData.combat_weapon_one, userData.combatData.combat_weapon_two, userData.combatData.combat_weapon_three],
                //                     'player_two_weapon_one': userData.combatData.combat_weapon_one,
                //                     'player_two_weapon_two': userData.combatData.combat_weapon_two,
                //                     'player_two_weapon_three': userData.combatData.combat_weapon_three,
                //                     'player_two_defense': userData.combatData.defense,
                //                     'player_two_attributes': userData.combatData.attributes
                //     })
                // }
            }

            if (user._id === userData.user._id && userData.player === 2) { // Asking if your Ascean is slotted as Player Two
                console.log('You are Player Two!')
                setPreCombatDataUser({...preCombatDataUser, ...userData.combatData})
                //TODO:FIXME: Set Function For (You) Being Player Two (setCombatData)
                // if (preCombatData.player_one !== '') {
                //     console.log('Setting the Opponent to Player Two Manually')
                //     setPreCombatDataUser({...preCombatDataUser, 
                //         'player_one': userData.combatData.ascean,
                //         'player_one_health': userData.combatData.attributes.healthTotal,
                //         'current_player_one_health': userData.combatData.attributes.healthTotal,
                //         'new_player_one_health': userData.combatData.attributes.healthTotal,
                //         'player_one_weapons': [userData.combatData.combat_weapon_one, userData.combatData.combat_weapon_two, userData.combatData.combat_weapon_three],
                //         'player_one_weapon_one': userData.combatData.combat_weapon_one,
                //         'player_one_weapon_two': userData.combatData.combat_weapon_two,
                //         'player_one_weapon_three': userData.combatData.combat_weapon_three,
                //         'player_one_defense': userData.combatData.defense,
                //         'player_one_attributes': userData.combatData.attributes
                //     })
                // }
            }

            if (user._id !== userData.user._id && userData.player === 1) {
                console.log('Enemy is Player One!')
                setPreCombatData({...preCombatData, ...userData.combatData})
                //TODO:FIXME: Set Function For (Enemy) Being Player One (setCombatData)

                // setCombatData({...combatData, 
                //     'player_one': userData.combatData.ascean,
                //     'player_one_health': userData.combatData.player_one_attributes.healthTotal,
                //     'current_player_one_health': userData.combatData.player_one_attributes.healthTotal,
                //     'new_player_one_health': userData.combatData.player_one_attributes.healthTotal,
                //     'player_one_weapons': [userData.combatData.combat_weapon_one, userData.combatData.combat_weapon_two, userData.combatData.combat_weapon_three],
                //     'player_one_weapon_one': userData.combatData.combat_weapon_one,
                //     'player_one_weapon_two': userData.combatData.combat_weapon_two,
                //     'player_one_weapon_three': userData.combatData.combat_weapon_three,
                //     'player_one_defense': userData.combatData.defense,
                //     'player_one_attributes': userData.combatData.player_one_attributes
                // })
            }
            if (user._id !== userData.user._id && userData.player === 2) {
                console.log('Enemy is Player Two!')
                setPreCombatData({...preCombatData, ...userData.combatData})
                //TODO:FIXME: Set Function For (Enemy) Being Player Two (setCombatData)

                // setCombatData({...combatData, 
                //     'player_two': userData.combatData.ascean,
                //     'player_two_health': userData.combatData.player_two_attributes.healthTotal,
                //     'current_player_two_health': userData.combatData.player_two_attributes.healthTotal,
                //     'new_player_two_health': userData.combatData.player_two_attributes.healthTotal,
                //     'player_two_weapons': [userData.combatData.combat_weapon_one, userData.combatData.combat_weapon_two, userData.combatData.combat_weapon_three],
                //     'player_two_weapon_one': userData.combatData.combat_weapon_one,
                //     'player_two_weapon_two': userData.combatData.combat_weapon_two,
                //     'player_two_weapon_three': userData.combatData.combat_weapon_three,
                //     'player_two_defense': userData.combatData.defense,
                //     'player_two_attributes': userData.combatData.player_two_attributes
                // })
            }
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Setting Players')
        }
    }
    
    // const sortPlayers = async (userData: any) => {
    //     setLoading(true)
    //     try {
    //         if (userData.user.username === user.username && userData.player === 1) {
    //             playerOneStatCompiler(userData.ascean)
    //         }
    //         if (userData.user.username !== user.username && userData.player === 2) {
    //             playerTwoStatCompiler(userData.ascean)
    //         }
    //         if (userData.user.username === user.username && userData.player === 2) {
    //             playerTwoStatCompiler(userData.ascean)
    //             // if (opponent.name !== '') {
    //             //     playerOneStatCompiler(opponent)
    //             // }
    //         }
    //     setTimeout(() => setLoading(false), 1000)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Sorting Players')
    //     }
    // }

    useEffect(() => {
        console.log(enemyData, 'enemyData in Use Effect')
    }, [enemyData])

    const setEnemyCombatData = async () => {
        setCombatData({
            ...combatData,

        })
    }

    useEffect(() => {
        console.log(yourData, 'yourData in Use Effect')
    }, [yourData])

    useEffect(() => {
        console.log(combatData, 'The ever forming Combat Data')
    }, [combatData])

    useEffect(() => {
        getUserAscean();
    }, [])

    useEffect(() => {
        console.log(opponent, 'Did the Opponent set correctly?')
    }, [opponent])

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
    
    const sendAscean = async () => {
        try {
            const asceanData = {
                room: room,
                ascean: ascean,
                user: user,
            }
            // await socket.emit(`ascean`, asceanData)
        } catch (err: any) {
            console.log(err.message, 'Error Sending Ascean to Opponent')
        }
    }

    const setOpponentAscean = async (asceanData: any) => {
        try {
            setOpponent(asceanData)
        } catch (err: any) {
            console.log(err.message, 'Error setting Ascean opponent')
        }
    }

    const joinRoom = async () => {
        if (username !== '' && room !== '') {
            console.log(`Connecting to Room: ${room}`)
            // console.log(socket.io)
            const asceanData = {
                ascean: ascean,
                room: room,
                user: user,
                combatData: combatData
            }
            socket.emit("join_room", asceanData)
            socket.on("join_room", () => {
                console.log('Socket working on the Front-End inside room: ' + room)
            })
            await socket.emit(`ascean`, asceanData)
            setShowChat(true)
        }
    }

    function handleAscean(e: any) {
        console.log(e.target.value, 'What do we have here?')
        setUsername(e.target.value)
    }

    function handleRoom(e: any) {
        console.log(e.target.value)
        setRoom(e.target.value)
        setCombatData({...combatData, 'room': e.target.value})
    }

    // const playerTwoStatCompiler = async (playerTwo: { name: string, _id: string; }) => {
    //     if (playerTwo._id === '') {
    //         return
    //     }
    //     console.log(playerTwo.name, playerTwo._id, 'Player Two Name and ID')
    //     setLoading(true)
    //     try {
    //         const response = await asceanAPI.getAsceanStats(playerTwo._id)
    //         // console.log(response.data.data, 'Response Compiling Stats For Player Two')
    //         setPlayerTwoDefense(response.data.data.defense)
    //         setPlayerTwoAttributes(response.data.data.attributes)
    //         setTotalPlayerTwoHealth(response.data.data.attributes.healthTotal)
    //         setCurrentPlayerTwoHealth(response.data.data.attributes.healthTotal)
    //         setPlayerTwoWeaponOne(response.data.data.combat_weapon_one)
    //         setPlayerTwoWeaponTwo(response.data.data.combat_weapon_two)
    //         setPlayerTwoWeaponThree(response.data.data.combat_weapon_three)
    //         setPlayerTwoWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
    //         setCombatData({
    //             ...combatData,
    //             'player_two': response.data.data.ascean,
    //             'player_two_health': response.data.data.attributes.healthTotal,
    //             'current_player_two_health': response.data.data.attributes.healthTotal,
    //             'new_player_two_health': response.data.data.attributes.healthTotal,
    //             'player_two_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
    //             'player_two_weapon_one': response.data.data.combat_weapon_one,
    //             'player_two_weapon_two': response.data.data.combat_weapon_two,
    //             'player_two_weapon_three': response.data.data.combat_weapon_three,
    //             'player_two_defense': response.data.data.defense,
    //             'player_two_attributes': response.data.data.attributes
    //         })
    //         setUndefinedComputer(false)
    //         setTimeout(() => setLoading(false), 2000);
    //         // setLoading(false)
    //     } catch (err: any) {
    //         setLoading(false)
    //         console.log(err.message, 'Error Compiling Ascean Stats For Player Two')
    //     }
    // }

    // const playerOneStatCompiler = async (playerOne: any) => {
    //     console.log(playerOne.name, playerOne._id, 'Player One Name and ID')
    //     if (playerOne._id === '') {
    //         console.log('Username Is Empty')
    //         return
    //     }
    //     setLoadingAscean(true)
    //     try {
    //         const response = await asceanAPI.getAsceanStats(playerOne._id)
    //         // const response_two = await asceanAPI.getAsceanStats(opponent._id)
    //         console.log(response.data.data, 'Response Compiling Stats For Player One')
    //         setPlayerOneDefense(response.data.data.defense)
    //         setPlayerOneAttributes(response.data.data.attributes)
    //         setTotalPlayerOneHealth(response.data.data.attributes.healthTotal)
    //         setCurrentPlayerOneHealth(response.data.data.attributes.healthTotal)
    //         setPlayerOneWeaponOne(response.data.data.combat_weapon_one)
    //         setPlayerOneWeaponTwo(response.data.data.combat_weapon_two)
    //         setPlayerOneWeaponThree(response.data.data.combat_weapon_three)
    //         setPlayerOneWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
    //         setCombatData({
    //             ...combatData,
    //             'player_one': response.data.data.ascean,
    //             'player_one_health': response.data.data.attributes.healthTotal,
    //             'current_player_one_health': response.data.data.attributes.healthTotal,
    //             'new_player_one_health': response.data.data.attributes.healthTotal,
    //             'player_one_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
    //             'player_one_weapon_one': response.data.data.combat_weapon_one,
    //             'player_one_weapon_two': response.data.data.combat_weapon_two,
    //             'player_one_weapon_three': response.data.data.combat_weapon_three,
    //             'player_one_defense': response.data.data.defense,
    //             'player_one_attributes': response.data.data.attributes
    //         })

    //         setTimeout(() => setLoadingAscean(false), 2000);
    //         // setTimeout(() => setLoading(false), 5000)
    //         // setLoadingAscean(false)
    //         // setLoading(false)
    //     } catch (err: any) {
    //         setLoading(false)
    //         console.log(err.message, 'Error Compiling Ascean Stats For Player One')
    //     }
    // }

    useEffect(() => {
        console.log(preCombatData, 'Pre-Combat Data (Opponent)')
        console.log(preCombatDataUser, 'Pre-Combat Data (You)')
    }, [preCombatData, preCombatDataUser])

    if (loading || loadingAscean) {
        return (
            <Loading Combat={true} />
        )
    }

    return (
        <>
        { !showChat 
            ? 
            <Container className="Game-Lobby-Chat" style={{ overflow: 'auto' }}>
            <h3 className='my-3'>Game PvP Lobby</h3>
                <div className='' style={{  }}>
            <select value={username} onChange={handleAscean} style={{ width: 45 + '%', marginRight: 10 + '%' }}>
                <option>Ascean</option>
                {asceanVaEsai.map((ascean: any, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name}</option>
                    )
                })}
            </select>
            <input className='my-1' type='text' placeholder='Room ID...' onChange={handleRoom} style={{ width: 45 + '%' }}/>
                </div>
            <button className='btn btn-outline-info my-2' onClick={joinRoom}> Join Room </button>
            </Container>
            : 
            <GameChat user={user} ascean={ascean} opponent={opponent} enemyPlayer={enemyPlayer} combatData={combatData} setCombatData={setCombatData} room={room} setShowChat={setShowChat} socket={socket} />
        }
        </>

    )
}

export default GamePvPLobby