import React, { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';
import Container from 'react-bootstrap/Container'
import ExperienceBar from './ExperienceBar';

interface Props {
  ascean: any;
  currentPlayerHealth: number;
  combatData: any;
  player: boolean;
  loading: boolean;
  combatDataCompiler: () => Promise<void>;
  opponentStatCompiler: () => Promise<void>;
  undefined: boolean;
  setUndefined: React.Dispatch<React.SetStateAction<boolean>>;
  undefinedComputer: boolean;
  setUndefinedComputer: React.Dispatch<React.SetStateAction<boolean>>;
  PvP?: boolean;
  totalPlayerHealth: number;
}

const GameAscean = ({ ascean, player, PvP, currentPlayerHealth, combatData, totalPlayerHealth, loading, combatDataCompiler, opponentStatCompiler, undefined, setUndefined, undefinedComputer, setUndefinedComputer }: Props) => {
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
      <div id='game-block' className="game-block" 
        // style={{ marginLeft: 7.5 + '%', transform: 'scale(' + 1.1 + ')', marginTop: -20 + '%' }}
      >
      <div className="">
            <GamePlayerStats attributes={combatData.player_attributes} player={combatData.player} inventory={ascean.inventory} weaponAttributes={combatData.weapons[0]} magicalDefense={combatData.player_defense.magicalDefenseModifier} magicalPosture={combatData.player_defense.magicalPosture} physicalDefense={combatData.player_defense.physicalDefenseModifier} physicalPosture={combatData.player_defense.physicalPosture} />
      {/* <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3> */}
      <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
      </div>
      {/* {
        !combatData?.weapons?.[0]?.name ? <>{combatDataCompiler}</> : */}
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
            loading={loading}
            key={ascean._id}
        />
      {/* } */}
      <div className="actions">
      <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} />
      </div>
      </div>
    : 
    <div className="game-block" id='opponent-block'
      // style={{ gridRowStart: 1, gridColumnStart: 2, marginLeft: 25 + '%', transform: 'scale(' + 1.1 + ')', marginTop: -10 + '%' }}
      >
    <div className="">
    <GamePlayerStats attributes={combatData.computer_attributes} player={combatData.computer} weaponAttributes={combatData.computer_weapons[0]} magicalDefense={combatData.computer_defense.magicalDefenseModifier} magicalPosture={combatData.computer_defense.magicalPosture} physicalDefense={combatData.computer_defense.physicalDefenseModifier} physicalPosture={combatData.computer_defense.physicalPosture} />
    {/* <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3> */}
    <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
    </div>
    {/* {
      !combatData?.computer_weapons?.[0]?.name ? <>{opponentStatCompiler}</> : */}
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
          loading={loading}
          key={ascean._id}
      />
    {/* } */}
    <div className="actions">
    </div>
    </div>
    }
    </>
  )
}

export default GameAscean