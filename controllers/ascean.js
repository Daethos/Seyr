const Ascean = require('../models/ascean');
const asceanService = require('../services/asceanServices');
const Weapon = require('../models/weapon');
const Shield = require('../models/shield');
const Helmet = require('../models/helmet');
const Chest = require('../models/chest');
const Legs = require('../models/legs');
const Ring = require('../models/ring');
const Amulet = require('../models/amulet');
const Trinket = require('../models/trinket');
const Equipment = require('../models/equipment');
const Map = require('../models/map');
const fs = require('fs');
const seedDB = require('./equipment').seedDB;
const zlib = require('zlib');
const checkDeificConcerns = require('../services/deityServices');

module.exports = {
    create,
    index,
    quickIndex,
    editAscean,
    getOneAscean,
    delete: deleteAscean,
    getAsceanStats,
    updateHighScore,
    updateLevel,
    saveExperience,
    saveToInventory,
    saveInventory,
    swapItems,
    removeItem,
    purchaseToInventory,
    searchAscean,
    saveCoordinates,
    drinkFirewater,
    restoreFirewater,
    replenishFirewater,
    animalStats,
    getOneAsceanClean,
    killAscean,
    persistAscean,
    getAsceanAndInventory,
    getAsceanInventory,
    getAsceanQuests,
    killAscean,
    persistAscean,
    firstTutorial,
    asceanTax,
    updateHealth,
    setCurrency,
    setExperience,
    getOneAsceanLight,
    blessAscean,
    curseAscean,
    addJournalEntry,
    evaluateDeity,
    updateStatistics,
    recordNonCombatStatistic,
    recordCombatStatistic,
    recordSedyrist,
    recordThievery,
    sacrificeExp,
};

async function recordSedyrist(req, res) {
    try {
        let { asceanID, successes, failures, total, totalValue } = req.body;
        console.log(asceanID, successes, failures, total, totalValue, "destructured req.body")
        let ascean = await Ascean.findById(asceanID);
        ascean.statistics.sedyrist.successes += successes;
        ascean.statistics.sedyrist.failures += failures;
        ascean.statistics.sedyrist.total += total;
        ascean.statistics.sedyrist.totalValue += totalValue;
        if (ascean.statistics.relationships.deity.name !== '') {
            const newStats = await checkDeificConcerns(ascean.statistics, ascean.statistics.relationships.deity.name, 'sedyrist', 'value');
            ascean.statistics = newStats;
        };
        await ascean.save();
        res.status(200).json(ascean.statistics);
    } catch (err) {
        console.log(err, "error in recordSedyrist")
        res.status(400).json({ message: "Error in recordSedyrist" })
    };
};

async function recordThievery(req, res) {
    try {
        let { asceanID, successes, failures, total, totalValue } = req.body;
        console.log(asceanID, successes, failures, total, totalValue, "destructured req.body")
        let ascean = await Ascean.findById(asceanID);
        ascean.statistics.thievery.successes += successes;
        ascean.statistics.thievery.failures += failures;
        ascean.statistics.thievery.total += total;
        ascean.statistics.thievery.totalValue += totalValue;
        if (ascean.statistics.relationships.deity.name !== '') {
            const newStats = await checkDeificConcerns(ascean.statistics, ascean.statistics.relationships.deity.name, 'thievery', 'value');
            ascean.statistics = newStats;
        };
        await ascean.save();
        res.status(200).json(ascean.statistics);
    } catch (err) {
        console.log(err, "error in recordThievery")
        res.status(400).json({ message: "Error in recordThievery" })
    };
};

async function recordNonCombatStatistic(req, res) {
    try {
        let { asceanID, name, type, successes, failures, total } = req.body;
        console.log(asceanID, name, type, successes, failures, total, "destructured req.body");
        let ascean = await Ascean.findById(asceanID);
        let statistic = ascean.statistics[name];
        let newType = type.toLowerCase();
        console.log(statistic[newType], newType, "Statistic and Type of");
        if (statistic) {
            statistic[newType].successes += successes;
            statistic[newType].failures += failures;
            statistic[newType].total += total;
        } else {
            res.status(400).json({ message: "Statistic not found" });
        };
        ascean.statistics[newType] = statistic;
        if (ascean.statistics.relationships.deity.name !== '') {
            const newStats = await checkDeificConcerns(ascean.statistics, ascean.statistics.relationships.deity.name, name, newType);
            ascean.statistics = newStats;
        };
        console.log(ascean.statistics[newType], "in record non-combat statistic saved ?");
        await ascean.save();
        res.status(200).json(ascean.statistics);
    } catch (err) {
        console.log(err, "error in Record Non-Combat Statistic");
        res.status(400).json(err);
    };
};

