interface Props {
    mapState: any;
};

const Coordinates = ({ mapState }: Props) => {

    return (
        <div className='coordinates'>
            <p style={{ color: 'gold', 
            }}>
            [ X: {mapState?.currentTile?.x} Y: {mapState?.currentTile?.y} ]
            </p>
        </div>
    );
};

export default Coordinates;