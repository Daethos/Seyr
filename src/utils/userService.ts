import tokenService from './tokenService';
const BASE_URL = '/api/users/';


function getProfile(username: string){
  console.log('getProfile calling')
  return fetch(BASE_URL + username, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), // <- since this will be called when we're logged in, send over the jwt token
      // so the server knows who's making the request from the client
    }
  }).then(res => {
    // This function happens when the browser recieves a response from the express server
    if(res.ok) return res.json();
    throw new Error('Error from getProfile Request, check the server terminal!')
  })
}

// NOTE THIS IS configured to send of a multi/part form request
// aka photo 
function signup(user: any) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    body: user
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    
    // Writing your error handling like this allows you to throw the error response 
    // to the catch block where signup occurs,  

//     res.status(400).json({ err: "Something went wrong" }); notice err, and response.err match
    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // Setting our token in localStorage in our browser
  // then we'll be able to use with every request!
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds: any) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  })
  .then(({token}) => tokenService.setToken(token));
}


export default {
  signup, 
  logout,
  login,
  getUser,
  getProfile
};
