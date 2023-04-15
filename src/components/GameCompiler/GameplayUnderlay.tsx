
import { useState, useRef, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, CSSProperties } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS, GameData, Player } from './GameStore';
import { MapData } from './WorldStore';
import { ACTIONS, CombatData } from './CombatStore';
import AsceanGrapplingCard from './AsceanGrapplingCard';
import useGameSounds from './Sounds';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface GrapplingProps {
  sequence: any;
};

interface GrapplingMoveStyle extends CSSProperties {
  '--move-index': number;
  '--num-moves': number;
};

function DisplayGrapplingSequence({ sequence }: GrapplingProps) {

  return (
    <div className="grappling-sequence-container">
      {sequence.map((move: any, index: number) => (
        <div key={index} className="grappling-move" style={{ animationDelay: `${move.index * 0.75}s`, '--move-index': index + 0.5 } as GrapplingMoveStyle}>
          {move.move}
        </div>
      ))}
    </div>
  );
}


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
  const [generatedSequence, setGeneratedSequence] = useState<any>([]);
  const [bankedSequence, setBankedSequence] = useState<any>([]);
  const [grapplingSequence, setGrapplingSequence] = useState<any>([]);
  const [newSequence, setNewSequence] = useState<boolean>(false);
  const [grapplingContent, setGrapplingContent] = useState<string>('');
  const [positionsGained, setPositionsGained] = useState<number>(0);
  const [grapplingWin, setGrapplingWin] = useState<boolean>(false);
  const underlayRef = useRef(null);
  const { playCombatRound } = useGameSounds(gameState.soundEffectVolume);
  const grapplingMoves = ['right-arm', 'left-arm', 'right-leg', 'left-leg', 'right-hand', 'left-hand', 'right-foot', 'left-foot', 'head', 'upper-torso', 'lower-torso'];

  useEffect(() => {
    console.log(grapplingSequence, 'Grappling Sequence');
    if (grapplingSequence.length > 4) handleGrapple(grapplingSequence);
  }, [grapplingSequence]);

  useEffect(() => {
    if (positionsGained === 3) {
      setGrapplingWin(true);
      dispatch({ type: ACTIONS.SET_GRAPPLING_WIN, payload: true });
      gameDispatch({ type: GAME_ACTIONS.SET_MINIGAME_SEVAN, payload: false });
    };
  }, [positionsGained]);

  useEffect(() => {
    const winTimer = setTimeout(() => {
      setGeneratedSequence([]);
      setBankedSequence([]);
      setGrapplingSequence([]);
      setGrapplingContent('');
      setPositionsGained(0);
      setGrapplingWin(false);
      closeEverything();
    }, 1500);

    return () => clearTimeout(winTimer);
  }, [grapplingWin]);

  const closeEverything = () => {
    gameDispatch({ type: GAME_ACTIONS.SET_UNDERLAY_CONTENT, payload: '' });
    gameDispatch({ type: GAME_ACTIONS.CLOSE_UNDERLAY, payload: false });
  };

  const handleGrapple = async (sequence: typeof grapplingSequence) => {
    // const response = await gameApi.grapple(sequence);
    // console.log(response, "Grappling Response");
    const newBankedSequence = bankedSequence.map((move: any) => move.move);
    console.log(sequence, newBankedSequence, "Starting Grappling Sequence!");
    const areArraysEqual = sequence.every((element: any, index: string | number) => element === newBankedSequence[index]);
    if (areArraysEqual) {
      setGrapplingContent('You have successfully gained position!');
      setTimeout(() => {
        setPositionsGained((positionsGained: number) => positionsGained + 1);
        setGrapplingSequence([]);
      }, 1500);
    } else {
      setGrapplingContent('You have failed to gain position!');
      setTimeout(() => {
        setGrapplingSequence([]);
      }, 1500);
    };
  };

  function createGrapplingSequence() {
    console.log('Creating Sequence!');
    const sequence = [];
    for (let i = 0; i < 4; i++) {
      const randomMove = grapplingMoves[Math.floor(Math.random() * grapplingMoves.length)];
      const cleanMove = randomMove.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      const delayTime = i * 1000; 
      sequence.push({ move: cleanMove, delay: delayTime, index: i });
    };
    setGeneratedSequence(sequence);
    setBankedSequence(sequence);
    setTimeout(() => {
      setGeneratedSequence([]);
    }, 4000);
  };
  

  function addToSequence(move: string) {
    playCombatRound();
    const cleanMove = move.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    setGrapplingSequence((grapplingSequence: any) => {
      if (grapplingSequence.length === 4) {
        grapplingSequence.shift();
      }
      return [...grapplingSequence, cleanMove];
    });
  };

  function getGrapplingSequence() {
    return (
      <>
        {grapplingSequence.map((move: string, index: number) => {
          return (
            <p key={index} className="grappling-sequence" style={{ animation: "fade 1s ease-in 0.5s forwards" }}>{move}</p>
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
          <Row>
            <Col xs={ 3 } sm={ 3 } md={ 3 } lg={ 3 } xl={ 3 } xxl={ 3 } className="my-4" style={{ marginLeft: "5%", marginRight: "-2.5%", textAlign: "center" }}>
            <br />Welcome to grappling, {ascean.name}! 
            <br /><br />
            Advantages: {positionsGained}
            <br /><br />
            {grapplingContent}

            <br /><br />
            {grapplingWin ? ( 'You win!' ) : ( ' ')}
            </Col>
            
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

            <Col xs={ 3 } sm={ 3 } md={ 3 } lg={ 3 } xl={ 3 } xxl={ 3 } style={{ color: "gold", marginLeft: "10%" }} className="my-4">
              <br />
              {getGrapplingSequence()}
              <Button variant='' style={{ color: 'green', fontWeight: 600, zIndex: 9999 }} onClick={createGrapplingSequence}>Get Sequence</Button>
              { grapplingSequence.length === 4 ? (
                  <Button variant='' style={{ color: 'red', fontWeight: 600, zIndex: 9999 }} onClick={() => handleGrapple(grapplingSequence)}>Grapple</Button>
              ) : ( null ) }
            </Col>
            <DisplayGrapplingSequence sequence={generatedSequence} />
          </Row>
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