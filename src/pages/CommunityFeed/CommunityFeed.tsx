import './CommunityFeed.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as communityAPI from '../../utils/communityApi'
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
    const [allAscean, setAllAscean] = useState<any[]>(ascean);
    const [isSaved, setIsSaved] = useState(true)
    const [communityFeed, setCommunityFeed] = useState<boolean>(true)

    async function filterAscean(results: any) {
        console.log(results, '<- Results in filterMonsters')
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

    function handleChange(event: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) {
        event.preventDefault()
        setSearchText(event.target.value);
    }

    useEffect(() => {
        setAllAscean([]);
        if (searchText === '') {
            setAllAscean([]);
            return
        }
        const filteredResults = ascean.filter((a: any) => a['name'].includes(searchText))        
        filterAscean(filteredResults)
        console.log(searchText, '<- the changing search text')
        return filteredResults
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
            placeholder="What Character are you looking for?" 
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
        {ascean.map((a: { _id: React.Key | null | undefined; }) => {
            return (
                <SolaAscean
                    ascean={a}
                    key={a._id}
                    communityFeed={communityFeed}
                    />
            )
        })}
    </Container>
  )
}

export default CommunityFeed