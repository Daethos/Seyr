import tokenService from './tokenService';
const BASE_URL = '/api/game/'

export function initiateAction(actionType: string, combatPayload: any) {
    return fetch(BASE_URL + actionType, {
        method: 'PUT',
        body: JSON.stringify(combatPayload),
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