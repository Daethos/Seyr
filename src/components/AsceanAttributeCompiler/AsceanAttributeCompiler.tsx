import React, { useEffect, useState } from 'react'

interface Props {
    ascean: any;
    communityFeed: any;
    communityFocus: any;
}

const AsceanAttributeCompiler = ({ ascean, communityFeed, communityFocus }: Props) => {
    const totalStrength = ascean.strength + ascean.shield.strength + ascean.helmet.strength + ascean.chest.strength + ascean.legs.strength + ascean.ring_one.strength + ascean.ring_two.strength + ascean.amulet.strength + ascean.trinket.strength;
    const totalAgility = ascean.agility + ascean.shield.agility + ascean.helmet.agility + ascean.chest.agility + ascean.legs.agility + ascean.ring_one.agility + ascean.ring_two.agility + ascean.amulet.agility + ascean.trinket.agility;
    const totalConstitution = ascean.constitution + ascean.shield.constitution + ascean.helmet.constitution + ascean.chest.constitution + ascean.legs.constitution + ascean.ring_one.constitution + ascean.ring_two.constitution + ascean.amulet.constitution + ascean.trinket.constitution;
    const totalAchre = ascean.achre + ascean.shield.achre + ascean.helmet.achre + ascean.chest.achre + ascean.legs.achre + ascean.ring_one.achre + ascean.ring_two.achre + ascean.amulet.achre + ascean.trinket.achre;
    const totalCaeren = ascean.caeren + ascean.shield.caeren + ascean.helmet.caeren + ascean.chest.caeren + ascean.legs.caeren + ascean.ring_one.caeren + ascean.ring_two.caeren + ascean.amulet.caeren + ascean.trinket.caeren;
    
    const strengthMod = Math.floor((totalStrength - 10) / 2);
    const agilityMod = Math.floor((totalAgility - 10) / 2);
    const constitutionMod = Math.floor((totalConstitution - 10) / 2);
    const achreMod = Math.floor((totalAchre - 10) / 2);
    const caerenMod = Math.floor((totalCaeren - 10) / 2);

    const strengthEquipment = totalStrength - ascean.strength;
    const constitutionEquipment = totalConstitution - ascean.constitution;
    const agilityEquipment = totalAgility - ascean.agility;
    const achreEquipment = totalAchre - ascean.achre;
    const caerenEquipment = totalCaeren - ascean.caeren;

    async function attributeCompiler() {

    }

  return (
    <>
    <div className="actions">
        <h3>Attributes</h3>
    </div>
    <div className="abilities">
    <div className="ability-strength">
        <h4>CON</h4>
            <p className="mt-2" id="con-box">{totalConstitution} ({ascean.constitution} + {constitutionEquipment})</p>
            <p className="" id="">[ {totalConstitution < 10 ? '- ' + constitutionMod : '+ ' + constitutionMod} ]</p>
    </div>
    <div className="ability-dexterity">
        <h4>STR</h4>
        <p className="mt-2" id="str-box">{totalStrength} ({ascean.strength} + {strengthEquipment})</p>
        <p className="" id="">[ {totalStrength < 10 ? '- ' + strengthMod : '+ ' + strengthMod} ]</p>
    </div>
    <div className="ability-constitution">
        <h4>AGI</h4>
        <p className="mt-2" id="">{totalAgility} ({ascean.agility} + {agilityEquipment})</p>
        <p className="" id="">[ {totalAgility < 10 ? '- ' + agilityMod : '+ ' + agilityMod} ]</p>
        
    </div>
    <div className="ability-intelligence">
        <h4>ACH</h4>
        <p className="mt-2" id="ach-box">{totalAchre} ({ascean.achre} + {achreEquipment})</p>
        <p className="" id="">[ {totalAchre < 10 ? '- ' + achreMod : '+ ' + achreMod} ]</p>
        
    </div>
    <div className="ability-wisdom">
        <h4>CAER</h4>
        <p className="mt-2" id="caer-box">{totalCaeren} ({ascean.caeren} + {caerenEquipment})</p>
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