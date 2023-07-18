import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FocusAscean from '../../components/FocusAscean/FocusAscean';
import { getFocusAsceanFetch } from '../../game/reducers/communityState';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from '../../components/GameCompiler/GameStore';
import { User } from '../App/App';

interface CommunityProps {
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
};

const CommunityFocus = ({ handleAsceanCreate }: CommunityProps) => {
    const user = useSelector((state: any) => state.user.user) as User;
    const ascean = useSelector((state: any) => state.community.focus) as Player;
    const isLoading = useSelector((state: any) => state.community.isLoading);
    const dispatch = useDispatch();
    const { focusID } = useParams();

    useEffect(() => {
        dispatch(getFocusAsceanFetch(focusID));
    }, [dispatch, focusID]);

    if (isLoading) {
        return (
            <Loading />
        );
    };

    return (
        ascean && (
            <Container>
            <Row className="justify-content-center my-5">
            <FocusAscean
                ascean={ascean}
                key={ascean._id}
                loggedUser={user}
                handleAsceanCreate={handleAsceanCreate}
                />
            </Row>
        </Container>
        )
    );
};

export default CommunityFocus;