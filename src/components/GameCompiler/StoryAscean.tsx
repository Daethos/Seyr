import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import StoryHealthBar from './StoryHealthBar';
import LevelUpModal from '../../game/LevelUpModal';
import GamePlayerStats from './GamePlayerStats';
import StatusEffects from './StatusEffects';
import ExperienceBar from './ExperienceBar';

interface Props {
  ascean: any;
  dispatch: any;
  state: any;
  loading: boolean;
  asceanState: any;
  setAsceanState: any;
  levelUpAscean: any;
  damaged?: boolean;
};

const StoryAscean = ({ ascean, state, dispatch, loading, asceanState, setAsceanState, levelUpAscean, damaged }: Props) => {
    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
    return (
        <>
        <div className="story-block">
            <div className='story-ascean'> 
                { asceanState.experience === asceanState.experienceNeeded ? (
                    <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
                ) : ( '' ) }
                <div style={{ textAlign: "center" }}>
                <StoryHealthBar totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} story={true} />
                </div>
                <div style={{ textAlign: 'center', marginTop: "-5%" }}>
                <GamePlayerStats 
                    attributes={state.player_attributes} player={ascean} magicalDefense={state.player_defense.magicalDefenseModifier} magicalPosture={state.player_defense.magicalPosture} 
                    physicalDefense={state.player_defense.physicalDefenseModifier} physicalPosture={state.player_defense.physicalPosture} 
                />
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
                    damage={damaged}
                    key={ascean._id}
                />
                <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} story={true} />
            </div>
        </div>
        </>
    );
};

export default StoryAscean;