class Quest {
    constructor(quest) {
        this.player = quest.player;
        this.giver = quest.giver;
        this.title = quest.title;
        this.level = this.getLevel(quest.giver);
        this.details = this.getDetails(quest.details);
        this.rewards = this.generateRewards();
        this.description = this.getDescription(this, quest.description);
        this.completed = false;
        this.repeatable = false;
    };

    getLevel(giver) {
        const level = giver.level;
        return level;
    };

    getDetails(det) {
        const details = {
            isGiver: det.isGiver,
            isTimed: det.isTimed,
            bounty: det.bounty,
            timer: det.timer,
        };
        return details;
    };

    generateRewards() {
        const rewards = {
            currency: this.getCurrency(this.level),
            items: this.getItems(this.level),
            experience: this.getExperience(this.level),
        };
        return rewards;
    };

    getExperience(level) {
        const experience = level * 100 * this.details.bounty.bounty;
        return experience;
    };
    
    getCurrency(level) {
        const currency = {
            silver: 0,
            gold: 0,
        };
        currency.silver = Math.floor(Math.random() * level) * 15;
        if (level > 10) {
            currency.gold = Math.floor(Math.random() * (level / 10) + (level / 10));
        };
        return currency;
    };

    getItems(level) {
        const choices = ['Weapon', 'Armor', 'Jewelry', 'Shield'];
        const items = [];
        items.push(choices[Math.floor(Math.random() * choices.length)]);
        if (level > 5) {
            items.push(choices[Math.floor(Math.random() * choices.length)]);
        };
        if (level > 10) {
            items.push(choices[Math.floor(Math.random() * choices.length)]);
        };
        return items;
    };

    getDescription(quest, desc) {
        const description = `${desc}. You have been tasked with ${quest.title} by ${quest.giver.name}.`;
        return description;
    };
};

module.exports = Quest;

const ascean = {
    name: "Leaf",
    level: 9,
    experience: 0,
};

const shaman = {
    name: "Ky'Mehkai",
    level: 13,
    experience: 0,
};

const details = {
    bounty: { name: "Achreon Druid", bounty: 3 },
    timer: ascean.level + 2,
    isGiver: "Tshaeral Shaman",
    isTimed: [true, false][Math.floor(Math.random() * 2)],
};

const questData = {
    player: ascean,
    giver: shaman,
    title: "Replenish Firewater",
    description: "To walk in the land of hush and tendril and refill your flask, you must let it bleed--not of yourself but of our enemy",
    details: details,
};

const quest = new Quest(questData);

console.log(quest, "New Quest");

const nonNamedEnemy = ['Achreon Druid', "Ahn'are Apostle", "Anashtre", "Astral Apostle", "Cambiren Druid", "Chiomic Jester", "Daethic Inquisitor", "Daethic Knight", "Fang Duelist", "Fang Mercenary", 'Firesworn', 'Fyers Occultist', 'Ilire Occultist', 'Kingsman', "Kyn'gian Shaman", "Licivitan Soldier", "Ma'ier Occultist", "Marauder", "Northren Wanderer", "Nyren", "Old Li'ivi Occultist", "Quor'eite Occultist", "Quor'eite Stalker", "Rahvrecur", "Se'dyrist", "Sedyreal Guard", "Se'va Shrieker", "Shrygeian Bard", "Southron Wanderer", "Soverain Blood Cloak", "Tshaeral Shaman"];
const namedEnemy = ["Cyrian Shyne", "Dorien Caderyn", "Eugenes", "Evrio Lorian Peroumes", "Fierous Ashfyre", "Garris Ashenus", "King Mathyus Caderyn", "Kreceus", "Laetrois Ath'Shaorah", "Leaf", "Lorian", "Mavrios Ilios", "Mirio", "Sera Lorian", "Synaethis Spiras", "Torreous Ashfyre", "Vincere"];
