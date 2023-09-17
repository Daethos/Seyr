import './CommunityFeed.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Loading from '../../components/Loading/Loading'; 
import CommunityAscean from '../../components/Community/CommunityAscean';
import { getCommunityAsceanFetch } from '../../game/reducers/communityState';
import CommunitySearch from '../../components/Community/CommunitySearch';
// import CommunityScores from '../../components/Community/CommunityScores';

const CommunityFeed = () => { 
  const user = useSelector((state: any) => state.user.user);
  const ascean = useSelector((state: any) => state.community.ascean);
//   const highScores = useSelector((state: any) => state.community.scores);
  const isLoading = useSelector((state: any) => state.community.isLoading); 
  const dispatch = useDispatch(); 

  useEffect(() => { 
      dispatch(getCommunityAsceanFetch());
  }, [dispatch]); 

  if (isLoading) {
      return (
          <Loading Chat={true} />
      );
  };

  return (
    <Container fluid>
        <CommunitySearch ascean={ascean} user={user} /> 
        <Row className="justify-content-center my-2">
        {/* <CommunityScores highScores={highScores} /> */}
        {ascean.map((a: any) => {
          return (
            <CommunityAscean ascean={a} key={a._id} loggedUser={user} />
        )})}
        </Row>
    </Container>
  );
};

export default CommunityFeed;