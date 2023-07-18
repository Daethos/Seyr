import { CombatData } from "../../components/GameCompiler/CombatStore";
import useGameSounds from '../../components/GameCompiler/Sounds'; 

export const useSoundEffects = async (effects: CombatData): Promise<void> => {
    const { playCounter, playRoll, playPierce, playSlash, playBlunt, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind } = useGameSounds(0.25);
    try {
        if (effects.realized_player_damage > 0) {
            const soundEffectMap = {
                Spooky: playDaethic,
                Righteous: playDaethic,
                Wild: playWild,
                Earth: playEarth,
                Fire: playFire,
                Frost: playFrost,
                Lightning: playLightning,
                Sorcery: playSorcery,
                Wind: playWind,
                Pierce: (weapons: any[]) => (weapons[0].type === "Bow" || weapons[0].type === "Greatbow") ? playBow() : playPierce(),
                Slash: playSlash,
                Blunt: playBlunt,
            };
        
            const { player_damage_type, weapons } = effects;
            const soundEffectFn = soundEffectMap[player_damage_type as keyof typeof soundEffectMap];
            if (soundEffectFn) {
                soundEffectFn(weapons);
            };
        };
        if (effects.realized_computer_damage > 0) {
            const soundEffectMap = {
                Spooky: playDaethic,
                Righteous: playDaethic,
                Wild: playWild,
                Earth: playEarth,
                Fire: playFire,
                Frost: playFrost,
                Lightning: playLightning,
                Sorcery: playSorcery,
                Wind: playWind,
                Pierce: (computer_weapons: any[]) => (computer_weapons[0].type === "Bow" || computer_weapons[0].type === 'Greatbow') ? playBow() : playPierce(),
                Slash: playSlash,
                Blunt: playBlunt,
            };
        
            const { computer_damage_type, computer_weapons } = effects;
            const soundEffectFn = soundEffectMap[computer_damage_type as keyof typeof soundEffectMap];
            if (soundEffectFn) {
                soundEffectFn(computer_weapons);
            };
        };
        if (effects.religious_success === true) {
            playReligion();
        };
        if (effects.roll_success === true || effects.computer_roll_success === true) {
            playRoll();
        };
        if (effects.counter_success === true || effects.computer_counter_success === true) {
            playCounter();
        };
    } catch (err: any) {
        console.log(err.message, 'Error Setting Sound Effects')
    };
};