import { useEffect, useRef } from "react";
import { CombatData } from "../../components/GameCompiler/CombatStore";
import { Equipment } from "../../components/GameCompiler/GameStore";
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import { useDispatch } from "react-redux";
import { setSoundEffects } from "../reducers/combatState";

const useSoundEffects = async (effects: CombatData): Promise<void> => {
    console.log(effects, '<- This is the effects in useSoundEffects');
    const dispatch = useDispatch();
    const { playCounter, playRoll, playPierce, playSlash, playBlunt, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind } = useGameSounds(0.25);
    const soundEffectFunctionsRef = useRef({
        Spooky: playDaethic,
        Righteous: playDaethic,
        Wild: playWild,
        Earth: playEarth,
        Fire: playFire,
        Frost: playFrost,
        Lightning: playLightning,
        Sorcery: playSorcery,
        Wind: playWind,
        Pierce: ((weapon: Equipment) => (weapon.type === "Bow" || weapon.type === "Greatbow")) ? playBow() : playPierce(),
        Slash: playSlash,
        Blunt: playBlunt,
    }); 

    useEffect(() => {
        if (!effects.soundEffects) return;
        if (effects.realized_player_damage > 0) {
            const { player_damage_type } = effects;
            const soundEffectFn = soundEffectFunctionsRef.current[player_damage_type as keyof typeof soundEffectFunctionsRef.current];
            if (soundEffectFn) soundEffectFn(effects.weapons[0]);
        };
        if (effects.realized_computer_damage > 0) {
            const { computer_damage_type } = effects;
            const soundEffectFn = soundEffectFunctionsRef.current[computer_damage_type as keyof typeof soundEffectFunctionsRef.current];
            if (soundEffectFn) soundEffectFn(effects.computer_weapons[0]);
        };
        if (effects.religious_success === true) playReligion();
        if (effects.roll_success === true || effects.computer_roll_success === true) playRoll();
        if (effects.counter_success === true || effects.computer_counter_success === true) playCounter();
    
        dispatch(setSoundEffects);
    }, [effects]);

};

export default useSoundEffects;