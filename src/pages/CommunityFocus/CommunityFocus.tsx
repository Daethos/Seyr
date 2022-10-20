import './CommunityFocus.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as communityAPI from '../../utils/communityApi'
import * as feelingAPI from '../../utils/feelingApi'
import FocusAscean from '../../components/FocusAscean/FocusAscean';


interface CommunityProps {
    loggedUser?: any;
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
}

const CommunityFocus = ({ loggedUser, handleAsceanCreate }: CommunityProps) => {
    const [ascean, setAscean] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { focusID } = useParams();
    // const [communityFocus, setCommunityFocus] = useState<boolean>(true)

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
            const response = await communityAPI.getOneAscean(focusID);
            console.log(response, ' <- the response in getAscean')
            setAscean(response.data)
            setLoading(false)
            console.log(ascean, '<- Ascean focused upon.')
        } catch (err: any) {
            setLoading(false)
            console.log(err.message);
        }
    }

    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
    }

  return (
    <Container>
        <Row className="justify-content-center my-5">
        <FocusAscean
            ascean={ascean}
            key={ascean?._id}
            addFeeling={addFeeling}
            removeFeeling={removeFeeling}
            loggedUser={loggedUser}
            setAscean={setAscean}
            handleAsceanCreate={handleAsceanCreate}
        />
        </Row>
    </Container>
  )
}

export default CommunityFocus