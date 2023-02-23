import React from 'react'

interface Props {
    mapState: any;
}

const Coordinates = ({ mapState }: Props) => {
    const CoordinateStyle = {
        zIndex: 100,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gridColumn: '2 / 4',
        gridRow: '1 / 2',
    }
    return (
        <div style={CoordinateStyle}>
            <p style={{ color: 'gold', marginTop: "-26.5%" }}>
            [ X: {mapState.currentTile.x} Y: {mapState.currentTile.y} ]
            </p>
        </div>
    )
}

export default Coordinates