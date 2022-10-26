import React, { useEffect, useState } from 'react'

interface Props {
    ascean?: any;
}

const AsceanAttributeCompiler = ({ ascean }: Props) => {
    const displayConstitution: number = Math.round((ascean?.constitution + (ascean?.origin === "Notheo" || ascean?.origin === 'Nothos' ? 2 : 0)) * (ascean?.mastery === 'Constitution' ? 1.1 : 1))
    const displayStrength: number = Math.round((ascean?.strength + (ascean?.origin === 'Sedyreal' || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0) * (ascean?.mastery === 'Strength' ? 1.15 : 1))
    const displayAgility: number = Math.round((ascean?.agility + (ascean?.origin === "Quor'eite" || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) * (ascean?.mastery === 'Agility' ? 1.15 : 1))
    const displayAchre: number = Math.round((ascean?.achre + (ascean?.origin === 'Notheo' || ascean?.origin === 'Fyers' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0) * (ascean?.mastery === 'Achre' ? 1.15 : 1))
    const displayCaeren: number = Math.round((ascean?.caeren + (ascean?.origin === 'Nothos' || ascean?.origin === 'Sedyreal' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0) * (ascean?.mastery === 'Caeren' ? 1.15 : 1))
    const displayKyosir: number = Math.round((ascean?.kyosir + (ascean?.origin === "Fyers" || ascean?.origin === "Quor'eite" ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0) * (ascean.mastery === 'Kyosir' ? 1.15 : 1))

    const totalStrength: number = displayStrength + ascean?.shield?.strength + ascean?.helmet?.strength + ascean?.chest?.strength + ascean?.legs?.strength + ascean?.ring_one?.strength + ascean?.ring_two?.strength + ascean?.amulet?.strength + ascean?.trinket?.strength + (ascean.origin === 'Sedyreal' ? 2 : 0);
    const totalAgility: number = displayAgility + ascean?.shield?.agility + ascean?.helmet?.agility + ascean?.chest?.agility + ascean?.legs?.agility + ascean?.ring_one?.agility + ascean?.ring_two?.agility + ascean?.amulet?.agility + ascean?.trinket?.agility;
    const totalConstitution: number = displayConstitution + ascean?.shield?.constitution + ascean?.helmet?.constitution + ascean?.chest?.constitution + ascean?.legs?.constitution + ascean?.ring_one?.constitution + ascean?.ring_two?.constitution + ascean?.amulet?.constitution + ascean?.trinket?.constitution;
    const totalAchre: number = displayAchre + ascean?.shield?.achre + ascean?.helmet?.achre + ascean?.chest?.achre + ascean?.legs?.achre + ascean?.ring_one?.achre + ascean?.ring_two?.achre + ascean?.amulet?.achre + ascean?.trinket?.achre;
    const totalCaeren: number = displayCaeren + ascean?.shield?.caeren + ascean?.helmet?.caeren + ascean?.chest?.caeren + ascean?.legs?.caeren + ascean?.ring_one?.caeren + ascean?.ring_two?.caeren + ascean?.amulet?.caeren + ascean?.trinket?.caeren;
    const totalKyosir: number = displayKyosir + ascean?.shield?.kyosir + ascean?.helmet?.kyosir + ascean?.chest?.kyosir + ascean?.legs?.kyosir + ascean?.ring_one?.kyosir + ascean?.ring_two?.kyosir + ascean?.amulet?.kyosir + ascean?.trinket?.kyosir;
    
    console.log(ascean.name, ascean.origin, 'Con:', displayConstitution, 'Str:', displayStrength, 'Agi:', displayAgility, 'Ach:', displayAchre, 'Caer:', displayCaeren, 'Kyo:', displayKyosir)
    
    const strengthMod: number = Math.floor((totalStrength - 10) / 2);
    const agilityMod: number = Math.floor((totalAgility - 10) / 2);
    const constitutionMod: number = Math.floor((totalConstitution - 10) / 2);
    const achreMod: number = Math.floor((totalAchre - 10) / 2);
    const caerenMod: number = Math.floor((totalCaeren - 10) / 2);
    const kyosirMod: number = Math.floor((totalKyosir - 10) / 2);

    const strengthEquipment: number = totalStrength - displayStrength;
    const constitutionEquipment: number = totalConstitution - displayConstitution;
    const agilityEquipment: number = totalAgility - displayAgility;
    const achreEquipment: number = totalAchre - displayAchre;
    const caerenEquipment: number = totalCaeren - displayCaeren;
    const kyosirEquipment: number = totalKyosir - displayKyosir;


  return (
    <>
    {/* <div className="actions">
        <h3>Attributes</h3>
    </div> */}
    <div className="abilities">
    <div className="ability-strength">
        <h4>CON</h4>
            <p className="mt-2" id="con-box">{totalConstitution}<br /> ({displayConstitution} + {constitutionEquipment})</p>
            <p className="" id="">[ {totalConstitution < 10 ? '- ' + constitutionMod : '+ ' + constitutionMod} ]</p>
    </div>
    <div className="ability-dexterity">
        <h4>STR</h4>
        <p className="mt-2" id="str-box">{totalStrength}<br /> ({displayStrength} + {strengthEquipment})</p>
        <p className="" id="">[ {totalStrength < 10 ? '- ' + strengthMod : '+ ' + strengthMod} ]</p>
    </div>
    <div className="ability-constitution">
        <h4>AGI</h4>
        <p className="mt-2" id="">{totalAgility}<br /> ({displayAgility} + {agilityEquipment})</p>
        <p className="" id="">[ {totalAgility < 10 ? '- ' + agilityMod : '+ ' + agilityMod} ]</p>
        
    </div>
    <div className="ability-intelligence">
        <h4>ACH</h4>
        <p className="mt-2" id="ach-box">{totalAchre}<br /> ({displayAchre} + {achreEquipment})</p>
        <p className="" id="">[ {totalAchre < 10 ? '- ' + achreMod : '+ ' + achreMod} ]</p>
        
    </div>
    <div className="ability-wisdom">
        <h4>CAER</h4>
        <p className="mt-2" id="caer-box">{totalCaeren}<br /> ({displayCaeren} + {caerenEquipment})</p>
        <p className="" id="">[ {totalCaeren < 10 ? '- ' + caerenMod : '+ ' + caerenMod} ]</p>
    </div>
    <div className="ability-wisdom">
        <h4>KYO</h4>
        <p className="mt-2" id="kyo-box">{totalKyosir}<br /> ({displayKyosir} + {kyosirEquipment})</p>
        <p className="" id="">[ {totalKyosir < 10 ? '- ' + kyosirMod : '+ ' + kyosirMod} ]</p>
    </div>
    </div>
    </>
  )
}

export default AsceanAttributeCompiler