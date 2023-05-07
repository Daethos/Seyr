export interface Ascean {
    name: string;
    description: string;
    user: object;
    
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    
    weapon_one: object;
    weapon_two: object;
    weapon_three: object;
    shield: object;
    helmet: object;
    chest: object; 
    legs: object;
    amulet: object;
    ring_one: object;
    ring_two: object;
    trinket: object;
    
    faith: string;
    mastery: string;
    origin: string;
    sex: string;
    
    currency: object;
    experience: number;
    high_score: number;
    level: number;
    
    coordinates: object;
    firewater: { charges: number; maxCharges: number; };
    inventory: [];
    maps: [];
    quests: [];
    tutorial: object;
    
    index: string;
    shareable: string;
    visibiility: string;
    dislikes: [];
    double_dislikes: [];
    likes: [];
    [key: string]: any;
};

export interface Player extends Ascean {
    // Ascean Traits Determined By Mastery + Attributes
    primary: { name: string, description: string };
    secondary: { name: string, description: string };
    tertiary: { name: string, description: string };
};

export interface Enemy extends Ascean {
    named: boolean;
    type: string;
    humanoid: boolean;
    animal: boolean;
};

export interface NPC {
    name: string;
    named: boolean;
    type: string;
    description: string;
    
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    
    weapon_one: object;
    weapon_two: object;
    weapon_three: object;
    shield: object;
    helmet: object;
    chest: object; 
    legs: object;
    amulet: object;
    ring_one: object;
    ring_two: object;
    trinket: object;
    
    faith: string;
    mastery: string;
    origin: string;
    sex: string;
    
    currency: object;
    level: number;
    experience: number;
    dialogId: string;
};

export interface Equipment {
    name: string;
    type: string;
    rarity: string;
    itemType: string;
    grip: string | null;
    attack_type: string | null;
    damage_type: [string] | [string, string] | [string, string, string] | [] | null;
    physical_damage: number | null;
    magical_damage: number | null;
    physical_penetration: number | null;
    magical_penetration: number | null;
    physical_resistance: number | null;
    magical_resistance: number | null;
    critical_chance: number;
    critical_damage: number;
    dodge: number;
    roll: number;
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    influences: [string] | null;
    imgURL: string;
    _id: string;
}

const nonNamedEnemy = 
    ['Achreon Druid', "Ahn'are Apostle", "Anashtre", 
    "Astral Apostle", "Cambiren Druid", "Chiomic Jester", 
    "Daethic Inquisitor", "Daethic Knight", "Fang Duelist", 
    "Fang Mercenary", 'Firesworn', 'Fyers Occultist', 
    'Ilire Occultist', 'Kingsman', "Kyn'gian Shaman", 
    "Licivitan Soldier", "Ma'ier Occultist", "Marauder", 
    "Northren Wanderer", "Nyren", "Old Li'ivi Occultist", 
    "Quor'eite Occultist", "Quor'eite Stalker", "Rahvrecur", 
    "Se'dyrist", "Sedyreal Guard", "Se'va Shrieker", 
    "Shrygeian Bard", "Southron Wanderer", "Soverain Blood Cloak", "Tshaeral Shaman"];

const namedEnemy = 
    ["Achreus", "Ashreu'ul", "Caelan Greyne", "Chios Dachreon", "Cyrian Shyne", "Daetheus", 
    "Dorien Caderyn", "Eugenes", "Evrio Lorian Peroumes", "Fierous Ashfyre", "Garris Ashenus", 
    "King Mathyus Caderyn", "Kreceus", "Laetrois Ath'Shaorah", "Leaf", "Lorian", "Mavros Ilios", 
    "Mirio", "Quor'estes", "Relien Myelle", "Sera Lorian", "Synaethi Spiras", "Torreous Ashfyre", "Vincere"];

export const nameCheck = (name: string) => {
    if (namedEnemy.includes(name)) {
        return true;
    } else {
        return false;
    };
};

