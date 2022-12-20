import React, { useState } from 'react'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import StoryHealthBar from './StoryHealthBar';
import StoryPlayerStats from './StoryPlayerStats';

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
        <div className="story-block mt-4" id='story-ascean'>
            {/* <div id='ui-hud' className=''>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>{ascean.name}</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Inventory</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Objectives</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>World Status</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' id='world-status' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Settings</h3>
            </Button>
            </div> */}
        {
            !showPlayer ? 
            (
            <div className='story-ascean'>
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
            {/* <div className="actions" style={{ marginTop: 12.5 + '%' }}>
            </div> */}
            </div>
            ) : ( '' )
        }
        
        </div>
        </>
    )
}

export default StoryAscean