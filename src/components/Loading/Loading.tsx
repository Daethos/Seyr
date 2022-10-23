import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col'
import './Loading.css';
import { Row } from 'react-bootstrap';

interface Props {
    NavBar?: boolean
}
export default function Loading({ NavBar }: Props) {
    // Try a different size than xs={12} for perhaps more interesting resutls! Maybe other colors
    return (
        <Row className="justify-content-center my-5">
            {
                NavBar
                ? <Spinner animation="border" variant="warning" id="loading-spinner-nav" />
                : <Col className="stat-block wide">
                <hr className="orange-border" />
                <div className="section-left">
                <div className="actions">
                    <h3>Character</h3>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={7} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={4} />{' '}
                        <Placeholder xs={5} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={8} bg="danger" />
                        <Placeholder xs={4} bg="danger" />  <Placeholder bg="danger" xs={2} /> <Placeholder xs={4} bg="danger" />
                    </Placeholder><br />
                    <Spinner animation="grow" variant="danger" id="loading-spinner-pic" className='my-5' />
                    <h3>Statistics</h3>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />
                        <Placeholder bg="danger" xs={6} /> <Placeholder bg="danger" xs={5} />{' '}
                    </Placeholder>
                    
                
                
                
                    <h3>Attributes</h3>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={5} /> <Placeholder bg="danger" xs={2} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={6} bg="danger" />  <Placeholder bg="danger" xs={2} /> <Placeholder xs={4} bg="danger" />
                        <Placeholder bg="danger" xs={6} /> 
                    </Placeholder>
                    <h3>Origin</h3>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />
                        <Placeholder bg="danger" xs={6} /> <Placeholder bg="danger" xs={5} />{' '}<Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={6} />
                    </Placeholder>
                    <h3>Communual</h3>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={2} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />
                        <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={6} /> <Placeholder bg="danger" xs={5} />{' '}<Placeholder xs={5} bg="danger" />
                    </Placeholder>
    
                <svg height="5" width="100%" className="tapered-rule my-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                </div>
                </div>
    
    
                <div className="section-right">
                <div className="actions">
                <h3 className='mb-2'>Eccentricities & Equipment</h3>
                <div className='property-block equip-loading'>
                <Placeholder  animation="glow">
                    <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="light" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="light" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                
                <Placeholder  animation="glow">
                <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                
                <Placeholder  animation="glow">
                <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                
                <Placeholder  animation="glow">
                <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="light" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                <Placeholder  animation="glow">
                        <Placeholder size="lg" bg="danger" xs={3} /> <Placeholder size="lg" bg="light" xs={3} /> <Placeholder size="lg" bg="danger" xs={3} />
                </Placeholder>
                </div>
                </div>
                <div className="actions">
                <h3>Combat Statistics</h3>
                <div className='property-block'>
                <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />{' '}
                        <Placeholder bg="danger" xs={6} />  <Placeholder bg="danger" xs={5} />{' '}
                    </Placeholder>
                
                <svg height="5" width="100%" className="tapered-rule my-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />
                        <Placeholder bg="danger" xs={6} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />{' '}
                        <Placeholder bg="danger" xs={6} />
                    </Placeholder>
                <svg height="5" width="100%" className="tapered-rule my-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />{' '}
                        <Placeholder bg="danger" xs={6} /> <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={5} />{' '}<Placeholder bg="danger" xs={4} />
                    </Placeholder>
                <svg height="5" width="100%" className="tapered-rule my-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />{' '}
                        <Placeholder bg="danger" xs={6} /> <Placeholder bg="danger" xs={5} />{' '}<Placeholder bg="danger" xs={5} /> <Placeholder bg="danger" xs={3} />
                    </Placeholder>
                    <svg height="5" width="100%" className="tapered-rule my-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                    <Placeholder  animation="glow">
                        <Placeholder bg="danger" xs={3} /> <Placeholder bg="danger" xs={4} /> <Placeholder bg="danger" xs={3} />{' '}
                        <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={4} bg="danger" />{' '}
                        <Placeholder bg="danger" xs={6} /> <Placeholder bg="danger" xs={5} />{' '}<Placeholder bg="danger" xs={3} /> <Placeholder xs={2} bg="danger" />  <Placeholder bg="danger" xs={3} /> <Placeholder xs={2} bg="danger" />
                    </Placeholder>
                </div>
                </div>
                </div>
    
                <hr className="orange-border bottom" />
            </Col>
            }
        
        </Row>
    );
}