async function recordCombatStatistic(req, res) {
    try {
        let { asceanID, wins, losses, total, actionData, typeAttackData, typeDamageData, totalDamageData, prayerData, deityData } = req.body;
        let ascean = await Ascean.findById(asceanID);
        let statistic = ascean.statistics.combat;
        statistic.wins += wins;
        statistic.losses += losses;
        statistic.total += total;
        statistic.actions.attacks += actionData.reduce((count, action) => action === 'attack' ? count + 1 : count, 0);
        statistic.actions.counters += actionData.reduce((count, action) => action === 'counter' ? count + 1 : count, 0);
        statistic.actions.dodges += actionData.reduce((count, action) => action === 'dodge' ? count + 1 : count, 0);
        statistic.actions.postures += actionData.reduce((count, action) => action === 'posture' ? count + 1 : count, 0);
        statistic.actions.rolls += actionData.reduce((count, action) => action === 'roll' ? count + 1 : count, 0);
        statistic.actions.invokes += actionData.reduce((count, action) => action === 'invoke' ? count + 1 : count, 0);
        statistic.actions.prayers += actionData.reduce((count, action) => action === 'prayer' ? count + 1 : count, 0);
        statistic.actions.consumes += actionData.reduce((count, action) => action === 'consume' ? count + 1 : count, 0);
        statistic.prayers.buff += prayerData.reduce((count, prayer) => prayer === 'Buff' ? count + 1 : count, 0);
        statistic.prayers.heal += prayerData.reduce((count, prayer) => prayer === 'Heal' ? count + 1 : count, 0);
        statistic.prayers.damage += prayerData.reduce((count, prayer) => prayer === 'Damage' ? count + 1 : count, 0);
        statistic.prayers.debuff += prayerData.reduce((count, prayer) => prayer === 'Debuff' ? count + 1 : count, 0);
        statistic.attacks.magical += typeAttackData.reduce((count, type) => type === 'Magic' ? count + 1 : count, 0);
        statistic.attacks.physical += typeAttackData.reduce((count, type) => type === 'Physical' ? count + 1 : count, 0);
        statistic.attacks.blunt += typeDamageData.reduce((count, type) => type === 'Blunt' ? count + 1 : count, 0);
        statistic.attacks.pierce += typeDamageData.reduce((count, type) => type === 'Pierce' ? count + 1 : count, 0);
        statistic.attacks.slash += typeDamageData.reduce((count, type) => type === 'Slash' ? count + 1 : count, 0);
        statistic.attacks.earth += typeDamageData.reduce((count, type) => type === 'Earth' ? count + 1 : count, 0);
        statistic.attacks.fire += typeDamageData.reduce((count, type) => type === 'Fire' ? count + 1 : count, 0);
        statistic.attacks.frost += typeDamageData.reduce((count, type) => type === 'Frost' ? count + 1 : count, 0);
        statistic.attacks.lightning += typeDamageData.reduce((count, type) => type === 'Lightning' ? count + 1 : count, 0);
        statistic.attacks.righteous += typeDamageData.reduce((count, type) => type === 'Righteous' ? count + 1 : count, 0);
        statistic.attacks.spooky += typeDamageData.reduce((count, type) => type === 'Spooky' ? count + 1 : count, 0);
        statistic.attacks.sorcery += typeDamageData.reduce((count, type) => type === 'Sorcery' ? count + 1 : count, 0);
        statistic.attacks.wild += typeDamageData.reduce((count, type) => type === 'Wild' ? count + 1 : count, 0);
        statistic.attacks.wind += typeDamageData.reduce((count, type) => type === 'Wind' ? count + 1 : count, 0);
        statistic.attacks.total = Math.max(totalDamageData, statistic.attacks.total); 
        statistic.deities.Daethos += deityData.reduce((count, deity) => deity === 'Daethos' ? count + 1 : count, 0);
        statistic.deities.Achreo += deityData.reduce((count, deity) => deity === 'Achreo' ? count + 1 : count, 0);
        statistic.deities.Ahnve += deityData.reduce((count, deity) => deity === "Ahn've" ? count + 1 : count, 0);
        statistic.deities.Astra += deityData.reduce((count, deity) => deity === 'Astra' ? count + 1 : count, 0);
        statistic.deities.Cambire += deityData.reduce((count, deity) => deity === 'Cambire' ? count + 1 : count, 0);
        statistic.deities.Chiomyr += deityData.reduce((count, deity) => deity === 'Chiomyr' ? count + 1 : count, 0);
        statistic.deities.Fyer += deityData.reduce((count, deity) => deity === 'Fyer' ? count + 1 : count, 0);
        statistic.deities.Ilios += deityData.reduce((count, deity) => deity === 'Ilios' ? count + 1 : count, 0);
        statistic.deities.Kyngi += deityData.reduce((count, deity) => deity === "Kyn'gi" ? count + 1 : count, 0);
        statistic.deities.Kyrisos += deityData.reduce((count, deity) => deity === 'Kyrisos' ? count + 1 : count, 0);
        statistic.deities.Kyrna += deityData.reduce((count, deity) => deity === "Kyr'na" ? count + 1 : count, 0);
        statistic.deities.Lilos += deityData.reduce((count, deity) => deity === 'Lilos' ? count + 1 : count, 0);
        statistic.deities.Maanre += deityData.reduce((count, deity) => deity === "Ma'anre" ? count + 1 : count, 0);
        statistic.deities.Nyrolus += deityData.reduce((count, deity) => deity === 'Nyrolus' ? count + 1 : count, 0);
        statistic.deities.Quorei += deityData.reduce((count, deity) => deity === "Quor'ei" ? count + 1 : count, 0);
        statistic.deities.Rahvre += deityData.reduce((count, deity) => deity === 'Rahvre' ? count + 1 : count, 0);
        statistic.deities.Senari += deityData.reduce((count, deity) => deity === 'Senari' ? count + 1 : count, 0);
        statistic.deities.Sedyro += deityData.reduce((count, deity) => deity === "Se'dyro" ? count + 1 : count, 0);
        statistic.deities.Sevas += deityData.reduce((count, deity) => deity === "Se'vas" ? count + 1 : count, 0);
        statistic.deities.Shrygei += deityData.reduce((count, deity) => deity === "Shrygei" ? count + 1 : count, 0);
        statistic.deities.Tshaer += deityData.reduce((count, deity) => deity === 'Tshaer' ? count + 1 : count, 0);
 
        if (wins > losses && ascean.statistics.relationships.deity.name !== '') {
            const newStats = await checkDeificConcerns(ascean.statistics, ascean.statistics.relationships.deity.name, 'combat', 'value');
            ascean.statistics = newStats;
        };

        ascean.statistics.combat = statistic;
        await ascean.save();
        res.status(200).json(ascean.statistics);
    } catch (err) {
        console.log(err, "error in Record Combat Statistic");
        res.status(400).json(err);
    };
};

async function updateStatistics(req, res) {
    try {
        let ascean = await Ascean.findById(req.body.asceanID);
        ascean.statistics = req.body.statistics;
        await ascean.save();
        res.status(200).json(ascean);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    };
};

