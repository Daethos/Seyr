import tokenService from "./tokenService";
const BASE_URL = "/api/message/";

export function createMessage(sendID: string, recID: string, message: any) {
    console.log('recID in API Utility', recID)
    console.log(message, '<- And the message in the utility api')
    return fetch (`${BASE_URL}${sendID}/${recID}`, {
        method: 'POST',
        body: JSON.stringify(message),
        // body: feeling,
        headers:  {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function deleteMessage(messageID: any) {
    return fetch(`${BASE_URL}delete/${messageID}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(), 
        }
      }).then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
      });
}

export function getMessages(userID: string) {
    console.log(userID, '<- User ID in Getting Message API Utility')
    return fetch (`${BASE_URL}${userID}`, {
        headers:  {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function getPersonalMessages(userID: string, friendID: any) {
    console.log(userID, '<- User ID in Getting Message API Utility')
    return fetch (`${BASE_URL}personal/${userID}/${friendID}`, {
        headers:  {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}