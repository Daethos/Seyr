import tokenService from './tokenService';
const BASE_URL = '/api/friends/';

export function friendStatus(friend: string) {
    return fetch (`${BASE_URL}status/${friend}`, {
        // body: JSON.stringify(friend),
        // body: friend,
        headers:  {
            //'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function friendRequest(userID: any, friend: string) {
    console.log('Friend in API Utility', friend)
    return fetch (`${BASE_URL}${userID}/${friend}`, {
        method: 'POST',
        // body: JSON.stringify(friend),
        // body: friend,
        headers:  {
            //'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function friendDecline(userID: any, friend: any) {
    console.log('Declining: ', friend,' in FRIEND API UTILITY!')
    return fetch(`${BASE_URL}${userID}/${friend}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
          // local storage and send its in the header to the server
        }
      }).then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
      });
}

export function friendAccept(userId: any, friend: any) {
    return fetch (`${BASE_URL}accept/${userId}/${friend.userId._id}`, {
        method: 'PUT',
        body: JSON.stringify(friend),
        headers:  {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Friend Accept Utility Return')
        })
    })
}

export function getAllFriends(userID: any) {
    // console.log('Getting Friends in API Utility', userID)
    return fetch (`${BASE_URL}${userID}`, {
        headers:  {
            //'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}