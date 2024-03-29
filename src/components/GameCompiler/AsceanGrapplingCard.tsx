import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';

interface GrapplingProps {
    weapon_one: any;
    weapon_two: any;
    weapon_three: any;
    shield: any;
    helmet: any;
    chest: any;
    legs: any;
    amulet: any;
    ring_one: any;
    ring_two: any;
    trinket: any;
    loading?: boolean;
    damage?: boolean;
    grapplingSequence: string[];
    bankedSequence: string[];
    setGrapplingSequence: any;
    addToSequence: (move: string) => void;
    newSequence: boolean;
    setNewSequence: any;
};

const AsceanGrapplingCard = ({ weapon_one, weapon_two, weapon_three, shield, helmet, chest, legs, amulet, ring_one, ring_two, trinket, loading, damage, grapplingSequence, setGrapplingSequence, addToSequence, newSequence, setNewSequence, bankedSequence }: GrapplingProps) => {
   
    const [damaged, setDamaged] = useState<boolean>(false);
    const [backgroundRH, setBackgroundRH] = useState('black');
    const [backgroundRA, setBackgroundRA] = useState('black');
    const [backgroundRL, setBackgroundRL] = useState('black');
    const [backgroundRF, setBackgroundRF] = useState('black');
    const [backgroundLH, setBackgroundLH] = useState('black');
    const [backgroundLA, setBackgroundLA] = useState('black');
    const [backgroundLL, setBackgroundLL] = useState('black');
    const [backgroundLF, setBackgroundLF] = useState('black');
    const [backgroundH, setBackgroundH] = useState('black');
    const [backgroundC, setBackgroundC] = useState('black');
    const [backgroundL, setBackgroundL] = useState('black');

    useEffect(() => {
        if (damage) setDamaged(true);
    }, [damage]);

    useEffect(() => {
        if (damaged) {
            setTimeout(() => {
                setDamaged(false);
            }, 500);
        };
    }, [damaged]);

    useEffect(() => {
        if (bankedSequence.length > 0) {
            console.log(bankedSequence, "Banked Sequence");
            bankedSequence.map((move: any, index: number) => {
                console.log(move, "Move");
                const reName = move.move.toLowerCase().replace(' ', '-');
                setTimeout(() => {
                    replayGrapplingSequence(reName, index);
                }, 1000 * index);
            });
        };
    }, [bankedSequence]);

    useEffect(() => {
        if (newSequence) playGrapplingSequence(grapplingSequence);
    }, [newSequence, grapplingSequence]);

    useEffect(() => {
        if (backgroundRH !== 'black') setTimeout(() => {
            setBackgroundRH('black');
        }, 500);
    } , [backgroundRH]);

    useEffect(() => {
        if (backgroundRA !== 'black') setTimeout(() => {
            setBackgroundRA('black');
        }, 500);
    } , [backgroundRA]);

    useEffect(() => {
        if (backgroundRL !== 'black') setTimeout(() => {
            setBackgroundRL('black');
        }, 500);
    } , [backgroundRL]);

    useEffect(() => {
        if (backgroundRF !== 'black') setTimeout(() => {
            setBackgroundRF('black');
        }, 500);
    } , [backgroundRF]);

    useEffect(() => {
        if (backgroundLH !== 'black') setTimeout(() => {
            setBackgroundLH('black');
        }, 500);
    } , [backgroundLH]);

    useEffect(() => {
        if (backgroundLA !== 'black') setTimeout(() => {
            setBackgroundLA('black');
        }, 500);
    } , [backgroundLA]);

    useEffect(() => {
        if (backgroundLL !== 'black') setTimeout(() => {
            setBackgroundLL('black');
        }, 500);
    } , [backgroundLL]);

    useEffect(() => {
        if (backgroundLF !== 'black') setTimeout(() => {
            setBackgroundLF('black');
        }, 500);
    } , [backgroundLF]);

    useEffect(() => {
        if (backgroundH !== 'black') setTimeout(() => {
            setBackgroundH('black');
        }, 500);
    } , [backgroundH]);

    useEffect(() => {
        if (backgroundC !== 'black') setTimeout(() => {
            setBackgroundC('black');
        }, 500);
    } , [backgroundC]);

    useEffect(() => {
        if (backgroundL !== 'black') setTimeout(() => {
            setBackgroundL('black');
        }, 500);
    } , [backgroundL]);


    function atsMiddleware(move: string) {
        checkGrapplingSequence(move, grapplingSequence);
        addToSequence(move);
    };

    function checkGrapplingSequence(move: string, sequence: string[]) {
        let newSequenceLength = sequence.length;
        console.log('newSequenceLength: ', newSequenceLength)
        // if (newSequenceLength > 3) newSequenceLength = newSequenceLength % 4;
        console.log('newSequenceLength: ', newSequenceLength)
        switch (move) {
            case 'right-hand':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundRH('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundRH('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundRH('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundRH('rgba(255, 0, 0, 1)');
                };
            case 'right-arm':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundRA('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundRA('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundRA('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundRA('rgba(255, 0, 0, 1)');
                };
            case 'right-leg':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundRL('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundRL('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundRL('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundRL('rgba(255, 0, 0, 1)');
                };
            case 'right-foot':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundRF('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundRF('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundRF('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundRF('rgba(255, 0, 0, 1)');
                };
            case 'left-hand':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundLH('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundLH('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundLH('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundLH('rgba(255, 0, 0, 1)');
                };
            case 'left-arm':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundLA('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundLA('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundLA('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundLA('rgba(255, 0, 0, 1)');
                };
            case 'left-leg':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundLL('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundLL('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundLL('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundLL('rgba(255, 0, 0, 1)');
                };
            case 'left-foot':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundLF('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundLF('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundLF('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundLF('rgba(255, 0, 0, 1)');
                };
            case 'head':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundH('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundH('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundH('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundH('rgba(255, 0, 0, 1)');
                };
            case 'upper-torso':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundC('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundC('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundC('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundC('rgba(255, 0, 0, 1)');
                };
            case 'lower-torso':
                if (newSequenceLength === 0 || newSequenceLength === 4) {
                    return setBackgroundL('rgba(128, 0, 128, 1)');
                } else if (newSequenceLength === 1 || newSequenceLength === 5) {
                    return setBackgroundL('rgba(255, 215, 0, 1)');
                } else if (newSequenceLength === 2 || newSequenceLength === 6) {
                    return setBackgroundL('rgba(0, 0, 255, 1)');
                } else {
                    return setBackgroundL('rgba(255, 0, 0, 1)');
                };
        };
    };

    function replayGrapplingSequence(move: string, index: number) {
        console.log('replayGrapplingSequence called with move: ' + move + ' and index: ' + index)
        switch (move) {
            case 'right-hand':
                if (index === 0 || index === 4) {
                    return setBackgroundRH('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundRH('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundRH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRH('rgba(255, 0, 0, 0.7)');
                };
            case 'right-arm':
                if (index === 0 || index === 4) {
                    return setBackgroundRA('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                 return setBackgroundRA('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundRA('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRA('rgba(255, 0, 0, 0.7)');
                };
            case 'right-leg':
                if (index === 0 || index === 4) {
                    return setBackgroundRL('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundRL('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundRL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRL('rgba(255, 0, 0, 0.7)');
                };
            case 'right-foot':
                if (index === 0 || index === 4) {
                    return setBackgroundRF('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundRF('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundRF('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRF('rgba(255, 0, 0, 0.7)');
                };
            case 'left-hand':
                if (index === 0 || index === 4) {
                    return setBackgroundLH('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundLH('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundLH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLH('rgba(255, 0, 0, 0.7)');
                };
            case 'left-arm':
                if (index === 0 || index === 4) {
                    return setBackgroundLA('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundLA('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundLA('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLA('rgba(255, 0, 0, 0.7)');
                };
            case 'left-leg':
                if (index === 0 || index === 4) {
                    return setBackgroundLL('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundLL('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundLL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLL('rgba(255, 0, 0, 0.7)');
                };
            case 'left-foot':
                if (index === 0 || index === 4) {
                    return setBackgroundLF('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundLF('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundLF('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLF('rgba(255, 0, 0, 0.7)');
                };
            case 'head':
                if (index === 0 || index === 4) {
                    return setBackgroundH('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundH('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundH('rgba(255, 0, 0, 0.7)');
                };
            case 'upper-torso':
                if (index === 0 || index === 4) {
                    return setBackgroundC('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundC('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundC('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundC('rgba(255, 0, 0, 0.7)');
                };
            case 'lower-torso':
                if (index === 0 || index === 4) {
                    return setBackgroundL('rgba(128, 0, 128, 0.7)');
                } else if (index === 1 || index === 5) {
                    return setBackgroundL('rgba(255, 215, 0, 0.7)');
                } else if (index === 2 || index === 6) {
                    return setBackgroundL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundL('rgba(255, 0, 0, 0.7)');
                };
        };
    };

    function playGrapplingSequence(sequence: string[]) {
        sequence.map((move: string, index: number) => {
            setTimeout(() => {
                replayGrapplingSequence(move, index);
            }, 1000 * index);
        });
        setTimeout(() => {
            setNewSequence(false);
            setGrapplingSequence([]);
        }, 1000 * sequence.length);
    };

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return '0.15em solid white';
            case 'Uncommon':
                return '0.15em solid green';
            case 'Rare':
                return '0.15em solid blue';
            case 'Epic':
                return '0.15em solid purple';
            case 'Legendary':
                return '0.15em solid darkorange';
            default:
                return '0.15em solid grey';
        };
    };

    const rightHandStyle = {
        border: getBorderStyle(weapon_one?.rarity),
        background: backgroundRH,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const rightArmStyle = {
        border: getBorderStyle(weapon_two?.rarity),
        background: backgroundRA,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const rightLegStyle = {
        border: getBorderStyle(weapon_three?.rarity),
        background: backgroundRL,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const rightFootStyle = {
        border: getBorderStyle(shield?.rarity),
        background: backgroundRF,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const getHelmStyle = {
        border: getBorderStyle(helmet?.rarity),
        background: backgroundH,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const getChestStyle = {
        border: getBorderStyle(chest?.rarity),
        background: backgroundC,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const getLegsStyle = {
        border: getBorderStyle(legs?.rarity),
        background: backgroundL,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const leftHandStyle = {
        border: getBorderStyle(amulet?.rarity),
        background: backgroundLH,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const leftArmStyle = {
        border: getBorderStyle(ring_one?.rarity),
        background: backgroundLA,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const leftLegStyle = {
        border: getBorderStyle(ring_two?.rarity),
        background: backgroundLL,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };
    const leftFootStyle = {
        border: getBorderStyle(trinket?.rarity),
        background: backgroundLF,
        boxShadow: '2px 2px 2px black',
        borderRadius: '1px',
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <>
            <Col style={{ marginRight: '10px', marginTop: "10px" }} xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4">
                <Button variant='' onClick={() => atsMiddleware('right-hand')}>
                <img src='/images/right-hand.png' className="m-1 eqp-popover spec" alt={weapon_one?.name} style={rightHandStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('right-arm')}>
                <img src='/images/right-arm.png' className="m-1 eqp-popover spec" alt={weapon_two?.name} style={rightArmStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('right-leg')}>
                <img src='/images/right-leg.png' className="m-1 eqp-popover spec" alt={weapon_three?.name} style={rightLegStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('right-foot')}>
                <img src='/images/right-foot.png' className="m-1 eqp-popover spec" alt={shield?.name} style={rightFootStyle} id={damaged ? 'flicker' : ''} />
                </Button>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-5 mx-2" >
                <Button variant='' onClick={() => atsMiddleware('head')}>
                <img src={helmet?.imgURL} className="m-1 eqp-popover spec" alt={helmet?.name} style={getHelmStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('upper-torso')}>
                <img src={chest?.imgURL} className="m-1 eqp-popover spec" alt={chest?.name} style={getChestStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('lower-torso')}>
                <img src={legs?.imgURL} className="m-1 eqp-popover spec" alt={legs?.name} style={getLegsStyle} id={damaged ? 'flicker' : ''} />
                </Button>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-2">
                <Button variant='' onClick={() => atsMiddleware('left-hand')}>
                <img src='/images/left-hand.png' className="m-1 eqp-popover spec" alt={amulet?.name} style={leftHandStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('left-arm')}>
                <img src='/images/left-arm.png' className="m-1 eqp-popover spec" alt={ring_one?.name} style={leftArmStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('left-leg')}>
                <img src='/images/left-leg.png' className="m-1 eqp-popover spec" alt={ring_two?.name} style={leftLegStyle} id={damaged ? 'flicker' : ''} />
                </Button>
                <Button variant='' onClick={() => atsMiddleware('left-foot')}>
                <img src='/images/left-foot.png' className="m-1 eqp-popover spec" alt={trinket?.name} style={leftFootStyle} id={damaged ? 'flicker' : ''} />
                </Button>
            </Col>
        </>
    );
};

export default AsceanGrapplingCard;