async function evaluateDeity(req, res) {
    try {
        let { asceanID, deity, entry } = req.body;
        let ascean = await Ascean.findById(asceanID);

        const keywords = {
            'Daethos': 'Daethos',
            'Daethic': 'Daethic',
            'Daethos\'s': 'Daethos\'s',
            'Ancient': 'Ancient',
            'Ancients': 'Ancients',
            'Ancient\'s': 'Ancient\'s',
            
            'Achreo': 'Achreo',
            'Achreo\'s': 'Achreo\'s',
            
            'Ahn\'ve': 'Ahn\'ve',
            'Ahn\'ve\'s': 'Ahn\'ve\'s',
            
            'Astra': 'Astra',
            'Astra\'s': 'Astra\'s',
            
            'Cambire': 'Cambire',
            'Cambire\'s': 'Cambire\'s',
            
            'Chiomyr': 'Chiomyr',
            'Chiomyr\'s': 'Chiomyr\'s',

            'Fyer': 'Fyer',
            'Fyer\'s': 'Fyer\'s',

            'Ilios': 'Ilios',
            'Ilios\'s': 'Ilios\'s',
            
            'Kyn\'gi': 'Kyn\'gi',
            'Kyn\'gi\'s': 'Kyn\'gi\'s',
            
            'Kyr\'na': 'Kyr\'na',
            'Kyr\'na\'s': 'Kyr\'na\'s',

            'Kyrisos': 'Kyrisos',
            'Kyrisos\'s': 'Kyrisos\'s',

            'Lilos': 'Lilos',
            'Lilos\'s': 'Lilos\'s',

            'Ma\'anre': 'Ma\'anre',
            'Ma\'anre\'s': 'Ma\'anre\'s',

            'Nyrolus': 'Nyrolus',
            'Nyrolus\'s': 'Nyrolus\'s',
            
            'Quor\'ei': 'Quor\'ei',
            'Quor\'ei\'s': 'Quor\'ei\'s',

            'Rahvre': 'Rahvre',
            'Rahvre\'s': 'Rahvre\'s',
            
            'Senari': 'Senari',
            'Senari\'s': 'Senari\'s',
            
            'Se\'dyro': 'Se\'dyro',
            'Se\'dyro\'s': 'Se\'dyro\'s',
            
            'Se\'vas': 'Se\'vas',
            'Se\'vas\'s': 'Se\'vas\'s',

            'Shrygei': 'Shrygei',
            'Shrygei\'s': 'Shrygei\'s',
            
            'Tshaer': 'Tshaer',
            'Tshaer\'s': 'Tshaer\'s',
        };

        const keywordCount = {
            'Compliant': {
                occurrence: 0,
                value: 0
            },
            'Faithful': {
                occurrence: 0,
                value: 0
            },
            'Unfaithful': {
                occurrence: 0,
                value: 0
            },
            'Disobedient': {
                occurrence: 0,
                value: 0
            },
        };

        const masteryKeyords = {
            'Constitution': 'constitution',
            'Strength': 'strength',
            'Agility': 'agility',
            'Achre': 'achre',
            'Caeren': 'caeren',
            'Kyosir': 'kyosir',
        };

        entry.body = entry.body.join('\n\n'); 
 
        entry.keywords.forEach((keyword) => {
            if (keywordCount[keyword]) {
                keywordCount[keyword].occurrence += 1;
            };
        });
          
        
        keywordCount.Compliant.value = keywordCount.Compliant.occurrence;
        keywordCount.Faithful.value = keywordCount.Faithful.occurrence * 2;
        keywordCount.Unfaithful.value = -keywordCount.Unfaithful.occurrence * 2;
        keywordCount.Disobedient.value = -keywordCount.Disobedient.occurrence;

        const valueSum = keywordCount.Compliant.value + keywordCount.Faithful.value + keywordCount.Unfaithful.value + keywordCount.Disobedient.value;

        const evaluateBehavior = (count) => {
            const sortCountOccurrence = Object.entries(count).sort((a, b) => b[1].occurrence - a[1].occurrence);
            const mostFrequentBehavior = sortCountOccurrence[0][0];
            console.log(sortCountOccurrence, mostFrequentBehavior, "sortCountOccurrence, sortCountValue");
            if (mostFrequentBehavior === 'Faithful') {
                if (valueSum >= 4) {
                    return 'Convicted';
                } else if (valueSum >= 2) {
                    return 'Faithful';
                } else if (valueSum === 1) {
                    return 'Somewhat Faithful';
                } else {
                    return 'Strained Faith';
                };
            } else if (mostFrequentBehavior === 'Compliant') {
                if (valueSum >= 4) {
                    return 'Zealous';
                } else if (valueSum >= 2) {
                    return 'Compliant';
                } else if (valueSum >= 1) {
                    return 'Somewhat Compliant';
                } else {
                    return 'Strained Compliance';
                };
            } else if (mostFrequentBehavior === 'Unfaithful') {
                if (valueSum <= -4) {
                    return 'Hostile';
                } else if (valueSum <= -2) {
                    return 'Unfaithful';
                } else if (valueSum <= -1) {
                    return 'Somewhat Unfaithful';
                } else {
                    return 'Waning Faith';
                };
            } else if (mostFrequentBehavior === 'Disobedient') {
                if (valueSum <= -4) {
                    return 'Rabid';
                } else if (valueSum <= -2) {
                    return 'Disobedient';
                } else if (valueSum <= -1) {
                    return 'Somewhat Disobedient';
                } else {
                    return 'Waning Compliance';
                };
            } else {
                return 'Neutral';
            };
        };

        const behavior = evaluateBehavior(keywordCount);

        console.log(behavior, "Behavior");
        if (ascean.statistics.relationships.deity.name === '') ascean.statistics.relationships.deity.name = deity;
        ascean.statistics.relationships.deity.Compliant.occurrence += keywordCount.Compliant.occurrence;
        ascean.statistics.relationships.deity.Faithful.occurrence += keywordCount.Faithful.occurrence;
        ascean.statistics.relationships.deity.Unfaithful.occurrence += keywordCount.Unfaithful.occurrence;
        ascean.statistics.relationships.deity.Disobedient.occurrence += keywordCount.Disobedient.occurrence;
        ascean.statistics.relationships.deity.Compliant.value += keywordCount.Compliant.value;
        ascean.statistics.relationships.deity.Faithful.value += keywordCount.Faithful.value;
        ascean.statistics.relationships.deity.Unfaithful.value += keywordCount.Unfaithful.value;
        ascean.statistics.relationships.deity.Disobedient.value += keywordCount.Disobedient.value;
        ascean.statistics.relationships.deity.value += valueSum;
        ascean.statistics.relationships.deity.behaviors.push(behavior);

        if (ascean.statistics.relationships.deity.behaviors.length === 2) ascean.capable.invoke = true;
        if (ascean.statistics.relationships.deity.behaviors.length === 3) ascean.capable.consume = true;

        // const goodBehavior = ascean.statistics.relationships.deity.behaviors.filter(behavior => behavior === 'Faithful' || behavior === 'Compliant');
        // const badBehavior = ascean.statistics.relationships.deity.behaviors.filter(behavior => behavior === 'Unfaithful' || behavior === 'Disobedient');
        // const middlingBehavior = ascean.statistics.relationships.deity.behaviors.filter(behavior => behavior === 'Somewhat Faithful' || behavior === 'Somewhat Compliant' || behavior === 'Somewhat Unfaithful' || behavior === 'Somewhat Disobedient');
        // const goodBehaviorCount = goodBehavior.length;
        // const badBehaviorCount = badBehavior.length;
        // const middlingBehaviorCount = middlingBehavior.length;

        const presentTense = ascean.faith === 'adherent' ? 'adherence to' : ascean.faith === 'devoted' ? 'devotion to' : 'curiosity with';
        const pastTense = ascean.faith === 'adherent' ? 'adherent toward' : ascean.faith === 'devoted' ? 'devoted toward' : 'curious with';

        switch (behavior) {
            case 'Convicted':
                ascean[keywords[ascean.mastery]] += 1;
                entry.footnote = `${ascean.name} seems convicted of their ${presentTense} ${deity}.`;
                break;
            case 'Zealous':
                entry.footnote = `${ascean.name} seems zealous in their ${presentTense} ${deity}.`;
                ascean[keywords[ascean.mastery]] += 0.75;
                break;
            case 'Faithful':
                entry.footnote = `${ascean.name} seems faithful to ${deity}.`;
                ascean[keywords[ascean.mastery]] += 0.5;
                break;
            case 'Somewhat Faithful':
                entry.footnote = `${ascean.name} seems somewhat faithful to ${deity}.`;
                ascean[keywords[ascean.mastery]] += 0.25;
                break;
            case 'Compliant':
                entry.footnote = `${ascean.name}'s ${pastTense} ${deity}.`;
                
                break;
            case 'Waning Faith':
                entry.footnote = `${ascean.name}'s waning in their ${presentTense} ${deity}.`;
                
                break;
            case 'Somewhat Compliant':
                entry.footnote = `${ascean.name}'s somewhat ${pastTense} ${deity}.`;
                
                break;
            case 'Strained Compliance':
                entry.footnote = `${ascean.name}'s strained in their ${presentTense} ${deity}.`;
                // It'll sense that the deity notices this behavior
                break;
            case 'Waning Compliance':
                entry.footnote = `${ascean.name}'s waning in their ${presentTense} ${deity}.`;
                // Over time, this will have another closure that writes the footnote based on the specific deity
                break;
            case 'Somewhat Disobedient':
                entry.footnote = `${ascean.name} has been somewhat disobedient to ${deity}.`;
                // This is where Chiomyr would mess with someone's inventory, etc...
                break;
            case 'Disobedient':
                entry.footnote = `${ascean.name} has been disobedient to ${deity}.`;
                // Or put their current health at level 1 as punishment
                break;
            case 'Somewhat Unfaithful':
                entry.footnote = `${ascean.name} has been somewhat unfaithful to ${deity}.`;
                ascean[keywords[ascean.mastery]] -= 0.25;
                break;
            case 'Unfaithful':
                ascean[keywords[ascean.mastery]] -= 0.5;
                entry.footnote = `${ascean.name} has been unfaithful to ${deity}.`;
                break;
            case 'Rabid':
                ascean[keywords[ascean.mastery]] -= 0.75;
                entry.footnote = `${ascean.name} has been rabid in their unfaithfulness to ${deity}.`;
                break;
            case 'Hostile':
                ascean[keywords[ascean.mastery]] -= 1;
                entry.footnote = `${ascean.name} has been hostile to ${deity}.`;
                break;
            default:
                break;
        };
        ascean.journal.entries.push(entry);
        await ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Evaluating Experience");
        res.status(400).json(err);
    };
};