export const ENEMY_ENEMIES = {
    "Achreon Druid": ["Kyn'gian Shaman", "Tshaeral Shaman", "Kingsman", "Northren Wanderer"],
    "Ahn'are Apostle": ["Astral Apostle", "Licivitan Soldier", "Daethic Inquisitor", "Daethic Knight"],
    "Anashtre": ["Daethic Knight", "Soverain Blood Cloak", "Licivitan Soldier", "Daethic Inquisitor"],
    "Astral Apostle": ["Ahn'are Apostle", "Licivitan Soldier", "Daethic Inquisitor", "Daethic Knight"],
    "Cambiren Druid": ["Kyn'gian Shaman", "Tshaeral Shaman", "Kingsman", "Northren Wanderer"],
    "Chiomic Jester": ["Fang Duelist", "Fang Mercenary", "Marauder", "Shrygeian Bard"],
    "Daethic Inquisitor": ["Ilire Occultist", "Fyers Occultist", "Ma'ier Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Daethic Knight": ["Anashtre", "Soverain Blood Cloak", "Firesworn", "Se'va Shrieker", "Quor'eite Stalker"],
    "Fang Duelist": ["Chiomic Jester", "Fang Mercenary", "Marauder", "Shrygeian Bard"],
    "Fang Mercenary": ["Chiomic Jester", "Fang Duelist", "Marauder", "Shrygeian Bard"],
    "Firesworn": ["Daethic Knight", "Fang Mercenary", "Se'va Shrieker", "Quor'eite Stalker", "Southron Wanderer"],
    "Fyers Occultist": ["Daethic Inquisitor", "Ilire Occultist", "Ma'ier Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Ilire Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ma'ier Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Kingsman": ["Achreon Druid", "Cambiren Druid", "Northren Wanderer", "Soverain Blood Cloak"],
    "Kyn'gian Shaman": ["Achreon Druid", "Cambiren Druid", "Southron Wanderer", "Sedyreal Guard", "Quor'eite Stalker"],
    "Licivitan Soldier": ["Old Li'ivi Occultist", "Firesworn", "Soverain Blood Cloak", "Kingsman", "Se'va Shrieker"],
    "Ma'ier Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ilire Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Marauder": ["Fang Duelist", "Fang Mercenary", "Chiomic Jester", "Shrygeian Bard"],
    "Northren Wanderer": ["Achreon Druid", "Cambiren Druid", "Kingsman", "Soverain Blood Cloak"],
    "Nyren": ["Rahvrecur", "Se'va Shrieker", "Marauder", "Fang Mercenary"],
    "Old Li'ivi Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ilire Occultist", "Ma'ier Occultist", "Quor'eite Occultist"],
    "Quor'eite Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ilire Occultist", "Ma'ier Occultist", "Old Li'ivi Occultist"],
    "Quor'eite Stalker": ["Daethic Knight", "Firesworn", "Se'va Shrieker", "Sedyreal Guard", "Southron Wanderer"],
    "Rahvrecur": ["Nyren", "Se'va Shrieker", "Marauder", "Fang Mercenary"],
    "Se'dyrist": ["Se'va Shrieker", "Fang Mercenary", "Sedyreal Guard", "Firesworn"],
    "Sedyreal Guard": ["Se'dyrist", "Se'va Shrieker", "Firesworn", "Quor'eite Stalker", "Southron Wanderer"],
    "Se'va Shrieker": ["Se'dyrist", "Sedyreal Guard", "Firesworn", "Quor'eite Stalker", "Southron Wanderer"],
    "Shrygeian Bard": ["Chiomic Jester", "Fang Duelist", "Fang Mercenary", "Marauder"],
    "Southron Wanderer": ["Firesworn", "Quor'eite Stalker", "Sedyreal Guard", "Se'va Shrieker"],
    "Soverain Blood Cloak": ["Anashtre", "Licivitan Soldier", "Kingsman", "Northren Wanderer"],
    "Tshaeral Shaman": ["Achreon Druid", "Cambiren Druid", "Daethic Knight", "Daethic Inquisitor"],

    "Cyrian Shyne": ["King Mathyus Caderyn"],
    "Dorien Caderyn": ["Garris Ashenus"],
    "Eugenes": [""],
    "Evrio Lorian Peroumes": ["Mirio"],
    "Fierous Ashfyre": ["Synaethi Spiras"],
    "Garris Ashenus": ["Dorien Caderyn"],
    "King Mathyus Caderyn": ["Cyrian Shyne"],
    "Kreceus": ["Ahn'are Apostle", "Licivitan Soldier", "Evrio Lorian Peroumes", "Mirio"],
    "Laetrois Ath'Shaorah": ["Mavrios Ilios"],
    "Leaf": ["Kingsman", "Northren Wanderer"],
    "Lorian": ["Mavrios Ilios"],
    "Mavrios Ilios": ["Laetrois Ath'Shaorah", "Lorian"],
    "Mirio": ["Evrio Lorian Peroumes"],
    "Sera Lorian": ["Evrio Lorian Peroumes", "Dorien Caderyn"],
    "Synaethi Spiras": ["Fierous Ashfyre", "Torreous Ashfyre"],
    "Torreous Ashfyre": ["Synaethi Spiras"],
    "Vincere": ["King Mathyus Caderyn", "Dorien Caderyn", "Sera Lorian", "Evrio Lorian Peroumes"]
};

export const QUESTS = [
    {
        name: ["Marauder", "Southron Wanderer", "Fang Mercenary", "Quor'eite Occultist"],
        title: "Lost Temple",
        description: "Travel deep into the jungle to find a hidden temple and explore its secrets", 
        isBounty: false,
    },
    {
        name: ["Tshaeral Shaman", "Kyn'gian Shaman", "Achreon Druid", "Cambiren Druid", "Se'va Shrieker", "Fyers Occultist"],
        title: "Replenish Firewater",
        description: "To walk in the land of hush and tendril and refill your flask, you must let it bleed--not of yourself but of our enemy",
        isBounty: false,
    },
    {
        name: ["Northren Wanderer", "Southron Wanderer", "Nyren", "Rahvrecur", "Se'dyrist"],
        title: "Sunken Cities",
        description: "Explore the ruins of an ancient city and discover its treasures",
        isBounty: false,
    },
    {
        name: ["Fang Duelist", "Shrygeian Bard", "Chiomic Jester"],
        title: "The Murder of a Merchant",
        description: "Aid in the investigation of a murder that occured recently",
        isBounty: false,
    },
    {
        name: ["Ma'ier Occultist", "Old Li'ivi Occultist", "Eugenes", "Garris Ashenus"],
        title: "Mist of the Moon",
        description: "Ingratiate yourself with the Ma'ier and gain their trust to understand the Blood Moon Prophecy",
        isBounty: false,
    },
    {
        name: ["Ilire Occultist", "Old Li'ivi Occultist"],
        title: "Sheath of the Sun",
        description: "Ingratiate yourself with the Ilire and gain their trust to understand the Black Sun Prophecy",
        isBounty: false,
    },
    {
        name: ["Achreon Druid", "Cambiren Druid"],
        title: "The Draochre",
        description: "Ingratiate yourself with the Druids and gain their trust to understand the Wild",
        isBounty: false,
    },
    {
        name: ["Tshaeral Shaman", "Kyn'gian Shaman", "Dorien Caderyn", "Mirio"],
        title: "The Land of Hush and Tendril",
        description: "Peer into this. Spoken as though not of this world, yet all the same it wraps. Do you wish this?",
        isBounty: false,
    },
    {
        name: ["Fyers Occultist", "Firesworn", "Torreous Ashfyre", "Fierous Ashfyre"],
        title: "The Phoenix",
        description: "Learn more about the Phoenix and its origin of rebirth",
        isBounty: false,
    },
    {
        name: ["Ahn'are Apostle", "Synaethis Spiras", "Kreceus"],
        title: "The Ahn'are",
        description: "Learn more about the Ahn'are and their origin of flight",
        isBounty: false,
    },
    {
        name: ["Sera Lorian", "Daethic Inquisitor", "Daethic Knight"],
        title: "Seek Devotion",
        description: "Become initiated into the faith of Daethos",
        isBounty: false,
    },
    {
        name: ["Anashtre", "Ahn'are Apostle", "Astral Apostle", "Kreceus"],
        title: "Anashtre Ascension",
        description: "Seek information about the Anashtre and the ritual of the past to form the lightning wing of Astra",
        isBounty: false,
    },
    {
        name: ["Old Li'ivi Occultist", "Chiomic Jester", "Shrygeian Bard"],
        title: "Curse of the Ky'myr",
        description: "Track down the mystery behind the Ky'myr and its curse of ceaselessness.",
        isBounty: false,

    },
    {
        name: ["Daethic Inquisitor", "Daethic Knight", "Lorian", "Mavros Ilios"],
        title: "Providence",
        description: "Aid in the proliferation of Daethos across the land",
        isBounty: false,

    }
];

