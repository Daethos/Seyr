import { useEffect, useState } from 'react';
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

    const handleWheelClick = () => {
      setScrollEnabled((prev) => !prev);
    }; 
  
    const handleWheelRotation = (event: WheelEvent) => {
        event.preventDefault();
        if (!scrollEnabled) return;
        const direction = event.deltaY > 0 ? 1 : -1; // Check the deltaY value of the wheel event to determine the rotation direction
    
        // Update the selected index based on the direction and handle boundary cases
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
        } else {
            const newIndex = (selectedWeaponIndex + direction + weapons.length) % weapons.length;
            console.log(weapons[newIndex]);
            setSelectedWeaponIndex(newIndex);
            setWeaponOrder( { target: { value: weapons[newIndex].name }} );
            setSelectedHighlight('Weapon');
        };
    };

    const handleShiftKey = (event: KeyboardEvent) => {
        event.preventDefault();
        console.log(event, "shift key pressed");
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
        <div style={{ position: "absolute", width: "40vw", height: "30vw", textAlign: "center", marginLeft: "30vw", marginTop: "45vh", background: 'transparent', alignItems: "center" }} onMouseDown={handleToggleScroll}>
            { scrollEnabled ? (
                selectedHighlight === 'Weapon' ? (
                    <p style={{ color: 'gold', fontSize: "20px", fontWeight: 700 }}>Current Main Weapon: {weapons[0]?.name}</p>
                ) : selectedHighlight === 'Damage' ? (
                    <p style={{ color: 'gold', fontSize: "20px", fontWeight: 700 }}>Current Damage Style: {damageType[selectedDamageTypeIndex]}</p>
                ) : ( selectedHighlight === 'Prayer' ) ? (
                    <p style={{ color: 'gold', fontSize: "20px", fontWeight: 700 }}>Current Prayer: {prayers[selectedPrayerIndex]}</p>
                ) : ( '' )
            ) : ( '' ) }
        </div>
    );
};

export default CombatMouseSettings;