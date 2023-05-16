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
    }).then(async (res) => {
        if (res.ok) return res.json(); 
        const response = await res.json();
        console.log(response, '<- What response are you getting?');
        throw new Error(response.err);
    });
};

export async function getAllAscean() {
    return fetch(BASE_URL, {
        headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
}

export async function getAllAsceanLean() {
    return fetch(BASE_URL + 'lean', {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
};

export async function getOneAscean(asceanID: string | undefined) {
    return fetch(BASE_URL + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
}

export async function getCleanAscean(asceanID: string | undefined) {
    return fetch(BASE_URL + 'clean/' + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getOneAsceanLight(asceanID: string | undefined) {
    return fetch(BASE_URL + 'light/' + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getAsceanAndInventory(asceanID: string | undefined) {
    return fetch(BASE_URL + 'ascean-inventory/' + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
};

export async function getAsceanInventory(asceanID: string | undefined) {
    return fetch(BASE_URL + 'inventory/' + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
};

export async function saveAsceanInventory(data: any) {
    return fetch(BASE_URL + 'save-inventory/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function getAsceanQuests(asceanID: string | undefined) {
    return fetch(BASE_URL + 'quests/' + asceanID, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
};

export async function getNamedAscean(asceanName: string | undefined) {
    return fetch('/api/ascean/search?search=' + asceanName, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
}

export async function getAsceanStats(ascean: any) {
    return fetch(BASE_URL + 'stats/' + ascean, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
}

export async function getAnimalStats(animal: any) {
    return fetch(BASE_URL + 'animal/', {
        method: 'POST',
        body: JSON.stringify(animal),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    })
}
   

export async function deleteAscean(ascean: string) {
    return fetch(BASE_URL + ascean, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Delete Ascean in asceanApi');
        throw new Error(response.err);
    })
};

export async function kill(ascean: string | undefined) {
    return fetch(BASE_URL + 'kill/' + ascean, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Delete Ascean in asceanApi');
        throw new Error(response.err);
    })
};

export async function persist(data: any) {
    console.log(data, '<- data ');
    return fetch(BASE_URL + 'persist/' + data.lineage._id, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        
        },
    }).then(async (res) => {
        if (res.ok) return res.json(); 
        const response = await res.json();
        console.log(response, '<- What response are you getting?');
        throw new Error(response.err);
    });
};

export async function edit(vaEsai: any) {
    console.log(vaEsai, '<- New Ascean vaEsai!')
    return fetch(BASE_URL + vaEsai._id, {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Edit Utility Return');
    });
};

export async function recordThievery(data: any) {
    return fetch(BASE_URL + 'thievery/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function recordCombatStatistic(data: any) {
    return fetch(BASE_URL + 'combatStatistic/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function recordNonCombatStatistic(data: any) {
    return fetch(BASE_URL + 'nonCombatStatistic/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
};

export async function saveJournalEntry(data: any) {
    return fetch(BASE_URL + 'journal/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response);
        throw new Error(response.err);
    });
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
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in High Score Utility Return');
    });
};

export async function setCurrency(vaEsai: any) {
    return fetch(BASE_URL + 'setCurrency', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }}).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Save Experience Utility Return');
    });
};

export async function setExperience(vaEsai: any) {
    return fetch(BASE_URL + 'setExp', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }}).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Save Experience Utility Return');
    });
};

export async function saveExperience(vaEsai: any) {
    return fetch(BASE_URL + 'exp', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }}).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Save Experience Utility Return');
    });
};

export async function levelUp(vaEsai: any) {
    return fetch(BASE_URL + 'levelup', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Level Up Utility Return');
    });
};

export async function saveToInventory(vaEsai: any) {
    return fetch(BASE_URL + 'inventory', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
    }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Save to Inventory Utility Return');
    });
}

export async function purchaseToInventory(vaEsai: any) {
    return fetch(BASE_URL + 'purchase', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if(res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Purchase to Inventory Utility Return');
    })
}

export async function equipmentSwap(vaEsai: any) {
    return fetch(BASE_URL + vaEsai._id + '/swap', {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Equipment Swap Utility Return');
    });
}

export async function removeItem(vaEsai: any) {
    return fetch(BASE_URL + 'remove/' + vaEsai.id, {
        method: 'PUT',
        body: JSON.stringify(vaEsai),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, '<- Response in Remove Item Utility Return');
    });
};

export async function asceanHealth(data: any) {
    return fetch(BASE_URL + 'health/'  + data.health + '/' + data.id + '/', {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, "<- Response in Ascean Health Utility Return");
    });
};

export async function asceanTax(data: any) {
    return fetch(BASE_URL + data.tax + '/' + data.id + '/', {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, "<- Response in Ascean Tax Utility Return");
    });
};

export async function drinkFirewater(ascean: string) {
    return fetch(BASE_URL + 'firewater/' + ascean, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, "<- Response in Drink Firewater Utility Return");
    });
};

export async function restoreFirewater(ascean: string) {
    return fetch(BASE_URL + 'restoreFirewater/' + ascean, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, "<- Response in Drink Firewater Utility Return");
    })
}

export async function replenishFirewater(ascean: string) {
    return fetch(BASE_URL + 'replenishFirewater/' + ascean, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res) => {
        if (res.ok) return res.json();
        const response = await res.json();
        console.log(response, "<- Response in Drink Firewater Utility Return");
    })
};

export async function saveCoords(data: any) {
    return fetch(BASE_URL + 'coords/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        }
    }).then(async (res: any) => {
        if (res.ok) return res.json();
        return res.json().then((response: any) => {
            console.log(response, '<- Response in Save Coords Utility Return')
        })
    })
};

export async function saveTutorial(data: any) {
    return fetch(BASE_URL + 'tutorial/' + data.ascean + '/' + data.tutorial, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res: any) => {
        if (res.ok) return res.json();
        return res.json().then((response: any) => {
            console.log(response, '<- Response in Save Tutorial Utility Return')
        });
    });
};

export async function blessAscean(ascean: string) {
    return fetch(BASE_URL + 'bless/' + ascean, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(async (res: any) => {
        if (res.ok) return res.json();
        return res.json().then((response: any) => {
            console.log(response, '<- Response in Save Tutorial Utility Return')
        });
    });
};