async function addJournalEntry(req, res) {
    try {
        let ascean = await Ascean.findById(req.body.asceanID);
        ascean.journal.entries.push(req.body.entry);
        await ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Adding Journal Entry");
        res.status(400).json(err);
    };
};

async function setCurrency(req, res) {
    try {
        let ascean = await Ascean.findById(req.body.asceanID);
        ascean.currency.silver -= req.body.currency;
        await rebalanceCurrency(ascean);
        await ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Setting Currency");
        res.status(400).json(err);
    };
};

async function setExperience(req, res) {
    try {
        let ascean = await Ascean.findById(req.body.asceanID);
        ascean.experience -= req.body.experience;
        await ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err, "Error Setting Experience");
        res.status(400).json(err);
    };
};

async function firstTutorial(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        ascean.tutorial[req.params.tutorial] = false;
        // if (req.params.tutorial === 'firstPhenomena') ascean.capable.pray = true;
        await ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Changing Tutorial");
        res.status(400).json(err);
    };
};

async function killAscean(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        ascean.alive = false;
        ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Killing Ascean");
        res.status(400).json(err);
    };
};

async function persistAscean(req, res) {
    console.log(req.body.lineage.name, req.body.name, '<- Hopefully the Ascean!');

    if (req.body.faith === 'devoted') { // Devoted to Daethos
        if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
            if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // Daethic Halberd && Hush of Daethos
                req.body.weapon_one = '63d059865df7503ef9cd71f4';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e58e';
            } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Gladius && Daethic Bow
                req.body.weapon_one = '63b3460cd5c6cfea02a5e56c';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
            } else { // Same Value Daethic Bow && Daethic Halberd
                req.body.weapon_one = '63b3460cd5c6cfea02a5e586';
                req.body.weapon_two = '63d059865df7503ef9cd71f4';
            }
        } else {
            if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Tendril && Daethic Bow
                req.body.weapon_one = '63b3460cd5c6cfea02a5e583';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
            } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Hush of Daethos && Tendril of Daethos
                req.body.weapon_one = '63b3460cd5c6cfea02a5e58e';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e58f';
            } else { // Same Value Blessed Dagger && Cursed Dagger
                req.body.weapon_one = '63e47c140de4781b96411d67';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e572';
            }
        }
    } else { // Adherent to the Ancients or Irreligious
        if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
            if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // War Hammer && Sunshatter
                req.body.weapon_one = '63b3460cd5c6cfea02a5e578';
                req.body.weapon_two = '63e47c140de4781b96411d6b';
            } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Longsword && Sevashyr
                req.body.weapon_one = '63b3460cd5c6cfea02a5e56d';
                req.body.weapon_two = '63e54b27d110dc7ef8fd630b';
            } else { // Same Value Claymore && Longbow
                req.body.weapon_one = '63b3460cd5c6cfea02a5e576';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e585';
            }
        } else {
            if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Astral Spear && Quor'eite Crush
                req.body.weapon_one = '63b3460cd5c6cfea02a5e57f';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e581';
            } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Ashfyre && Nyrolean Wave
                req.body.weapon_one = '63b3460cd5c6cfea02a5e588';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e58b';
            } else { // Same Value Wildstrike && Nightmare
                req.body.weapon_one = '63b3460cd5c6cfea02a5e582';
                req.body.weapon_two = '63e47c140de4781b96411d77';
            }
        }
    }

    const firstWeapon = await Weapon.findById(req.body.weapon_one);
    await seedDB([firstWeapon], firstWeapon.rarity);
    const secondWeapon = await Weapon.findById(req.body.weapon_two);
    await seedDB([secondWeapon], secondWeapon.rarity);

    try {
        const previous = req.body.lineage;

        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        const populated = await Promise.all(fields.map(async field => {
            const item = await determineItemType(previous[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            previous[fields[index]] = item;
        });

        let pCon = previous.constitution > 100 ? 6 : previous.constitution > 50 ? 4 : previous.constitution > 25 ? 2 : 0;
        let pStr = previous.strength > 100 ? 6 : previous.strength > 50 ? 4 : previous.strength > 25 ? 2 : 0;
        let pAgi = previous.agility > 100 ? 6 : previous.agility > 50 ? 4 : previous.agility > 25 ? 2 : 0;
        let pAch = previous.achre > 100 ? 6 : previous.achre > 50 ? 4 : previous.achre > 25 ? 2 : 0;
        let pCae = previous.caeren > 100 ? 6 : previous.caeren > 50 ? 4 : previous.caeren > 25 ? 2 : 0;
        let pKyo = previous.kyosir > 100 ? 6 : previous.kyosir > 50 ? 4 : previous.kyosir > 25 ? 2 : 0;

        let nCon = Number(req.body.constitution);
        let nStr = Number(req.body.strength);
        let nAgi = Number(req.body.agility);
        let nAch = Number(req.body.achre);
        let nCae = Number(req.body.caeren);
        let nKyo = Number(req.body.kyosir);

        switch (previous.mastery) {
            case "Constitution":
                nCon += pCon;
                break;
            case "Strength":
                nStr += pStr;
                break;
            case "Agility":
                nAgi += pAgi;
                break;
            case "Achre":
                nAch += pAch;
                break;
            case "Caeren":
                nCae += pCae;
                break;
            case "Kyosir":
                nKyo += pKyo;
                break;
            default:
                break;
        };
        console.log(req.body.achre, nAch, pAch, "Achre - Pre, New, Bonus")
        let weapon = await imprintEquipment(previous.weapon_one);
        let shield = await imprintEquipment(previous.shield);
        let helmet = await imprintEquipment(previous.helmet);
        let chest = await imprintEquipment(previous.chest);
        let legs = await imprintEquipment(previous.legs);

        const ascean = await Ascean.create({
            user: req.user,
            name: req.body.name,
            index: req.body.name,
            origin: req.body.origin,
            sex: req.body.sex,
            description: req.body.description,
            constitution: nCon,
            strength: nStr,
            agility: nAgi,
            achre: nAch,
            caeren: nCae,
            kyosir: nKyo,
            mastery: req.body.mastery,
            weapon_one: firstWeapon._id,
            weapon_two: secondWeapon._id,
            weapon_three: weapon._id,
            shield: shield._id,
            helmet: helmet._id,
            chest: chest._id,
            legs: legs._id,
            ring_one: '63b3491009fa8aa7e4495996',
            ring_two: '63b3491009fa8aa7e4495996',
            amulet: '63b3491109fa8aa7e4495999',
            trinket: '63b3491109fa8aa7e449599b',
            faith: req.body.faith,
            currency: {
                silver: req.body.lineage.kyosir,
                gold: 0,
            },
            shareable: req.body.shareable,
            visibility: req.body.visibility,
            hardcore: true,
            lineage: [...previous.lineage, previous._id]
        });
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Persisting Ascean");
        res.status(400).json({ err });
    };
};

async function editAscean(req, res) {
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.params.id, {
            user: req.user,
            visibility: req.body.visibility,
            shareable: req.body.shareable,
            name: req.body.name,
            origin: req.body.origin,
            sex: req.body.sex,
            index: req.body.name,
            description: req.body.description,
            constitution: req.body.constitution,
            strength: req.body.strength,
            agility: req.body.agility,
            achre: req.body.achre,
            caeren: req.body.caeren,
            kyosir: req.body.kyosir,
            mastery: req.body.mastery,
            weapon_one: req.body.weapon_one,
            weapon_two: req.body.weapon_two,
            weapon_three: req.body.weapon_three,
            shield: req.body.shield,
            helmet: req.body.helmet,
            helmet: req.body.helmet,
            chest: req.body.chest,
            legs: req.body.legs,
            ring_one: req.body.ring_one,
            ring_two: req.body.ring_two,
            amulet: req.body.amulet,
            trinket: req.body.trinket,
            faith: req.body.faith,
        })
        ascean.save();
        res.status(201).json({ ascean: ascean })
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Editing the Ascean!')
    }
};

