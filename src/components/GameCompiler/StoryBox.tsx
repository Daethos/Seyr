import React from 'react'

interface StoryProps {
    ascean: any;
    mapState: any;
    storyContent: string;
}

const StoryBox = ({ ascean, mapState, storyContent }: StoryProps) => {
    const article = ['a','e','i','o','u'].includes(mapState?.currentTile?.content?.[0]) ? "an" : "a";

    return (
        <div className='story-box'>
            <p className='story-box-content'>
                [ X: {mapState?.currentTile?.x} Y: {mapState?.currentTile?.y} ] | {mapState?.currentTile?.content?.charAt(0).toUpperCase() + mapState?.currentTile?.content?.slice(1)}
                <br />
                {
                    mapState?.currentTile?.x === 0 && mapState?.currentTile?.y === 0 ?
                        `You are at the beginning of your journey, standing around in some part of the ${mapState?.province} region, without recollection of how you got there, yet here you are. So, what is there to do when you don't know what to do?`
                    : storyContent !== '' ?
                        storyContent
                    :
                        `You move forward and encounter ${mapState?.currentTile?.content === 'nothing' ? 'nothing, as expected. Yet still there seems more to explore' : `${article} ${mapState?.currentTile?.content}! \n What will you do?`}.`
                }
            </p>
        </div>
    );
};

export default StoryBox;