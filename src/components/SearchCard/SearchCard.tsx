import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SolaAscean from '../../components/SolaAscean/SolaAscean';

interface SearchProps {
    ascean?: any;
    loggedUser?: any;
    userProfile?: boolean;
};

const SearchCard = ({ ascean, loggedUser, userProfile }: SearchProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [result, setResult] = useState<any>(ascean);

    async function filterAscean(results: any) {
        let finalResults = [];
        for (let i = 0; i < results.length; i++){
            if (finalResults.length < ascean.length) {
                finalResults.push(results[i]);
            };
        };
        setResult(finalResults);
    };

    function displayResults() {
        let views = [];
        for (let i = 0; i < result.length; i++) {
            views.push(
                <SolaAscean ascean={result[i]} key={result[i].index} userProfile={userProfile} />
            );
        };
        return (views);
    };

    function handleChange(e: any) {
        e.preventDefault();
        setSearchText(e.target.value.toLowerCase());
    };

    useEffect(() => {
        setResult([]);
        if (searchText === '') {
            setResult([]);
            return;
        };
        const filteredResults = ascean.filter((a: any) => a['index'].toLowerCase().includes(searchText));     
        filterAscean(filteredResults);
        console.log(searchText, '<- the changing search text');
    }, [searchText, ascean]);

    return (
        <React.Fragment>
            <Col md={{ span: 8, offset: 2 }} className="my-4">
        <InputGroup className="bg-black">
        <InputGroup.Text className="bg-black">
        <img 
            src={loggedUser.photoUrl} 
            alt="User" 
            style={{ maxWidth: '5vw', maxHeight: '5vh' }}
        />
        </InputGroup.Text>
        <Form.Control 
            style={{ textAlign: 'center' }}
            className="headerSearchInput bg-black text-white" 
            placeholder="Search Through Your Ascean Here!" 
            type="text" value={searchText} 
            onChange={handleChange}
        />
        </InputGroup>
        </Col>
        { ascean.length > 0 && (
            <>{displayResults()}</>
        ) }
        </React.Fragment>
    );
};

export default SearchCard;