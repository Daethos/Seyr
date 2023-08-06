import './CommunityFeed.css';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../components/Loading/Loading'; 
import CommunityAscean from '../../components/CommunityAscean/CommunityAscean';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getCommunityAsceanFetch } from '../../game/reducers/communityState';
import { useDispatch, useSelector } from 'react-redux';

const CommunityFeed = () => { 
    const user = useSelector((state: any) => state.user.user);
    const ascean = useSelector((state: any) => state.community.ascean);
    const highScores = useSelector((state: any) => state.community.scores);
    const isLoading = useSelector((state: any) => state.community.isLoading); 
    const dispatch = useDispatch(); 

    useEffect(() => { 
        dispatch(getCommunityAsceanFetch());
    }, [dispatch]); 

    const [searchText, setSearchText] = useState<string>('');
    const [allAscean, setAllAscean] = useState<any>(ascean);

    async function filterAscean(results: any): Promise<void> {
      let finalResults = [];
        for (let i = 0; i < results.length; i++) {
          if (finalResults.length < ascean.length) {
            finalResults.push(results[i]);
          };        
        };
      setAllAscean(finalResults);
    };

    function displayResults(): JSX.Element[] {
        let views = [];
        for (let i = 0; i < allAscean.length; i++) {
            views.push(
                <CommunityAscean ascean={allAscean[i]} key={allAscean[i]._id} />
            );
        };
        return (views)
    };

    function handleChange(e: any): void {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    useEffect(() => {
        setAllAscean([]);
        if (searchText === '') {
            setAllAscean([]);
            return;
        };
        const filteredResults = ascean.filter((a: any) => a['index'].includes(searchText));        
        filterAscean(filteredResults);
    }, [searchText, ascean]);

    if (isLoading) {
        return (
            <Loading Chat={true} />
        );
    };

  return (
    <Container fluid>
        <Row className="justify-content-center my-3">
        <h3 style={{ color: '#fdf6d8', textAlign: 'center' }}>Community Feed</h3>
        <Col md={{span: 8, offset: 2}} className="my-3">
            <InputGroup className="bg-black">
            <InputGroup.Text className="bg-black">
            <img 
                src={user.photoUrl} 
                alt="User" 
                style={{ maxWidth: '5vw', maxHeight: '5vh' }}
            />
            </InputGroup.Text>
            <Form.Control 
                className="headerSearchInput bg-black text-white" 
                placeholder="Names Are Case Sensitive, Beware!" 
                type="text" value={searchText} 
                onChange={handleChange}
            />
            </InputGroup>
            </Col>
            { ascean.length > 0 ? (
              <>{displayResults()}</>
            ) : ( '' ) }
        </Row>
        <Row className="justify-content-center my-2">
            <h6 style={{ textAlign: 'center' }}className='mb-5' >
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
        {ascean.map((a: any) => {
          return (
            <CommunityAscean
                ascean={a}
                key={a._id}
                loggedUser={user}
            />
        )})}
        </Row>
    </Container>
  );
};

export default CommunityFeed;