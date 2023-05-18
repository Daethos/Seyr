const deities = {
    "Daethos": { // God
        luckout: {
            arbituous: 1,
            chiomic: -1,
            kyrnaic: -1,
            lilosian: 1,
        },
        mastery: {
            constitution: 1,
            achre: 1,
            caeren: 1,
        },
        miniGames: {
            tshaeral: -1,
        },
        persuasion: {
            arbituous: 1,
            chiomic: -1,
            kyrnaic: -1,
            lilosian: 1,
            shaorahi: 1,
        }
    },
    "Achreo": { // Ancient of Wild
        luckout: {
            arbituous: 2,
            kyrnaic: 1,
        },
        mastery: { 
            achre: 3,
            caeren: -1, 
        },
        miniGames: {
            cambiren: -1,
        },
        persuasion: {
            arbituous: 1,
            kyrnaic: 1,
        }
    }, 
    "Ahn've": { // Ancient of Wind

        mastery: {
            constitution: 1,
            achre: 1,
            caeren: 1,
        },
        persuasion: {
            chiomic: 1,
            fyeran: -1,
            shaorahi: 1,
        },

    }, 
    "Astra": { // Ancient of Lightning

        mastery: { 
            achre: 2,
            caeren: -1,
        },
        persuasion: {
            ilian: 1,
            shaorahi: 1,
        }
    },
    "Cambire": { // Ancient of Potential

        mastery: {  
            achre: -1,
            caeren: 3,
        },
        miniGames: {
            cambiren: 1,
        }
    },
    "Chiomyr": { // Ancient of Humor
        luckout: {
            chiomic: 2,
            lilosian: -1,
        },
        mastery: { 
            achre: 1,
            caeren: -1,
            kyosir: 1,
        },
        persuasion: {
            chiomic: 1,
            ilian: -1,
            lilosian: -1,
        }
    },
    "Fyer": { // Ancient of Fire
        
        mastery: { 
            achre: -1,
            caeren: 2,
        },
        persuasion: {
            fyeran: 2,
        }
    },
    "Ilios": { // Ancient of the Sun
        
        mastery: {
            constitution: 1,
            strength: 1, 
        },
        persuasion: {
            ilian: 2,
            shaorahi: 1,
        }
    }, 
    "Kyn'gi": { // Ancient of Hunt
        combat: {
            value: 1,
        },
        mastery: {
            constitution: 1,
            agility: 1, 
        },
        persuasion: {
            arbituous: 1,
        }
    },
    "Kyrisos": { // Ancient of Gold
        luckout: {
            chiomic: 1,
            lilosian: 1,
        },
        mastery: { 
            constitution: 1,
            caeren: 1,
            kyosir: 1,
        },
        persuasion: {
            chiomic: 1,
            ilian: 1,
            lilosian: 1,
        }
    }, 
    "Kyr'na": { // Ancient of Time
        luckout: {
            kyrnaic: 2,
        }, 
        mastery: {
            constitution: 1, 
            kyosir: 1,
        },
        persuasion: {
            kyrnaic: 1,
        }
    },
    "Lilos": { // Ancient of Life
        luckout: {
            lilosian: 2,
        },
        
        mastery: {
            constitution: 1, 
            caeren: 1,
        },
        persuasion: {
            lilosian: 1,
        }
    },
    "Ma'anre": { // Ancient of the Moon
        
        mastery: { 
            achre: 1,
            agility: 1,
        },
        persuasion: {
            chioimic: 1,
            ilian: -1,
            shaorahi: 1,
        },
        thievery: {
            value: 1,
        }
    },
    "Nyrolus": { // Ancient of Water
        luckout: {
            arbituous: 1,
            lilosian: 1,
        },
        mastery: {
            constitution: 1,
            caeren: 1, 
        },
        persuasion: {
            arbituous: 1,
            fyeran: 1,
            lilosian: 1,
        }
    },
    "Quor'ei": { // Ancient of Earth
        mastery: {
            constitution: 1,
            achre: 1, 
        },
    },
    "Rahvre": { // Ancient of Dreams 
        mastery: {
            achre: 1,
            kyosir: 1, 
        },
        persuasion: {
            chiomic: 1,
            fyeran: 1,
        }
    },
    "Se'dyro": { // Ancient of Iron
        mastery: {
            strength: 1,
            agility: 1,
            achre: 1, 
        },
        sedyrist: {
            value: 1,
        },
    }, 
    "Se'vas": { // Ancient of War
        combat: {
            value: 1,
        },
        mastery: {
            strength: 2,
        },
        miniGames: {
            sevan: 2,
            tshaeral: 1,
        },
    }, 
    "Senari": { // Ancient of Wisdom
        luckout: {
            arbituous: 1,
        },
        mastery: {
            achre: 1,
            caeren: 1, 
        },
        persuasion: {
            arbituous: 1,
            fyeran: 1,
            lilosian: 1
        }
    },
    "Shrygei": { // Ancient of Song
        mastery: {
            agility: 1,
            kyosir: 1,
        },
        miniGames: {
            shrygeian: 2,
        },
        persuasion: {
            chiomic: 1,
            fyeran: 1,
        },
    },
    "Tshaer": { // Ancient of Animals
        combat: {
            value: 1,
        }, 
        mastery: { 
            strength: 1,
            agility: 1,
        },
        miniGames: {
            sevan: 1,
            tshaeral: 2,
        },
    }, 
};

const checkDeificConcerns = async (statistics, worship, stat, innerStat) => {
    try {
        console.log(statistics, stat, worship, "Statistics and stat");
        const deity = deities[worship];
        console.log(deity, "Deity in question");
        const statConcerns = deity[stat];
        console.log(statConcerns, "Stat Concerns");
        if (statConcerns) {
            const innerStatConcerns = statConcerns[innerStat];
            console.log(innerStatConcerns, "Inner Stat Concerns");
            if (innerStatConcerns) {
                statistics.relationships.deity.value += innerStatConcerns;
            };
        };

        return statistics;
        
    } catch (err) {
        console.log(err, "Error Checking Deific stats");
    };
};

module.exports = checkDeificConcerns;