import tokenService from './tokenService';
const BASE_URL = '/api/community/';

export async function getEveryone() {
    return fetch(BASE_URL, {
        headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
        console.log(response)
        throw new Error(response.err)
        })
    });
}

export async function getOneAscean(asceanID: string | undefined) {
    return fetch(BASE_URL + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response)
            throw new Error(response.err)
        })
    })
}