import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import * as asceanAPI from '../../utils/asceanApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import HomeSettings from '../../components/HomeSettings/HomeSettings';

interface UserProps {
    loggedUser: any;
    setCreateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
}

const UserProfile = ({ loggedUser, setCreateSuccess, handleAsceanCreate }: UserProps) => {
  const [accordionState, setAccordionState] = useState<string>('Tight');
  const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAscean();
  }, []);

  async function getAscean() {
    setLoading(true);
    try {
      const response = await asceanAPI.getAllAscean();
      setAsceanVaEsai([...response.data.reverse()]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    };
  };

  async function saveAsceanMiddleware(saveAscean: any) {
    try {
      await handleAsceanCreate(saveAscean);
      await getAscean();
    } catch (err: any) {
      console.log(err.message, "Error Adding Middleware");
    };
  };

  async function deleteAscean(e: any) {
    e.preventDefault();
    try {
      await asceanAPI.deleteAscean(e.currentTarget.value);
      setCreateSuccess(true);
      await getAscean();
    } catch (err: any) {
      console.log(err.message, 'Error Deleting Ascean');
    };
  };

  function accordionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setAccordionState(e.target.value);
  };

  if (loading) {
    return (
      <Loading />
    );
  };

  return (
    <Container>
      <HomeSettings ascean={asceanVaEsai} loggedUser={loggedUser} userProfile={true} accordionState={accordionState} accordionChange={accordionChange} />
        { asceanVaEsai.length > 0 ? 
          asceanVaEsai.map((ascean: { _id: React.Key | null | undefined; }) => {
            return (
              <SolaAscean
                ascean={ascean}
                key={ascean._id}
                userProfile={true}
                handleAsceanCreate={saveAsceanMiddleware}
                deleteAscean={deleteAscean}
                accordion={accordionState}
              />
            )
          })
        : 
          <p className='' style={{ textAlign: 'center', color: '#fdf6d8' }}>
            No Characters? No worries ^_^ <br />
            Here's a Quick Overview of the NavBar to Catch You Up<br />
            Castle: Home Page, holds your characters and their basic information.<br />
            Knight: New Character, let's you create a new one to use in their own story.<br />
            Scarecrow: Story Mode, here you can duel, level, and progress your character.<br />
            Scroll: Community Feed, shows characters from other players in additon to high score rankings for the story mode.<br />
            Chat Bubbles: Direct Messages, whether 1-to-1 or group chat, you can create or access conversations and their history.<br />
            Double-Axes: PvP Arena, choose a character and create or join an existing room, once two players have joined you can duel each other ad nauseum.<br />
          </p>
        }
    </Container>
  );
};

export default UserProfile;