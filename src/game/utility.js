import knightLegsJson from '../game/images/knight_legs_atlas.json';
import knightLegsPng  from '../game/images/knight_legs.png'
import knightLegsAnim from '../game/images/knight_legs_anim.json';
import knightHelmJson from '../game/images/knight_helm_atlas.json';
import knightHelmPng  from '../game/images/knight_helm.png'
import knightHelmAnim from '../game/images/knight_helm_anim.json';
import knightArmorJson from '../game/images/knight_armor_atlas.json';
import knightArmorPng  from '../game/images/knight_armor.png'
import knightArmorAnim from '../game/images/knight_armor_anim.json';

console.log(knightLegsPng, 'Knight Legs PNG In Utility')

export const calculateGameSize = () => {
    let width = 512;
    let height = 512; 
    const multiplier = Math.min(Math.floor(window.innerWidth / 512), Math.floor(window.innerHeight / 512)) || 1;

    if (multiplier > 1) {
        width += Math.floor((window.innerWidth - width * multiplier) / (16 * multiplier)) * 16;
        height += Math.floor((window.innerHeight - height * multiplier) / (16 * multiplier)) * 16;
    }

    return { width, height, multiplier };
};

export const equipment = {
    knightHelm: { png: knightHelmPng, json: knightHelmJson, anim: knightHelmAnim },
    knightArmor: { png: knightArmorPng, json: knightArmorJson, anim: knightArmorAnim },
    knightLegs: { png: knightLegsPng, json: knightLegsJson, anim: knightLegsAnim },
}