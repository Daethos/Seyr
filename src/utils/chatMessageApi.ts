import tokenService from "./tokenService";
const BASE_URL = "/api/chatMessages";

export async function sendMessage(message: any) {
    console.log(message, 'Message in chat message api')
    return fetch (BASE_URL, {
        method: 'POST',
        body: JSON.stringify(message),
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

export async function allMessages(chatId: string) {
    console.log(chatId, 'Chat ID in chat message api')
    return fetch (BASE_URL + `/${chatId}`, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}