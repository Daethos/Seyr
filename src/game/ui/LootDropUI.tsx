import LootDrop from '../../components/GameCompiler/LootDrop';
import { useEffect, useState } from 'react';
import logWindow from '../images/log_window.png';
import { useDispatch } from 'react-redux';
import { setShowLootOne } from '../reducers/gameState';
import { Equipment } from '../../components/GameCompiler/GameStore';

interface Props {
    gameState: any;
};

export const LootDropUI = ({ gameState }: Props) => {
    const dispatch = useDispatch();
    const [visibleLoot, setVisibleLoot] = useState<any[]>([]);
    useEffect(() => {
        const visible = gameState?.lootDrops?.filter((drop: Equipment) => gameState?.showLootIds?.includes(drop._id));
        if (visible.length === 0) dispatch(setShowLootOne(false));
        setVisibleLoot(visible);
    }, [gameState.showLootIds, gameState.lootDrops]);
    return (
        <div className='story-loot'>
        <img src={logWindow} alt='Log Window' style={{ position: 'absolute' }} />
            <div style={{ display: 'inline-block', position: 'absolute' }} className='story-loot-scroll'>
                { visibleLoot.length > 0 ? (
                    visibleLoot.map((lootDrop: any, index: number) => { 
                        return (
                            <LootDrop key={index} story={true} lootDrop={lootDrop} ascean={gameState.player} />
                        );
                     })
                ) : ( '' ) }
            </div> 
        </div>
    );
};