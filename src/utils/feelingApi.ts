import tokenService from "./tokenService";
const BASE_URL = "/api/";

export function createFeeling(asceanID: any, feeling: string) {
    console.log('Feeling in API Utility', feeling)
    return fetch (`${BASE_URL}ascean/${asceanID}/feelings/${feeling}`, {
        method: 'POST',
        // body: JSON.stringify(feeling),
        headers:  {
            //'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function removeFeeling(asceanID: any, feeling: string) {
    return fetch(`${BASE_URL}feelings/${asceanID}/${feeling}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(),
        }
      }).then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
      });
}

export function updateFeeling(feelingID: any) {
    return fetch (`${BASE_URL}feelings/${feelingID}`, {
        method: 'PUT',
        headers:  {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    })
}