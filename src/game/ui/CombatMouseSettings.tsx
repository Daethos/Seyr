import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCombatSettingFetch } from '../reducers/combatState';
import useGameSounds from '../../components/GameCompiler/Sounds';
import { useKeyEvent } from '../../pages/Story/Story';
import { setScrollEnabled, setSelectedDamageTypeIndex, setSelectedHighlight, setSelectedPrayerIndex, setSelectedWeaponIndex } from '../reducers/gameState';
import { borderColor } from './ItemPopover';

interface CombatMouseSettingsProps {
    damageType: any[];
    weapons: any[];
};

const highlightCycle = { 
    Weapon: 'Damage',
    Damage: 'Prayer',
    Prayer: 'Weapon'
};

const CombatMouseSettings = ({ damageType, weapons }: CombatMouseSettingsProps) => {
    const dispatch = useDispatch();
    const scrollEnabled = useSelector((state: any) => state.game.scrollEnabled);
    const selectedWeaponIndex = useSelector((state: any) => state.game.selectedWeaponIndex);
    const selectedDamageTypeIndex = useSelector((state: any) => state.game.selectedDamageTypeIndex);
    const selectedPrayerIndex = useSelector((state: any) => state.game.selectedPrayerIndex);
    const selectedHighlight = useSelector((state: any) => state.game.selectedHighlight);
    const { playWO } = useGameSounds(0.25);
    const [prayers, setPrayers] = useState([ 'Buff', 'Heal', 'Debuff', 'Damage', 'Avarice', 'Denial', 'Dispel', 'Silence']);
  
    const handleWheelRotation = (event: WheelEvent): void => {
        if (!scrollEnabled) return;
        const direction = event.deltaY > 0 ? 1 : -1; 
    
        if (selectedHighlight === 'Prayer') {
            const newIndex = (selectedPrayerIndex + direction + prayers.length) % prayers.length;
            dispatch(setSelectedPrayerIndex(newIndex));
            dispatch(getCombatSettingFetch({ loadout: prayers[newIndex], type: 'Prayer' }));
            dispatch(setSelectedHighlight('Prayer'));
        } else if (selectedHighlight === 'Damage') {
            const newIndex = (selectedDamageTypeIndex + direction + damageType.length) % damageType.length;
            dispatch(setSelectedDamageTypeIndex(newIndex));
            dispatch(getCombatSettingFetch({ loadout: damageType[newIndex], type: 'Damage' }));
            dispatch(setSelectedHighlight('Damage'));
        } else if (selectedHighlight === 'Weapon') {
            let newIndex = (selectedWeaponIndex + direction + weapons.length) % weapons.length;
            newIndex = direction === 1 ? 2 : 1;
            if (!weapons[newIndex]) return;
            dispatch(setSelectedWeaponIndex(newIndex));
            let one: any[] = [];
            if (weapons.length === 3) one = [weapons?.[newIndex], weapons?.[0], weapons?.[2]._id === weapons?.[newIndex]._id ? weapons?.[1] : weapons?.[2]];
            if (weapons.length === 2) one = [weapons?.[newIndex], weapons?.[0]];
            dispatch(getCombatSettingFetch({ loadout: one, type: 'Weapon' }));
            dispatch(setSelectedHighlight('Weapon'));
        };
        
        playWO();
    };

    const handleShiftKey = (event: KeyboardEvent): void => {
        event.preventDefault();
        if (event.shiftKey) dispatch(setSelectedHighlight(highlightCycle[selectedHighlight as keyof typeof highlightCycle])); 
    };

    const handleToggleScroll = () => dispatch(setScrollEnabled(!scrollEnabled));
    
    const mapTypes = (types: any[]): any[] => {
        let newTypes: any[] = []; 
        for (let i = 0; i < types.length; i++) {
            newTypes.push(
                <div key={i} style={{ display: "inline", color: borderColor(types[i]) }}>
                    {/* {types[i]}{' <-> '}{types[i] === types[types.length - 1] ? types[0] : ''} */}
                    {types[i] !== types[types.length - 1] ? `${types[i]} <-> ` : types[i]}
                </div>
            );
        };
        return newTypes;
    };

    useKeyEvent('keydown', handleShiftKey);
    useKeyEvent('wheel', handleWheelRotation);

    const highlightStyle = {
        color: 'gold', fontSize: "22px", fontWeight: 700, fontFamily: "Cinzel"
    };
    const optionStyle = {
        color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel"
    };

    return (
        <div style={{ position: "absolute", width: "50%", height: "25%", textAlign: "center", left: "24.5%", top: "60%", background: 'transparent', zIndex: 99 }} onMouseDown={handleToggleScroll}>
            { scrollEnabled ? (
                selectedHighlight === 'Weapon' ? (
                    <>
                    <p style={highlightStyle}>Main Weapon: {weapons?.[0]?.name}</p>
                    <p style={optionStyle}>Up{' ->> '} {weapons?.[1]?.name} {' <<- '}Up</p>
                    { weapons?.[2] ? (
                        <p style={optionStyle}>Down{' ->> '} {weapons?.[2]?.name} {' <<- '}Down</p>
                    ) : ( '' )} 
                    </>
                ) : selectedHighlight === 'Damage' ? (
                    <>
                    <p style={highlightStyle}>Damage Style: {damageType[selectedDamageTypeIndex]}</p>
                    <div style={optionStyle}>[Options]: {mapTypes(damageType)}</div>
                    </>
                ) : ( selectedHighlight === 'Prayer' ) ? (
                    <>
                    <p style={highlightStyle}>Prayer: {prayers[selectedPrayerIndex]}</p>
                    <div style={optionStyle}>[Options]: {mapTypes(prayers)}</div>
                    </>
                ) : ( '' )
            ) : ( '' ) }
        </div>
    );
};

export default CombatMouseSettings;