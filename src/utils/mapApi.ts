import tokenService from './tokenService';
const BASE_URL = '/api/maps/';

export async function getMap(asceanID: any) {
    return fetch(BASE_URL + '/fetch/' + asceanID, {
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
            const response = await res.json();
            console.log(response, '<- This is an error coming back from getting the map in the mapAPI utility');
            throw new Error(response.err);
    });
};

export async function createMap(data: object) {
    console.log(data, '<- asceanID in asceanIDAPI')
    return fetch(BASE_URL + 'create/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then(async (res) => {
        if (res.ok) return res.json(); 
            const response = await res.json();
            console.log(response, '<- This is an error coming back from creating the map in the mapAPI utility');
            throw new Error(response.err);
    });
};

export async function saveNewMap(map: any) {
    console.log(map, '<- map in mapAPI')
    return fetch(BASE_URL + map.reference, {
        method: "PUT",
        body: JSON.stringify(map),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then(async (res) => {
        if (res.ok) return res.json(); 
            const response = await res.json();
            console.log(response, '<- This is an error coming back from saving the map in the mapAPI utility');
            throw new Error(response.err);
    });
};