import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS } from './GameStore';
import { MAP_ACTIONS } from './WorldStore';
import Loading from '../Loading/Loading';

interface Props {
    ascean: any;
    mapState: any;
    mapDispatch: React.Dispatch<any>;
    loadingOverlay: boolean;
    generateWorld: (mapName: string) => Promise<void>;
    overlayContent: string;
    saveWorld: () => Promise<void>;
    loadingContent: boolean;
    gameDispatch: React.Dispatch<any>;
    getAsceanCoords: (x: number, y: number, map: any) => Promise<any>;
};

const GameplayOverlay = ({ ascean, mapState, gameDispatch, mapDispatch, loadingOverlay, generateWorld, overlayContent, saveWorld, loadingContent, getAsceanCoords }: Props) => {
    const [mapName, setMapName] = useState<string>(`${(ascean?.name || '').trim().replace(/\s+/g, '_')}_${ascean?.maps?.length + 1 < 10 ? '0' + (ascean?.maps?.length + 1) : ascean?.maps?.length + 1}`);
    const overlayRef = useRef(null);
    const article = ['a', 'e', 'i', 'o', 'u'].includes(ascean?.maps?.[0]?.currentTile?.content.charAt(0).toLowerCase()) ? 'an' : 'a';

    const closeEverything = () => {
        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false })
    };

    return (
        <Overlay target={overlayRef} show={loadingOverlay}>
            <div
            className='d-flex align-items-center justify-content-center'
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: '',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                zIndex: 9999,
                border: "0.2em solid purple",
            }}
            >
                <h6 className='overlay-content' style={ overlayContent !== '' ? { animation: "fade 1s ease-in 0.5s forwards" } : { animation: "" } }>
                {overlayContent}
                </h6>
            { !loadingContent && overlayContent === '' ?
                <div style={{ textAlign: 'center' }}>
                    <h5 style={{ color: 'gold', textShadow: '1.5px 1.5px 1.5px goldenrod' }}>
                    Welcome to the Ascea, {ascean?.name}!
                    Have you generated a world, yet? Simply press the button, or input a name you prefer.
                    </h5><br />
                    <input type='text' value={mapName} onChange={(e: any) => setMapName(e.target.value)} />
                    <br />
                    <Button variant='' style={{ color: '#fdf6d8', fontVariant: 'small-caps', outline: 'none' }} onClick={() => generateWorld(mapName)}>Generate World Environment: <br /> 
                    <p style={{ color: 'gold' }}>
                    {mapName}
                    </p>
                    </Button>
                    <br />
                    {   mapState?.generatingWorld ?
                        <Loading NavBar={true} />
                        :
                        mapState.name !== '' ?
                        <>
                        <p style={{ color: '#fdf6d8', fontSize: "13.5px" }}>
                        Map Name: {mapState?.name} | Province: {mapState?.province} <br />
                        Current Position: x: {mapState?.currentTile?.x}, y: {mapState?.currentTile?.y} | Content: {mapState?.currentTile?.content?.charAt(0).toUpperCase() + mapState?.currentTile?.content?.slice(1)}<br /><br />
                        Cave: {mapState?.contentCounts?.cave} | City: {mapState?.contentCounts?.city} | 
                        Dungeon: {mapState?.contentCounts?.dungeon}<br /> 
                        Enemy: {mapState?.contentCounts?.enemy} | 
                        Hazard: {mapState?.contentCounts?.hazard} |
                        Landmark: {mapState?.contentCounts?.landmark}<br /> 
                        Nothing: {mapState?.contentCounts?.nothing} | 
                        NPC: {mapState?.contentCounts?.npc} |
                        Phenomena: {mapState?.contentCounts?.phenomena}<br /> 
                        Ruins {mapState?.contentCounts?.ruins} |
                        Treasure: {mapState?.contentCounts?.treasure} <br /> 
                        Weather: {mapState?.contentCounts?.weather} |
                        Wonder: {mapState?.contentCounts?.wonder}<br />
                        <br />
                        This is where you're starting, and as expected, nothing is happening, but that's okay because you can move around and explore this world. 
                        {' '}Let's imagine a chunk of this province is a grid, and you're in the middle of it. You can navigate with the joystick and change that, encountering adventure in any direction.<br /><br /> 
                        {' '}You may find the world you're in to be lacking, but over time more will occur than last experienced, as this lightweight design is to simulate a Phaser canvas for coherence of gameplay.
                        {' '}And to that end this will help me test the occurrence, quality, and variety of content you will experience throughout. It won't save, so each time you generate a world, it'll be different.
                        Once you're ready, click your name.
                        </p>
                        <Button variant='' onClick={saveWorld}>
                        <h1 style={{ color: 'gold', textShadow: '2px 2px 2px darkgoldenrod', fontSize: "36px" }}>{ascean.name}</h1>
                        </Button>
                        </>
                        : ('')    
                    }
                </div>
        : '' }
        {
            overlayContent !== '' && loadingContent ?
            <Button variant='' style={{ float: 'right', color: 'red', fontSize: "36px", marginTop: "92.5vh", marginLeft: "90vw", zIndex: 9999 }} onClick={closeEverything}>X</Button>
            : ''
        }
            </div>
        </Overlay>
    )
}

export default GameplayOverlay