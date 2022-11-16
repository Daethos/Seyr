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

export function fetchChat() {
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