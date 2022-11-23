import tokenService from './tokenService';
const BASE_URL = '/api/game/'

export function initiateAction(combatData: any) {
    console.log(combatData, 'Combat Data in the Game API Utility');
    
    return fetch(BASE_URL + 'initiate', { //  = combatData.action !
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Game Utility API')
        })
    })
}

export function pvpAction(combatData: any) {
    console.log(combatData, 'Combat Data in the Game API Utility');
    
    return fetch(BASE_URL + 'pvp', { //  = combatData.action !
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Game Utility API')
        })
    })
}