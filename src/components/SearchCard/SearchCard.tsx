import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import * as communityAPI from '../../utils/communityApi'

interface SearchProps {
    ascean?: any;
    addFeeling?: any;
    removeFeeling?: any;
    loggedUser?: any;
}

const SearchCard = ({ ascean, addFeeling, removeFeeling, loggedUser }: SearchProps) => {
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
                <Col className="results" >
                    <SolaAscean
                        ascean={allAscean[i]}
                        key={allAscean[i].index}
                        addFeeling={addFeeling}
                        removeFeeling={removeFeeling}
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

  return (
    <div>
        <Col md={{span: 8, offset: 2}} className="my-5">
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
        placeholder="Names are case sensitive, beware!" 
        type="text" value={searchText} 
        onChange={handleChange}
    />
    </InputGroup>
    </Col>
    {
        ascean.length > 0
        ? <>{displayResults()}</>
        : ''
    }</div>
  )
}

export default SearchCard