interface Props {
    mapState: any;
};

const Content = ({ mapState }: Props) => {
    const CoordinateStyle = {
        marginTop: "86.75vh",
        height: '100%',
        marginLeft: "auto",
        marginRight: "-5vw",
        display: 'flex',
        justifyContent: 'center',
        gridColumn: '2 / 4',
    };
    return (
        <div style={CoordinateStyle}>
            <p style={{ color: 'gold', 
            }}>
            [ Content: {mapState?.currentTile?.content?.charAt(0).toUpperCase() + mapState?.currentTile?.content?.slice(1)} ]
            </p>
        </div>
    );
};

export default Content;