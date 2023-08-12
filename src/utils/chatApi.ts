import tokenService from "./tokenService";
const BASE_URL = "/api/chat/";

export async function accessChat(userId: string) {
    console.log('Accessing Chat in chatAPI w/ ', userId)
    return fetch (BASE_URL + userId, {
        method: 'POST',
        // body: JSON.stringify(userId),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export async function fetchChat() {
    return fetch (BASE_URL, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export async function createGroupChat(groupData: any) {
    console.log(groupData, 'We are in the chatAPI')
    return fetch (BASE_URL + `group`, {
        method: 'POST',
        body: JSON.stringify(groupData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export async function renameGroup(groupName: object) {
    console.log(groupName, 'New group name in chatAPI')
    return fetch (BASE_URL + `rename`, {
        method: 'PUT',
        body: JSON.stringify(groupName),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export async function addToGroup(user: object) {
    return fetch (BASE_URL + `groupadd`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export async function removeFromGroup(user: object) {
    return fetch (BASE_URL + `groupremove`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}