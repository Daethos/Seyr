import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';
import ExperienceBar from './ExperienceBar';
import StatusEffects from './StatusEffects';

interface Props {
  ascean: any;
  currentPlayerHealth: number;
  combatData: any;
  player: boolean;
  loading: boolean;
  totalPlayerHealth: number;
}

const GameAscean = ({ ascean, player, currentPlayerHealth, combatData, totalPlayerHealth, loading }: Props) => {

  const getBlockStyle = {
    marginTop: combatData.playerEffects.length > 0 ? '10%' : '36%',
  }

  if (loading) {
    return (
      <Loading Combat={true} />
    )
  }
  return (
    <>
    { player ?
      <div id='game-block' className="game-block" style={getBlockStyle}>
        {combatData.playerEffects.length > 0 ?
          (combatData.playerEffects.map((effect: any, index: number) => {
            return ( <StatusEffects effect={effect} player={true} key={index} /> )
        })) : '' }
      <div className="">
      <GamePlayerStats attributes={combatData.player_attributes} player={combatData.player} magicalDefense={combatData.player_defense.magicalDefenseModifier} magicalPosture={combatData.player_defense.magicalPosture} physicalDefense={combatData.player_defense.physicalDefenseModifier} physicalPosture={combatData.player_defense.physicalPosture} />
      <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
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
            loading={loading}
            key={ascean._id}
        />
      <div className="actions">
      <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} />
      </div>
      </div>
    : 
    <div className="game-block" id='opponent-block'>
    <div className="">
    <GamePlayerStats attributes={combatData.computer_attributes} player={combatData.computer} magicalDefense={combatData.computer_defense.magicalDefenseModifier} magicalPosture={combatData.computer_defense.magicalPosture} physicalDefense={combatData.computer_defense.physicalDefenseModifier} physicalPosture={combatData.computer_defense.physicalPosture} />
    <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
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
          loading={loading}
          key={ascean._id}
      />
    <div className="actions">
    </div>
    {combatData.computerEffects.length > 0 ?
          (combatData.computerEffects.map((effect: any, index: number) => {
            return ( <StatusEffects effect={effect} key={index} /> )
        })) : '' }
    </div>
    }
    </>
  )
}

export default GameAscean