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
            isBounty: det.isBounty,
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
        currency.silver = Math.floor(Math.random() * 10) + 1;
        currency.silver *= level;
        if (currency.silver > 100) {
            currency.silver -= 100;
            currency.gold += 1;
        };
        if (level > 10) {
            currency.gold += Math.floor(Math.random() * 2) + 1;
            currency.gold *= level / 10;
            Math.round(currency.gold);
        };
        console.log(currency, "Currency In Quest Maker")
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
        const article = ['a', 'e', 'i', 'o', 'u'].includes(quest.giver.name[0].toLowerCase()) ? "an" : "a";
        const namelessDescriptors = ["druid", "shaman", "apostle", "jester", "occultist", "stalker", "guard", "knight", "daethic", "bard", "kingsman", "firesword", "shrieker", "northren", "southron", "marauder", "fang", "soldier", "soverain", "rahvrecur", "se'dyrist", "nyren"];
        const nameParts = quest.giver.name.toLowerCase().split(" ");
        const hasDescriptor = nameParts.some((part) => namelessDescriptors.includes(part));
        const nameless = hasDescriptor ? true : false;
        const description = `${desc}. You have been tasked with ${quest.title} by ${nameless ? article + ' ' : ''}${quest.giver.name}.`;
        return description;
    };
    
};

module.exports = Quest;