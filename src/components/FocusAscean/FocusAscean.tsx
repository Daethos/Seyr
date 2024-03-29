import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import { Link } from "react-router-dom";
import FeelingsCard from '../FeelingsCard/FeelingsCard';
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler';
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler';
import { Symbols } from '../SolaAscean/SolaAscean';

interface Props {
    ascean: any;
    loggedUser: any;
    handleAsceanCreate: ((newAscean: Object) => Promise<void>);
};

const FocusAscean = ({ ascean, loggedUser, handleAsceanCreate }: Props) => {

    return (
        <Col className="stat-block wide">
        <hr className="orange-border" />
        <div className="section-left">
            <div className="actions">
                <Link to={`/${ascean?.user?.username}`} style={{ textDecoration: 'none' }}>
                    <h3>
                        <img 
                            src={ascean?.user?.photoUrl ? ascean?.user?.photoUrl : ('')} 
                            alt={ascean?.user?.username ? ascean?.user?.username : ('')} 
                            id="community-pic"
                        />
                        {ascean?.user?.username ? ascean.user.username : ('')} 
                    </h3>
                </Link>
            </div>
               
            <div className="creature-heading">
                <h1>{ascean.name}</h1>
                <h2>{ascean.description}</h2>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} id="ascean-pic" />
            </div>
            {Symbols.space}
            <div className="property-line first">
                <h4>Level</h4>
                <p> {ascean.level}</p>
            </div>
            <div className="property-line">
                <h4>High Score</h4>
                <p> {ascean.high_score}</p>
            </div>
            <div className="property-line">
                <h4>Mastery</h4>
                <p> {ascean.mastery}</p>
            </div>
            <div className="property-line">
                <h4>Faith</h4>
                <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
            </div>
            {Symbols.space}
            <div className="top-stats">
                <AsceanAttributeCompiler ascean={ascean} key={ascean._id} />
            {Symbols.space}
            </div>
            <FeelingsCard loggedUser={loggedUser} ascean={ascean} key={ascean._id} />
            <div className='actions'>
                <h3>Eccentricities & Equipment</h3>
            </div>
            <div className='property-block'>
            <AsceanImageCard
                weapon_one={ascean.weapon_one}
                weapon_two={ascean.weapon_two}
                weapon_three={ascean.weapon_three}
                shield={ascean.shield}
                helmet={ascean.helmet}
                chest={ascean.chest}
                legs={ascean.legs}
                amulet={ascean.amulet}
                ring_one={ascean.ring_one}
                ring_two={ascean.ring_two}
                trinket={ascean.trinket}
            />
            </div>
        
        </div>
        <div className="section-right">
            <div className="actions">
            <AsceanStatCompiler ascean={ascean} key={ascean._id} />
            </div>
        </div>
        <hr className='orange-border bottom' />
        </Col>
    );
};

export default FocusAscean;