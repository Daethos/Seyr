import tokenService from "./tokenService";
const BASE_URL = '/api/gamesettings/';

export async function getSettings() {
    const res = await fetch(BASE_URL, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error('Bad Credentials');
    };
};

export async function updateSettings(settings: any) {
    const res = await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(settings)
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error('Bad Credentials');
    };
};

export async function createSettings(settings: any) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(settings)
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error('Bad Credentials');
    };
};

export async function deleteSettings() {
    const res = await fetch(BASE_URL, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error('Bad Credentials');
    };
};