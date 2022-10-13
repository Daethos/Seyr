import './CommunityFeed.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as communityAPI from '../../utils/communityApi'
import * as feelingAPI from '../../utils/feelingApi'
import SolaAscean from '../../components/SolaAscean/SolaAscean'

interface CommunityProps {
    loggedUser: any;
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
    handleLogout: () => void;
}

const CommunityFeed = ({ loggedUser, setUser, handleSignUpOrLogin, handleLogout }: CommunityProps) => {
    const [ascean, setAscean] = useState<any>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [allAscean, setAllAscean] = useState<any>(ascean);
    const [isSaved, setIsSaved] = useState(true)
    const [communityFeed, setCommunityFeed] = useState<boolean>(true)
    const [error, setError] = useState<string>('');

    async function addFeeling(asceanID: any, feeling: string) {
        console.log('Ascean ID: ', asceanID, 'Feeling to Create: ', feeling)
        try {
            const response = await feelingAPI.createFeeling(asceanID, feeling);
            console.log(response.data, 'Response in Adding a Feeling')
            getAscean()
        } catch (err: any) {
            console.log(err.message, '<- Error adding a feeling!')
        }
    }

    async function removeFeeling(asceanID: any, feeling: string) {
        console.log('Ascean ID: ', asceanID, 'Feeling to Remove: ', feeling)
        try {
            const response = await feelingAPI.removeFeeling(asceanID, feeling);
            console.log(response.data, 'Response in Removing a Feeling')
            getAscean()
        } catch (err: any) {
            console.log(err.message, '<- Error adding a feeling!')
        }
    }
    

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
        //return finalResults
    }

    function displayResults() {
        let views = [];
        for (let i = 0; i < allAscean.length; i++) {
            views.push(
                <Col className="results" >
                    <SolaAscean
                        ascean={allAscean[i]}
                        key={allAscean[i]._id}
                        communityFeed={communityFeed}
                    />
                </Col>
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

    useEffect(() => {
        getAscean()
    }, [])

    async function getAscean() {
        try {
            const response = await communityAPI.getEveryone();
            console.log(response, ' <- the response in getAscean')
            setAscean([...response.data].reverse())
        } catch (err: any) {
            console.log(err.message);
        }
    }

  return (
    <Container>
        <Col md={{span: 8, offset: 2}} className="my-5">
        <InputGroup className="bg-black">
        <InputGroup.Text className="bg-black">
        </InputGroup.Text>
        <Form.Control 
            className="headerSearchInput bg-black text-white" 
            placeholder="Ascean are cap sensitive, beware!" 
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
        {ascean.map((a: any) => {
            return (
                <SolaAscean
                    ascean={a}
                    key={a._id}
                    communityFeed={communityFeed}
                    addFeeling={addFeeling}
                    removeFeeling={removeFeeling}
                    loggedUser={loggedUser}
                />
            )
        })}
    </Container>
  )
}

export default CommunityFeed