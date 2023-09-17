import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

interface Tile {
    x: number;
    y: number;
    content: string;
    color: string;
    visited: boolean;
};

interface StoryProps {
    ascean: any;
    mapState: any;
    storyContent: string;
    moveTimer: number;
    interactPhenomena: () => Promise<void>;
};

const StoryBox = ({ ascean, mapState, storyContent, moveTimer, interactPhenomena }: StoryProps) => {
    const [currentTileContent, setCurrentTileContent] = useState<Tile>({ x: 0, y: 0, content: '', color: '', visited: false });
    const article = ['a','e','i','o','u'].includes(mapState?.currentTile?.content?.[0]) ? "an" : "a";

    useEffect(() => {
        setCurrentTileContent(mapState.currentTile);
    }, [mapState]);

    const tileStyle = {
        color: mapState?.currentTile?.color,
        marginTop: '5px',
    };

    return (
        <div className='story-box'>
            <p className='story-box-content'>
                [ X: {mapState?.currentTile?.x} Y: {mapState?.currentTile?.y} ] | {mapState?.currentTile?.content?.charAt(0).toUpperCase() + mapState?.currentTile?.content?.slice(1)} | ({moveTimer})
                <br /><br />
                { mapState?.currentTile?.x === 0 && mapState?.currentTile?.y === 0 ? (
                    `You are at the beginning of your journey, standing around in some part of the ${mapState?.province} region, without recollection of how you got there, yet here you are. So, what is there to do when you don't know what to do?`
                ) : storyContent !== '' ? (
                    <>
                        {storyContent} <br />
                        { currentTileContent?.content === 'cave' ? (
                            <Button variant='' style={tileStyle}>Enter Cave</Button>
                        ) : currentTileContent?.content === 'dungeon' ? (
                            <Button variant='' style={tileStyle}>Enter Dungeon</Button>
                        ) : currentTileContent?.content === 'landmark' ? (
                            <Button variant='' style={tileStyle}>Enjoy Landmark</Button>
                        ) : currentTileContent?.content === 'phenomena' ? (
                            <Button variant='' style={tileStyle} onClick={interactPhenomena}>Peer Into Phenomena</Button>
                        ) : currentTileContent?.content === 'ruins' ? (
                            <Button variant='' style={tileStyle}>Scour Ruins</Button>
                        ) : currentTileContent?.content === 'wonder' ? (
                            <Button variant='' style={tileStyle}>Inspect Wonder</Button>    
                        ) : ( '' ) }
                        <br /><br />
                    </>
                ) : mapState?.context !== '' ? (
                    mapState?.context
                ) : (
                    `You move forward and encounter ${mapState?.currentTile?.content === 'nothing' ? 'nothing, as expected. Yet still there seems more to explore.' : `${article} ${mapState?.currentTile?.content}! \n What will you do?`}`
                ) }
            </p>
        </div>
    );
};

export default StoryBox;