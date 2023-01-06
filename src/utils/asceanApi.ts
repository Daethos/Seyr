import tokenService from './tokenService';
const BASE_URL = '/api/ascean/';

export async function create(ascean: any) {
    console.log(ascean, '<- ascean in asceanAPI')
    return fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(ascean),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        
        },
        // options.headers = { 'Content-Type': 'application/json' };
        // options.body = JSON.stringify(payload);
    }).then((res) => {
        // console.log(res.json(), '<- res.json in create function')
        if (res.ok) return res.json(); 
        // res.ok will be try if the http statusCode in the response is anything in the 200's
        return res.json().then(response => {
        console.log(response, '<- What response are you getting?')
        throw new Error(response.err)
        })
    });
}

export async function getAllAscean() {
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

export async function getAsceanStats(ascean: any) {
    return fetch(BASE_URL + 'stats/' + ascean, {
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
   

export async function deleteAscean(ascean: string) {
    return fetch(BASE_URL + ascean, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then((response) => {
            console.log(response, '<- Response in Delete Ascean in asceanApi')
            throw new Error (response.err)
        })
    })
}

export async function edit(vaEsai: any) {
    console.log(vaEsai, '<- New Ascean vaEsai!')
    return fetch(BASE_URL + vaEsai._id, {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Edit Utility Return')
        })
    })
}

export async function highScore(vaEsai: any) {
    console.log(vaEsai, 'Are We Updating the High Score?')
    return fetch(BASE_URL + 'highscore', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in High Score Utility Return')
        })
    })
}

export async function saveExperience(vaEsai: any) {
    return fetch(BASE_URL + 'exp', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }}).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Save Experience Utility Return')
        });
    });
}

export async function levelUp(vaEsai: any) {
    return fetch(BASE_URL + 'levelup', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Level Up Utility Return')
        });
    });
}

export async function saveToInventory(vaEsai: any) {
    return fetch(BASE_URL + 'inventory', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, '<- Response in Save to Inventory Utility Return')
        });
    });
}