async function imprintEquipment(inventory) {
    let type = ''
    if (inventory.grip) {
        type = 'Weapon';
    };
    if (inventory?.name.includes('Hood') || inventory?.name.includes('Helm') || inventory?.name.includes('Mask')) {
        type = 'Helmet';
    };
    if (inventory?.name.includes('Cuirass') || inventory?.name.includes('Robes') || inventory?.name.includes('Armor')) {
        type = 'Chest';
    };
    if (inventory?.name.includes('Greaves') || inventory?.name.includes('Pants') || inventory?.name.includes('Legs')) {
        type = 'Legs';
    };
    if (inventory?.type.includes('Shield')) {
        type = 'Shield';
    };
    let models = {
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
    };
    let rarity = 'Common';
    item = await models[type].findOne({ name: inventory.name, rarity: rarity }).exec();
    await seedDB([item], rarity);
    return item;
}

async function determineItemType(id) {
    const models = {
        Equipment: Equipment,
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
        Ring: Ring,
        Amulet: Amulet,
        Trinket: Trinket,
    };
      
    const itemTypes = ['Equipment', 'Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket'];
    for (const itemType of itemTypes) {
        const item = await models[itemType].findById(id).exec();
        if (item) {
            return item;
        };
    };
    return null;
};

async function drinkFirewater(req, res) {
    try {
        let ascean = await Ascean.findByIdAndUpdate(req.params.id, {
            $inc: {
                "firewater.charges": -1,
            },
        }, { new: true });
        console.log(ascean.firewater, ascean.health.current, ascean.health.total, "Drinking Firewater")
        const healing = ascean.health.total * 0.4;
        ascean.health.current += healing;
        ascean.health.current = ascean.health.current > ascean.health.total ? ascean.health.total : ascean.health.current;
        ascean.firewater.charges = ascean.firewater.charges < 0 ? 0 : ascean.firewater.charges;
        await ascean.save(); 
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Drinking Firewater!')
        res.status(400).json(err);
    };
};

async function replenishFirewater(req, res) {
    try {
        let ascean = await Ascean.findById(req.params.id);
        let cost = ascean.level * 100;
        ascean.firewater.charges = 5;
        ascean.experience -= cost < 0 ? ascean.experience : cost;
        if (ascean.experience < 0) ascean.experience = 0;
        await ascean.save();
        console.log(ascean.firewater, "Firewater After Saving Replenish")
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Replenish Firewater!')
        res.status(400).json(err);
    };
};

async function updateHealth(req, res) {
    try {
        let ascean = await Ascean.findById(req.params.id);
        console.log(ascean.health, "Current Health Object");
        ascean.health.current = req.params.health;
        console.log(ascean.health, "Updated Health Object");
        await ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Update Health!')
        res.status(400).json(err);
    };
};

async function asceanTax(req, res) {
    try {
        let ascean = await Ascean.findById(req.params.id);
        const tax = req.params.tax;
        let goldTax;
        let silverTax;
        if (tax >= 100) {
            goldTax = Math.floor(tax / 100);
            silverTax = tax % 100;
        } else {
            goldTax = 0;
            silverTax = tax;
        };
        ascean.currency.gold -= goldTax;
        ascean.currency.silver -= silverTax;
        await rebalanceCurrency(ascean);
        await ascean.save();
        res.status(201).json(ascean.currency);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Ascean Tax!')
        res.status(400).json(err);
    };
};

async function restoreFirewater(req, res) {
    try {
        let ascean = await Ascean.findById(req.params.id);
        const cost = (5 - ascean.firewater.charges) * 10;
        console.log(cost, "Cost of Restoring Firewater")
        ascean.firewater.charges = 5;
        if (ascean.currency.silver > cost) {
            ascean.currency.silver -= cost;
            console.log("You had the silver for it")
        } else if (ascean.currency.gold > 0) {
            ascean.currency.gold -= 1;
            ascean.currency.silver += 100;
            ascean.currency.silver -= cost;
            console.log("You had to pay gold for it")
        } else {
            ascean.experience -= (cost * 10) < 0 ? ascean.experience : (cost * 10);
            console.log("You had to pay experience for it")
        };
        await ascean.save();
        console.log(ascean.firewater, ascean.currency, "Firewater After Saving Restore");
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Restore Firewater!')
        res.status(400).json(err);
    };
};

