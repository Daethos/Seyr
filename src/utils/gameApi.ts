import tokenService from './tokenService';
const BASE_URL = '/api/game/'

export async function initiateAction(combatData: any) {
    console.log(combatData, 'Combat Data in the Game API Utility');
    
    const res = await fetch(BASE_URL + 'initiate', {
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    });
    if (res.ok)
        return res.json();
    const response = await res.json();
    console.log(response, '<- Response in Game Utility API');
};

export async function instantAction(combatData: any) {
    console.log(combatData, 'Combat Data in the Game API Utility');
    const res = await fetch(BASE_URL + 'instant', {
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    });
    if (res.ok)
        return res.json();
    const response = await res.json();
    console.log(response, '<- Response in Game Utility API');
};

export async function consumePrayer(combatData: any) {
    console.log(combatData, 'Combat Data in the Game API Utility');
    const res = await fetch(BASE_URL + 'prayer', {
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    });
    if (res.ok)
        return res.json();
    const response = await res.json();
    console.log(response, '<- Response in Game Utility API');
};

export async function pvpAction(combatData: any) {
    console.log(combatData, 'Combat Data in the Game API Utility');
    
    const res = await fetch(BASE_URL + 'pvp', {
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    });
    if (res.ok)
        return res.json();
    const response = await res.json();
    console.log(response, '<- Response in Game Utility API');
}