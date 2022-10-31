import tokenService from './tokenService';
const BASE_URL = '/api/game/'

export function initiateAction(actionType: string, combatData: any) {
    return fetch(BASE_URL + actionType, { // actionType = combatData.action !
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