async function saveCoordinates(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean);
        ascean.coordinates = req.body.coordinates;
        await ascean.save();
        req.body.map.map = await compress(req.body.map.map);
        await Map.findByIdAndUpdate(req.body.map._id, req.body.map, { new: true });
        
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving Coordinates!');
        res.status(400).json(err);
    }
};

async function compress(map) {
    const compressedMap = zlib.deflateSync(JSON.stringify(map));
    return compressedMap;
};

async function saveToInventory(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        ascean.inventory.push(req.body.lootDrop._id);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving to Inventory!')
    };
};

async function saveInventory(req, res) {
    try {
        console.log(req.body, "Req.body")
        const ascean = await Ascean.findById(req.body.ascean);
        ascean.inventory = req.body.inventory;
        await ascean.save();
        res.status(201).json(ascean.inventory);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving to Inventory!')
    };
};

async function rebalanceCurrency(ascean) {
    while (ascean.currency.silver < 0) {
      ascean.currency.gold -= 1;
      ascean.currency.silver += 100;
    };
    while (ascean.currency.gold < 0) {
      ascean.currency.gold += 1;
      ascean.currency.silver -= 100;
    };
};

async function purchaseToInventory(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        ascean.inventory.push(req.body.item._id);
        console.log(req.body.cost, 'Cost of EQP');
        ascean.currency.silver -= req.body.cost.silver;
        ascean.currency.gold -= req.body.cost.gold;
        await rebalanceCurrency(ascean);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Purchasing to Inventory!');
        res.status(400).json({ err });
    };
};

async function swapItems(req, res) {
    try {
        console.log(req.body, 'req.body')
        const ascean = await Ascean.findById(req.params.id);
        const keyToUpdate = Object.keys(req.body).find(key => {
            return typeof req.body[key] === 'string' && req.body[key] !== '';
        });
        const itemType = keyToUpdate.replace('new_', '');
        console.log(itemType, keyToUpdate, 'itemType, keyToUpdate')
        const currentItemId = ascean[itemType];
        ascean[itemType] = req.body[keyToUpdate];
        const currentItem = await determineItemType(currentItemId);
        if (!(currentItem.rarity === 'Default')) {
            ascean.inventory.push(currentItemId);
        };
        const currentItemIndex = ascean.inventory.indexOf(req.body[keyToUpdate]);
        ascean.inventory.splice(currentItemIndex, 1);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Swapping Items!');
        res.status(400).json({ err });
    };
};

const deleteEquipmentCheck = async (equipmentID) => {
    try {
        console.log(equipmentID, 'Did We Make It Here?')
        const allEquipmentIds = await fs.promises.readFile('data/equipmentIds.json');
        const parsedIds = JSON.parse(allEquipmentIds);
        if (parsedIds.includes(equipmentID)) {
            return console.log('Equipment found in golden template list. Must be preserved at all costs!');
        };
        const deleted = await Equipment.findByIdAndDelete(equipmentID).exec();
        console.log(`Successfully deleted equipment with id: ${equipmentID}`);
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json({ err });
    };
};

async function removeItem(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        const itemID = req.body.inventory._id;
        const itemIndex = ascean.inventory.indexOf(itemID);
        ascean.inventory.splice(itemIndex, 1);
        deleteEquipmentCheck(itemID);
        
        const doesItemStillExist = (itemID) => {
            return ascean.inventory.includes(itemID);
        };
        if (doesItemStillExist(itemID)) {
            console.log('Item still exists in inventory. Must be a duplicate. Removing duplicate(s).')
            // Items need to be 'extracted' and also deleted. It means there was an accidental duplicate. Probably just filter them out ?
            ascean.inventory = ascean.inventory.filter(item => item !== itemID);
        };
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        res.status(400).json({ err });
        console.log(err.message, '<- Error in the Controller Removing Items!')
    };
};

async function updateLevel(req, res) {
    let constitution = Number(req.body.constitution);
    let strength = Number(req.body.strength);
    let agility = Number(req.body.agility);
    let achre = Number(req.body.achre);
    let caeren = Number(req.body.caeren);
    let kyosir = Number(req.body.kyosir);
    let mastery = req.body.ascean.mastery;
    let newMastery = req.body.mastery;
    let statMastery = newMastery.toLowerCase();
    console.log(statMastery, req.body.ascean.statistics.mastery[statMastery], 'statMastery, req.body.ascean.statistics.mastery[statMastery]');
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.body.ascean._id, {
            level: req.body.ascean.level + 1,
            experience: 0,
            constitution: Math.round((req.body.ascean.constitution + constitution) * (newMastery === 'Constitution' ? 1.07 : 1.04)), // 1.04 = +1 stat once the stat is 13 as it rounds up from .52 (1.04 * 13 = 13.52)
            strength: Math.round((req.body.ascean.strength + strength) * (newMastery === 'Strength' ? 1.07 : 1.04)), // 1.07 = +1 stat always, even at base 8. Requires 22 Stat points to increase by 2 / level. 22 * 1.07 = 23.54, rounded up to 24 
            agility: Math.round((req.body.ascean.agility + agility) * (newMastery === 'Agility' ? 1.07 : 1.04)),
            achre: Math.round((req.body.ascean.achre + achre) * (newMastery === 'Achre' ? 1.07 : 1.04)),
            caeren: Math.round((req.body.ascean.caeren + caeren) * (newMastery === 'Caeren' ? 1.07 : 1.04)),
            kyosir: Math.round((req.body.ascean.kyosir + kyosir) * (newMastery === 'Kyosir' ? 1.07 : 1.04)),
            mastery: newMastery, 
            faith: req.body.faith,
            statistics: {
                ...req.body.ascean.statistics,
                mastery: {
                    ...req.body.ascean.statistics.mastery,
                    [statMastery]: req.body.ascean.statistics.mastery[statMastery] + 1,
                }
            } 
        }, { new: true });
        console.log(ascean, '<- Ascean Leveled Up in the Controller');
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Updating the Level!')
        res.status(400).json({ err });
    };
};

