import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import FeelingsCard from '../FeelingsCard/FeelingsCard';


interface Props {
    ascean?: any;
    loggedUser?: any;
};

const CommunityAscean = ({ ascean, loggedUser }: Props) => {
    return (
        <Col className="stat-block wide">
            <hr className="orange-border" />
            <div className="creature-heading">
            <Link to={`/CommunityFeed/${ascean._id}`} style={{ textDecoration: 'none' }}><h1>{ascean.name}</h1></Link>
            <div className="property-line">
                <h4>Level</h4>
                <p> {ascean.level}</p>{' | '}
                <h4>Mastery</h4>
                <p> {ascean.mastery}</p>
            </div>
            <h2>{ascean.description}</h2>
            <Link to={`/CommunityFeed/${ascean._id}`} style={{ textDecoration: 'none' }}>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.name} className='dialog-picture' />
            </Link>
            <h4 className='my-1' style={{ color: "red", fontFamily: "Cinzel", fontWeight: 700 }}> 
                {ascean.hardcore ? "Permament Death" : ""}</h4><br />
            </div> 
            <div className="actions" style={{ marginTop: '-6%', marginBottom: '-1%' }}><h3> </h3></div>
            <FeelingsCard ascean={ascean} loggedUser={loggedUser} />
            <hr className='orange-border bottom' />
        </Col>
    );
};

export default CommunityAscean;