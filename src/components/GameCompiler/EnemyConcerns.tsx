import userService from "../../utils/userService";
import * as asceanAPI from '../../utils/asceanApi';
import EventEmitter from "../../game/phaser/EventEmitter";
import { Merchant } from "./NPCs";
import { NPC } from "./GameStore";

const levelRanges = [
    { range: [1, 2], minLevel: 1, maxLevel: 2 },
    { range: [3, 4], minLevel: 2, maxLevel: 4 },
    { range: [5, 6], minLevel: 4, maxLevel: 6 },
    { range: [7, 8], minLevel: 5, maxLevel: 9 },
    { range: [9, 10], minLevel: 7, maxLevel: 12 },
    { range: [11, 12], minLevel: 8, maxLevel: 14 },
    { range: [13, 14], minLevel: 10, maxLevel: 16 },
    { range: [15, 18], minLevel: 12, maxLevel: 18 },
    { range: [19, 20], minLevel: 16, maxLevel: 20 }
];

export const getEnemyLevels = (level: number): { minLevel: number, maxLevel: number } => {
    let minLevel: number = 0;
    let maxLevel: number = 0; 
    
    for (const { range, minLevel: rangeMin, maxLevel: rangeMax } of levelRanges) {
        const [rangeStart, rangeEnd] = range;
        if (level >= rangeStart && level <= rangeEnd) {
            minLevel = rangeMin;
            maxLevel = rangeMax;
            break;
        };
    };
    
    return { minLevel, maxLevel };
}; 

export const fetchEnemy = async (e: { enemyID: string; level: number; }): Promise<void> => {
    const getOpponent = async () => {
        try { 
            const { minLevel, maxLevel } = getEnemyLevels(e.level); 
            const enemyData = { username: '637b06f47560b345910bbc44', minLevel, maxLevel }; // mirio
            const ascean = await userService.getRandomEnemy(enemyData);
            return { game: ascean.data.ascean, combat: ascean.data, enemyID: e.enemyID };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };
    const opponent = await getOpponent();
    EventEmitter.emit('enemy-fetched', opponent);
};

export const fetchNpc = async (e: { enemyID: string; npcType: string; }): Promise<void> => { 
    try {
        const CITY_OPTIONS = {
            'Merchant-Alchemy': 'Alchemist',
            'Merchant-Armor': 'Armorer',
            'Merchant-Smith': 'Blacksmith',
            'Merchant-Jewelry': 'Jeweler',
            'Merchant-General': 'General Merchant',
            'Merchant-Tailor': 'Tailor',
            'Merchant-Mystic': 'Senarian',
            'Merchant-Weapon': 'Sevasi',
        };
        const getNPC = async () => {
            let npc: NPC = Object.assign({}, Merchant);
            npc.name = 'Traveling ' + CITY_OPTIONS[e.npcType as keyof typeof CITY_OPTIONS];
            const res = await asceanAPI.getAnimalStats(npc);
            return { game: npc, combat: res.data.data, enemyID: e.enemyID };
        };
        const npc = await getNPC();
        EventEmitter.emit('npc-fetched', npc);
    } catch (err: any) {
        console.log("Error Getting an NPC");
    };
}; 
 