async function saveExperience(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        console.log(req.body.opponent, req.body.experience, 'Opponent Level + Experience in Save Experience');
        let silver = 0;
        let gold = 0;
        let currencyValue = req.body.opponent;
        let health = req.body.currentHealth > ascean.health.total ? ascean.health.total : req.body.currentHealth;
        
        if (currencyValue === 1) { // Opponent Level 1, 1-2 Silver
            silver = Math.floor(Math.random() * 2) + 1;
            gold = 0;
        } else if (currencyValue >= 2 && currencyValue < 11) {  // Opponent Level 2-10, 2-99 Silver
            silver = Math.floor(Math.random() * 10) + 1;
            silver *= currencyValue;
            gold = 0;
            if (silver > 99) {
                silver = 99;
            };
        } else if (currencyValue > 10 && currencyValue <= 20) { // Opponent Level 11-20, 5-30 Silver, 1-2 Gold
            if (currencyValue > 15) { // Opponent Level 16-20, 5-30 Silver, 1-2 Gold
                silver = Math.round(Math.floor(Math.random() * 25) + 5);
                gold = Math.floor(Math.random() * 2) + 1;
            } else { // Opponent Level 11-15, 1-99 Silver, 0-1 Gold
                if (Math.random() >= 0.5) { // 50% chance of 1 gold and 1-10 silver
                    silver = Math.round(Math.floor(Math.random() * 10) + 1);
                    gold = 1;
                } else { // 50% chance of 35-99 silver
                    silver = Math.round(Math.floor(Math.random() * 100) + 35);
                    if (silver > 99) {
                        silver = 99;
                        gold = 0;
                    };
                };
            };
        };
       
        ascean.currency.silver += silver;
        ascean.currency.gold += gold;

        if (ascean.currency.silver > 99) {
            ascean.currency.gold += 1;
            ascean.currency.silver -= 100;
        };
        
        if (ascean.firewater.charges < 5 && (ascean.level <= req.body.opponent)) {
            console.log(ascean.level, req.body.opponent, '<- Level and Opponent Level. You should get a charge!');
            ascean.firewater.charges += 1;
        };
        
        if (ascean.experience + req.body.experience > ascean.level * 1000) {
            ascean.experience = ascean.level * 1000;
        } else {
            ascean.experience += req.body.experience;
        };

        ascean.health.current = health;

        await ascean.save();
        res.status(200).json({ data: {ascean, silver, gold} });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving Experience!')
        res.status(400).json({ err });
    };
};

async function updateHighScore(req, res) {
    const { asceanId, highScore } = req.body
    console.log(asceanId, highScore, 'Are we updating in the Controller?')
    try {
        const ascean = await Ascean.findByIdAndUpdate(asceanId, {
            high_score: highScore }, { new: true})
        res.status(200).json({ data: ascean });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deleteAscean(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        await asceanEquipmentDeleteCheck(ascean);
        console.log(req.params.id, '<- Ascean ID in Delete Ascean Function');
        await Ascean.findByIdAndDelete(req.params.id);
        res.status(201).json({});
    } catch (err) {
        console.log(err.message, '<- Error in delete Ascean function')
        res.status(400).json({ err })
    }
}

const asceanEquipmentDeleteCheck = async (ascean) => {
    await deleteEquipmentCheck(ascean.helmet);
    await deleteEquipmentCheck(ascean.chest);
    await deleteEquipmentCheck(ascean.legs);
    await deleteEquipmentCheck(ascean.ring_one);
    await deleteEquipmentCheck(ascean.ring_two);
    await deleteEquipmentCheck(ascean.amulet);
    await deleteEquipmentCheck(ascean.trinket);
    await deleteEquipmentCheck(ascean.weapon_one);
    await deleteEquipmentCheck(ascean.weapon_two);
    await deleteEquipmentCheck(ascean.weapon_three);
    await deleteEquipmentCheck(ascean.shield);
    const inventory = ascean.inventory;
    if (inventory.length > 0) {
        for (const item of inventory) {
            await deleteEquipmentCheck(item);
        };
    };
};

async function create(req, res) {
    console.log(req.body, '<- Hopefully the Ascean!', req.user)
        if (req.body.preference === 'Plate-Mail') {
            req.body.helmet = '63f413a4acef90a6e298a3c4';
            req.body.chest = '63f413a5acef90a6e298a3cf';
            req.body.legs = '63f413a5acef90a6e298a429';
            req.body.shield = '63b31f89ce6a30ffab854aae';
        };
        if (req.body.preference === 'Chain-Mail') {
            req.body.helmet = '63f413a4acef90a6e298a3c5';
            req.body.chest = '63f413a5acef90a6e298a3d0';
            req.body.legs = '63f413a5acef90a6e298a42a';
            req.body.shield = '63b31f89ce6a30ffab854ab0';
        };
        if (req.body.preference === 'Leather-Mail') {
            req.body.helmet = '63f413a4acef90a6e298a3c6';
            req.body.chest = '63f413a5acef90a6e298a3d1';
            req.body.legs = '63f413a5acef90a6e298a42b';
            req.body.shield = '63b31f89ce6a30ffab854aaf';
        };
        if (req.body.preference === 'Leather-Cloth') {
            req.body.helmet = '63f413a4acef90a6e298a3c7'
            req.body.chest = '63f413a5acef90a6e298a3d2';
            req.body.legs = '63f413a5acef90a6e298a42c';
            req.body.shield = '63b31f89ce6a30ffab854aad';
        };

        if (req.body.faith === 'devoted') { // Devoted to Daethos
            if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
                if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // Daethic Halberd && Hush of Daethos
                    req.body.weapon_one = '63d059865df7503ef9cd71f4';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e58e';
                } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Gladius && Daethic Bow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56c';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
                } else { // Same Value Daethic Bow && Daethic Halberd
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e586';
                    req.body.weapon_two = '63d059865df7503ef9cd71f4';
                }
            } else {
                if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Tendril && Daethic Bow && Hush
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e583';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
                    // req.body.weapon_three = '63b3460cd5c6cfea02a5e57d';
                } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Hush of Daethos && Tendril of Daethos
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e58e';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e58f';
                } else { // Same Value Blessed Dagger && Cursed Dagger && Tendril
                    req.body.weapon_one = '63e47c140de4781b96411d67';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e572';
                    // req.body.weapon_three = '63b3460cd5c6cfea02a5e583';
                }
            }
        } else { // Adherent to the Ancients or Irreligious
            if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
                if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // War Hammer && Sunshatter
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e578';
                    req.body.weapon_two = '63e47c140de4781b96411d6b';
                } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Longsword && Sevashyr && Shotel
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56d';
                    req.body.weapon_two = '63e54b27d110dc7ef8fd630b';
                    // req.body.weapon_three = '63b3460cd5c6cfea02a5e573';
                } else { // Same Value Claymore && Longbow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e576';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e585';
                }
            } else {
                if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Astral Spear && Quor'eite Crush
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57f';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e581';
                } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Ashfyre && Nyrolean Wave
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e588';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e58b';
                } else { // Same Value Wildstrike && Nightmare
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e582';
                    req.body.weapon_two = '63e47c140de4781b96411d77';
                }
            }
        }

        const firstWeapon = await Weapon.findById(req.body.weapon_one);
        await seedDB([firstWeapon], firstWeapon.rarity);
        const secondWeapon = await Weapon.findById(req.body.weapon_two);
        await seedDB([secondWeapon], secondWeapon.rarity);
        const firstShield = await Shield.findById(req.body.shield);
        await seedDB([firstShield], firstShield.rarity);

        try {
            const ascean = await Ascean.create({
                user: req.user,
                name: req.body.name,
                index: req.body.name,
                origin: req.body.origin,
                sex: req.body.sex,
                description: req.body.description,
                constitution: req.body.constitution,
                strength: req.body.strength,
                agility: req.body.agility,
                achre: req.body.achre,
                caeren: req.body.caeren,
                kyosir: req.body.kyosir,
                mastery: req.body.mastery,
                weapon_one: firstWeapon._id,
                weapon_two: secondWeapon._id,
                weapon_three: '63b34b5ed5326753b191846c',
                shield: req.body.shield,
                helmet: req.body.helmet,
                chest: req.body.chest,
                legs: req.body.legs,
                ring_one: '63b3491009fa8aa7e4495996',
                ring_two: '63b3491009fa8aa7e4495996',
                amulet: '63b3491109fa8aa7e4495999',
                trinket: '63b3491109fa8aa7e449599b',
                faith: req.body.faith,
                currency: {
                    silver: req.body.kyosir,
                    gold: 0,
                },
                shareable: req.body.shareable,
                visibility: req.body.visibility,
                hardcore: req.body.hardcore,
            })
            res.status(201).json({ ascean: ascean });
        } catch (err) {
            res.status(400).json({ err });
        }
}

