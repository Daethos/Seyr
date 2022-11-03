import React, { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';

interface Props {
    ascean: any;
    currentPlayerHealth: number;
    combatData: any;
    player: boolean;
}

const GameAscean = ({ ascean, player, currentPlayerHealth, combatData }: Props) => {
  const [playerCharacter, setPlayerCharacter] = useState<boolean>(player)
  console.log(playerCharacter, 'Player Status in Game Ascean')

  return (
    <>
    {
      playerCharacter
      ?
    <div className="game-block">
    <div className="actions">
    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3>
    <GameHealthBar totalPlayerHealth={combatData.player_attributes.healthTotal} currentPlayerHealth={currentPlayerHealth} />
    </div>
    <AsceanImageCard
        weapon_one={combatData.weapons[0]}
        weapon_two={combatData.weapons[1]}
        weapon_three={combatData.weapons[2]}
        shield={ascean.shield}
        helmet={ascean.helmet}
        chest={ascean.chest}
        legs={ascean.legs}
        amulet={ascean.amulet}
        ring_one={ascean.ring_one}
        ring_two={ascean.ring_two}
        trinket={ascean.trinket}
        gameDisplay={true}
        key={ascean._id}
    />
    <div className="actions">
    <GamePlayerStats attributes={combatData.player_attributes} magicalDefense={combatData.player_defense.magicalDefenseModifier} magicalPosture={combatData.player_defense.magicalPosture} physicalDefense={combatData.player_defense.physicalDefenseModifier} physicalPosture={combatData.player_defense.physicalPosture} />
    </div>
    </div>
    : 
    <div className="game-block" style={{ gridRowStart: 1, gridColumnStart: 3, marginLeft: 50 + '%' }}>
    <div className="actions">
    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3>
    <GameHealthBar totalPlayerHealth={combatData.computer_attributes.healthTotal} currentPlayerHealth={currentPlayerHealth} />
    </div>
    <AsceanImageCard
        weapon_one={combatData.computer_weapons[0]}
        weapon_two={combatData.computer_weapons[1]}
        weapon_three={combatData.computer_weapons[2]}
        shield={ascean.shield}
        helmet={ascean.helmet}
        chest={ascean.chest}
        legs={ascean.legs}
        amulet={ascean.amulet}
        ring_one={ascean.ring_one}
        ring_two={ascean.ring_two}
        trinket={ascean.trinket}
        gameDisplay={true}
        key={ascean._id}
    />
    <div className="actions">
    <GamePlayerStats attributes={combatData.computer_attributes} magicalDefense={combatData.computer_defense.magicalDefenseModifier} magicalPosture={combatData.computer_defense.magicalPosture} physicalDefense={combatData.computer_defense.physicalDefenseModifier} physicalPosture={combatData.computer_defense.physicalPosture} />
    </div>
    </div>
    }
    </>
  )
}

export default GameAscean