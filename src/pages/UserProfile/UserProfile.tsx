import './UserProfile.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import * as asceanAPI from '../../utils/asceanApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import HomeSettings from '../../components/HomeSettings/HomeSettings';
import Player from '../../game/entities/Player';
import { getUserAsceanFetch } from '../../game/reducers/userState';
import { User } from '../App/App';

interface UserProps {
    setCreateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
};

const UserProfile = ({ setCreateSuccess, handleAsceanCreate }: UserProps) => {
  const [accordionState, setAccordionState] = useState<string>('Tight');
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user) as User;
  const asceans = useSelector((state: any) => state.user.ascean) as Player[];
  const hasAscean = useSelector((state: any) => state.user.hasAscean);
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsceanFetch());
    if (!hasAscean) navigate('/Ascean');
  }, [dispatch, hasAscean, navigate]);

  async function saveAsceanMiddleware(saveAscean: any) {
    try {
      await handleAsceanCreate(saveAscean);
      dispatch(getUserAsceanFetch());
    } catch (err: any) {
      console.log(err.message, "Error Adding Middleware");
    };
  };

  async function deleteAscean(e: any) {
    e.preventDefault();
    try {
      await asceanAPI.deleteAscean(e.currentTarget.value);
      setCreateSuccess(true);
      dispatch(getUserAsceanFetch());
    } catch (err: any) {
      console.log(err.message, 'Error Deleting Ascean');
    };
  };

  function accordionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setAccordionState(e.target.value);
  };

  if (isLoading) {
    return (
      <Loading Chat={true} />
    );
  };

  return (
    <Container>
      <HomeSettings ascean={asceans} loggedUser={user} userProfile={true} accordionState={accordionState} accordionChange={accordionChange} />
        { asceans.length > 0 ? (
          asceans.map((ascean: Player, index: number) => {
            return (
              <SolaAscean
                ascean={ascean}
                key={index}
                userProfile={true}
                handleAsceanCreate={saveAsceanMiddleware}
                deleteAscean={deleteAscean}
                accordion={accordionState}
              />
            )
          })
        ) : ( '' ) }
    </Container>
  );
};

export default UserProfile;