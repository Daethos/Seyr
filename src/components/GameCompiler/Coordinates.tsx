import React from 'react'

interface Props {
    mapState: any;
}

const Coordinates = ({ mapState }: Props) => {
    const CoordinateStyle = {
        // zIndex: 100,
        height: '100%',
        marginLeft: "-5vw",
        marginRight: "auto",
        marginTop: "96.75vh",
        display: 'flex',
        justifyContent: 'center',
        gridColumn: '2 / 4',
    }
    return (
        <div style={CoordinateStyle}>
            <p style={{ color: 'gold', 
            }}>
            [ X: {mapState?.currentTile?.x} Y: {mapState?.currentTile?.y} ]
            </p>
        </div>
    )
}

export default Coordinates