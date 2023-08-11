import tokenService from './tokenService';
const BASE_URL = '/api/equipment/';

export async function index() {
    return fetch(BASE_URL, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getLootDrop(level: number) {
    return fetch(BASE_URL + 'lootdrop/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function upgradeEquipment(data: object) {
    return fetch(BASE_URL + 'upgrade', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(data)
    })
    .then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getTestEquipment(equipment: object) {
    return fetch(BASE_URL + 'test/', {
        method: 'POST',
        body: JSON.stringify(equipment),
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
            console.log(response);
            throw new Error(response.err);
        });
    });
};

export async function getMerchantEquipment(level: number) {
    return fetch(BASE_URL + 'merchant/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getPhysicalWeaponEquipment(level: number) {
    return fetch(BASE_URL + 'physical-weapons/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getMagicalWeaponEquipment(level: number) {
    return fetch(BASE_URL + 'magical-weapons/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getArmorEquipment(level: number) {
    return fetch(BASE_URL + 'armor/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getClothEquipment(level: number) {
    return fetch(BASE_URL + 'cloth/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getJewelryEquipment(level: number) {
    return fetch(BASE_URL + 'jewelry/' + level, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function deleteEquipment(data: object) {
    return fetch(BASE_URL + 'delete', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
    })
    .then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function writeEquipment() {
    return fetch(BASE_URL + 'write', {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        },
    })
    .then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function writeEnemyDialog(dialog: any) {
    return fetch(BASE_URL + 'enemy-dialog/', {
        method: 'POST',
        body: JSON.stringify(dialog),
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
    }).then(async (res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
            console.log(response)
            throw new Error(response.err);
        });
    });
};

export async function deleteEnemyDialog(dialog: string) {
    return fetch(BASE_URL + 'delete-enemy-dialog/', {
        method: 'PUT',
        body: JSON.stringify(dialog),
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
    }).then(async (res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
            console.log(response)
            throw new Error(response.err);
        });
    });
};

export async function deleteEnemyDialogOption(dialog: any) {
    return fetch(BASE_URL + 'delete-enemy-option/', {
        method: 'PUT',
        body: JSON.stringify(dialog),
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        },
    }).then(async (res) => {
        if(res.ok) return res.json();
        return res.json().then(response => {
            console.log(response)
            throw new Error(response.err);
        });
    });
};