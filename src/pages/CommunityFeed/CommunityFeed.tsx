import './CommunityFeed.css'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from '../../components/Loading/Loading'; 
import * as communityAPI from '../../utils/communityApi'
import CommunityAscean from '../../components/CommunityAscean/CommunityAscean'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

interface CommunityProps {
    loggedUser: any;
}

const CommunityFeed = ({ loggedUser }: CommunityProps) => {
    const [ascean, setAscean] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [highScores, setHighScores] = useState<any>([]);

    useEffect(() => {
        getAscean()
    }, [])

    function compareScores(a: any, b: any) {
        // console.log(a[0].ascean, ': ', a[0].score, ' vs ', b[0].ascean, ': ', b[0].score)
        return a[0].score - b[0].score;
       
    }

    async function getAscean() {
        setLoading(true);
        try {
            const response = await communityAPI.getEveryone();
            console.log(response, ' <- the response in getAscean');
            const scores = await response.data.map((ascean: any, index: number) => {
                // console.log(ascean, index, 'What is this?')
                let scoreData = {
                  ascean: ascean.name,
                  score: ascean.high_score,
                  key: index,
                  _id: ascean._id,
                  mastery: ascean.mastery,
                  photoUrl: process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'
                }
                let newArr = []
                newArr.push(scoreData)
                return (
                  newArr
                )
              })
              const sortedScores = await scores.sort(compareScores)
              // console.log(sortedScores, 'Sorted Scores ?!')
              setHighScores(sortedScores.reverse())
            setAscean([...response.data].reverse());
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message);
        }
    }
    //xs={ 1 } sm={ 1 } md={ 1 } lg={ 2 } xl={ 3 } xxl={ 4 } 

    const [searchText, setSearchText] = useState<string>('');
    const [allAscean, setAllAscean] = useState<any>(ascean);

    async function filterAscean(results: any) {
        console.log(results, '<- Results in filtering the Ascean')
        console.log(results.length, '<- The amount of search results!')
        let finalResults = [];
            for (let i = 0; i < results.length; i++){
                if (finalResults.length < ascean.length) {
                        finalResults.push(results[i])
                }        
        }
        setAllAscean(finalResults)
    }

    function displayResults() {
        let views = [];
        for (let i = 0; i < allAscean.length; i++) {
            views.push(
                <CommunityAscean ascean={allAscean[i]} key={allAscean[i]._id} />
            )
        }
        return (views)
    }

    function handleChange(e: any) {
        e.preventDefault()
        setSearchText(e.target.value);
    }

    useEffect(() => {
        setAllAscean([]);
        if (searchText === '') {
            setAllAscean([]);
            return
        }
        const filteredResults = ascean.filter((a: any) => a['index'].includes(searchText))        
        filterAscean(filteredResults)
        console.log(searchText, '<- the changing search text')
    }, [searchText, ascean])

    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
    }

  return (
    <Container fluid>
        <Row className="justify-content-center my-3">
        <h3 style={{ color: '#fdf6d8', textAlign: 'center' }}>Community Feed</h3>
        <Col md={{span: 8, offset: 2}} className="my-3">
            <InputGroup className="bg-black">
            <InputGroup.Text className="bg-black">
            <img 
                src={loggedUser.photoUrl} 
                alt="User" 
                style={{maxWidth: 5 + 'vw', maxHeight: 5 + 'vh'}}
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
            {
                ascean.length > 0
                ? <>{displayResults()}</>
                : ''
            }
            {/* <CommunitySearch ascean={ascean} loggedUser={loggedUser} /> */}
        </Row>
        <Row className="justify-content-center my-2">
            <h6 style={{ textAlign: 'center' }}className='mb-5' >
        <Accordion>
        <Accordion.Item eventKey="0">
        <Accordion.Header>High Scores [Public] :</Accordion.Header>
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
            <tbody>
            { index < 10 ? 
              <tr key={index}>
                <td>
                <img src={ascean[0].photoUrl} alt={ascean[0].ascean}
                  style={{ height: 40 + 'px', width: 40 + 'px', borderRadius: 50 + '%', border: 1 + 'px solid purple', marginLeft: -0 + 'px' }} />
                </td>
                <td style={{ padding: 5 + '%', fontSize: 14 + 'px' }}>
                  <Nav.Link as={NavLink} to={`/CommunityFeed/` + ascean[0]._id} className='' >{ascean[0].ascean}</Nav.Link>
                </td>
                <td style={{ padding: 5 + '%', fontSize: 14 + 'px' }}>{ascean[0].score}</td>
                <td style={{ padding: 5 + '%', fontSize: 14 + 'px' }}>{ascean[0].mastery}</td>
              </tr>
            : '' }
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
                    loggedUser={loggedUser}
                />
        )})}
        </Row>
    </Container>
  )
}

export default CommunityFeed