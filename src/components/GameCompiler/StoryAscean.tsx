import { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import StoryHealthBar from './StoryHealthBar';
import StoryPlayerStats from './StoryPlayerStats';
import LevelUpModal from '../../game/LevelUpModal';
import GamePlayerStats from './GamePlayerStats';

interface Props {
  ascean: any;
  state: any;
  loading: boolean;
  asceanState: any;
  setAsceanState: any;
  levelUpAscean: any;
};

const StoryAscean = ({ ascean, state, loading, asceanState, setAsceanState, levelUpAscean }: Props) => {
    const [showPlayer, setShowPlayer] = useState<boolean>(false)
    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
    return (
        <>
        <div className="story-block" id='story-ascean'>
        { !showPlayer ? (
            <div className='story-ascean'>
            { asceanState.experience === asceanState.experienceNeeded ? (
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
            ) : ( '' ) }
            <div className="actions" style={{ marginBottom: 0 + '%'}}>
                <StoryHealthBar totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} story={true} />
            </div>
            <GamePlayerStats 
                attributes={state.player_attributes} player={ascean} magicalDefense={state.player_defense.magicalDefenseModifier} magicalPosture={state.player_defense.magicalPosture} 
                physicalDefense={state.player_defense.physicalDefenseModifier} physicalPosture={state.player_defense.physicalPosture} 
            />
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
            />
            </div>
        ) : ( '' ) }
        </div>
        </>
    );
};

export default StoryAscean;