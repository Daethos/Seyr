import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/NavBar/NavBar';
import UserProfile from '../UserProfile/UserProfile';
import NewAscean from "../../components/NewAscean/NewAscean";
import './App.css';
import userService from "../../utils/userService";
import * as asceanAPI from '../../utils/asceanApi';
import EditAscean from "../../components/EditAscean/EditAscean";
import AuthPage from "../AuthPage/AuthPage";
import Loading from "../../components/Loading/Loading";
import CommunityFeed from "../CommunityFeed/CommunityFeed";
import ProfilePage from "../ProfilePage/ProfilePage"

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [monstahUrl, setMonstahUrl] = useState<string>('');
  const [backgroundState, setBackgroundState] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // const [submitting, setSubmitting] = useState(false);
  const [ascean, setAscean] = useState<object[]>([])
  const BUCKET_START = 'https://collectionbucketman.s3.amazonaws.com/seyr/';


  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

//   function getmonstahurl(url) {
//     setMonstahUrl(url);
//   }

  async function handleAsceanCreate(newAscean: Object) {
    try {
        console.log(newAscean, '<- newAscean in handleAsceanCreate start')
        const response = await asceanAPI.create(newAscean);
        console.log(response, '<- Response in handleAsceanCreate');
        setAscean([response.data, ...ascean]);
    } catch (err) {
        console.log(err, '<- This is the error in handleAsceanCreate')
    }
}

async function editAscean(vaEsai: Object) {
  try {
    console.log(vaEsai, '<- Ascean in editAscean start')
    const response = await asceanAPI.edit(vaEsai);
    console.log(response, '<- Response in editAscean')
    setAscean([response.data, ...ascean]);
  } catch (err: any)  {
    console.log(err.message, '<- You are having an error in the editAscean function in App.jsx')
  }
}

//   async function colores(background) {
//     try {
//       setBackgroundState(background);
//       console.log(background, '<- Background in colores function')
//       // document.getElementById('user-background').style.backgroundImage = `${background}`;
//       // userBackground.style.backgroundImage = `${background}`;
//     } catch (err) {
//       console.log(err.message, '<- Error in colores')
//     }
//   }

//   async function handleColor(e) {
//     setLoading(true);
//     e.preventDefault();
//     console.log(e.target.name, '<- New Png?')
//     const background = BUCKET_START + e.target.name + ".png";
//     console.log(background, '<- New background selected!')
//     try {
//       await colores(background);
//       console.log(backgroundState, '<- And what is the state of the background at the end?')
//       setLoading(false);
//     } catch (err) {
//       console.log(err.message, ' <- Error handling Color!')
//       setLoading(false);
//     }
//   }

  if (loading) {
    return (
        <Loading />
    );
}

  if (user) {
    return (
      <div 
      // style={
      //   backgroundState
      //   ? { backgroundImage:`url(${backgroundState})` }
      //   : { backgroundImage: `url(${BUCKET_START}Y4.png)` }
      //   // { backgroundImage: `url(${process.env.PUBLIC_URL}/fantasy-arena-4.png)` }
      // } 
      //style={{ backgroundImage: `url(${BUCKET_START}Y4.png)`}}
      // className="user-background"
      > 
      <NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<UserProfile loggedUser={user} setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} handleLogout={handleLogout} />} />
        <Route path="/Ascean" element={<NewAscean loggedUser={user} setUser={setUser} handleAsceanCreate={handleAsceanCreate} />} />
        <Route path="/edit/:asceanID" element={<EditAscean editAscean={editAscean} />} />
        
        <Route path="/CommunityFeed" element={<CommunityFeed loggedUser={user} setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} handleLogout={handleLogout} handleAsceanCreate={handleAsceanCreate} />} />
        <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout} />} />
        {/* <Route path="/Monsters" element={<ApiMonsters user={user} handleLogout={handleLogout} />} />
        <Route path="/Monsters/Data" element={<ApiMonsterData user={user} handleLogout={handleLogout} />} />
        <Route path="/Monsters/:monsterName" element={<ApiMonsterDetails user={user} handleLogout={handleLogout} getmonstahurl={getmonstahurl} handleMonster={handleMonster} />} />
        <Route path="/Spells" element={<ApiSpells user={user}/>} />
        <Route path="/Characters" element={<ApiCharacters user={user} />} />
         */}
        <Route path="/Authorization" element={<AuthPage setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />} />
      </Routes>
      </div>
      
    );
  }

  return (
    //<div 
      // style={
      //   backgroundState
      //   ? { backgroundImage:`url(${backgroundState})` }
      //   : { backgroundImage: `url(${BUCKET_START}Y4.png)` }
      // }
      //className="user-background"
      //> 
    <Routes>
      <Route path="/Authorization" element={<AuthPage setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/*" element={<Navigate to="/Authorization" />} />
    </Routes>
    //</div>
  );
}

export default App;
