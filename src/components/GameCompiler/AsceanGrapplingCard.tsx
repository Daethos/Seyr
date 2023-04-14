import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
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
    setGrapplingSequence: any;
    addToSequence: (move: string) => void;
    newSequence: boolean;
    setNewSequence: any;
};

const AsceanGrapplingCard = ({ weapon_one, weapon_two, weapon_three, shield, helmet, chest, legs, amulet, ring_one, ring_two, trinket, loading, damage, grapplingSequence, setGrapplingSequence, addToSequence, newSequence, setNewSequence }: GrapplingProps) => {
   
    const [damaged, setDamaged] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState('black');
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
        switch (move) {
            case 'right-hand':
                if (sequence.length === 0) {
                    return setBackgroundRH('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundRH('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundRH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRH('rgba(255, 0, 0, 0.7)');
                };
            case 'right-arm':
                if (sequence.length === 0) {
                    return setBackgroundRA('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundRA('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundRA('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRA('rgba(255, 0, 0, 0.7)');
                };
            case 'right-leg':
                if (sequence.length === 0) {
                    return setBackgroundRL('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundRL('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundRL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRL('rgba(255, 0, 0, 0.7)');
                };
            case 'right-foot':
                if (sequence.length === 0) {
                    return setBackgroundRF('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundRF('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundRF('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRF('rgba(255, 0, 0, 0.7)');
                };
            case 'left-hand':
                if (sequence.length === 0) {
                    return setBackgroundLH('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundLH('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundLH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLH('rgba(255, 0, 0, 0.7)');
                };
            case 'left-arm':
                if (sequence.length === 0) {
                    return setBackgroundLA('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundLA('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundLA('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLA('rgba(255, 0, 0, 0.7)');
                };
            case 'left-leg':
                if (sequence.length === 0) {
                    return setBackgroundLL('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundLL('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundLL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLL('rgba(255, 0, 0, 0.7)');
                };
            case 'left-foot':
                if (sequence.length === 0) {
                    return setBackgroundLF('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundLF('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundLF('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLF('rgba(255, 0, 0, 0.7)');
                };
            case 'head':
                if (sequence.length === 0) {
                    return setBackgroundH('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundH('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundH('rgba(255, 0, 0, 0.7)');
                };
            case 'upper-torso':
                if (sequence.length === 0) {
                    return setBackgroundC('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundC('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundC('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundC('rgba(255, 0, 0, 0.7)');
                };
            case 'lower-torso':
                if (sequence.length === 0) {
                    return setBackgroundL('rgba(128, 0, 128, 0.7)');
                } else if (sequence.length === 1) {
                    return setBackgroundL('rgba(255, 215, 0, 0.7)');
                } else if (sequence.length === 2) {
                    return setBackgroundL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundL('rgba(255, 0, 0, 0.7)');
                };
        };
    };

    function replayGrapplingSequence(move: string, index: number) {
        switch (move) {
            case 'right-hand':
                if (index === 0) {
                    return setBackgroundRH('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundRH('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundRH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRH('rgba(255, 0, 0, 0.7)');
                };
            case 'right-arm':
                if (index === 0) {
                    return setBackgroundRA('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                 return setBackgroundRA('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundRA('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRA('rgba(255, 0, 0, 0.7)');
                };
            case 'right-leg':
                if (index === 0) {
                    return setBackgroundRL('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundRL('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundRL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRL('rgba(255, 0, 0, 0.7)');
                };
            case 'right-foot':
                if (index === 0) {
                    return setBackgroundRF('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundRF('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundRF('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundRF('rgba(255, 0, 0, 0.7)');
                };
            case 'left-hand':
                if (index === 0) {
                    return setBackgroundLH('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundLH('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundLH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLH('rgba(255, 0, 0, 0.7)');
                };
            case 'left-arm':
                if (index === 0) {
                    return setBackgroundLA('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundLA('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundLA('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLA('rgba(255, 0, 0, 0.7)');
                };
            case 'left-leg':
                if (index === 0) {
                    return setBackgroundLL('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundLL('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundLL('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLL('rgba(255, 0, 0, 0.7)');
                };
            case 'left-foot':
                if (index === 0) {
                    return setBackgroundLF('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundLF('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundLF('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundLF('rgba(255, 0, 0, 0.7)');
                };
            case 'head':
                if (index === 0) {
                    return setBackgroundH('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundH('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundH('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundH('rgba(255, 0, 0, 0.7)');
                };
            case 'upper-torso':
                if (index === 0) {
                    return setBackgroundC('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundC('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
                    return setBackgroundC('rgba(0, 0, 255, 0.7)');
                } else {
                    return setBackgroundC('rgba(255, 0, 0, 0.7)');
                };
            case 'lower-torso':
                if (index === 0) {
                    return setBackgroundL('rgba(128, 0, 128, 0.7)');
                } else if (index === 1) {
                    return setBackgroundL('rgba(255, 215, 0, 0.7)');
                } else if (index === 2) {
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
        borderRadius: 1 + 'px',
    };
    const rightArmStyle = {
        border: getBorderStyle(weapon_two?.rarity),
        background: backgroundRA,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const rightLegStyle = {
        border: getBorderStyle(weapon_three?.rarity),
        background: backgroundRL,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const rightFootStyle = {
        border: getBorderStyle(shield?.rarity),
        background: backgroundRF,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const getHelmStyle = {
        border: getBorderStyle(helmet?.rarity),
        background: backgroundH,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const getChestStyle = {
        border: getBorderStyle(chest?.rarity),
        background: backgroundC,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const getLegsStyle = {
        border: getBorderStyle(legs?.rarity),
        background: backgroundL,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const leftHandStyle = {
        border: getBorderStyle(amulet?.rarity),
        background: backgroundLH,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const leftArmStyle = {
        border: getBorderStyle(ring_one?.rarity),
        background: backgroundLA,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const leftLegStyle = {
        border: getBorderStyle(ring_two?.rarity),
        background: backgroundLL,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
    };
    const leftFootStyle = {
        border: getBorderStyle(trinket?.rarity),
        background: backgroundLF,
        boxShadow: '2px 2px 2px black',
        borderRadius: 1 + 'px',
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

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-5 mx-3" >
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