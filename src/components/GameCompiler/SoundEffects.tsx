import useSound from 'use-sound';
import { useEffect } from 'react';

interface SoundEffect {
    name: string,
    url: string,
    volume?: number,
}

export const SoundEffects: SoundEffect[] = [
    {
        name: 'bow',
        url: process.env.PUBLIC_URL + `/sounds/bow-attack.mp3`,
        volume: 0.3,
    },
    {
        name: 'Blunt',
        url: process.env.PUBLIC_URL + `/sounds/blunt-attack.mp3`,
        volume: 0.3,
    },
    {
        name: 'counter',
        url: process.env.PUBLIC_URL + `/sounds/counter-success.mp3`,
        volume: 0.3,
    },
    {
        name: 'Spooky',
        url: process.env.PUBLIC_URL + `/sounds/daethic-magic.mp3`,
        volume: 0.3,
    },
    {
        name: 'Righteous',
        url: process.env.PUBLIC_URL + `/sounds/daethic-magic.mp3`,
        volume: 0.3,
    },
    {
        name: 'death',
        url: process.env.PUBLIC_URL + '/sounds/death-sound.mp3',
        volume: 0.3,
    },
    {
        name: 'Earth',
        url: process.env.PUBLIC_URL + '/sounds/earth-magic.wav',
        volume: 0.3,
    },
    {
        name: 'Fire',
        url: process.env.PUBLIC_URL + '/sounds/fire-magic.mp3',
        volume: 0.3,
    },
    {
        name: 'Frost',
        url: process.env.PUBLIC_URL + '/sounds/frost-magic.mp3',
        volume: 0.3,
    },
    {
        name: 'Lightning',
        url: process.env.PUBLIC_URL + '/sounds/lightning-magic.wav',
        volume: 0.3,
    },
    {
        name: 'opponent',
        url: process.env.PUBLIC_URL + '/sounds/opponent.mp3',
        volume: 0.3,
    },
    {
        name: 'Pierce',
        url: process.env.PUBLIC_URL + '/sounds/sword-stab.mp3',
        volume: 0.3,
    },
    {
        name: 'religious',
        url: process.env.PUBLIC_URL + '/sounds/religious.mp3',
        volume: 0.3,
    },
    {
        name: 'replay',
        url: process.env.PUBLIC_URL + '/sounds/replay-sound.mp3',
        volume: 0.3,
    },
    {
        name: 'roll',
        url: process.env.PUBLIC_URL + '/sounds/roll-success.mp3',
        volume: 0.3,
    },
    {
        name: 'Slash',
        url: process.env.PUBLIC_URL + '/sounds/slash-attack.mp3',
        volume: 0.3,
    },
    {
        name: 'Sorcery',
        url: process.env.PUBLIC_URL + '/sounds/sorcery-magic.mp3',
        volume: 0.3,
    },
    {
        name: 'weapon-order',
        url: process.env.PUBLIC_URL + '/sounds/weapon-order.mp3',
        volume: 0.3,
    },
    {
        name: 'Wild',
        url: process.env.PUBLIC_URL + '/sounds/wild-magic.mp3',
        volume: 0.3,
    },
    {
        name: 'win',
        url: process.env.PUBLIC_URL + '/sounds/win-sound.mp3',
        volume: 0.3,
    },
    {
        name: 'Wind',
        url: process.env.PUBLIC_URL + '/sounds/wind-magic.mp3',
        volume: 0.3,
    },
    {
        name: 'transaction',
        url: process.env.PUBLIC_URL + '/sounds/buy_sell.wav',
        volume: 0.3,
    },
    {
        name: 'equip',
        url: process.env.PUBLIC_URL + '/sounds/equip.wav',
        volume: 0.3,
    },
    {
        name: 'unequip',
        url: process.env.PUBLIC_URL + '/sounds/unequip.wav',
        volume: 0.3,
    }
];

export const useSoundEffect = (effect: any) => {
    console.log('useSoundEffect playing', effect);
    const [playSound] = useSound(effect?.url, { volume: effect?.volume });
    playSound();
};

const UseSoundEffect = ({ effect }: any) => {
    const [playSound] = useSound(effect?.url, { volume: effect?.volume });
    useEffect(() => {
        if (!effect) {
            console.log('No sound effect found');
            return;
        }
    }, [effect]);
    return playSound;
};


export const soundEffectFunctions = {
    'Blunt': () => UseSoundEffect('blunt'),
    'Earth': () => UseSoundEffect('earth'),
    'Fire': () => UseSoundEffect('fire'),
    'Frost': () => UseSoundEffect('frost'),
    'Lightning': () => UseSoundEffect('lightning'),
    'Pierce': () => UseSoundEffect('pierce'),
    'Righteous': () => UseSoundEffect('daethic'),
    'Slash': () => UseSoundEffect('slash'),
    'Sorcery': () => UseSoundEffect('sorcery'),
    'Spooky': () => UseSoundEffect('daethic'),
    'Wild': () => UseSoundEffect('wild'),
    'Wind': () => UseSoundEffect('wind'),

    'Counter': () => UseSoundEffect('counter'),
    'Religious': () => UseSoundEffect('religious'),
    'Roll': () => UseSoundEffect('roll'),

    'Opponent': () => UseSoundEffect('opponent'),
    'Replay': () => UseSoundEffect('replay'),
    'Weapon-Order': () => UseSoundEffect('weapon-order'),
    'Death': () => UseSoundEffect('death'),
    'Win': () => UseSoundEffect('win'),
};

export default UseSoundEffect;