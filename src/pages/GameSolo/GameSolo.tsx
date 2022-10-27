import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as gameAPI from '../../utils/gameApi'

interface GameProps {
    user: any;
}

const GameSolo = ({ user }: GameProps) => {
    const [ascean, setAscean] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const { asceanID } = useParams();

    const getAscean = useCallback(async () => {
        setLoading(true);
        try {
            const response = await asceanAPI.getOneAscean(asceanID);
            console.log(response, '<- Response in Getting an Ascean to Edit')
            setAscean(response.data);
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean])


    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
    }
    return (
        <Container fluid>
            Landing Page to Play the Game Solo
        </Container>
    )
}

export default GameSolo