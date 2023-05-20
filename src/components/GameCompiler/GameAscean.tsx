import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';
import ExperienceBar from './ExperienceBar';
import StatusEffects from './StatusEffects';

interface Props {
  ascean: any;
  currentPlayerHealth: number;
  player: boolean;
  loading: boolean;
  totalPlayerHealth: number;
  state: any;
  dispatch: any;
  damage?: boolean;
};

const GameAscean = ({ state, dispatch, ascean, player, currentPlayerHealth, totalPlayerHealth, loading, damage }: Props) => {

  const getBlockStyle = {
    marginTop: state.playerEffects.length > 0 ? '-19%' : '6%',
  };

  if (loading) {
    return (
      <Loading Combat={true} />
    );
  };

  return (
    <>
    { player ?
      <div id='game-block' className="game-block" style={getBlockStyle}>
        {state.playerEffects.length > 0 ?
          (state.playerEffects.map((effect: any, index: number) => {
            return ( <StatusEffects state={state} dispatch={dispatch} ascean={ascean} effect={effect} player={true} key={index} /> )
        })) : '' }
      <div className="game-block-top">
      <GamePlayerStats attributes={state.player_attributes} player={state.player} magicalDefense={state.player_defense.magicalDefenseModifier} magicalPosture={state.player_defense.magicalPosture} physicalDefense={state.player_defense.physicalDefenseModifier} physicalPosture={state.player_defense.physicalPosture} />
      <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
      </div>
        <AsceanImageCard
            weapon_one={state.weapons[0]}
            weapon_two={state.weapons[1]}
            weapon_three={state.weapons[2]}
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
            damage={damage}
        />
      <div className="actions">
      <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} />
      </div>
      </div>
    : 
    <div className="game-block" id='opponent-block'>
    <div className="opponent-block-top">
    <GamePlayerStats attributes={state.computer_attributes} player={state.computer} magicalDefense={state.computer_defense.magicalDefenseModifier} magicalPosture={state.computer_defense.magicalPosture} physicalDefense={state.computer_defense.physicalDefenseModifier} physicalPosture={state.computer_defense.physicalPosture} />
    <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
    </div>
      <AsceanImageCard
          weapon_one={state.computer_weapons[0]}
          weapon_two={state.computer_weapons[1]}
          weapon_three={state.computer_weapons[2]}
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
          damage={damage}
      />
    <div className="actions">
    </div>
    {state.computerEffects.length > 0 ?
          (state.computerEffects.map((effect: any, index: number) => {
            return ( <StatusEffects state={state} dispatch={dispatch} ascean={ascean} effect={effect} key={index} /> )
        })) : '' }
    </div>
    }
    </>
  );
};

export default GameAscean;