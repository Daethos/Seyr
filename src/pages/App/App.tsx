import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import FriendFeed from "../FriendFeed/FriendFeed";
import FriendMessages from "../FriendMessages/FriendMessages";
import FocusMessages from "../FocusMessages/FocusMessages";
import GameSolo from "../GameSolo/GameSolo";
import GameLobby from "../GameLobby/GameLobby";
import GamePvPLobby from "../GamePvPLobby/GamePvPLobby";
import Story from "../Story/Story";
import GameAdmin from "../GameAdmin/GameAdmin";
import GuestGame from "../GuestGame/GuestGame";
import HardCoreAscea from "../HardcoreAscea/HardCoreAscea";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  photoUrl: string;
};

function App() {
  const [user, setUser] = useState<User | null>(userService.getUser());
  const [guest, setGuest] = useState(userService.getUser());
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  };

  function handleGuest() {
    setGuest(userService.getUser());
  };

  function handleLogout() {
    userService.logout();
    setUser(null);
    setGuest(null);
  };

  async function handleAsceanCreate(newAscean: Object) {
    try {
        await asceanAPI.create(newAscean);
        setCreateSuccess(true);
        navigate("/");
    } catch (err) {
        console.log(err, '<- This is the error in handleAsceanCreate');
    };
  };

  async function editAscean(vaEsai: Object) {
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
      <NavBar user={user} setUser={setUser} handleLogout={handleLogout} createSuccess={createSuccess} setCreateSuccess={setCreateSuccess} />
      <Routes>
        <Route path="/" element={<UserProfile loggedUser={user} setCreateSuccess={setCreateSuccess} handleAsceanCreate={handleAsceanCreate} />} />
        <Route path="/GameAdmin" element={<GameAdmin user={user} />} />
        <Route path="/Ascean" element={<NewAscean createSuccess={createSuccess} handleAsceanCreate={handleAsceanCreate} />} />
        <Route path="/Solo/:asceanID" element={<GameSolo user={user} />} />
        <Route path='/Hardcore/:asceanID' element={<HardCoreAscea user={user} />} />
        <Route path="/Story/:asceanID" element={<Story user={user} />} />
        <Route path="/ChatLobby" element={<GameLobby user={user} />} />
        <Route path="/GamePvPLobby" element={<GamePvPLobby user={user} />} />
        <Route path="/edit/:asceanID" element={<EditAscean editAscean={editAscean} createSuccess={createSuccess} setCreateSuccess={setCreateSuccess} />} />
        <Route path="/CommunityFeed" element={<CommunityFeed loggedUser={user} />} />
        <Route path="/CommunityFeed/:focusID"  element={<CommunityFocus loggedUser={user} handleAsceanCreate={handleAsceanCreate} />} />
        <Route path="/Friends" element={<FriendFeed loggedUser={user} />} />
        <Route path="/Messages" element={<FriendMessages user={user} />} />
        <Route path="/Messages/:friendID" element={<FocusMessages user={user} />} />
        <Route path="/:username" element={<ProfilePage user={user} />} />
        <Route path="/Authorization" element={<AuthPage setUser={setUser} handleGuest={handleGuest} handleSignUpOrLogin={handleSignUpOrLogin} />} />
      </Routes>
      </div>
    );
  };

  if (guest) {
    return (
      <Routes>
        <Route path="/guestMatch" element={<GuestGame guest={guest} handleLogout={handleLogout} />} />
      </Routes>
    );
  };

  return (
    <Routes>
      <Route path="/Authorization" element={<AuthPage setUser={setUser} handleGuest={handleGuest} handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/*" element={<Navigate to="/Authorization" />} />
    </Routes>
  );
};

export default App;