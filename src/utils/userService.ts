import tokenService from './tokenService';
const BASE_URL = '/api/users/';

function getProfile(username: any){
  console.log('getProfile calling: ', username)
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

function signup(user: any) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    body: user
  })
  .then(res => {
    if (res.ok) return res.json();
    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  })
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as .then((token) => token.token);
}

function updateUser(user: object) {
  return fetch (BASE_URL + 'update', {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  })
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error('Error Updating User')
  })
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

function searchUser(search: string) {
  return fetch(`/api/users?search=` + search, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken()
    } 
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Searching Users in UserService')
  })
}

export default {
  signup, 
  logout,
  login,
  getUser,
  getProfile,
  searchUser,
  updateUser
};
