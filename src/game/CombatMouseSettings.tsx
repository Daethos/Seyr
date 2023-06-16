import { useState } from 'react';
import { usePhaserEvent } from './sceneComponents/HostScene';

interface CombatMouseSettingsProps {
    setPrayerBlessing: (prayer: any) => void;
    setDamageType: (damageType: any) => void;
    damageType: any[];
    setWeaponOrder: (weapon: any) => void;
    weapons: any[];
    state: any;
};

const CombatMouseSettings = ({ setPrayerBlessing, setDamageType, damageType, setWeaponOrder, weapons, state }: CombatMouseSettingsProps) => {
    const [prayers, setPrayers] = useState([ 'Buff', 'Heal', 'Debuff', 'Damage' ]);
    const [selectedWeaponIndex, setSelectedWeaponIndex] = useState<number>(0);
    const [selectedDamageTypeIndex, setSelectedDamageTypeIndex] = useState<number>(0);
    const [selectedPrayerIndex, setSelectedPrayerIndex] = useState<number>(0);
    const [selectedHighlight, setSelectedHighlight] = useState<string>('');
    const [scrollEnabled, setScrollEnabled] = useState(false);
  
    const handleWheelRotation = (event: WheelEvent) => {
        if (!scrollEnabled) return;
        console.log(event.deltaY, "deltaY");
        const direction = event.deltaY > 0 ? 1 : -1; // Check the deltaY value of the wheel event to determine the rotation direction
    
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
            setSelectedWeaponIndex(newIndex);
            setWeaponOrder( { target: { value: weapons[newIndex].name } } );
            setSelectedHighlight('Weapon');
        };
    };

    const handleShiftKey = (event: KeyboardEvent) => {
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

    const handleToggleScroll = () => {
        setScrollEnabled((prevScrollEnabled) => !prevScrollEnabled);
    };
    
    const mapTypes = (types: any[]) => {
        let newTypes: any[] = []; 
        for (let i = 0; i < types.length; i++) {
            newTypes.push(
                <div key={i} style={{ display: "inline" }}>
                    {/* {types[i]}{' <--> '}{types[i] === types[types.length - 1] ? types[0] : types[i + 1]}{' | '} */}
                    {types[i]}{' <-> '}{types[i] === types[types.length - 1] ? types[0] : ''}
                </div>
            );
        };
        return newTypes;
    };

    usePhaserEvent('keydown', handleShiftKey);
    usePhaserEvent('wheel', handleWheelRotation);

    return (
        <div style={{ position: "absolute", width: "50%", height: "25%", textAlign: "center", left: "24.5%", top: "60%", background: 'transparent', zIndex: 99 }} onMouseDown={handleToggleScroll}>
            { scrollEnabled ? (
                selectedHighlight === 'Weapon' ? (
                    <>
                    <p style={{ color: 'gold', fontSize: "22px", fontWeight: 700, fontFamily: "Cinzel" }}>Main Weapon: {weapons[0]?.name}</p>
                    <p style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>Up{' ->> '} {weapons[1]?.name} {' <<- '}Up</p>
                    <p style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>Down{' ->> '} {weapons[2]?.name} {' <<- '}Down</p>
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