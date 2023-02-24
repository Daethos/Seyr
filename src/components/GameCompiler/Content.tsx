import React from 'react';

interface Props {
    mapState: any;
};

const Content = ({ mapState }: Props) => {
    const CoordinateStyle = {
        // zIndex: 100,
        marginTop: "87.5vh",
        height: '100%',
        marginLeft: "auto",
        marginRight: "",
        display: 'flex',
        justifyContent: 'center',
        gridColumn: '2 / 4',
    };
    return (
        <div style={CoordinateStyle}>
            <p style={{ color: 'gold', 
            marginTop: "-5%" 
            }}>
            [ Content: {mapState?.currentTile?.content?.charAt(0).toUpperCase() + mapState?.currentTile?.content?.slice(1)} ]
            </p>
        </div>
    );
};

export default Content;