import React, { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';

interface Props {
  ascean: any;
  currentPlayerHealth: number;
  combatData: any;
  player: boolean;
  loading: boolean;
  undefined: boolean;
  setUndefined: React.Dispatch<React.SetStateAction<boolean>>;
  undefinedComputer: boolean;
  setUndefinedComputer: React.Dispatch<React.SetStateAction<boolean>>;
  PvP?: boolean;
  yourData: any;
  enemyData: any;
}

const PvPAscean = ({ ascean, player, PvP, yourData, enemyData, currentPlayerHealth, combatData, loading, undefined, setUndefined, undefinedComputer, setUndefinedComputer }: Props) => {
  const [playerCharacter, setPlayerCharacter] = useState<boolean>(player)
  // console.log(playerCharacter, 'Player Status in Game Ascean')

  if (loading) {
    return (
      <Loading Combat={true} />
    )
  }
  return (
    <>
    { playerCharacter ?
      <div className="game-block" style={{ marginLeft: 7.5 + '%', transform: 'scale(' + 1.1 + ')', marginTop: -20 + '%' }}>
      <div className="actions">
      <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3>
      <GameHealthBar 
        totalPlayerHealth={yourData.player === 1 ? combatData.player_one_attributes.healthTotal : combatData.player_two_attributes.healthTotal} 
        currentPlayerHealth={yourData.player === 1 ? combatData.current_player_one_health : combatData.current_player_two_health} />
      </div>
      {/* {
        !combatData?.player_one_weapons?.[0]?.name ? <>{combatDataCompiler}</> : */}
        <AsceanImageCard
            weapon_one={yourData.player === 1 ? combatData.player_one_weapons[0] : combatData.player_two_weapons[0]}
            weapon_two={yourData.player === 1 ? combatData.player_one_weapons[1] : combatData.player_two_weapons[1]}
            weapon_three={yourData.player === 1 ? combatData.player_one_weapons[2] : combatData.player_two_weapons[2]}
            shield={ascean.shield}
            helmet={ascean.helmet}
            chest={ascean.chest}
            legs={ascean.legs}
            amulet={ascean.amulet}
            ring_one={ascean.ring_one}
            ring_two={ascean.ring_two}
            trinket={ascean.trinket}
            gameDisplay={true}
            loading={loading}
            key={ascean._id}
        />
      {/* } */}
      <div className="actions">
        {
            yourData.player === 1
            ? <GamePlayerStats attributes={combatData.player_one_attributes} player={combatData.player_one} weaponAttributes={combatData.player_one_weapons[0]} magicalDefense={combatData.player_one_defense.magicalDefenseModifier} magicalPosture={combatData.player_one_defense.magicalPosture} physicalDefense={combatData.player_one_defense.physicalDefenseModifier} physicalPosture={combatData.player_one_defense.physicalPosture} />
            : <GamePlayerStats attributes={combatData.player_two_attributes} player={combatData.player_two} weaponAttributes={combatData.player_two_weapons[0]} magicalDefense={combatData.player_two_defense.magicalDefenseModifier} magicalPosture={combatData.player_two_defense.magicalPosture} physicalDefense={combatData.player_two_defense.physicalDefenseModifier} physicalPosture={combatData.player_two_defense.physicalPosture} />
        }
      </div>
      </div>
    : 
    <div className="game-block" style={{ gridRowStart: 1, gridColumnStart: 2, marginLeft: 25 + '%', transform: 'scale(' + 1.1 + ')', marginTop: -10 + '%' }}>
    <div className="actions">
    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3>
    <GameHealthBar 
        totalPlayerHealth={enemyData.player === 1 ? combatData.player_one_attributes.healthTotal : combatData.player_two_attributes.healthTotal} 
        currentPlayerHealth={enemyData.player === 1 ? combatData.current_player_one_health : combatData.current_player_two_health}
    />
    </div>
    {/* {
      !combatData?.player_two_weapons?.[0]?.name ? <>{opponentStatCompiler}</> : */}
      <AsceanImageCard
          weapon_one={enemyData.player === 2 ? combatData.player_two_weapons[0] : combatData.player_one_weapons[0]}
          weapon_two={enemyData.player === 2 ? combatData.player_two_weapons[1] : combatData.player_one_weapons[1]}
          weapon_three={enemyData.player === 2 ? combatData.player_two_weapons[2] : combatData.player_one_weapons[2]}
          shield={ascean.shield}
          helmet={ascean.helmet}
          chest={ascean.chest}
          legs={ascean.legs}
          amulet={ascean.amulet}
          ring_one={ascean.ring_one}
          ring_two={ascean.ring_two}
          trinket={ascean.trinket}
          gameDisplay={true}
          loading={loading}
          key={ascean._id}
      />
     {/* } */}
    <div className="actions">
        {
            enemyData.player === 1
            ? <GamePlayerStats attributes={combatData.player_one_attributes} player={combatData.player_one} weaponAttributes={combatData.player_one_weapons[0]} magicalDefense={combatData.player_one_defense.magicalDefenseModifier} magicalPosture={combatData.player_one_defense.magicalPosture} physicalDefense={combatData.player_one_defense.physicalDefenseModifier} physicalPosture={combatData.player_one_defense.physicalPosture} />
            : <GamePlayerStats attributes={combatData.player_two_attributes} player={combatData.player_two} weaponAttributes={combatData.player_two_weapons[0]} magicalDefense={combatData.player_two_defense.magicalDefenseModifier} magicalPosture={combatData.player_two_defense.magicalPosture} physicalDefense={combatData.player_two_defense.physicalDefenseModifier} physicalPosture={combatData.player_two_defense.physicalPosture} />
        }
    </div>
    </div>
    }
    </>
  )
}

export default PvPAscean