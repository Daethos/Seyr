
import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS, GameData, Player } from './GameStore';
import { MapData } from './WorldStore';
import { CombatData } from './CombatStore';
import AsceanGrapplingCard from './AsceanGrapplingCard';
import useGameSounds from './Sounds';

interface UnderlayProps {
  ascean: Player;
  mapState: MapData;
  mapDispatch: React.Dispatch<any>;
  gameState: GameData;
  gameDispatch: React.Dispatch<any>;
  state: CombatData;
  dispatch: React.Dispatch<any>;
  loadingUnderlay: boolean;
};

const GameplayUnderlay = ({ ascean, state, dispatch, gameState, gameDispatch, mapState, mapDispatch, loadingUnderlay }: UnderlayProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [grapplingSequence, setGrapplingSequence] = useState<any>([]);
  const [newSequence, setNewSequence] = useState<boolean>(false);
  const underlayRef = useRef(null);
  const { playCombatRound } = useGameSounds(gameState.soundEffectVolume);
  
  useEffect(() => {
    console.log(grapplingSequence, 'Grappling Sequence');
    if (grapplingSequence.length > 4) handleGrapple(grapplingSequence);
  }, [grapplingSequence]);


  const closeEverything = () => {
    gameDispatch({ type: GAME_ACTIONS.SET_UNDERLAY_CONTENT, payload: '' });
    gameDispatch({ type: GAME_ACTIONS.CLOSE_UNDERLAY, payload: false });
  };

  const handleGrapple = async (sequence: typeof grapplingSequence) => {
    console.log(sequence, "Handling Grappling Sequence!");
    setTimeout(() => {
      setGrapplingSequence([]);
    }, 1500);
    // const response = await gameApi.grapple(sequence);
    // console.log(response, "Grappling Response");
  };

  function addToSequence(move: string) {
    playCombatRound();
    setGrapplingSequence((grapplingSequence: any) => {
      if (grapplingSequence.length === 4) {
        grapplingSequence.shift();
      }
      return [...grapplingSequence, move];
    });
  };

  function playGrappling() {
    setNewSequence(true);
  };

  function getGrapplingSequence() {
    return (
      <>
        {grapplingSequence.map((move: string, index: number) => {
          const cleanMove = move.charAt(0).toUpperCase() + move.replace(/-/g, ' ').slice(1);
          return (
            <p key={index} className="grappling-sequence" style={{ animation: "fade 1s ease-in 0.5s forwards" }}>{cleanMove}</p>
          );
        })}
      </>
    );
  };

  return (
    <Overlay target={underlayRef} show={loadingUnderlay}>
      <div className='d-flex align-items-center justify-content-center'
      style={{
        position: 'fixed',
        top: '17.5%',
        width: '100%',
        height: '100%%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        zIndex: 9999,
        border: "0.2em solid purple",
        color: "gold"
      }}>
        
        { gameState?.miniGameSevan ? (
          <>
            <AsceanGrapplingCard 
              weapon_one={ascean.weapon_one}
              weapon_two={ascean.weapon_two}
              weapon_three={ascean.weapon_three}
              shield={ascean.shield}
              helmet={ascean.helmet}
              chest={ascean.chest}
              legs={ascean.legs}
              amulet={ascean.amulet}
              ring_one={ascean.ring_one}
              ring_two={ascean.ring_two}
              trinket={ascean.trinket}
              damage={state.playerDamaged} 
              loading={loading}
              grapplingSequence={grapplingSequence}
              setGrapplingSequence={setGrapplingSequence}
              addToSequence={addToSequence}
              newSequence={newSequence}
              setNewSequence={setNewSequence}
            />

            <div style={{ color: "gold" }}>
              {getGrapplingSequence()}
              { grapplingSequence.length > 3 ? (
                  <Button variant='' style={{ float: 'right', color: 'red', fontWeight: 600, zIndex: 9999 }} onClick={playGrappling}>Grapple</Button>
              ) : ( null ) }
            </div>
          </>
        ) : ( 
          <>
          <h6 className='overlay-content' style={ gameState?.underlayContent !== '' ? { animation: "fade 1s ease-in 0.5s forwards" } : { animation: "" } }>
            {gameState?.underlayContent}
          </h6>
          <Button variant='' style={{ float: 'right', color: 'red', fontSize: "24px", marginTop: "40vh", marginLeft: "90vw", zIndex: 9999 }} onClick={closeEverything}>X</Button>
          </>
        ) }          
        </div>
    </Overlay>
  );
};

export default GameplayUnderlay;