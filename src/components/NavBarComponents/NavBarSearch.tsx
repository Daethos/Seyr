import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import FriendsList from '../FriendsList/FriendsList';

interface SearchProps {
    friends?: any;
    user: any;
    handleClose: () => void;
}

const NavBarSearch = ({ friends, user, handleClose }: SearchProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [allFriends, setAllFriends] = useState<any>(friends);
    console.log(allFriends, '<- ')
    async function filterFriends(results: any) {
        console.log(results, '<- Results in filtering the Ascean')
        console.log(results.length, '<- The amount of search results!')
        let finalResults = [];
            for (let i = 0; i < results.length; i++){
                if (finalResults.length < friends.length) {
                        finalResults.push(results[i])
                }        
        }
        setAllFriends(finalResults)
    }

    function displayResults() {
        let views = [];
        for (let i = 0; i < allFriends.length; i++) {
            views.push(
                <FriendsList user={user} friend={allFriends[i]} handleClose={handleClose} key={allFriends[i]._id} />
            )
        }
        return (views)
    }

    function handleChange(e: any) {
        e.preventDefault()
        setSearchText(e.target.value);
    }

    useEffect(() => {
        setAllFriends([]);
        if (searchText === '') {
            setAllFriends([]);
            return
        }
        const filteredResults = friends.filter((a: any) => a['username'].includes(searchText))        
        filterFriends(filteredResults)
        console.log(searchText, '<- the changing search text')
    }, [searchText])

  return (
    <React.Fragment>
        <Col md={{span: 8, offset: 2}} className="my-5">
    <InputGroup className="bg-black">
    <InputGroup.Text className="bg-black">
    <img 
        src={user.photoUrl} 
        alt="User" 
        style={{maxWidth: 5 + 'vw', maxHeight: 5 + 'vh'}}
    />
    </InputGroup.Text>
    <Form.Control 
        className="headerSearchInput bg-black text-white" 
        placeholder="Names Are NOT Case Sensitive, Beware!" 
        type="text" value={searchText} 
        onChange={handleChange}
    />
    </InputGroup>
    </Col>
    {
        friends.length > 0
        ? <>{displayResults()}</>
        : ''
    }
    </React.Fragment>
  )
}

export default NavBarSearch