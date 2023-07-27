type Dialog = {
    conditions: {};
    challenge: {}; 
    farewell: {}; 
    localLore: {};
    localWhispers: {};
    persuasion: {}; 
    provincialWhispers: {}; 
    worldLore: {};
};

const createDialog = () => {
    return {
        conditions: {},
        challenge: {}, 
        farewell: {}, 
        localLore: {},
        localWhispers: {},
        persuasion: {}, 
        provincialWhispers: {}, 
        worldLore: {},
    };
};

const Opponent: Record<string, Dialog> = {
    // World Opponents
    "Achreon Druid" : {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},
    }, // Daethic Kingdom - Soverains || Lvl 4
    "Ahn'are Apostle": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Firelands || Lvl 4
    "Anashtre": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Astralands || Lvl 6
    "Astral Apostle": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Astralands || Lvl 4
    "Cambiren Druid": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Chiomic Jester": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Astralands || Lvl 4
    "Daethic Inquisitor": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Licvitas || Lvl 6
    "Daethic Knight": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Licivitas || Lvl 6
    "Fang Duelist" : {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // West Fangs || Lvl 1
    "Fang Mercenary": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},  // West Fangs || Lvl 1
    "Firesworn": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Firelands || Lvl 6
    "Fyers Occultist": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Firelands || Lvl 4
    "Ilire Occultist": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Daethic Kingdom - Soverains || Lvl 4
    "Kingsman": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Daethic Kingdom || Lvl 6
    "Kyn'gian Shaman": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Licivitan Soldier": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Licivitas || Lvl 6
    "Ma'ier Occultist": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Firelands - Sedyrus || Lvl 4
    "Marauder": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},  // West Fangs || Lvl 1
    "Northren Wanderer" : {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // No Man's Land || Lvl 1
    "Nyren": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Old Li'ivi Occultist": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Quor'eite Occultist": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Sedyrus || Lvl 4
    "Quor'eite Stalker" : {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Sedyrus || Lvl 1
    "Rahvrecur": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Se'dyrist": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Sedyreal Guard": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Sedyrus || Lvl 6
    "Se'va Shrieker": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Shrygeian Bard": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Southron Wanderer" : {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Sedyrus || Lvl 1
    "Soverain Blood Cloak": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Soverains || Lvl 6
    "Tshaeral Shaman" : {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},}, // Sedyrus || Lvl 4

    // // Named Opponents
    "Ashreu'ul": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Cyrian Shyne": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Daetheus": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Dorien Caderyn": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Eugenes": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Evrio Lorian Peroumes": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Fierous Ashfyre": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Garris Ashenus": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "King Mathyus Caderyn": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Kreceus": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Laetrois Ath'Shaorah": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Leaf": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Lorian": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Mavros Ilios": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Mirio": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Quor'estes": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Relien Myelle": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Sera Lorian": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Sky": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Synaethi Spiras": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {},
        worldLore: {},},
    "Torreous Ashfyre": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {}, 
        worldLore: {},
    },
    "Vincere": {
        conditions: {},
        challenge: {},
        farewell: {},
        localLore: {},
        localWhispers: {},
        persuasion: {},
        provincialWhispers: {}, 
        worldLore: {},
    },
} 

export function getNpcDialog(npc: string): Dialog {
    if (!(npc in Opponent)) {
        return createDialog();
    };
    return Opponent[npc];
};
  

type MerchantDialog = {
    farewell: {};
    services: {};
};

const NPC: Record<string, MerchantDialog> = {
    "Traveling General Merchant" : {
        farewell: {},
        services: {},
    },
}

export function getMerchantDialog(merchant: string): MerchantDialog {
    if (!(merchant in NPC)) {
        throw new Error(`Merchant '${merchant}' not found in NPC object.`);
    }
    return NPC[merchant];
};