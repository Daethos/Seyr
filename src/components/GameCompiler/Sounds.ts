import useSound from 'use-sound'

const opponentSfx = process.env.PUBLIC_URL + `/sounds/opponent.mp3`;
const weaponOrderSfx = process.env.PUBLIC_URL + `/sounds/weapon-order.mp3`;
const counterSfx = process.env.PUBLIC_URL + `/sounds/counter-success.mp3`;
const rollSfx = process.env.PUBLIC_URL + `/sounds/roll-success.mp3`;
const pierceSfx = process.env.PUBLIC_URL + `/sounds/sword-stab.mp3`;
const slashSfx = process.env.PUBLIC_URL + `/sounds/slash-attack.mp3`;
const bluntSfx = process.env.PUBLIC_URL + `/sounds/blunt-attack.mp3`;
const deathSfx = process.env.PUBLIC_URL + `/sounds/death-sound.mp3`;
const winSfx = process.env.PUBLIC_URL + `/sounds/win-sound.mp3`;
const replaySfx = process.env.PUBLIC_URL + `/sounds/replay-sound.mp3`;
const religiousSfx = process.env.PUBLIC_URL + `/sounds/religious.mp3`;
const daethicSfx = process.env.PUBLIC_URL + `/sounds/daethic-magic.mp3`;
const wildSfx = process.env.PUBLIC_URL + `/sounds/wild-magic.mp3`;
const earthSfx = process.env.PUBLIC_URL + `/sounds/earth-magic.mp3`;
const fireSfx = process.env.PUBLIC_URL + `/sounds/fire-magic.mp3`;
const bowSfx = process.env.PUBLIC_URL + `/sounds/bow-attack.mp3`;
const frostSfx = process.env.PUBLIC_URL + `/sounds/frost-magic.mp3`;
const lightningSfx = process.env.PUBLIC_URL + `/sounds/lightning-magic.mp3`;
const sorcerySfx = process.env.PUBLIC_URL + `/sounds/sorcery-magic.mp3`;
const windSfx = process.env.PUBLIC_URL + `/sounds/wind-magic.mp3`;
const walk1Sfx = process.env.PUBLIC_URL + `/sounds/walk-1.mp3`;
const walk2Sfx = process.env.PUBLIC_URL + `/sounds/walk-2.mp3`;
const walk3Sfx = process.env.PUBLIC_URL + `/sounds/walk-3.mp3`;
const walk4Sfx = process.env.PUBLIC_URL + `/sounds/walk-4.mp3`;
const walk8Sfx = process.env.PUBLIC_URL + `/sounds/walk-8.mp3`;
const walk9Sfx = process.env.PUBLIC_URL + `/sounds/walk-9.mp3`;
const merchantSfx = process.env.PUBLIC_URL + `/sounds/merchant.mp3`;
const dungeonSfx = process.env.PUBLIC_URL + `/sounds/dungeon.mp3`;
const phenomenaSfx = process.env.PUBLIC_URL + `/sounds/phenomena.mp3`;
const treasureSfx = process.env.PUBLIC_URL + `/sounds/treasure.mp3`;
const actionButtonSfx = process.env.PUBLIC_URL + `/sounds/action-button.mp3`;
const combatRoundSfx = process.env.PUBLIC_URL + `/sounds/combat-round.mp3`;

const useGameSounds = (volume: number) => {
    const [playOpponent] = useSound(opponentSfx, { volume });
    const [playWO] = useSound(weaponOrderSfx, { volume });
    const [playCounter] = useSound(counterSfx, { volume });
    const [playRoll] = useSound(rollSfx, { volume });
    const [playPierce] = useSound(pierceSfx, { volume });
    const [playSlash] = useSound(slashSfx, { volume });
    const [playBlunt] = useSound(bluntSfx, { volume });
    const [playDeath] = useSound(deathSfx, { volume });
    const [playWin] = useSound(winSfx, { volume });
    const [playReplay] = useSound(replaySfx, { volume });
    const [playReligion] = useSound(religiousSfx, { volume });
    const [playDaethic] = useSound(daethicSfx, { volume });
    const [playWild] = useSound(wildSfx, { volume });
    const [playEarth] = useSound(earthSfx, { volume });
    const [playFire] = useSound(fireSfx, { volume });
    const [playBow] = useSound(bowSfx, { volume });
    const [playFrost] = useSound(frostSfx, { volume });
    const [playLightning] = useSound(lightningSfx, { volume });
    const [playSorcery] = useSound(sorcerySfx, { volume });
    const [playWind] = useSound(windSfx, { volume });
    const [playWalk1] = useSound(walk1Sfx, { volume });
    const [playWalk2] = useSound(walk2Sfx, { volume });
    const [playWalk3] = useSound(walk3Sfx, { volume });
    const [playWalk4] = useSound(walk4Sfx, { volume });
    const [playWalk8] = useSound(walk8Sfx, { volume });
    const [playWalk9] = useSound(walk9Sfx, { volume });
    const [playMerchant] = useSound(merchantSfx, { volume });
    const [playDungeon] = useSound(dungeonSfx, { volume });
    const [playPhenomena] = useSound(phenomenaSfx, { volume });
    const [playTreasure] = useSound(treasureSfx, { volume });
    const [playActionButton] = useSound(actionButtonSfx, { volume });
    const [playCombatRound] = useSound(combatRoundSfx, { volume });

    return { 
        playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, 
        playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, 
        playFire, playBow, playFrost, playLightning, playSorcery, playWind, 
        playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, 
        playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound
    };
};

export default useGameSounds;