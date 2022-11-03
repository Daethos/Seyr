import './CommunityFocus.css'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as communityAPI from '../../utils/communityApi'
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

    

   const getAscean = useCallback(async () => {
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
   }, [focusID])

    useEffect(() => {
        getAscean()
    }, [focusID, getAscean])

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
            key={ascean._id}
            loggedUser={loggedUser}
            setAscean={setAscean}
            handleAsceanCreate={handleAsceanCreate}
        />
        </Row>
    </Container>
  )
}

export default CommunityFocus