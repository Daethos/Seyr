import tokenService from "./tokenService";
const BASE_URL = "/api/chatMessages";

export async function sendMessage(message: any) {
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
};

export async function allMessages(chatId: string) {
    return fetch (BASE_URL + `/${chatId}`, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
};

export async function allMessagesNotRead() {
    return fetch (BASE_URL + '/unread', {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
};

export async function markAsRead(chatId: string) {
    return fetch (BASE_URL + '/read/' + chatId, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
};