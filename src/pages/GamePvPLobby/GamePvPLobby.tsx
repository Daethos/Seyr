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
    const [opponent, setOpponent] = useState<any>(null)
    const [username, setUsername] = useState<any>('')
    const [enemyPlayer, setEnemyPlayer] = useState<any>(null)
    const [yourData, setYourData] = useState<any>(null)
    const [enemyData, setEnemyData] = useState<any>(null)
    const [users, setUsers] = useState<any>([])
    const [spectator, setSpectator] = useState<boolean>(false)
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

        player_one_ready: false,
        player_one_religious_success: false,
        player_one_dual_wielding: false,
        player_one_critical_success: false,
        player_one_counter_success: false,
        player_one_roll_success: false,
        player_one_win: false,
        player_one_initiated: false,
        player_one_reduel: false,

        player_one_start_description: '',
        player_one_special_description: '',
        player_one_action_description: '',
        player_one_influence_description: '',
        player_one_influence_description_two: '',
        player_one_death_description: '',


        action_two: '',
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
        player_two_death_description: '',

        current_player_two_health: currentPlayerTwoHealth,
        new_player_two_health: currentPlayerTwoHealth,

        player_two_ready: false,
        player_two_critical_success: false,
        player_two_dual_wielding: false,
        player_two_roll_success: false,
        player_two_counter_success: false,
        player_two_win: false,
        player_two_initiated: false,
        player_two_reduel: false,
    })

    useEffect(() => {
        socket = io.connect("https://ascea.herokuapp.com") 
        // "http://localhost:3001" When Tinkering Around 
        // "https://ascea.herokuapp.com" When Deploying
        socket.emit("setup", user);
        socket.on("Connected", () => setSocketConnected(true))

        socket.on('typing', () => setIsTyping(true))
        socket.on('stop_typing', () => setIsTyping(false))
        socket.on('new_user', async (userData: any) => {
            if (userData.user._id === user._id && userData.player === 2) {
                await socket.emit(`request_data`)
            }
            if (userData.user._id === user._id && userData.player >= 3) {
                setSpectator(true)
                return
            }
            console.log(userData, 'New User')
            await setPlayerData(userData)
        })
        socket.on(`requesting_data`, async () => {
            await socket.emit(`data_responding`)
        })
        socket.on(`data_response`, async (data: any) => {
            console.log(data, 'Data Response from other Player')
            // if (data.player > 2) {
            //     return
            // }
            await setOpponentAscean(data.ascean)
            setEnemyData(data)
            setEnemyPlayer(data.user)
        })

        socket.on(`update_ascean`, async (asceanData: any) => {
            console.log(asceanData, 'Did the opponent make it?')
            await setOpponentAscean(asceanData.ascean)
            setEnemyPlayer(asceanData.user)
        })

        
        socket.on(`combat_response`, (response: any) => {
            console.log(response, 'Combat Response!')
            // statusUpdate(response)
        })
        
        socket.on(`duel_ready_response`, async (data: any) => {
            setCombatData(data)
        })

    }, [])

    const setPlayerData = async (userData: any) => {
        setLoading(true)
        try {
            
            if (user._id === userData.user._id) {
                console.log('Setting Your Data')
                setYourData(userData)
            } else {
                console.log('Setting Enemy Data')
                setEnemyData(userData)
            }
            
            if (user._id === userData.user._id && userData.player === 1) { // Asking if your Ascean is slotted as Player One
                setPreCombatDataUser({...preCombatDataUser, ...userData.combatData})
                await setUserPlayerOne(userData.combatData)
                
            }
            
            if (user._id === userData.user._id && userData.player === 2) { // Asking if your Ascean is slotted as Player Two
                setPreCombatDataUser({...preCombatDataUser, ...userData.combatData})
                await setUserPlayerTwo(userData.combatData)
                
            }
            
            if (user._id !== userData.user._id && userData.player === 1) {
                setPreCombatData({...preCombatData, ...userData.combatData})
                await setEnemyPlayerOne(userData.combatData)
                
            }
            if (user._id !== userData.user._id && userData.player === 2) {
                setPreCombatData({...preCombatData, ...userData.combatData})
                await setEnemyPlayerTwo(userData.combatData)
            }
            if (user.id !== userData.user._id) {
                setUsers(userData) // users Only Triggers when !user is Set ??
            }

            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Setting Players')
        }
    }

    const setUserPlayerOne = async (data: any) => {
        console.log('You are Player One!')
        console.log(combatData, 'How well formed are you right now?')
        try { 
            setCombatData({
                ...combatData, 
                'player_one': data.ascean,
                'player_one_health': data.player_one_attributes.healthTotal,
                'current_player_one_health': data.player_one_attributes.healthTotal,
                'new_player_one_health': data.player_one_attributes.healthTotal,
                'player_one_weapons': [data.player_one_weapon_one, data.player_one_weapon_two, data.player_one_weapon_three],
                'player_one_weapon_one': data.player_one_weapon_one,
                'player_one_weapon_two': data.player_one_weapon_two,
                'player_one_weapon_three': data.player_one_weapon_three,
                'player_one_defense': data.player_one_defense,
                'player_one_attributes': data.player_one_attributes
            })
        } catch (err: any) { 
            console.log(err.message, 'Error Setting You To Player One') 
        } 
    }

    const setUserPlayerTwo = async (data: any) => {
        console.log(combatData, 'How well formed are you right now?')
        console.log('You are Player Two!')
        try { 
            setCombatData({
                ...combatData, 
                'player_two': data.ascean,
                'player_two_health': data.player_two_attributes.healthTotal,
                'current_player_two_health': data.player_two_attributes.healthTotal,
                'new_player_two_health': data.player_two_attributes.healthTotal,
                'player_two_weapons': [data.player_two_weapon_one, data.player_two_weapon_two, data.player_two_weapon_three],
                'player_two_weapon_one': data.player_two_weapon_one,
                'player_two_weapon_two': data.player_two_weapon_two,
                'player_two_weapon_three': data.player_two_weapon_three,
                'player_two_defense': data.player_two_defense,
                'player_two_attributes': data.player_two_attributes
            })
        } catch (err: any) { 
            console.log(err.message, 'Error Setting You To Player Two') 
        }
    }

    const setEnemyPlayerOne = async (data: any) => {
        console.log(combatData, 'How well formed are you right now?')
        console.log('Enemy is Player One!')
        try { 
            setCombatData({
                ...combatData, 
                'player_one': data.ascean,
                'player_one_health': data.player_one_attributes.healthTotal,
                'current_player_one_health': data.player_one_attributes.healthTotal,
                'new_player_one_health': data.player_one_attributes.healthTotal,
                'player_one_weapons': [data.player_one_weapon_one, data.player_one_weapon_two, data.player_one_weapon_three],
                'player_one_weapon_one': data.player_one_weapon_one,
                'player_one_weapon_two': data.player_one_weapon_two,
                'player_one_weapon_three': data.player_one_weapon_three,
                'player_one_defense': data.player_one_defense,
                'player_one_attributes': data.player_one_attributes
            })
        } catch (err: any) { 
            console.log(err.message, 'Error Setting Enemy To Player One') 
        }
    }

    const setEnemyPlayerTwo = async (data: any) => {
        console.log(combatData, 'How well formed are you right now?')
        console.log('Enemy is Player Two!')
        try { 
            setCombatData({
                ...combatData, 
                'player_two': data.ascean,
                'player_two_health': data.player_two_attributes.healthTotal,
                'current_player_two_health': data.player_two_attributes.healthTotal,
                'new_player_two_health': data.player_two_attributes.healthTotal,
                'player_two_weapons': [data.player_two_weapon_one, data.player_two_weapon_two, data.player_two_weapon_three],
                'player_two_weapon_one': data.player_two_weapon_one,
                'player_two_weapon_two': data.player_two_weapon_two,
                'player_two_weapon_three': data.player_two_weapon_three,
                'player_two_defense': data.player_two_defense,
                'player_two_attributes': data.player_two_attributes
            })
        } catch (err: any) { 
            console.log(err.message, 'Error Setting Enemy To Player Two') 
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

    const setPlayerOrder = async (you: any, enemy: any) => {
        setLoading(true)
        try {   
            console.log(you, enemy, 'Hey are you two doing?')
            if (you.player === 1) {
                setCombatData({
                    ...combatData,
                    'room': you.room, 
                    'player_one': you.ascean,
                    'player_one_health': you.combatData.player_one_attributes.healthTotal,
                    'current_player_one_health': you.combatData.player_one_attributes.healthTotal,
                    'new_player_one_health': you.combatData.player_one_attributes.healthTotal,
                    'player_one_weapons': [you.combatData.player_one_weapon_one, you.combatData.player_one_weapon_two, you.combatData.player_one_weapon_three],
                    'player_one_weapon_one': you.combatData.player_one_weapon_one,
                    'player_one_weapon_two': you.combatData.player_one_weapon_two,
                    'player_one_weapon_three': you.combatData.player_one_weapon_three,
                    'player_one_defense': you.combatData.player_one_defense,
                    'player_one_attributes': you.combatData.player_one_attributes,
    
                    'player_two': enemy.ascean,
                    'player_two_health': enemy.combatData.player_two_attributes.healthTotal,
                    'current_player_two_health': enemy.combatData.player_two_attributes.healthTotal,
                    'new_player_two_health': enemy.combatData.player_two_attributes.healthTotal,
                    'player_two_weapons': [enemy.combatData.player_two_weapon_one, enemy.combatData.player_two_weapon_two, enemy.combatData.player_two_weapon_three],
                    'player_two_weapon_one': enemy.combatData.player_two_weapon_one,
                    'player_two_weapon_two': enemy.combatData.player_two_weapon_two,
                    'player_two_weapon_three': enemy.combatData.player_two_weapon_three,
                    'player_two_defense': enemy.combatData.player_two_defense,
                    'player_two_attributes': enemy.combatData.player_two_attributes
                })
            } else {
                setCombatData({
                    ...combatData,
                    'room': you.room, 
                    'player_one': enemy.ascean,
                    'player_one_health': enemy.combatData.player_one_attributes.healthTotal,
                    'current_player_one_health': enemy.combatData.player_one_attributes.healthTotal,
                    'new_player_one_health': enemy.combatData.player_one_attributes.healthTotal,
                    'player_one_weapons': [enemy.combatData.player_one_weapon_one, enemy.combatData.player_one_weapon_two, enemy.combatData.player_one_weapon_three],
                    'player_one_weapon_one': enemy.combatData.player_one_weapon_one,
                    'player_one_weapon_two': enemy.combatData.player_one_weapon_two,
                    'player_one_weapon_three': enemy.combatData.player_one_weapon_three,
                    'player_one_defense': enemy.combatData.player_one_defense,
                    'player_one_attributes': enemy.combatData.player_one_attributes,
    
                    'player_two': you.ascean,
                    'player_two_health': you.combatData.player_two_attributes.healthTotal,
                    'current_player_two_health': you.combatData.player_two_attributes.healthTotal,
                    'new_player_two_health': you.combatData.player_two_attributes.healthTotal,
                    'player_two_weapons': [you.combatData.player_two_weapon_one, you.combatData.player_two_weapon_two, you.combatData.player_two_weapon_three],
                    'player_two_weapon_one': you.combatData.player_two_weapon_one,
                    'player_two_weapon_two': you.combatData.player_two_weapon_two,
                    'player_two_weapon_three': you.combatData.player_two_weapon_three,
                    'player_two_defense': you.combatData.player_two_defense,
                    'player_two_attributes': you.combatData.player_two_attributes
                })
            }

        setLoading(false)   

        } catch (err: any) {
            console.log('Error Setting Player Order')
        }

    }

    useEffect(() => {
        if (enemyData && yourData) {
            console.log(enemyData, 'Setting Up Both Players!')
            setPlayerOrder(yourData, enemyData);
        } else {
            console.log('Halfway!')
        }
    }, [enemyData, yourData])

    useEffect(() => {
        console.log(combatData, 'How are we looking?')
    }, [combatData])

    useEffect(() => {
        console.log(users, 'New User')
        socket.emit(`share_combatdata`, combatData)

    }, [users])

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

    const setOpponentAscean = async (asceanData: any) => {
        if (opponent !== null) {
            console.log('You already have an opponent!')
            return
        }
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

    function handleRoomReset() {
        setShowChat(false)
        setCombatData({
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
    
            player_one_ready: false,
            player_one_religious_success: false,
            player_one_dual_wielding: false,
            player_one_critical_success: false,
            player_one_counter_success: false,
            player_one_roll_success: false,
            player_one_win: false,
            player_one_initiated: false,
            player_one_reduel: false,
    
            player_one_start_description: '',
            player_one_special_description: '',
            player_one_action_description: '',
            player_one_influence_description: '',
            player_one_influence_description_two: '',
    
    
            action_two: '',
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
    
            player_two_ready: false,
            player_two_critical_success: false,
            player_two_dual_wielding: false,
            player_two_roll_success: false,
            player_two_counter_success: false,
            player_two_win: false,
            player_two_initiated: false,
            player_two_reduel: false,
        })
    }

    useEffect(() => {
        console.log(preCombatDataUser, 'Pre-Combat Data (You)')
    }, [preCombatDataUser])

    useEffect(() => {
        console.log(preCombatData, 'Pre-Combat Data (Opponent)')
    }, [preCombatData])

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
            <h3 className='welcome-text mt-3'>PvP Lobby</h3>
            <h3 className='welcome-explanation'>
                Welcome one and all to the greatest spectacle this world has seen, a coliseum holding tests of triumph between the steeliest souls across
                the land, arriving in the beautiful fields of Licivitas to have a hand at capturing glory and renown, with the winner achieving the title
                known as the <br /><br /> 
                <div className='ascean'>
                'Ascean va'Esai.'
                </div>
                <br />
                <div className="game">
                Test your will against others in turn-based, rpg combat utilizing a series of weapons and skills to prove you are
                </div>
                <br />
                <div className="aenservaesai">
                'worthy of the preservation of being.'
                </div>
                <div className="aenservaesai mt-3">
                Choose a prospective Ascean to duel with, and either create or join an existing room to fight against an opponent.
                </div>
            </h3>
            {/* <h4>Choose a prospective Ascean to duel with, and either create a join an existing room to fight against an opponent.</h4> */}
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
            <GameChat user={user} ascean={ascean} spectator={spectator} yourData={yourData} enemyData={enemyData} opponent={opponent} enemyPlayer={enemyPlayer} handleRoomReset={handleRoomReset} combatData={combatData} setCombatData={setCombatData} room={room} setShowChat={setShowChat} socket={socket} />
        }
        </>

    )
}

export default GamePvPLobby