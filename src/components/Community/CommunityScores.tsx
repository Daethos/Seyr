import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

interface Props {
    highScores: any;
};

const CommunityScores = ({ highScores }: Props) => {
    return (
        <h6 style={{ textAlign: 'center' }}className='mb-5'>
        <Accordion>
        <Accordion.Item eventKey="0">
        <Accordion.Header>Hardcore High Scores [Public]</Accordion.Header>
        <Accordion.Body style={{ overflow: 'auto', height: 50 + 'vh' }}>
        <Table responsive style={{ color: '#fdf6d8' }}>
          <thead>
            <tr>
              <th>Ascean</th>
              <th>Name</th>
              <th>Score</th>
              <th>Mastery</th>
            </tr>
          </thead>
        { highScores.map((ascean: any, index: number) => {
          return (
            <tbody key={index}>
            { index < 10 && (
              <tr style={{ verticalAlign: 'middle' }}>
                <td>
                <img src={ascean[0].photoUrl} alt={ascean[0].ascean}
                  style={{ width: '5vw', borderRadius: '50%', border: '2px solid purple', marginLeft: '0px' }} />
                </td>
                <td style={{ fontSize: '14px' }}>
                  <Nav.Link as={NavLink} to={`/CommunityFeed/` + ascean[0]._id}>{ascean[0].ascean}</Nav.Link>
                </td>
                <td style={{ fontSize: '14px' }}>{ascean[0].score}</td>
                <td style={{ fontSize: '14px' }}>{ascean[0].mastery}</td>
              </tr>
             )}
            </tbody>
          )
        })}
        </Table>
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </h6>
    );
};

export default CommunityScores;