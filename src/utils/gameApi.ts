import tokenService from './tokenService';
const BASE_URL = '/api/game/'

export async function initiateAction(combatData: any) {
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

export async function effectTick(data: any) {
    const res = await fetch(BASE_URL + 'effect-tick', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    });
    if (res.ok) return res.json();
    const response = await res.json();
    console.log(response, '<- Response in Game Utility API');
};

export async function phaserAction(combatData: any) {
    const res = await fetch(BASE_URL + 'phaser', {
        method: 'PUT',
        body: JSON.stringify(combatData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    });
    if (res.ok) return res.json();
    const response = await res.json();
    console.log(response, '<- Response in Game Utility API');
};

export async function instantAction(combatData: any) {
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
};