import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserFetch, getUserLogout } from "../../game/reducers/userState";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/NavBar/NavBar';
import UserProfile from '../UserProfile/UserProfile';
import NewAscean from "../../components/NewAscean/NewAscean";
import userService from "../../utils/userService";
import * as asceanAPI from '../../utils/asceanApi';
import EditAscean from "../../components/EditAscean/EditAscean";
import AuthPage from "../AuthPage/AuthPage";
import CommunityFeed from "../CommunityFeed/CommunityFeed";
import CommunityFocus from "../CommunityFocus/CommunityFocus";
import ProfilePage from "../ProfilePage/ProfilePage"
import GameSolo from "../GameSolo/GameSolo";
import GameLobby from "../GameLobby/GameLobby";
import GamePvPLobby from "../GamePvPLobby/GamePvPLobby";
import Story from "../Story/Story";
import GameAdmin from "../GameAdmin/GameAdmin";
import GuestGame from "../GuestGame/GuestGame";

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    photoUrl: string;
};

const App = () => {
  const [guest, setGuest] = useState<any>(null);
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);
    const user = useSelector((state: any) => state.user.user) as User | null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => { 
        dispatch(getUserFetch());
    }, [dispatch]);
    
    const handleSignUpOrLogin = () => dispatch(getUserFetch());
    const handleLogout = () => dispatch(getUserLogout());
    const handleGuest = (): void => setGuest(userService.getUser());
    const handleGuestLogout = (): void => setGuest(null);

    const handleAsceanCreate = async (newAscean: Object): Promise<void> => {
        try {
            await asceanAPI.create(newAscean);
            setCreateSuccess(true);
            navigate("/");
        } catch (err) {
            console.log(err, '<- This is the error in handleAsceanCreate');
        };
    };

    const editAscean = async (vaEsai: Object): Promise<void> => {
        try {
            await asceanAPI.edit(vaEsai);
            setCreateSuccess(true);
        } catch (err: any)  {
            console.log(err.message, '<- You are having an error in editAscean');
        };
    };

    if (user) {
        return (
            <div> 
            <NavBar user={user} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<UserProfile setCreateSuccess={setCreateSuccess} handleAsceanCreate={handleAsceanCreate} />} />
                <Route path="/GameAdmin" element={<GameAdmin user={user} />} />
                <Route path="/Ascean" element={<NewAscean handleAsceanCreate={handleAsceanCreate} />} />
                <Route path="/Solo/:asceanID" element={<GameSolo user={user} />} />
                <Route path="/Story/:asceanID" element={<Story />} />
                <Route path="/ChatLobby" element={<GameLobby user={user} />} />
                <Route path="/GamePvPLobby" element={<GamePvPLobby user={user} />} />
                <Route path="/edit/:asceanID" element={<EditAscean editAscean={editAscean} createSuccess={createSuccess} setCreateSuccess={setCreateSuccess} />} />
                <Route path="/CommunityFeed" element={<CommunityFeed />} />
                <Route path="/CommunityFeed/:focusID"  element={<CommunityFocus handleAsceanCreate={handleAsceanCreate} />} />
                <Route path="/:username" element={<ProfilePage user={user} />} />
                <Route path="/Authorization" element={<AuthPage handleGuest={handleGuest} handleSignUpOrLogin={handleSignUpOrLogin} />} />
            </Routes>
            </div>
        );
    };

    if (guest) {
        return (
        <Routes>
            <Route path="/guestMatch" element={<GuestGame guest={guest} handleLogout={handleGuestLogout} />} />
        </Routes>
        );
    };

    return (
        <Routes>
            <Route path="/Authorization" element={<AuthPage handleGuest={handleGuest} handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/*" element={<Navigate to="/Authorization" />} />
        </Routes>
    );
};

export default App;