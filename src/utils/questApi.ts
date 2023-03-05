import tokenService from "./tokenService";
const BASE_URL = "/api/quest/";

export async function createQuest(data: { player: { _id: any; }; }) {
    return fetch(BASE_URL + "create/" + data.player._id, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, "<- This is an error coming back from creating the quest in the questAPI utility");
        throw new Error(response.err);
    });
};