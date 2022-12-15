import React, { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import GameHealthBar from './GameHealthBar';
import GamePlayerStats from './GamePlayerStats';
import Container from 'react-bootstrap/Container'

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
}

const StoryAscean = ({ ascean, weaponOne, weaponTwo, weaponThree, currentPlayerHealth, totalPlayerHealth, loading, attributes, playerDefense }: Props) => {
    const [showPlayer, setShowPlayer] = useState<boolean>(false)
    if (loading) {
        return (
        <Loading Combat={true} />
        )
    }
    return (
        <>
        <div className="game-block"
            // style={{ marginLeft: 7.5 + '%', transform: 'scale(' + 1.1 + ')', marginTop: -20 + '%' }}
        >
        <div className="actions" style={{ marginBottom: 10 + '%', maxWidth: 34 + '%' }}>
        <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} story={true} />
        </div>
        <GamePlayerStats 
            attributes={attributes} player={ascean} weaponAttributes={weaponOne} 
            magicalDefense={playerDefense.magicalDefenseModifier} magicalPosture={playerDefense.magicalPosture} 
            physicalDefense={playerDefense.physicalDefenseModifier} physicalPosture={playerDefense.physicalPosture} />
            {/* <button className='btn' onClick={() => setShowPlayer(!showPlayer)}> */}
        {/* <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: -5 + 'px' }} className='mb-2'>{ascean.name}</h3> */}
            {/* </button> */}
        {
            !showPlayer ?
            <>
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
            <div className="actions" style={{ marginTop: 12.5 + '%' }}>
            </div>
            </>
            : ''
        }
        </div>
        </>
    )
}

export default StoryAscean