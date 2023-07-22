import { GameData, Player } from "./GameStore";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const traitStyle = (trait: string) => {
    switch (trait) {
        case 'Arbituous':
            return 'green';
        case 'Chiomic':
            return 'gold';
        case 'Kyr\'naic':
            return 'purple';
        case 'Lilosian':
            return '#fdf6d8';
        case 'Ilian':
            return 'white';
        case 'Kyn\'gian':
            return 'brown';
        case 'Se\'van':
            return 'red';
        case 'Shrygeian':
            return 'orange';
        case 'Fyeran':
            return 'orangered';
        case 'Tshaeral':
            return 'darkblue';
        case 'Astral':
            return 'yellow';
        case 'Shaorahi':
            return 'blue';
        case 'Cambiren':
            return 'darkgreen';
        case 'Sedyrist':
            return 'silver';
        case 'Ma\'anreic':
            return 'darkgoldenrod';
        default:
            break;
    };
};

export const TRAIT_DESCRIPTIONS = {
    "Ilian": {
        persuasion: {
            description: "a sense of autoritas is weighted in your words, and can sway the minds of others.",
            action: "You're Ilianic, and are able to convince others of your point of view.",
            modal: "Heroism (This can affect all potential enemies)",
            success: ["My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {ascean.name}, others may be fearful of the Sundering.", "`No, you cannot be Him.` Concern marks the {enemy.name}, for whomever they believe you are, it arrests their confidence in any action. `Yet I am not to thwart naked fate, good day {ascean.name}.`"],
            failure: "Failure!",
        },
        heroism: {
            description: "your Ilian nature exudes a heroism that touches others inexplicably.",
            action: "You evoke a sense of heroism in others, and can change the outcome of encounters.",
            success: "Success!",
            failure: "Failure!",
        }
    },
    "Kyn'gian": {
        avoidance: {
            description: "you can avoid most encounters if you are quick enough.",
            action: "You remain at the edges of sight and sound, and before {enemy.name} can react, you attempt to flee.",
            success: "You can't even be sure they caught sight of you as you slip away.",
            failure: "You are unable to escape {enemy.name}'s grasp despite your stride.",
        },
        endurance: {
            description: "you are able to recover your health over time.",
            action: "The blood of the Tshios course through your veins.",
            success: "You regenerate health over time.",
            failure: "You regenerate health over time.",
        }
    },
    "Arbituous": {
        persuasion: {
            description: "you can use your knowledge of ley law to deter enemies from attacking you.",
            action: "Attempt to convince {enemy.name} of the current ley law as it stands, and their attempt to break it with murder will not stand before a trial by Arbiter, with precedent set to execute those outside the ley harming those within. And the enemy truly wishes not to acost the achre of the arbiters--last war the Arbiter's entered caused the other side to cede their religiosity entirely, and the reckoning of one's eternal caeren seems a bit harsher than the whole business of simple murdering--which while they have their merits in a merciless world wrought with mischief, isn't really the angle you're going with in order to skirt this combat issue. In summation, attempts to harm you are unequally disadvantageous for all parties involved, and you'd really prefer to getting back on the road, if possible.",
            modal: "Ethos (Affects all enemies within the Ley)",
            success: ["Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}.", "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."],
            failure: "{enemy.name} seems more convinced of that whole murder thing."
        },
        luckout: {
            description: "you can convince the enemy through rhetoric to cease hostility",
            action: "Unleash a dizzying array of concatenated and contracted syllables to upend the attempted assault.",
            modal: "Rhetoric (Convince the enemy to cease hostility)",
            success: ["Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}.", "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."],
            failure: "The tangled rhetoric appears to have caused a cessation of higher functioning in {enemy.name}'s mind, and has relegated to clearing it by vanquishing you at all costs."
        }
    },
    "Lilosian": {
        persuasion: {
            description: "you can speak to you and your enemies common faith and sway their hand at violence.",
            action: "Speak on the virtues of {ascean.weapon_one.influences[0]} to {enemy.name}.",
            modal: "Pathos (Affects all enemies of the same faith)",
            success: ["Tears well up in {enemy?.name}'s eyes. `I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry.`", "Tears well up in the {enemy.name}'s eyes. 'All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}.'", ],
            failure: "A beautiful speech upended by the simple notion of {enemy.name}'s {enemy.faith} faith to {enemy.weapon_one.influences[0]}."
        },
        luckout: {
            description: "you can convince the enemy to profess their follies and willow.",
            action: "Show {enemy.name} the way of peace through {ascean.weapon_one.influences[0]}",
            modal: "Peace (Allow the enemy to let go of their human failures)",
            success: ["Tears well up in {enemy?.name}'s eyes. `I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry.`", "Tears well up in the {enemy.name}'s eyes. 'All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}.'", ],
            failure: "A beautiful gesture upended by the simple notion of {enemy.name}'s {enemy.faith} faith to {enemy.weapon_one.influences[0]}."
        }
    },
    "Kyr'naic": {
        persuasion: {
            description: "you can persuade the enemy to cease the pitiless attempt to invoke meaning and purpose in themselves by base and petty means, and to instead embrace the hush and tendril of things.",
            action: "Shame {enemy.name} for their attempt to invoke meaning and purpose in themselves by base and petty means.",
            modal: "Apathy (Affects all enemies of lesser conviction)",
            success: ["{ascean.name}, all my life as {article} {enemy.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you.", "I'm sorry, {ascea.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here."],
            failure: "Seems {enemy.name} is not ready to give up on their attempt to invoke meaning and purpose in themselves by base and petty means."
        },
        luckout: {
            description: "you can convince the enemy to acquiesce and die, giving up their life to the Aenservaesai.",
            action: "Offer a glimpse of the aenservaesai in its totality.",
            modal: "Aenservaesai (Unburden the enemy to acquiesce and die)",
            success: ["{ascean.name}, all my life as {article} {enemy.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you.", "I'm sorry, {ascea.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here."],
            failure: "It appears {enemy.name} is not ready to die, and is infact renewed with vigor at a chance to instill meaning (your murder) into their life (continuining)."
        }
    },
    "Se'van": {
        berserk: {
            description: "your attacks grow stronger for each successive form of damage received.",
            action: "Chant the shrieker's song.",
            success: "Success!",
            failure: "Failure!"
        },
        miniGame: {
            description: "you can grip your enemy in a vice of your own making.",
            action: "Attempt to disarm and grapple {enemy.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Sedyrist": {
        investigative: {
            description: "your ability to notice things is heightened.",
            action: "Allow furhter inquiry.",
            success: "Success!",
            failure: "Failure!"
        },
        tinkerer: {
            description: "you can descontruct and reconstruct armor and weapons.",
            deconstruct: "Deconstruct {inventory.name}.",
            reconstruct: "Reconstruct {inventory.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Ma'anreic": {
        negation: {
            description: "you can negate {enemy.name}'s armor in the on your next attack.",
            action: "Bleed your weapon through the land of hush and tendril.",
            success: "Success!",
            failure: "Failure!"
        },
        thievery: {
            description: "depending on your skill, you can steal items from anyone and anywhere.",
            action: "Enter stealth mode.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Cambiren": {
        caerenicism: {
            description: "your caer doubles up on attacks.",
            action: "Guide your caer to swing in harmony with your flesh.",
            success: "Success!",
            failure: "Failure!"
        },
        miniGame: {
            description: "you can disarm and evoke your enemy's caer into a battle of it own.",
            action: "Attempt to disarm and seize {enemy.name}'s caer.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Shrygeian": {
        knavery: {
            description: "your exploratory abilities are heightened.",
            action: "The blood of Shrygei runs through your veins, you are able to sing life into the land.",
            success: "Success!",
            failure: "Failure!"
        },
        miniGame: {
            description: "you can duel the enemy in a game of chance.",
            action: "Enter a stage of dueling with {enemy.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Fyeran": {
        persuasion: {
            description: "you can convince those who see this world with peculiarity.",
            action: "Speak to {enemy.name}'s curiosity.",
            modal: "Seer (Affects all enemies who are more mystic than martial)",
            success: ["You are not here right now, {ascean.name}. Perchance we may see us in another land, then?", "Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion."],
            failure: "Failure!"
        },
        seer: {
            description: "your next attack is fyers.",
            action: "Channel raw Fyeran Caer into your next attack.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Shaorahi": {
        conviction: {
            description: "your attacks grow stronger the more you realize them.",
            action: "Speak to your {ascean.weapon_one.name} in Shao'rahi",
            success: "Success!",
            failure: "Failure!"
        },
        persuasion: {
            description: "you can put the enemy in awe of your power, and have them cease their assault.",
            action: "Speak to {enemy.name} in  Shao'rahi.",
            modal: "Awe (Affects all enemies of lesser conviction)",
            success: ["A stillness hollows {enemy.name}, the chant of a dead language stirs their blood without design.", "An unsure unease stifles the ascent of the {enemy.name}, their eyes a haze of murk."],
            failure: "Failure!"
        }
    },
    "Tshaeral": {
        miniGame: {
            description: "your caer is imbued with tshaeral desire, a hunger to devour the world.",
            action: "Succumb to your Tshaeral desire.",
            success: "You have vanquished {enemy.name}, whether caeren or flesh succumbed first to be shirked from this world is a question for another day.",
            failure: "Failure!"
        },
        devour: {
            description: "your tshaeral nature allows you to cannibalize your enemies for recovery and spirit.",
            action: "Devour the remains of {enemy.name}.",
            success: "Success!",
            failure: "Failure!"
        }
    },
    "Chiomic": {
        persuasion: {
            description: "you can cause bouts of confusion and disorientation in the enemy, reducing their conviction in attacking you.",
            action: "Speak a chiomic riddle to befuddle {enemy.name}.",
            modal: "Humor (This affects enemies of lesser Chiomism)",
            success: ["The {enemy.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.", "{enemy.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. 'I don't understand, {ascean.name}. What is happening to me, what have you brought back?'"],
            failure: "You're unsure if the riddle posed was too difficult, or if the {enemy.name} is simply too stupid to understand. Either way, it doesn't seem to have worked."
        },
        luckout: {
            description: "you can invoke the Ancient Chiomyr, reducing the enemy to a broken mind of mockery.",
            action: "Lash {enemy.name} with chiomic bliss.",
            modal: "Shatter (Mental seizure of the enemy)",
            success: ["The {enemy.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.", "{enemy.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. 'I don't understand, {ascean.name}. What is happening to me, what have you brought back?'"],
            failure: "Certain minds are incapable of being broken, and {enemy.name}'s is one of them. You're unsure if it's because of their own strength, or your own weakness. Or their weakness, inadvertently."
        }
    },
    "Astral": {
        impermanence: {
            description: "you can perform combat maneuvers that are impossible to follow, and thus impossible to counter.",
            action: "Your caeren leads in traces {enemy.name}'s flesh cannot follow.",
            success: "Success!",
            failure: "Failure!"
        },
        pursuit: {
            description: "you can force encounters, even with enemies that would normally avoid you.",
            action: "You beckon {enemy.name} with an impenetrable, violent yearning.",
            success: "Success!",
            failure: "Failure!"
        }
    },
};

export const getAsceanTraits = async (ascean: Player) => {
    let traits = {
        primary: { name: '' },
        secondary: { name: '' },
        tertiary: { name: '' },
    };


    const ATTRIBUTE_TRAITS = {
        Constitution: {
            strength: 'Ilian', 
            agility: "Kyn'gian", 
            achre: "Arbituous", 
            caeren: "Lilosian", 
            kyosir: "Kyr'naic", 
        },
        Strength: {
            constitution: 'Ilian', 
            agility: "Se'van", 
            achre: "Sedyrist", 
            caeren: "Shaorahi",  
            kyosir: "Tshaeral",  
        },
        Agility: {
            constitution: "Kyn'gian", 
            strength: "Se'van", 
            achre: "Ma'anreic", 
            caeren: "Cambiren", 
            kyosir: "Shrygeian", 
        },
        Achre: {
            constitution: "Arbituous", 
            strength: "Sedyrist", 
            agility: "Ma'anreic", 
            caeren: "Fyeran",    
            kyosir: "Chiomic", 
        },
        Caeren: {
            constitution: "Lilosian", 
            strength: "Shaorahi",  
            agility: "Cambiren", 
            achre: "Fyeran",    
            kyosir: "Astral", 
        },
        Kyosir: {
            constitution: "Kyr'naic", 
            strength: "Tshaeral",  
            agility: "Shrygeian", 
            achre: "Chiomic", 
            caeren: "Astral", 
        },
    };

    let asceanTraits = ATTRIBUTE_TRAITS[ascean.mastery as keyof typeof ATTRIBUTE_TRAITS];
    let topThree = Object.entries(asceanTraits).sort((a, b) => b[0].length - a[0].length)
    const mappedTraits = topThree.map(trait => {
        const traitName = trait[0];
        const traitValue = trait[1];
        const attributeValue = ascean[traitName as keyof typeof ascean];
      
        return [traitName, traitValue, attributeValue];
    });
    const topThreeSorted = mappedTraits.sort((a, b) => b[2] - a[2]);
    
    traits.primary.name = topThreeSorted[0][1];
    traits.secondary.name = topThreeSorted[1][1];
    traits.tertiary.name = topThreeSorted[2][1];

    let first = TRAIT_DESCRIPTIONS[traits.primary.name as keyof typeof TRAIT_DESCRIPTIONS];
    let second = TRAIT_DESCRIPTIONS[traits.secondary.name as keyof typeof TRAIT_DESCRIPTIONS];
    let third = TRAIT_DESCRIPTIONS[traits.tertiary.name as keyof typeof TRAIT_DESCRIPTIONS];

    let newTraits = {
        primary: { ...traits.primary, ...first},
        secondary: { ...traits.secondary, ...second },
        tertiary: { ...traits.tertiary, ...third } ,
    };
    return newTraits;
};

export const checkPlayerTrait = (trait: string, gameState: GameData) => {
    if (gameState.primary.name.includes(trait) || gameState.secondary.name.includes(trait) || gameState.tertiary.name.includes(trait)) return true;
    return false;
};

export const checkTraits = (trait: string, traits: any) => {
    if (traits.primary.name.includes(trait) || traits.secondary.name.includes(trait) || traits.tertiary.name.includes(trait)) return true;
    return false;
};

interface TraitModalProps {
    traits: any;
    callback: (trait: string) => void;
    name: string;
    influence: string
}
;
export const LuckoutModal = ({ traits, callback, name, influence }: TraitModalProps) => {
    const [show, setShow] = useState(false);
    return (
        <>
        <Modal show={show} onHide={() => setShow(false)} centered id='modal-weapon' style={{ zIndex: 9999, top: '-25%' }}>
        <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Hush and Tendril</Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
            These offer a unique opportunity to defeat your enemies without the need for combat. However, failure will result in hostile and immediate engagement.<br /><br />
            <div style={{ fontSize: "18px", color: "gold" }}>
            {traits.map((trait: any, index: number) => {
                return (
                    <div key={index}>
                        <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name), fontSize: "18px" }} onClick={() => callback(trait.name)}>[{trait.name}] - {trait.luckout.modal.replace('{enemy.name}', name).replace('{ascean.weapon_one.influences[0]}', influence)}</Button>
                    </div>
                )
            })}
            </div>
            [Note: Your decisions has granted this avenue of gameplay experience. There are more to discover.]<br /><br />
        </Modal.Body>
        </Modal>
        <Button variant='' className='dialog-buttons inner' style={{ color: "pink" }} onClick={() => setShow(true)}>[ {'>>>'} Combat Alternative(s) {'<<<'} ]</Button>
        {traits.map((trait: any, index: number) => {
            return (
                <div key={index}>
                    <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name) }} onClick={() => callback(trait.name)}>[{trait.name}] - {trait.luckout.action.replace('{enemy.name}', name).replace('{ascean.weapon_one.influences[0]}', influence)}</Button>
                </div>
            )
        })}
        </>
    );
};

export const PersuasionModal = ({ traits, callback, name, influence }: TraitModalProps) => {
    const [show, setShow] = useState(false);
    return (
        <>
        <Modal show={show} onHide={() => setShow(false)} centered id='modal-weapon' style={{ zIndex: 9999, top: '-25%' }}>
        <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Correspondence</Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
            These offer a unique opportunity to entreat with your enemies without the need for combat. 
            However, failure may result anywhere from stymied conversation to hostile engagement. Perhaps with more notoriety this can change.<br /><br />
            <div style={{ fontSize: "18px", color: "gold" }}>
            {traits.map((trait: any, index: number) => {
                return (
                    <div key={index}>
                        <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name), fontSize: "18px" }} onClick={() => callback(trait.name)}>[{trait.name}]: {trait.persuasion.modal.replace('{enemy.name}', name).replace('{ascean.weapon_one.influences[0]}', influence)}</Button>
                    </div>
                )
            })}
            </div>
            [Note: Your decisions has granted this avenue of gameplay experience. There are more to discover.]<br /><br />
        </Modal.Body>
        </Modal>
        <Button variant='' className='dialog-buttons inner' style={{ color: "pink" }} onClick={() => setShow(true)}>[ {'>>>'} Persuasive Alternative(s) {'<<<'} ]</Button>
        {traits.map((trait: any, index: number) => {
            return (
                <div key={index}>
                <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name) }} onClick={() => callback(trait.name)}>[{trait.name}]: {trait.persuasion.action.replace('{enemy.name}', name).replace('{ascean.weapon_one.influences[0]}', influence)}</Button>
            </div>
            )
        })}
        </>
    );
};