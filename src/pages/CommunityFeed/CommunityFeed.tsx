import './CommunityFeed.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as communityAPI from '../../utils/communityApi'
import * as feelingAPI from '../../utils/feelingApi'
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import SearchCard from '../../components/SearchCard/SearchCard'


interface CommunityProps {
    loggedUser: any;
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
    handleLogout: () => void;
    handleAsceanCreate?: any;
}

const CommunityFeed = ({ loggedUser, setUser, handleSignUpOrLogin, handleLogout, handleAsceanCreate }: CommunityProps) => {
    const [ascean, setAscean] = useState<any>([]);
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
        <SearchCard ascean={ascean} communityFeed={communityFeed} key={ascean._id} />
        {ascean.map((a: any) => {
            return (
                <SolaAscean
                    ascean={a}
                    key={a._id}
                    communityFeed={communityFeed}
                    addFeeling={addFeeling}
                    removeFeeling={removeFeeling}
                    loggedUser={loggedUser}
                    setAscean={setAscean}
                    handleAsceanCreate={handleAsceanCreate}
                />
            )
        })}
    </Container>
  )
}

export default CommunityFeed