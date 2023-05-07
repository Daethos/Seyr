import { NPC, Equipment } from './GameStore';

function findSex() {
    const chance = Math.floor(Math.random() * 2);
    if (chance === 0) {
        return "Man";
    } else {
        return "Woman";
    };
};

const Ledger: Equipment = {
    name: 'Ledger',
    type: 'Paper',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: 'One Hand',
    attack_type: 'Physical',
    damage_type: ['Slash'],
    physical_damage: 0,
    magical_damage: 0,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 0,
    magical_resistance: 0,
    critical_chance: 0,
    critical_damage: 0,
    dodge: 0,
    roll: 5,
    constitution: 0,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 0,
    influences: ["Quor'ei"],
    imgURL: '/images/ledger.png',
    _id: '001'
};

const Quill: Equipment = {
    name: 'Quill',
    type: 'Dagger',
    rarity: 'Common',
    itemType: 'Equipoment',
    grip: 'One Hand',
    attack_type: 'Physical',
    damage_type: ['Pierce'],
    physical_damage: 1,
    magical_damage: 0,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 0,
    magical_resistance: 0,
    critical_chance: 0,
    critical_damage: 0,
    dodge: 0,
    roll: 0,
    constitution: 0,
    strength: 0,
    agility: 1,
    achre: 0,
    caeren: 0,
    kyosir: 0,
    influences: ['Chiomyr'],
    imgURL: '/images/quill.png',
    _id: '002'
}

const Ley_Book: Equipment = {
    name: 'Ley Book',
    type: 'Book',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: 'One Hand',
    attack_type: 'Physical',
    damage_type: ['Blunt'],
    physical_damage: 1,
    magical_damage: 0,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 0,
    magical_resistance: 0,
    critical_chance: 0,
    critical_damage: 0,
    dodge: 0,
    roll: 0,
    constitution: 0,
    strength: 0,
    agility: 0,
    achre: 2,
    caeren: 0,
    kyosir: 0,
    influences: [`Quor'ei`],
    imgURL: '/images/nature-book.png',
    _id: '003'
}

const Coins: Equipment = {
    name: 'Coins',
    type: 'Projectiles',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 3,
    magical_penetration: 3,
    physical_resistance: 3,
    magical_resistance: 3,
    critical_chance: 1,
    critical_damage: 1.01,
    dodge: 0,
    roll: 3,
    constitution: 0,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 2,
    influences: ['Kyrisos'],
    imgURL: '/images/coins.png',
    _id: '004'
};

const Merchant_Hat: Equipment = {
    name: "Merchant's Hat",
    type: 'Leather-Cloth',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 3,
    magical_resistance: 3,
    critical_chance: 0,
    critical_damage: 1,
    dodge: 0,
    roll: 3,
    constitution: 1,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 1,
    influences: null,
    imgURL: '/images/merchant-hat.png',
    _id: '005'
};

const Merchant_Robes: Equipment = {
    name: "Merchant's Robes",
    type: 'Leather-Cloth',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 3,
    magical_resistance: 3,
    critical_chance: 0,
    critical_damage: 1,
    dodge: 0,
    roll: 3,
    constitution: 1,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 1,
    influences: null,
    imgURL: '/images/merchant-robes.png',
    _id: '006'
};

const Merchant_Skirt: Equipment = {
    name: "Merchant's Skirt",
    type: 'Leather-Cloth',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 3,
    magical_resistance: 3,
    critical_chance: 0,
    critical_damage: 1,
    dodge: 0,
    roll: 3,
    constitution: 1,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 1,
    influences: null,
    imgURL: '/images/merchant-skirt.png',
    _id: '007'
};

const Dae_Amulet: Equipment = {
    name: 'Dae Amulet',
    type: 'Magical',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 1,
    magical_resistance: 1,
    critical_chance: 0,
    critical_damage: 1,
    dodge: 0,
    roll: 1,
    constitution: 1,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 1,
    kyosir: 0,
    influences: ['Daethos'],
    imgURL: '/images/dae-amulet.png',
    _id: '008'
};

const Simple_Ring: Equipment = {
    name: 'Simple Ring',
    type: 'Physical',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 0,
    magical_resistance: 0,
    critical_chance: 0,
    critical_damage: 1,
    dodge: 0,
    roll: 0,
    constitution: 0,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 0,
    influences: null,
    imgURL: '/images/simple-ring.png',
    _id: '009'
};

const Dae_Trinket: Equipment = {
    name: 'Dae Trinket',
    type: 'Magical',
    rarity: 'Common',
    itemType: 'Equipment',
    grip: null,
    attack_type: null,
    damage_type: null,
    physical_damage: 1,
    magical_damage: 1,
    physical_penetration: 0,
    magical_penetration: 0,
    physical_resistance: 1,
    magical_resistance: 1,
    critical_chance: 0,
    critical_damage: 1,
    dodge: 0,
    roll: 1,
    constitution: 1,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 1,
    kyosir: 0,
    influences: ['Daethos'],
    imgURL: '/images/dae-trinket.png',
    _id: '010'
};

export const Merchant: NPC = {
    name: 'Traveling General Merchant',
    named: false,
    type: 'Merchant',
    description: 'Merchant from Licivitas making their way round the ley.',
    constitution: 10,
    strength: 10,
    agility: 12,
    achre: 14,
    caeren: 10,
    kyosir: 12,
    weapon_one: Quill,
    weapon_two: Ledger,
    weapon_three: Ley_Book,
    shield: Coins,
    helmet: Merchant_Hat,
    chest: Merchant_Robes,
    legs: Merchant_Skirt,
    amulet: Dae_Amulet,
    ring_one: Simple_Ring,
    ring_two: Simple_Ring,
    trinket: Dae_Trinket,
    faith: 'devoted',
    mastery: 'Achre',
    origin: "Li'ivi",
    sex: findSex(),
    currency: { gold: 20, silver: 60 },
    experience: 0,
    level: 4,
    alive: true,
    dialogId: "Merchant-General",
};