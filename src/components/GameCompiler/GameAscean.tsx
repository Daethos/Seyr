import React from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';

interface Props {
    ascean: any;
    currentPlayerHealth: number;
    combatData: any;

}

const GameAscean = ({ ascean, currentPlayerHealth, combatData }: Props) => {
  return (
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
  )
}

export default GameAscean