async function index(req, res) {
    try {
        let asceanCrew = await Ascean.find({ user: req.user._id, alive: true });
        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        asceanCrew = asceanCrew.slice(-10) // Needs to be the last 10 characters        
        for await (let ascean of asceanCrew) {
            const populated = await Promise.all(fields.map(async field => {
                const item = await determineItemType(ascean[field]);
                return item ? item : null;
            }));
            populated.forEach((item, index) => {
                ascean[fields[index]] = item;
            });
            await Ascean.populate(ascean, { path: 'user' });
        };
        res.status(200).json({ data: asceanCrew });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function quickIndex(req, res) {
    try {
        const asceanCrew = await Ascean.find({ user: req.user._id, alive: true });
        res.status(200).json({ data: asceanCrew });
    } catch (err) { 
        console.log(err, 'Error in Lean Profile Controller') 
        res.status(400).json({ err });
    };
};

async function getOneAscean(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .populate('quests')
                                 .exec();
        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        const populated = await Promise.all(fields.map(async field => {
            const item = await determineItemType(ascean[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            ascean[fields[index]] = item;
        });

        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = await determineItemType(item);
            if (itemType) {
                return itemType;
            };
            return null;
        });
        const inventory = await Promise.all(inventoryPopulated);
        ascean.inventory = inventory;
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getOneAsceanLight(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
                                   .populate('user')
                                   .exec();
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getAsceanQuests(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
                                   .populate('quests')
                                   .exec();
        res.status(200).json(ascean.quests);
    } catch (err) {
        console.log(err, 'Error Getting Ascean Quests');
        res.status(400).json({ err });
    }
}

async function getAsceanAndInventory(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                    .populate('user')
                                    .populate('quests')
                                    .exec();
        console.log(ascean.name, "Ascean Name")
        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        const populated = await Promise.all(fields.map(async field => {
            const item = await determineItemType(ascean[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            ascean[fields[index]] = item;
        });
        
        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = await determineItemType(item);
            if (itemType) {
                return itemType;
            };
            return null;
        });
        const inventory = await Promise.all(inventoryPopulated);
        ascean.inventory = inventory;
    
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getAsceanInventory(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id });
        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = await determineItemType(item);
            if (itemType) {
                return itemType;
            };
            return null;
        });
        const inventory = await Promise.all(inventoryPopulated);
        ascean.inventory = inventory;
    
        res.status(200).json({inventory:  ascean.inventory, currency: ascean.currency });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getOneAsceanClean(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .populate('quests')
                                 .exec();
        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        const populated = await Promise.all(fields.map(async field => {
            const item = await determineItemType(ascean[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            ascean[fields[index]] = item;
        });
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getAsceanStats(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .exec();
        console.log(ascean.name, "Ascean Name")
        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        const populated = await Promise.all(fields.map(async field => {
            const item = await determineItemType(ascean[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            ascean[fields[index]] = item;
        });
        let data = await asceanService.asceanCompiler(ascean);
        if (ascean.health.current === -10) ascean.health.current = data.data.attributes.healthTotal;
        if (data.data.attributes.healthTotal > ascean.health.total) {
            ascean.health.total = data.data.attributes.healthTotal;
            data.data.ascean.health.total = data.data.attributes.healthTotal;
            if (typeof ascean.currency.gold !== 'number') {
                const currency = { gold: 0, silver: 0 };
                ascean.currency = currency;
            };
            await ascean.save();
        };
        res.status(200).json({ data });
    } catch (err) {
        console.log(err, `Error retrieving statistics for ascean`);
        res.status(400).json({ err });
    };
};

async function animalStats(req, res) {
    try {
        const animal = req.body;
        const data = await asceanService.asceanCompiler(animal);
        res.status(200).json({ data });
    } catch (err) {
        console.log(err, 'Error in Animal Stats Controller');
        res.status(400).json(err);
    };
};

async function blessAscean(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id });
        const blessing = ascean.mastery.toLowerCase();
        console.log(blessing, ascean[blessing], 'Blessing');
        ascean[blessing] += 1;
        ascean.statistics.relationships.deity.Faithful.occurrence += 1;
        ascean.statistics.relationships.deity.Faithful.value += 2;
        ascean.statistics.relationships.deity.value += 2;
        ascean.statistics.relationships.deity.behaviors.push('Blessed');
        console.log(ascean[blessing], 'Blessed');
        await ascean.save();
        res.status(200).json(ascean);
    } catch (err) {
        console.log(err, 'Error in Bless Ascean Controller');
        res.status(400).json(err);
    };
};

async function curseAscean(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id });
        ascean.firewater.charges -= 1;
        ascean.statistics.relationships.deity.Unfaithful.occurrence += 1;
        ascean.statistics.relationships.deity.Unfaithful.value -= 2;
        ascean.statistics.relationships.deity.value -= 2;
        ascean.statistics.relationships.deity.behaviors.push('Cursed');
        await ascean.save();
        res.status(200).json(ascean);
    } catch (err) {
        console.log(err, 'Error in Curse Ascean Controller');
        res.status(400).json(err);
    }
};

async function sacrificeExp(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id });
        ascean.experience = 0;
        await ascean.save();
        res.status(200).json(ascean);
    } catch (err) {
        console.log(err, 'Error in Sacrifice Experience Controller');
        res.status(400).json(err);
    }
};

async function searchAscean(req, res) {
    const keyword = req.query.search ? {
        $or: [ 
        { name: { $regex: req.query.search, $options: "i" } },
        { sex: { $regex: req.query.search, $options: "i" } },
        { origin: { $regex: req.query.search, $options: "i" } },
        { level: isNaN(parseInt(req.query.search)) ? null : parseInt(req.query.search) },
        { high_score: isNaN(parseInt(req.query.search)) ? null : parseInt(req.query.search) }
        ].filter(item => item)
    } : [];
    const ascean = await Ascean.find(keyword);
    console.log(ascean, 'Ascean in search Ascean controller');
    res.send(ascean);
};