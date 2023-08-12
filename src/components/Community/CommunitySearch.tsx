import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CommunityAscean from './CommunityAscean';

interface SearchProps {
    ascean?: any;
    user?: any;
};

const CommunitySearch = ({ ascean, user }: SearchProps) => {
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
        return (views);
    };
  
    function handleChange(e: any): void {
        e.preventDefault();
        setSearchText(e.target.value.toLowerCase());
    };
  
    useEffect(() => {
          setAllAscean([]);
          if (searchText === '') {
              setAllAscean([]);
              return;
          };
          const filteredResults = ascean.filter((a: any) => a['index'].toLowerCase().includes(searchText));        
          filterAscean(filteredResults);
    }, [searchText, ascean]);

  return (
        <Row className="justify-content-center my-3">
        <h3 style={{ color: '#fdf6d8', textAlign: 'center' }}>Community Feed</h3>
        <Col className="my-3" style={{ maxWidth: '75%' }}>
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
        <div style={{ textAlign: 'center' }}>{displayResults()}</div>
        ) : ( '' ) }
        </Row>
    )
}

export default CommunitySearch