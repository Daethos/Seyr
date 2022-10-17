import './CommunityFeed.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from '../../components/Loading/Loading'; 
import * as communityAPI from '../../utils/communityApi'
import * as feelingAPI from '../../utils/feelingApi'
import CommunityAscean from '../../components/CommunityAscean/CommunityAscean'
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
    const [loading, setLoading] = useState(true);
    // const [communityFeed, setCommunityFeed] = useState<boolean>(true)

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
        setLoading(true);
        try {
            const response = await communityAPI.getEveryone();
            console.log(response, ' <- the response in getAscean')
            setAscean([...response.data].reverse())
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message);
        }
    }
    //xs={ 1 } sm={ 1 } md={ 1 } lg={ 2 } xl={ 3 } xxl={ 4 } 

    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
    }

  return (
    <Container fluid>
        <Row>
        <SearchCard ascean={ascean} communityFeed={true} key={loggedUser._id} addFeeling={addFeeling} removeFeeling={removeFeeling} />
        </Row>

        <Row className="justify-content-center my-5">
        
        {ascean.map((a: any) => {
            return (
                <CommunityAscean
                    ascean={a}
                    key={a.index}
                    communityFeed={true}
                    addFeeling={addFeeling}
                    removeFeeling={removeFeeling}
                    loggedUser={loggedUser}
                    setAscean={setAscean}
                    handleAsceanCreate={handleAsceanCreate}
                />
            )
        })}
       
        </Row>
    
    </Container>
  )
}

export default CommunityFeed