export const getQuests = (name: string) => {
    return QUESTS.filter(quest => quest.name.includes(name));
};

export const TRAIT_DESCRIPTIONS = {
    "Ilian": {
        persuasion: {
            description: "a sense of autoritas is weighted in your words, and can sway the minds of others.",
            action: "You're Ilianic, and are able to convince others of your point of view.",
            success: "Success!",
            failure: "Failure!",
        },
        heroism: {
            description: "your Ilian nature exudes a heroism that touches others inexplicably.",
            action: "You evoke a sense of heroism in others, and can change the outcome of encounters.",
            success: "Success!",
            failure: "Failure!",
        }
    },
    "Kyn'gian": {
        avoidance: {
            description: "you can avoid most encounters if you are quick enough.",
            action: "You remain at the edges of sight and sound, and before {enemy.name} can react, you attempt to flee.",
            success: "You can't even be sure they caught sight of you as you slip away.",
            failure: "You are unable to escape {enemy.name}'s grasp despite your stride.",
        },
        endurance: {
            description: "you are able to recover your health over time.",
            action: "The blood of the Tshios course through your veins.",
            success: "You regenerate health over time.",
            failure: "You regenerate health over time.",
        }
    },
    "Arbituous": {
        persuasion: {
            description: "you can use your knowledge of ley law to deter enemies from attacking you.",
            action: "Attempt to convince {enemy.name} of the current ley law as it stands, and their attempt to break it with murder will not stand before a trial by Arbiter, with precedent set to execute those outside the ley harming those within. And the enemy truly wishes not to acost the achre of the arbiters--last war the Arbiter's entered caused the other side to cede their religiosity entirely, and the reckoning of one's eternal caeren seems a bit harsher than the whole business of simple murdering--which while they have their merits in a merciless world wrought with mischief, isn't really the angle you're going with in order to skirt this combat issue. In summation, attempts to harm you are unequally disadvantageous for all parties involved, and you'd really prefer to getting back on the road, if possible.",
            success: "Success! There shall be no need of murder.",
            failure: "{enemy.name} seems more convinced of that whole murder thing."
        },
        luckout: {
            description: "Can convince the enemy through rhetoric to cease hostility",
            action: "Unleash a dizzying array of syllables and concatenated and contracted words to upend the attempted assault.",
            greaterSuccess: "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}.",
            success: "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}.",
            failure: "The tangled rhetoric appears to have caused a cessation of higher functioning in {enemy.name}'s mind, and has relegated to clearing it by vanquishing you at all costs."
        }
    },
    "Lilosian": {
        persuasion: {
            description: "you can speak to you and your enemies common faith and sway their hand at violence.",
            action: "Speak on the virtues of {ascean.weapon_one.influences[0]} to {enemy.name}.",
            success: "Tears well up in the {enemy.name}'s eyes. 'All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}.'",
            failure: "A beautiful speech upended by the simple notion of {enemy.name}'s {enemy.faith} faith to {enemy.weapon_one.influences[0]}."
        },
        luckout: {
            description: "you can convince the enemy to profess their follies and willow.",
            action: "Show {enemy.name} the way of peace through {ascean.weapon_one.influences[0]}",
            success: "Tears well up in {enemy.name}'s eyes. 'I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry.'",
            failure: "A beautiful gesture upended by the simple notion of {enemy.name}'s {enemy.faith} faith to {enemy.weapon_one.influences[0]}."
        }
    },
    "Kyr'naic": {
        persuasion: {
            description: "you can persuade the enemy to cease the pitiless attempt to invoke meaning and purpose in themselves by base and petty means, and to instead embrace the hush and tendril of things.",
            action: "Shame {enemy.name} for their attempt to invoke meaning and purpose in themselves by base and petty means.",
            success: "{ascean.name}, all my life as {article} {enemy.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you.",
            failure: "Seems {enemy.name} is not ready to give up on their attempt to invoke meaning and purpose in themselves by base and petty means."
        },
        luckout: {
            description: "you can convince the enemy to acquiesce and die, giving up their life to the Aenservaesai.",
            action: "Offer a glimpse of the aenservaesai in its totality.",
            success: "I'm sorry, {ascean.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here.",
            failure: "It appears {enemy.name} is not ready to die, and is infact renewed with vigor at a chance to instill meaning (your murder) into their life (continuining)."
        }
    },
    "Se'van": {
        berserk: {
            description: "your attacks grow stronger for each successive form of damage received.",
            action: "Chant the shrieker's song.",
            success: "Success!",
            failure: "Failure!"
        },
        miniGame: {
            description: "you can grip your enemy in a vice of your own making.",
            action: "Attempt to disarm and grapple {enemy.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Sedyrist": {
        investigative: {
            description: "your ability to notice things is heightened.",
            action: "Allow furhter inquiry.",
            success: "Success!",
            failure: "Failure!"
        },
        tinkerer: {
            description: "you can descontruct and reconstruct armor and weapons.",
            deconstruct: "Deconstruct {inventory.name}.",
            reconstruct: "Reconstruct {inventory.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Ma'anreic": {
        negation: {
            description: "you can negate {enemy.name}'s armor in the on your next attack.",
            action: "Bleed your weapon through the land of hush and tendril.",
            success: "Success!",
            failure: "Failure!"
        },
        thievery: {
            description: "depending on your skill, you can steal items from anyone and anywhere.",
            action: "Enter stealth mode.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Cambiren": {
        caerenicism: {
            description: "your caer doubles up on attacks.",
            action: "Guide your caer to swing in harmony with your flesh.",
            success: "Success!",
            failure: "Failure!"
        },
        miniGame: {
            description: "you can disarm and evoke your enemy's caer into a battle of it own.",
            action: "Attempt to disarm and seize {enemy.name}'s caer.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Shrygeian": {
        knavery: {
            description: "your exploratory abilities are heightened.",
            action: "The blood of Shrygei runs through your veins, you are able to sing life into the land.",
            success: "Success!",
            failure: "Failure!"
        },
        miniGame: {
            description: "you can duel the enemy in a game of chance.",
            action: "Enter a stage of dueling with {enemy.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Fyeran": {
        persuasion: {
            description: "you can convince those who see this world with peculiarity.",
            action: "Speak to {enemy.name}'s curiosity.",
            success: "Success!",
            failure: "Failure!"
        },
        seer: {
            description: "your next attack is fyers.",
            action: "Channel raw Fyeran Caer into your next attack.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Shaorahi": {
        conviction: {
            description: "your attacks grow stronger the more you realize them.",
            action: "Speak to your {ascean.weapon_one.name} in Shao'rahi",
            success: "Success!",
            failure: "Failure!"
        },
        persuasion: {
            description: "you can put the enemy in awe of your power, and have them cease their assault.",
            action: "Speak to {enemy.name} in  Shao'rahi.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Tshaeral": {
        miniGame: {
            description: "your caer is imbued with tshaeral desire, a hunger to devour the world.",
            action: "Succumb to your Tshaeral desire.",
            success: "You have vanquished {enemy.name}, whether caeren or flesh succumbed first to be shirked from this world is a question for another day.",
            failure: "Failure!"
        },
        persuasion: {
            description: "your tshaeral nature has a way of wilting the caer of your enemies.",
            action: "Convince {enemy.name} without words, show them a bit more of your true self.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Chiomic": {
        persuasion: {
            description: "you can cause bouts of confusion and disorientation in the enemy, reducing their conviction in attacking you.",
            action: "Speak a chiomic riddle to befuddle {enemy.name}.",
            success: "The {enemy.name} contorts and swirls with designs of ancient artifice and delight.",
            failure: "You're unsure if the riddle posed was too difficult, or if the {enemy.name} is simply too stupid to understand. Either way, it doesn't seem to have worked."
        },
        luckout: {
            description: "you can invoke the Ancient Chiomyr, reducing the enemy to a broken mind of mockery.",
            action: "Lash {enemy.name} with chiomic bliss.",
            success: "{enemy.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. 'I don't understand, {ascean.name}. What is happening to me, what have you brought back?'",
            failure: "Certain minds are incapable of being broken, and {enemy.name}'s is one of them. You're unsure if it's because of their own strength, or your own weakness. Or their weakness, inadvertently."
        }
    },
    "Astral": {
        impermanence: {
            description: "you can perform combat maneuvers that are impossible to follow, and thus impossible to counter.",
            action: "Your caeren leads in traces {enemy.name}'s flesh cannot follow.",
            success: "Success!",
            failure: "Failure!"
        },
        pursuit: {
            description: "you can force encounters, even with enemies that would normally avoid you.",
            action: "You beckon {enemy.name} with an impenetrable, violent yearning.",
            success: "Success!",
            failure: "Failure!"
        }
    },
};

export const getAsceanTraits = async (ascean: Player) => {
    let traits = {
        primary: { name: '' },
        secondary: { name: '' },
        tertiary: { name: '' },
    };


    const ATTRIBUTE_TRAITS = {
        Constitution: {
            strength: 'Ilian', // Heroism, Persuasion (Autoritas - Most Powerful)
            agility: "Kyn'gian", // Inexorable Negation (Avoidance), Endurance
            achre: "Arbituous", // Persuasion (Ethos - Law), Luckout (Rhetoric)
            caeren: "Lilosian", // Faithful, Persuasion (Pathos - Faith), Luckout (Peace)
            kyosir: "Kyr'naic", // Apathetic, Persuasion (Apathy), Luckout (Aenservaesai)
        },
        Strength: {
            constitution: 'Ilian', // Heroism, Persuasion (Autoritas - Most Powerful)
            agility: "Se'van", // Mini-Game (Grappling), TBD
            achre: "Sedyrist", // Inexorable Analyst (Investigative), Tinkerer (Can Forge Own Equipment, Deconstruct Equipment)
            caeren: "Shaorahi", // Conviction, Persuasion (Awe), 
            kyosir: "Tshaeral", // Persuasion (Fear), Mini-Game (Fear) 
        },
        Agility: {
            constitution: "Kyn'gian", // Inexorable Negation (Avoidance), Endurance
            strength: "Se'van", // Mini-Game (Grappling), TBD
            achre: "Ma'anreic", // Thievery, Physical Negation, Stealing (Merchants, Enemies)
            caeren: "Cambiren", // Transubstantiation, Caerenic Mini-Game
            kyosir: "Shrygeian", // Knavery, Dueling Mini-Game, Disposition Boosts
        },
        Achre: {
            constitution: "Arbituous", // Persuasion (Ethos - Law), Luckout (Rhetoric)
            strength: "Sedyrist", // Inexorable Analyst (Investigative), Tinkerer (Can Forge Own Equipment, Deconstruct Equipment)
            agility: "Ma'anreic", // Thievery, Physical Negation, Stealing (Merchants, Enemies)
            caeren: "Fyeran", // Seer, Persuasion (Seer), Phenomenalist (Extra Encounters in Phenomena)   
            kyosir: "Chiomic", // Persuasion (Humor), Luckout (Shatter)
        },
        Caeren: {
            constitution: "Lilosian", // Faithful, Persuasion (Pathos - Faith), Luckout (Peace)
            strength: "Shaorahi", // Conviction, Persuasion (Awe), 
            agility: "Cambiren", // Transubstantiation, Caerenic Mini-Game
            achre: "Fyeran", // Seer, Persuasion (Seer), Phenomenalist (Extra Encounters in Phenomena)   
            kyosir: "Astral", // Inexorable Affirmation, Impermanence, Pursuit (TBD, Can Force Encounters)
        },
        Kyosir: {
            constitution: "Kyr'naic", // Apathetic, Persuasion (Apathy), Luckout (Aenservaesai)
            strength: "Tshaeral", // Persuasion (Fear), Mini-Game (Fear) 
            agility: "Shrygeian", // Knavery, Dueling Mini-Game, Disposition Boosts
            achre: "Chiomic", // Persuasion (Humor), Luckout (Shatter)
            caeren: "Astral", // Inexorable Affirmation, Impermanence, Pursuit (TBD, Can Force Encounters)
        },
    };

    let asceanTraits = ATTRIBUTE_TRAITS[ascean.mastery as keyof typeof ATTRIBUTE_TRAITS];
    console.log(asceanTraits, "Ascean Traits")
    // asceanTraits[0].push(ascean[asceanTraits[0][0]] as keyof typeof asceanTraits[0]);
    let topThree = Object.entries(asceanTraits).sort((a, b) => b[0].length - a[0].length)
    const mappedTraits = topThree.map(trait => {
        const traitName = trait[0];
        const traitValue = trait[1];
        const attributeValue = ascean[traitName as keyof typeof ascean];
      
        return [traitName, traitValue, attributeValue];
    });
    const topThreeSorted = mappedTraits.sort((a, b) => b[2] - a[2]);
    
    // .slice(0, 3);
    console.log(topThreeSorted, "Top Three Traits")
    traits.primary.name = topThreeSorted[0][1];
    traits.secondary.name = topThreeSorted[1][1];
    traits.tertiary.name = topThreeSorted[2][1];

    let first = TRAIT_DESCRIPTIONS[traits.primary.name as keyof typeof TRAIT_DESCRIPTIONS];
    let second = TRAIT_DESCRIPTIONS[traits.secondary.name as keyof typeof TRAIT_DESCRIPTIONS];
    let third = TRAIT_DESCRIPTIONS[traits.tertiary.name as keyof typeof TRAIT_DESCRIPTIONS];

    let newTraits = {
        primary: { ...traits.primary, ...first},
        secondary: { ...traits.secondary, ...second },
        tertiary: { ...traits.tertiary, ...third } ,
    };
    console.log(newTraits, "New Traits");
    return newTraits;
};

export const checkPlayerTrait = (trait: string, gameState: GameData) => {
    if (gameState.primary.name.includes(trait) || gameState.secondary.name.includes(trait) || gameState.tertiary.name.includes(trait)) return true;
    return false;
};

export interface GameData {
    player: Player;
    opponent: Enemy;
    background: string;
    dialog: object;

    primary: { name: string, description: string, style: string };
    secondary: { name: string, description: string, style: string };
    tertiary: { name: string, description: string, style: string };

    miniGameCambiren: boolean;
    miniGameSevan: boolean;
    miniGameShrygeian: boolean;
    miniGameTshaeral: boolean;

    loading: boolean;
    loadingAscean: boolean;
    loadingOpponent: boolean;
    loadingOverlay: boolean;
    loadingUnderlay: boolean;
    loadingContent: boolean;
    loadingCombatOverlay: boolean;
    loadingCombatSpectatorOverlay: boolean;
    loadingSpectator: boolean;

    loadedAscean: boolean;

    playerBlessed: boolean;
    saveExp: boolean;
    saveQuest: boolean;
    lootRoll: boolean;
    itemSaved: boolean;
    eqpSwap: boolean;
    checkLoot: boolean;
    removeItem: boolean;
    repositionInventory: boolean;
    purchasingItem: boolean;

    gameplayModal: boolean;
    gameplayEvent: object;

    combatResolved: boolean;
    combatSpectatorResolved: boolean;
    instantStatus: boolean;

    showMap: boolean;
    showCity: boolean;
    showDialog: boolean;
    showInventory: boolean;

    cityButton: boolean;

    lootDrop: Equipment;
    lootDropTwo: Equipment;
    merchantEquipment: Equipment;

    cityOption: string;
    currentIntent: string;
    currentQuest: string;
    questData: object;
    overlayContent: string;
    underlayContent: string;
    storyContent: string;
    combatOverlayText: string;
    combatSpectatorOverlayText: string;

    mapMode: string;
    timeLeft: number;
    moveTimer: number;
    shake: { duration: number; intensity: number; };
    vibrationTime: number;
    canvasPosition: { x: number, y: number };
    canvasWidth: number;
    canvasHeight: number;
    joystickSpeed: number;
    soundEffectVolume: number;
};

interface Game_Action {
    type: string;
    payload: any;
};

export const GAME_ACTIONS = {
    SET_GAME_DATA: 'SET_GAME_DATA',
    SET_PLAYER: 'SET_PLAYER',
    SET_PLAYER_TRAITS: 'SET_PLAYER_TRAITS',
    SET_OPPONENT: 'SET_OPPONENT',
    SET_BACKGROUND: 'SET_BACKGROUND',
    SET_DIALOG: 'SET_DIALOG',
    SET_TUTORIAL: 'SET_TUTORIAL',
    SET_PLAYER_BLESSING: 'SET_PLAYER_BLESSING',
    SAVE_EXP: 'SAVE_EXP',
    SAVE_QUEST: 'SAVE_QUEST',
    SET_SAVE_WORLD: 'SET_SAVE_WORLD',
    WORLD_SAVED: 'WORLD_SAVED',

    SET_PLAYER_LEVEL_UP: 'SET_PLAYER_LEVEL_UP',
    SET_PLAYER_CURRENCY: 'SET_PLAYER_CURRENCY',
    SET_EXPERIENCE: 'SET_EXPERIENCE',
    SET_FIREWATER: 'SET_FIREWATER',
    SET_QUESTS: 'SET_QUESTS',
    SET_INVENTORY: 'SET_INVENTORY',
    SET_INVENTORY_POSITION: 'SET_INVENTORY_POSITION',
    SET_ASCEAN_ATTRIBUTES: 'SET_ASCEAN_ATTRIBUTES',
    SET_ASCEAN_AND_INVENTORY: 'SET_ASCEAN_AND_INVENTORY',

    SET_PURCHASING_ITEM: 'SET_PURCHASING_ITEM',

    INSTANT_COMBAT: 'INSTANT_COMBAT',
    LOOT_ROLL: 'LOOT_ROLL',
    ITEM_SAVED: 'ITEM_SAVED',
    EQP_SWAP: 'EQP_SWAP',
    CHECK_LOOT: 'CHECK_LOOT',
    REMOVE_ITEM: 'REMOVE_ITEM',
    REPOSITION_INVENTORY: 'REPOSITION_INVENTORY',

    LOADING: 'LOADING',
    LOADING_ASCEAN: 'LOADING_ASCEAN',
    LOADING_OPPONENT: 'LOADING_OPPONENT',
    LOADING_OVERLAY: 'LOADING_OVERLAY',
    LOADING_UNDERLAY: 'LOADING_UNDERLAY',
    LOADING_CONTENT: 'LOADING_CONTENT',
    LOADING_COMBAT_OVERLAY: 'LOADING_COMBAT_OVERLAY',
    LOADING_COMBAT_SPECTATOR_OVERLAY: 'LOADING_COMBAT_SPECTATOR_OVERLAY',
    LOADING_SPECTATOR: 'LOADING_SPECTATOR',
    LOADED_ASCEAN: 'LOADED_ASCEAN',

    GET_OPPONENT: 'GET_OPPONENT',

    SET_ENTER_CITY: 'SET_ENTER_CITY',
    SET_LEAVE_CITY: 'SET_LEAVE_CITY',

    CLOSE_OVERLAY: 'CLOSE_OVERLAY',
    CLOSE_UNDERLAY: 'CLOSE_UNDERLAY',

    CLEAR_LOOTDROP: 'CLEAR_LOOTDROP',

    SET_GAMEPLAY_MODAL: 'SET_GAMEPLAY_MODAL',
    SET_GAMEPLAY_EVENT: 'SET_GAMEPLAY_EVENT',
    SET_COMBAT_RESOLVED: 'SET_COMBAT_RESOLVED',
    SET_COMBAT_SPECTATOR_RESOLVED: 'SET_COMBAT_SPECTATOR_RESOLVED',
    SET_SHOW_CITY: 'SET_SHOW_CITY',
    SET_SHOW_DIALOG: 'SET_SHOW_DIALOG',
    SET_SHOW_INVENTORY: 'SET_SHOW_INVENTORY',
    SET_SHOW_MAP: 'SET_SHOW_MAP',
    SET_CITY_BUTTON: 'SET_CITY_BUTTON',
    SET_LOOT_DROP: 'SET_LOOT_DROP',
    SET_LOOT_DROP_TWO: 'SET_LOOT_DROP_TWO',
    SET_MERCHANT_EQUIPMENT: 'SET_MERCHANT_EQUIPMENT',

    SET_CITY_OPTION: 'SET_CITY_OPTION',
    SET_CURRENT_INTENT: 'SET_CURRENT_INTENT',
    SET_CURRENT_QUEST: 'SET_CURRENT_QUEST',
    SET_OVERLAY_CONTENT: 'SET_OVERLAY_CONTENT',
    SET_UNDERLAY_CONTENT: 'SET_UNDERLAY_CONTENT',
    SET_STORY_CONTENT: 'SET_STORY_CONTENT',
    SET_COMBAT_OVERLAY_TEXT: 'SET_COMBAT_OVERLAY_TEXT',

    SET_GAME_SETTINGS: 'SET_GAME_SETTINGS',
    SET_MAP_MODE: 'SET_MAP_MODE',
    SET_TIME_LEFT: 'SET_TIME_LEFT',
    SET_MOVE_TIMER: 'SET_MOVE_TIMER',
    SET_SHAKE_DURATION: 'SET_SHAKE_DURATION',
    SET_SHAKE_INTENSITY: 'SET_SHAKE_INTENSITY',
    SET_VIBRATION_TIME: 'SET_VIBRATION_TIME',
    SET_CANVAS_POSITION: 'SET_CANVAS_POSITION',
    SET_CANVAS_WIDTH: 'SET_CANVAS_WIDTH',
    SET_CANVAS_HEIGHT: 'SET_CANVAS_HEIGHT',
    SET_JOYSTICK_SPEED: 'SET_JOYSTICK_SPEED',
    SET_VOLUME: 'SET_VOLUME',

    SET_MINIGAME_CAMBIREN: 'SET_MINIGAME_CAMBIREN',
    SET_MINIGAME_SEVAN: 'SET_MINIGAME_SEVAN',
    SET_MINIGAME_SHRYGEIAN: 'SET_MINIGAME_SHRYGEIAN',
    SET_MINIGAME_TSHAERAL: 'SET_MINIGAME_TSHAERAL',
};

export const initialGameData: GameData = {
    player: {} as unknown as Player,
    opponent: null as unknown as Enemy,
    background: '',
    dialog: {},
    primary: { name: '', description: '', style: '' },
    secondary: { name: '', description: '', style: '' },
    tertiary: { name: '', description: '', style: '' },
    miniGameCambiren: false,
    miniGameSevan: false,
    miniGameShrygeian: false,
    miniGameTshaeral: false,
    loading: true,
    loadingAscean: false,
    loadingOpponent: false,
    loadingOverlay: false,
    loadingUnderlay: false,
    loadingContent: false,
    loadingCombatOverlay: false,
    loadingCombatSpectatorOverlay: false,
    loadingSpectator: false,
    loadedAscean: false,
    playerBlessed: false,
    saveExp: false,
    saveQuest: false,
    lootRoll: false,
    itemSaved: false,
    eqpSwap: false,
    checkLoot: false,
    removeItem: false,
    repositionInventory: false,
    purchasingItem: false,
    gameplayModal: false,
    gameplayEvent: { title: "", description: "" },
    combatResolved: false,
    combatSpectatorResolved: false,
    instantStatus: false,
    showCity: false,
    showDialog: false,
    showInventory: false,
    showMap: false,
    cityButton: false,
    lootDrop: [] as unknown as Equipment,
    lootDropTwo: [] as unknown as Equipment,
    merchantEquipment: [] as unknown as Equipment,
    cityOption: 'Innkeep',
    currentIntent: 'challenge',
    currentQuest: '',
    questData: {},
    overlayContent: '',
    underlayContent: '',
    storyContent: '', 
    combatOverlayText: '',
    combatSpectatorOverlayText: '',
    mapMode: 'FULL_MAP',
    timeLeft: 12,
    moveTimer: 6,
    shake: { duration: 200, intensity: 1 },
    vibrationTime: 150,
    canvasPosition: { x: 0.75, y: 1.5 },
    canvasWidth: 300,
    canvasHeight: 300,
    joystickSpeed: 1000,
    soundEffectVolume: 0.3,
};

export const GameStore = (game: GameData, action: Game_Action) => {
    switch (action.type) {
        case 'SET_GAME_DATA':
            return {
                ...game,
            };
        case 'SET_PLAYER':
            return {
                ...game,
                player: action.payload,
            };
        case 'SET_PLAYER_TRAITS':
            return {
                ...game,
                primary: action.payload.primary,
                secondary: action.payload.secondary,
                tertiary: action.payload.tertiary,
            };
        case 'SET_OPPONENT':
            return {
                ...game,
                opponent: action.payload,
            };
        case 'GET_OPPONENT':
            return {
                ...game,
                checkLoot: action.payload,
                loadingOpponent: action.payload,
            };
        case 'SET_SAVE_WORLD':
            return {
                ...game,
                overlayContent: action.payload,
                loadingContent: true,
            };
        case 'WORLD_SAVED':
            return {
                ...game,
                overlayContent: '',
                loadingContent: false,
                loadingOverlay: false,
            };
        case 'SET_BACKGROUND':
            return {
                ...game,
                background: action.payload,
            };
        case 'SET_DIALOG':
            return {
                ...game,
                dialog: action.payload,
            };
        case 'SET_TUTORIAL':
            return {
                ...game,
                player: {
                    ...game.player,
                    tutorial: action.payload,
                }
            };
        case 'SET_PLAYER_BLESSING':
            return {
                ...game,
                playerBlessed: action.payload,
            };
        case 'SAVE_EXP':
            return {
                ...game,
                saveExp: action.payload,
            };
        case 'SAVE_QUEST':
            return {
                ...game,
                saveQuest: action.payload,
            };
        case 'SET_PLAYER_LEVEL_UP':
            return {
                ...game,
                player: {
                    ...action.payload, // update all properties except inventory
                    inventory: game.player.inventory // keep the existing inventory
                }
            };
        case 'SET_PLAYER_CURRENCY':
            return {
                ...game,
                player: {
                    ...game.player,
                    currency: action.payload,
                }
            };
        case 'SET_EXPERIENCE':
            return {
                ...game,
                player: {
                    ...game.player,
                    experience: action.payload.experience,
                    firewater: action.payload.firewater,
                    currency: action.payload.currency,
                },
            };
        case 'SET_FIREWATER':
            return {
                ...game,
                player: {
                    ...game.player,
                    firewater: action.payload,
                },
            };
        case 'SET_INVENTORY':
            return {
                ...game,
                player: {
                    ...game.player,
                    currency: action.payload.currency,
                    inventory: action.payload.inventory,
                },
            };
        case 'SET_INVENTORY_POSITION':
            return {
                ...game,
                player: {
                    ...game.player,
                    inventory: action.payload,
                },
            };
        case 'SET_ASCEAN_AND_INVENTORY':
            return {
                ...game,
                player:  action.payload,
            };
        case 'SET_ASCEAN_ATTRIBUTES':
            return {
                ...game,
                player: {
                    ...game.player,
                    constitution: action.payload.constitution,
                    strength: action.payload.strength,
                    agility: action.payload.agility,
                    achre: action.payload.achre,
                    caeren: action.payload.caeren,
                    kyosir: action.payload.kyosir,
                },
            };
        case 'SET_QUESTS':
            return {
                ...game,
                player: {
                    ...game.player,
                    quests: action.payload,
                },
            };
        case 'INSTANT_COMBAT':
            return {
                ...game,
                instantStatus: action.payload,
            };
        case 'LOOT_ROLL':
            return {
                ...game,
                lootRoll: action.payload,
            };
        case 'ITEM_SAVED':
            return {
                ...game,
                itemSaved: action.payload,
            };
        case 'EQP_SWAP':
            return {
                ...game,
                eqpSwap: action.payload,
            };
        case 'CHECK_LOOT':
            return {
                ...game,
                checkLoot: action.payload,
            };
        case 'REMOVE_ITEM':
            return {
                ...game,
                removeItem: action.payload,
            };
        case 'REPOSITION_INVENTORY':
            return {
                ...game,
                repositionInventory: action.payload,
            };
        case 'SET_PURCHASING_ITEM':
            return {
                ...game,
                purchasingItem: action.payload,
            };
        case 'LOADING':
            return {
                ...game,
                loading: action.payload,
            };
        case 'LOADING_ASCEAN':
            return {
                ...game,
                loadingAscean: action.payload,
            };
        case 'LOADING_OPPONENT':
            return {
                ...game,
                loadingOpponent: action.payload,
                showInventory: false,
            };
        case 'LOADING_OVERLAY':
            return {
                ...game,
                loadingOverlay: action.payload,
            };
        case 'LOADING_UNDERLAY':
            return {
                ...game,
                loadingUnderlay: action.payload,
            };
        case 'LOADING_CONTENT':
            return {
                ...game,
                loadingContent: action.payload,
            };
        case 'LOADING_COMBAT_OVERLAY':
            return {
                ...game,
                loadingCombatOverlay: action.payload,
            };
        case 'LOADING_COMBAT_SPECTATOR_OVERLAY':
            return {
                ...game,
                loadingCombatSpectatorOverlay: action.payload,
            };
        case 'LOADING_SPECTATOR':
            return {
                ...game,
                loadingSpectator: action.payload,
            };
        case 'LOADED_ASCEAN':
            return {
                ...game,
                loadedAscean: action.payload,
            };
        case 'SET_GAMEPLAY_MODAL':
            return {
                ...game,
                gameplayModal: action.payload,
            };
        case 'SET_GAMEPLAY_EVENT':
            return {
                ...game,
                gameplayEvent: action.payload,
            };
        case 'SET_COMBAT_RESOLVED':
            return {
                ...game,
                combatResolved: action.payload,
                loadingCombatOverylay: action.payload,
                combatOverlayText: '',
            };
        case 'SET_COMBAT_SPECTATOR_RESOLVED':
            return {
                ...game,
                combatSpectatorResolved: action.payload,
                loadingCombatSpectatorOverylay: action.payload,
                combatSpectatorOverlayText: '',
            };
        case 'SET_SHOW_CITY':
            return {
                ...game,
                showCity: action.payload,
            };
        case 'SET_SHOW_DIALOG':
            return {
                ...game,
                showDialog: action.payload,
            };
        case 'SET_SHOW_INVENTORY':
            return {
                ...game,
                showInventory: action.payload,
            };
        case 'SET_SHOW_MAP':
            return {
                ...game,
                showMap: action.payload,
            };
        case 'SET_CITY_BUTTON':
            return {
                ...game,
                cityButton: action.payload,
            };
        case 'SET_LOOT_DROP':
            return {
                ...game,
                lootDrop: action.payload,
            };
        case 'SET_LOOT_DROP_TWO':
            return {
                ...game,
                lootDropTwo: action.payload,
            };
        case 'SET_MERCHANT_EQUIPMENT':
            return {
                ...game,
                merchantEquipment: action.payload,
            };
        case 'SET_CITY_OPTION':
            return {
                ...game,
                cityOption: action.payload,
            };
        case 'SET_CURRENT_INTENT':
            return {
                ...game,
                currentIntent: action.payload,
            };
        case 'SET_OVERLAY_CONTENT':
            return {
                ...game,
                overlayContent: action.payload,
            };
        case 'SET_UNDERLAY_CONTENT':
            return {
                ...game,
                underlayContent: action.payload,
            };
        case 'SET_STORY_CONTENT':
            return {
                ...game,
                storyContent: action.payload,
            };
        case 'SET_COMBAT_OVERLAY_TEXT':
            return {
                ...game,
                combatOverlayText: action.payload,
            };
        case 'SET_LEAVE_CITY':
            return {
                ...game,
                cityButton: action.payload,
                showCity: action.payload,
            };
        case 'SET_ENTER_CITY':
            return {
                ...game,
                storyContent: action.payload,
                cityButton: true,
            };
        case 'CLOSE_OVERLAY':
            return {
                ...game,
                overlayContent: '',
                loadingOverlay: action.payload,
                loadingContent: action.payload,
            };
        case 'CLOSE_UNDERLAY':
            return {
                ...game,
                underlayContent: '',
                loadingUnderlay: action.payload,
                loadingContent: action.payload,
            };
        case 'SET_CURRENT_QUEST': 
            return {
                ...game,
                currentQuest: action.payload.intent,
                questData: action.payload.questData,
            };
        case 'CLEAR_LOOTDROP':
            let lootDrop = action.payload;
            if (lootDrop?._id === game.lootDrop?._id) {
                return {
                    ...game,
                    lootDrop: null,
                };
            } else {
                return {
                    ...game,
                    lootDropTwo: null,
                };
            };
        case 'SET_GAME_SETTINGS':
            return {
                ...game,
                mapMode: action.payload.mapMode,
                joystickSpeed: action.payload.joystickSpeed,
                soundEffectVolume: action.payload.soundEffectVolume,
                timeLeft: action.payload.timeLeft,
                moveTimer: action.payload.moveTimer,
                shake: action.payload.shake,
                canvasPosition: action.payload.canvasPosition,
                canvasHeight: action.payload.canvasHeight,
                canvasWidth: action.payload.canvasWidth,
                vibrationTime: action.payload.vibrationTime,
            };
        case 'SET_MAP_MODE':
            return {
                ...game,
                mapMode: action.payload,
            };
        case 'SET_TIME_LEFT':
            return {
                ...game,
                timeLeft: action.payload,
            };
        case 'SET_MOVE_TIMER':
            return {
                ...game,
                moveTimer: action.payload,
            };
        case 'SET_SHAKE_DURATION':
            return {
                ...game,
                shake: {
                    ...game.shake,
                    duration: action.payload,
                }
            };
        case 'SET_SHAKE_INTENSITY':
            return {
                ...game,
                shake: {
                    ...game.shake,
                    intensity: action.payload,
                }
            };
        case 'SET_CANVAS_POSITION':
            return {
                ...game,
                canvasPosition: action.payload,
            };
        case 'SET_CANVAS_HEIGHT':
            return {
                ...game,
                canvasHeight: action.payload,
            };
        case 'SET_CANVAS_WIDTH':
            return {
                ...game,
                canvasWidth: action.payload,
            };
        case 'SET_JOYSTICK_SPEED':
            return {
                ...game,
                joystickSpeed: action.payload,
            };
        case 'SET_VIBRATION_TIME':
            return {
                ...game,
                vibrationTime: action.payload,
            };
        case 'SET_VOLUME':
            return {
                ...game,
                soundEffectVolume: action.payload,
            };
        case 'SET_MINIGAME_CAMBIREN':
            return {
                ...game,
                miniGameCambiren: action.payload,
            };
        case 'SET_MINIGAME_SEVAN':
            return {
                ...game,
                miniGameSevan: action.payload,
            };
        case 'SET_MINIGAME_SHRYGEIAN':
            return {
                ...game,
                miniGameShrygeian: action.payload,
            };
        case 'SET_MINIGAME_TSHAERAL':
            return {
                ...game,
                miniGameTshaeral: action.payload,
            };   
        default:
            return game;
    };
};