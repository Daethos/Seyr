import tokenService from './tokenService';
const BASE_URL = '/api/equipment/';

export async function index() {
    console.log('%c We have made it to the Index in the API Utility', 'color: green')
    return fetch(BASE_URL, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
            console.log(response);
            throw new Error(response.err);
        })
    })
}

export async function getLootDrop(level: number) {
    return fetch(BASE_URL + 'lootdrop/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
            console.log(response);
            throw new Error(response.err);
        })
    })
}