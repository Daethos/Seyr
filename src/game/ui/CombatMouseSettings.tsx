import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCombatSettingFetch } from '../reducers/combatState';
import useGameSounds from '../../components/GameCompiler/Sounds';
import { useKeyEvent } from '../../pages/Story/Story';

interface CombatMouseSettingsProps {
    setPrayerBlessing: (prayer: any) => void;
    setDamageType: (damageType: any) => void;
    damageType: any[];
    weapons: any[];
};

const CombatMouseSettings = ({ setPrayerBlessing, setDamageType, damageType, weapons }: CombatMouseSettingsProps) => {
    const dispatch = useDispatch();
    const { playWO } = useGameSounds(0.25);
    const [prayers, setPrayers] = useState([ 'Buff', 'Heal', 'Debuff', 'Damage', 'Avarice', 'Denial', 'Dispel', 'Silence']);
    const [selectedWeaponIndex, setSelectedWeaponIndex] = useState<number>(0);
    const [selectedDamageTypeIndex, setSelectedDamageTypeIndex] = useState<number>(0);
    const [selectedPrayerIndex, setSelectedPrayerIndex] = useState<number>(0);
    const [selectedHighlight, setSelectedHighlight] = useState<string>('');
    const [scrollEnabled, setScrollEnabled] = useState(false);
  
    const handleWheelRotation = (event: WheelEvent): void => {
        if (!scrollEnabled) return;
        const direction = event.deltaY > 0 ? 1 : -1; 
    
        if (selectedHighlight === 'Prayer') {
            const newIndex = (selectedPrayerIndex + direction + prayers.length) % prayers.length;
            setSelectedPrayerIndex(newIndex);
            setPrayerBlessing( { target: { value: prayers[newIndex] } } );
            setSelectedHighlight('Prayer');
        } else if (selectedHighlight === 'Damage') {
            const newIndex = (selectedDamageTypeIndex + direction + damageType.length) % damageType.length;
            setSelectedDamageTypeIndex(newIndex);
            setDamageType( { target: { value: damageType[newIndex] } } );
            setSelectedHighlight('Damage');
        } else if (selectedHighlight === 'Weapon') {
            let newIndex = (selectedWeaponIndex + direction + weapons.length) % weapons.length;
            newIndex = direction === 1 ? 2 : 1;
            if (!weapons[newIndex]) return;
            setSelectedWeaponIndex(newIndex);
            const one = [weapons[newIndex], weapons[0], weapons[2]._id === weapons[newIndex]._id ? weapons[1] : weapons[2]];
            dispatch(getCombatSettingFetch({ loadout: one, type: 'Weapon' }));
            setSelectedHighlight('Weapon');
            playWO();
        };
    };

    const handleShiftKey = (event: KeyboardEvent): void => {
        event.preventDefault();
        if (event.shiftKey) {
            if (selectedHighlight === 'Weapon') {
                setSelectedHighlight('Damage');
            } else if (selectedHighlight === 'Damage') {
                setSelectedHighlight('Prayer');
            } else {
                setSelectedHighlight('Weapon');
            };
        };
    };

    const handleToggleScroll = (): void => setScrollEnabled((prevScrollEnabled) => !prevScrollEnabled);
    
    const mapTypes = (types: any[]): any[] => {
        let newTypes: any[] = []; 
        for (let i = 0; i < types.length; i++) {
            newTypes.push(
                <div key={i} style={{ display: "inline" }}>
                    {types[i]}{' <-> '}{types[i] === types[types.length - 1] ? types[0] : ''}
                </div>
            );
        };
        return newTypes;
    };

    useKeyEvent('keydown', handleShiftKey);
    useKeyEvent('wheel', handleWheelRotation);

    return (
        <div style={{ position: "absolute", width: "50%", height: "25%", textAlign: "center", left: "24.5%", top: "60%", background: 'transparent', zIndex: 99 }} onMouseDown={handleToggleScroll}>
            { scrollEnabled ? (
                selectedHighlight === 'Weapon' ? (
                    <>
                    <p style={{ color: 'gold', fontSize: "22px", fontWeight: 700, fontFamily: "Cinzel" }}>Main Weapon: {weapons[0]?.name}</p>
                    <p style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>Up{' ->> '} {weapons[1]?.name} {' <<- '}Up</p>
                    { weapons[2] ? (
                        <p style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>Down{' ->> '} {weapons[2]?.name} {' <<- '}Down</p>
                    ) : ( '' )} 
                    </>
                ) : selectedHighlight === 'Damage' ? (
                    <>
                    <p style={{ color: 'gold', fontSize: "22px", fontWeight: 700, fontFamily: "Cinzel" }}>Damage Style: {damageType[selectedDamageTypeIndex]}</p>
                    <div style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>[Options]: {mapTypes(damageType)}</div>
                    </>
                ) : ( selectedHighlight === 'Prayer' ) ? (
                    <>
                    <p style={{ color: 'gold', fontSize: "22px", fontWeight: 700, fontFamily: "Cinzel" }}>Prayer: {prayers[selectedPrayerIndex]}</p>
                    <div style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>[Options]: {mapTypes(prayers)}</div>
                    </>
                ) : ( '' )
            ) : ( '' ) }
        </div>
    );
};

export default CombatMouseSettings;