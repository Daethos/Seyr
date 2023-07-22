import userService from "../../utils/userService";
import * as asceanAPI from '../../utils/asceanApi';
import EventEmitter from "../../game/phaser/EventEmitter";
import { Merchant } from "./NPCs";
import { NPC } from "./GameStore";

export const getEnemyLevels = (level: number): { minLevel: number, maxLevel: number } => {
    let minLevel: number = 0;
    let maxLevel: number = 0; 
    if (level < 3) { // 1-2
        minLevel = 1;
        maxLevel = 2;
    } else  if (level <= 4) { // 3-4 
        minLevel = 2;
        maxLevel = 4;
    } else if (level <= 6) { // 5-6
        minLevel = 4;
        maxLevel = 6;
    } else if (level <= 8) { // 7-8
        minLevel = 5;
        maxLevel = 9;
    } else if (level <= 10) { // 9-10
        minLevel = 7;
        maxLevel = 12;
    } else if (level <= 12) { // 11-12
        minLevel = 8;
        maxLevel = 14;
    } else if (level <= 14) { // 13-14
        minLevel = 10;
        maxLevel = 16;
    } else if (level <= 18) { // 15-18
        minLevel = 12;
        maxLevel = 18;
    } else if (level <= 20) {
        minLevel = 16;
        maxLevel = 20;
    };
    return { minLevel, maxLevel };
};

export const fetchEnemy = async (e: any): Promise<void> => {
    const getOpponent = async () => {
        try { 
            const { minLevel, maxLevel } = getEnemyLevels(e.level); 
            const enemyData = { username: 'mirio', minLevel: minLevel, maxLevel: maxLevel };
            const rand = await userService.getRandomEnemy(enemyData);
            const clean = await asceanAPI.getCleanAscean(rand.data.ascean._id);
            const stat = await asceanAPI.getAsceanStats(rand.data.ascean._id);
            return { game: clean.data, combat: stat.data.data, enemyID: e.enemyID };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };
    const opponent = await getOpponent();
    EventEmitter.emit('enemy-fetched', opponent);
};

export const fetchNpc = async (e: any): Promise<void> => { 
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
            const response = await asceanAPI.getAnimalStats(npc);
            return { game: npc, combat: response.data.data, enemyID: e.enemyID };
        };
        const npc = await getNPC();
        EventEmitter.emit('npc-fetched', npc);
    } catch (err: any) {
        console.log("Error Getting an NPC");
    };
}; 
 