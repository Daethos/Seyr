import tokenService from "./tokenService";
const BASE_URL = "/api/";

export function createFeeling(asceanID: any) {
    return fetch (`${BASE_URL}ascean/${asceanID}/feelings`, {
        method: 'POST',
        headers:  {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res: any) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function removeFeeling(feelingID: any) {
    return fetch(`${BASE_URL}feelings/${feelingID}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
          // local storage and send its in the header to the server
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