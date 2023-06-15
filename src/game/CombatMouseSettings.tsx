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

    usePhaserEvent('keydown', handleShiftKey);
    usePhaserEvent('wheel', handleWheelRotation);

    return (
        <div style={{ position: "absolute", width: "40%", height: "32.5%", textAlign: "center", left: "30%", top: "65%", background: 'transparent', zIndex: 99 }} onMouseDown={handleToggleScroll}>
            { scrollEnabled ? (
                selectedHighlight === 'Weapon' ? (
                    <>
                    <p style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>{weapons[1]?.name}</p>
                    <p style={{ color: 'gold', fontSize: "18px", fontWeight: 700, fontFamily: "Cinzel" }}>Current Main Weapon: {weapons[0]?.name}</p>
                    <p style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>{weapons[2]?.name}</p>
                    </>
                ) : selectedHighlight === 'Damage' ? (
                    <>
                    <p style={{ color: 'gold', fontSize: "18px", fontWeight: 700, fontFamily: "Cinzel" }}>Current Damage Style: {damageType[selectedDamageTypeIndex]}</p>
                    <div style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>Options: {damageType.map((type: string, index: number) => <div style={{ display: "inline" }} key={index}>{type}{' '}</div>)}</div>
                    </>
                ) : ( selectedHighlight === 'Prayer' ) ? (
                    <>
                    <p style={{ color: 'gold', fontSize: "18px", fontWeight: 700, fontFamily: "Cinzel" }}>Current Prayer: {prayers[selectedPrayerIndex]}</p>
                    <div style={{ color: '#fdf6d8', fontSize: "14px", fontWeight: 700, fontFamily: "Cinzel" }}>Options: {prayers.map((type: string, index: number) => <div style={{ display: "inline" }} key={index}>{type}{' '}</div>)}</div>
                    </>
                ) : ( '' )
            ) : ( '' ) }
        </div>
    );
};

export default CombatMouseSettings;