import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import NavBar from '../../components/NavBar/NavBar';
// import UserProfile from '../UserProfile/UserProfile';
import './App.css';
import userService from "../../utils/userService";
// import * as monstersAPI from '../../utils/monsterApi';
// import ApiMonsters from "../../components/ApiMonsters/ApiMonsters";
// import EditMonster from "../../components/EditMonster/EditMonster";
// import ApiMonsterDetails from "../../components/ApiMonsterDetails/ApiMonsterDetails";
// import ApiMonsterData from "../../components/ApiMonsterData/ApiMonsterData";
// import ApiSpells from "../../components/ApiSpells/ApiSpells";
import AuthPage from "../AuthPage/AuthPage";
// import ApiCharacters from "../../components/ApiClasses/ApiClasses";
import Loading from "../../components/Loading/Loading";
// import Community from "../Community/Community";
// import ProfilePage from "../Profile/Profile"

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [monstahUrl, setMonstahUrl] = useState('');
  const [backgroundState, setBackgroundState] = useState('');
  const [loading, setLoading] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  // const [monstra, setMonstra] = useState([])
  const BUCKET_START = 'https://collectionbucketman.s3.amazonaws.com/dungeons/';
  console.log(backgroundState, "<- What's up?")


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

//   async function handleMonster(monstroso: Object) {
//     try {
//         console.log(monstroso, '<- Monstroso in handleMonster start')
//         const response = await monstersAPI.create(monstroso);
//         console.log(response, '<- Response in handleMonster');
//         setMonstra([response.data, ...monstra]);
//         // setMonstra([...monstra, response.data]);
//     } catch (err) {
//         console.log(err.message, '<- This is the error in handleMonster')
//     }
// }

// async function editMonstra(monstra) {
//   try {
//     console.log(monstra, '<- Monstra in editMonstra start')
//     const response = await monstersAPI.edit(monstra);
    
//     console.log(response, '<- Response in editMonstra')
    
//     setMonstra([response.data, ...monstra]);
//   } catch (err)  {
//     console.log(err.message, '<- You are having an error in the editMonstra function in App.jsx')
//   }
// }

  

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
        <Loading user={user} handleLogout={handleLogout} />
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
      {/* <NavBar user={user} setUser={setUser} handleLogout={handleLogout} getmonstahurl={getmonstahurl} handleColor={handleColor} /> */}
      <Routes>
        {/* <Route path="/" element={<UserProfile loggedUser={user} monstra={monstra} setMonstra={setMonstra} setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} handleLogout={handleLogout} />} />
        <Route path="/Community" element={<Community loggedUser={user} monstra={monstra} setMonstra={setMonstra} setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} handleLogout={handleLogout} />} />
        <Route path="/:username" element={<ProfilePage user={user} monstra={monstra} setMonstra={setMonstra} setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} handleLogout={handleLogout} />} />
        <Route path="/Monsters" element={<ApiMonsters user={user} handleLogout={handleLogout} />} />
        <Route path="/Monsters/Data" element={<ApiMonsterData user={user} handleLogout={handleLogout} />} />
        <Route path="/Monsters/:monsterName" element={<ApiMonsterDetails user={user} handleLogout={handleLogout} getmonstahurl={getmonstahurl} handleMonster={handleMonster} />} />
        <Route path="/Spells" element={<ApiSpells user={user}/>} />
        <Route path="/Characters" element={<ApiCharacters user={user} />} />
        <Route path="/edit/:monsterId" element={<EditMonster user={user} editMonstra={editMonstra} />} /> */}
        <Route path="/Authorization" element={<AuthPage setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />} />
      </Routes>
      </div>
      
    );
  }

  return (
    <div 
      // style={
      //   backgroundState
      //   ? { backgroundImage:`url(${backgroundState})` }
      //   : { backgroundImage: `url(${BUCKET_START}Y4.png)` }
      // }
      className="user-background"
      > 
    <Routes>
      <Route path="/Authorization" element={<AuthPage setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/*" element={<Navigate to="/Authorization" />} />
    </Routes>
    </div>
  );
}

export default App;
