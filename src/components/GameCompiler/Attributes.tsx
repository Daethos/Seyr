import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import { setAsceanState } from '../../game/reducers/gameState';

interface Props {
    asceanState: any;
};

const Attributes = ({ asceanState }: Props) => {
    const dispatch = useDispatch();
    const [poolTotal, setPoolTotal] = useState<number>(0);
    const attributes = [
        { name: 'constitution', label: 'Constitution', description: 'Health, Defenses, Crit Damage' },
        { name: 'strength', label: 'Strength', description: 'Crit Damage, Physical Damage, Health, Defenses' },
        { name: 'agility', label: 'Agility', description: 'Crit Damage, Dodge, Phys Damage, Roll' },
        { name: 'achre', label: 'Achre', description: 'Crit Chance, Dodge, Spell Damage, Roll' },
        { name: 'caeren', label: 'Caeren', description: 'Crit Damage, Defenses, Health, Spell Damage' },
        { name: 'kyosir', label: 'Kyosir', description: 'Defenses, Penetration' },
    ];

const handleAttributeChange = (name: string, value: number) => {
    dispatch(setAsceanState({
            ...asceanState,
            [name]: Number(asceanState[name as keyof typeof asceanState]) + value,
        }));
        setPoolTotal(poolTotal => poolTotal + value);
    };

    useEffect(() => {
        setPoolTotal(asceanState.achre + asceanState.caeren + asceanState.kyosir + asceanState.agility + asceanState.strength + asceanState.constitution);
    }, [asceanState]);

    return (
        <>
        <div className="actions">
            <h3>+{poolTotal} Attribute Points</h3>
            <h3 id="pool-output"></h3>
        </div>
        {attributes.map((attribute) => (
            <div className="property-line" key={attribute.name}>
                <h4>{attribute.label}: </h4>
                <p style={{ color: '#fdf6d8' }}>{attribute.description}</p>
                <InputGroup className="mb-1" style={{ width: '100%', display: 'flex' }}>
                    <button
                        id={`${attribute.name}-minus`}
                        onClick={() => handleAttributeChange(attribute.name, -1)}
                        style={{ display: Number(asceanState[attribute.name as keyof typeof asceanState]) > 0 ? 'inline-block' : 'none' }}
                    > − </button>
                    <input
                        style={{ width: '35%', textAlign: 'center' }}
                        className="form-control-number mx-1"
                        type="number"
                        name={attribute.name}
                        value={asceanState.ascean[attribute.name] + asceanState[attribute.name as keyof typeof asceanState]}
                        step="1"
                        readOnly
                    ></input>
                    <button
                        id={`${attribute.name}-plus`}
                        onClick={() => handleAttributeChange(attribute.name, 1)}
                        style={{ display: poolTotal < 4 ? 'inline-block' : 'none' }}
                    > + </button>
                    <h4 style={attributeStyle} id={`${attribute.name}-box`}>
                        {asceanState.ascean[attribute.name] + asceanState[attribute.name as keyof typeof asceanState]}
                    </h4>
                </InputGroup>
            </div>
        ))}
        </>
    );
};

const attributeStyle = {
    marginLeft: '15%',
    color: 'gold',
    marginTop: '2.5%',
    fontSize: '18px',
};

export default Attributes;