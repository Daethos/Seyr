import React, { useEffect, useState } from 'react'

interface Props {
    ascean?: any;
    communityFeed: any;
    communityFocus: any;
}

const AsceanAttributeCompiler = ({ ascean, communityFeed, communityFocus }: Props) => {
    const displayConstitution = ascean.constitution + (ascean.origin === "Notheo" || ascean.origin === 'Nothos' ? 2 : 0)
    const displayStrength = ascean.strength + (ascean.origin === 'Sedyreal' || ascean.origin === 'Ashtre' ? 2 : 0) + (ascean.origin === "Li'ivi" ? 1 : 0)
    const displayAgility = ascean.agility + (ascean.origin === "Quor'eite" || ascean.origin === 'Ashtre' ? 2 : 0) + (ascean.origin === "Li'ivi" ? 1 : 0)
    const displayAchre = ascean.achre + (ascean.origin === "Quor'eite" || ascean.origin === 'Notheo' || ascean.origin === 'Fyers' ? 2 : 0) + (ascean.origin === "Li'ivi" ? 1 : 0)
    const displayCaeren = ascean.caeren + (ascean.origin === "Fyers" || ascean.origin === 'Nothos' || ascean.origin === 'Sedyreal' ? 2 : 0) + (ascean.origin === "Li'ivi" ? 1 : 0)
    
    const totalStrength: number = displayStrength + ascean?.shield?.strength + ascean?.helmet?.strength + ascean?.chest?.strength + ascean?.legs.strength + ascean?.ring_one.strength + ascean?.ring_two.strength + ascean?.amulet.strength + ascean?.trinket.strength + (ascean.origin === 'Sedyreal' ? 2 : 0);
    const totalAgility: number = displayAgility + ascean?.shield?.agility + ascean?.helmet?.agility + ascean?.chest?.agility + ascean?.legs.agility + ascean?.ring_one.agility + ascean?.ring_two.agility + ascean?.amulet.agility + ascean?.trinket.agility;
    const totalConstitution: number = displayConstitution + ascean?.shield?.constitution + ascean?.helmet?.constitution + ascean?.chest?.constitution + ascean?.legs.constitution + ascean?.ring_one.constitution + ascean?.ring_two.constitution + ascean?.amulet.constitution + ascean?.trinket.constitution;
    const totalAchre: number = displayAchre + ascean?.shield?.achre + ascean?.helmet?.achre + ascean?.chest?.achre + ascean?.legs.achre + ascean?.ring_one.achre + ascean?.ring_two.achre + ascean?.amulet.achre + ascean?.trinket.achre;
    const totalCaeren: number = displayCaeren + ascean?.shield?.caeren + ascean?.helmet?.caeren + ascean?.chest?.caeren + ascean?.legs.caeren + ascean?.ring_one.caeren + ascean?.ring_two.caeren + ascean?.amulet.caeren + ascean?.trinket.caeren;
    
    console.log(ascean.name, ascean.origin, 'Con:', displayConstitution, 'Str:', displayStrength, 'Agi:', displayAgility, 'Ach:', displayAchre, 'Caer:', displayCaeren)
    
    const strengthMod = Math.floor((totalStrength - 10) / 2);
    const agilityMod = Math.floor((totalAgility - 10) / 2);
    const constitutionMod = Math.floor((totalConstitution - 10) / 2);
    const achreMod = Math.floor((totalAchre - 10) / 2);
    const caerenMod = Math.floor((totalCaeren - 10) / 2);

    const strengthEquipment = totalStrength - displayStrength;
    const constitutionEquipment = totalConstitution - displayConstitution;
    const agilityEquipment = totalAgility - displayAgility;
    const achreEquipment = totalAchre - displayAchre;
    const caerenEquipment = totalCaeren - displayCaeren;


  return (
    <>
    <div className="actions">
        <h3>Attributes</h3>
    </div>
    <div className="abilities">
    <div className="ability-strength">
        <h4>CON</h4>
            <p className="mt-2" id="con-box">{totalConstitution} ({displayConstitution} + {constitutionEquipment})</p>
            <p className="" id="">[ {totalConstitution < 10 ? '- ' + constitutionMod : '+ ' + constitutionMod} ]</p>
    </div>
    <div className="ability-dexterity">
        <h4>STR</h4>
        <p className="mt-2" id="str-box">{totalStrength} ({displayStrength} + {strengthEquipment})</p>
        <p className="" id="">[ {totalStrength < 10 ? '- ' + strengthMod : '+ ' + strengthMod} ]</p>
    </div>
    <div className="ability-constitution">
        <h4>AGI</h4>
        <p className="mt-2" id="">{totalAgility} ({displayAgility} + {agilityEquipment})</p>
        <p className="" id="">[ {totalAgility < 10 ? '- ' + agilityMod : '+ ' + agilityMod} ]</p>
        
    </div>
    <div className="ability-intelligence">
        <h4>ACH</h4>
        <p className="mt-2" id="ach-box">{totalAchre} ({displayAchre} + {achreEquipment})</p>
        <p className="" id="">[ {totalAchre < 10 ? '- ' + achreMod : '+ ' + achreMod} ]</p>
        
    </div>
    <div className="ability-wisdom">
        <h4>CAER</h4>
        <p className="mt-2" id="caer-box">{totalCaeren} ({displayCaeren} + {caerenEquipment})</p>
        <p className="" id="">[ {totalCaeren < 10 ? '- ' + caerenMod : '+ ' + caerenMod} ]</p>
    </div>
    </div>
    </>
  )
}

//FIXME: NEW COMMUNITY FEED!!!
//FIXME: Name - Attributes - Weapons
//TODO: Gives it an air of curiosity
//TODO: As to what equipmenty they chose perhaps


export default AsceanAttributeCompiler