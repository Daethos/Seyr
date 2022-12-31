import { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import StoryHealthBar from './StoryHealthBar';
import StoryPlayerStats from './StoryPlayerStats';
import LevelUpModal from '../../game/LevelUpModal';

interface Props {
  ascean: any;
  attributes: any;
  currentPlayerHealth: number;
  loading: boolean;
  playerDefense: any;
  totalPlayerHealth: number;
  weaponOne: any;
  weaponTwo: any;
  weaponThree: any;
  asceanState: any;
  setAsceanState: any;
  levelUpAscean: any;
}

const StoryAscean = ({ ascean, weaponOne, weaponTwo, weaponThree, currentPlayerHealth, totalPlayerHealth, loading, attributes, playerDefense, asceanState, setAsceanState, levelUpAscean }: Props) => {
    const [showPlayer, setShowPlayer] = useState<boolean>(false)
    if (loading) {
        return (
        <Loading Combat={true} />
        )
    }
    return (
        <>
        <div className="story-block" id='story-ascean'>
        {
            !showPlayer ? 
            (
            <div className='story-ascean'>
            { asceanState.experience !== asceanState.experienceNeeded ? (
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
            ) : ( '' ) }
            <div className="actions" style={{ marginBottom: 0 + '%'}}>
                <StoryHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} story={true} />
            </div>
            <StoryPlayerStats 
                attributes={attributes} player={ascean} weaponAttributes={weaponOne} 
                magicalDefense={playerDefense.magicalDefenseModifier} magicalPosture={playerDefense.magicalPosture} 
                physicalDefense={playerDefense.physicalDefenseModifier} physicalPosture={playerDefense.physicalPosture} />
            <AsceanImageCard
                weapon_one={weaponOne}
                weapon_two={weaponTwo}
                weapon_three={weaponThree}
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
            ) : ( '' )
        }
        
        </div>
        </>
    )
}

export default StoryAscean