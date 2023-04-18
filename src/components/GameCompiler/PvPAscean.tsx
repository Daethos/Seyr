import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';
import ExperienceBar from './ExperienceBar';
import StatusEffects from './StatusEffects';
import { useEffect } from 'react';

interface Props {
  ascean: any;
  currentPlayerHealth: number;
  player: boolean;
  loading: boolean;
  totalPlayerHealth: number;
  state: any;
  damage?: boolean;
  style?: boolean;
};

const PvPAscean = ({ state, ascean, player, currentPlayerHealth, totalPlayerHealth, loading, damage, style }: Props) => {
  useEffect(() => {
    console.log(style, 'PvPAscean Mounted');
    return () => {
      console.log(style, 'PvPAscean Unmounted');
    };
  }, [style])
  const getBlockStyle = {
    zIndex: style ? 99999 : 99,
    marginTop: state.playerEffects.length > 0 ? '-19%' : '6%',
  };

  const spectatorStyle ={
    zIndex: 99999,
  }

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
            return ( <StatusEffects effect={effect} player={true} key={index} /> )
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
      <GamePlayerStats attributes={state.enemy_attributes} player={state.enemy} magicalDefense={state.enemy_defense.magicalDefenseModifier} magicalPosture={state.enemy_defense.magicalPosture} physicalDefense={state.enemy_defense.physicalDefenseModifier} physicalPosture={state.enemy_defense.physicalPosture} />
      <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
      </div>
      <AsceanImageCard
          weapon_one={state.enemy_weapons[0]}
          weapon_two={state.enemy_weapons[1]}
          weapon_three={state.enemy_weapons[2]}
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
      {state.enemyEffects.length > 0 ?
        (state.enemyEffects.map((effect: any, index: number) => {
          return ( <StatusEffects effect={effect} key={index} /> )
      })) : '' }
    </div>
    }
    </>
  );
};

export default PvPAscean;