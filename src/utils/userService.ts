import tokenService from './tokenService';
const BASE_URL = '/api/users/';

async function getProfile(username: any){
  console.log('getProfile calling: ', username)
  const res = await fetch(BASE_URL + username, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), // <- since this will be called when we're logged in, send over the jwt token
    }
  });
  // This function happens when the browser recieves a response from the express server
  if (res.ok) return res.json();
  throw new Error('Error from getProfile Request, check the server terminal!');
};

async function getRandomEnemy(data: object) {
  const res = await fetch(BASE_URL + 'enemy', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken(),
    }
  });
  if (res.ok)
    return res.json();
  throw new Error('Error from getRandomEnemy Request, check the server terminal!');
};

async function getRandomDeadEnemy(data: object) {
  const res = await fetch(BASE_URL + 'dead-enemy', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken(),
    }
  });
  if (res.ok)
    return res.json();
  throw new Error('Error from getRandomEnemy Request, check the server terminal!');
};

async function signup(user: any) {
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
  }).then(({token}) => tokenService.setToken(token));
  // The above could have been written as .then((token) => token.token);
};

async function updateUser(user: object) {
  return fetch (BASE_URL + 'update', {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  }).then((res) => {
    if (res.ok) return res.json()
    throw new Error('Error Updating User')
  });
};

async function updateBio(user: object) {
  return fetch (BASE_URL + 'updateBio', {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken()
    }
  }).then((res) => {
    if (res.ok) return res.json()
    throw new Error('Error Updating User')
  });
};

async function updatePassword(user: object) {
    return fetch (BASE_URL + 'changePassword', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json()
        throw new Error('Error Updating User')
    });
};

function getUser() {
  return tokenService.getUserFromToken();
};

function logout() {
  tokenService.removeToken();
};

async function login(creds: any) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(async res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    const response = await res.json();
    console.log(response);
    throw new Error(response.err);
  }).then(({token}) => tokenService.setToken(token));
};

async function searchUser(search: string) {
  return fetch(`/api/users?search=` + search, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken()
    } 
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error('Error Searching Users in UserService');
  });
};

async function createGuestToken() {
  return fetch(BASE_URL + 'guest-token')
    .then(async res => {
      if (res.ok) return res.json();
      const response = await res.json();
      throw new Error(response.err);
    }).then(({ token }) => tokenService.setToken(token));
};

async function demo() {
    return fetch(BASE_URL + 'demo', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
    }).then(async res => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    }).then(({token}) => tokenService.setToken(token));
};

export default {
  signup, 
  logout,
  login,
  getUser,
  getProfile,
  searchUser,
  updateUser,
  updateBio,
  updatePassword,
  getRandomEnemy,
  getRandomDeadEnemy,
  createGuestToken,
  demo
};
