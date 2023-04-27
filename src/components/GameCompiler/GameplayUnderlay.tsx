
import { useState, useRef, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, CSSProperties } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS, GameData, Player, Enemy } from './GameStore';
import { MapData } from './WorldStore';
import { ACTIONS, CombatData } from './CombatStore';
import AsceanGrapplingCard from './AsceanGrapplingCard';
import useGameSounds from './Sounds';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface BodyPart {
  [x: string]: any;
  name: string;
  statValue: number;
};

type BodyPartStats = {
  [key: string]: (player: any) => number;
}

const bodyPartStats: BodyPartStats = {
  'right-hand': (player) => player.agility,
  'right-arm': (player) => (player.strength + player.agility) / 2,
  'right-leg': (player) => (player.strength + player.agility) / 2,
  'right-foot': (player) => (player.strength + player.agility) / 2,
  'head': (player) => player.achre,
  'upper-torso': (player) => (player.strength + (player.caeren * 0.5) + (player.constitution * 0.5)),
  'lower-torso': (player) => (player.strength + (player.agility * 0.5) + (player.constitution * 0.5)),
  'left-hand': (player) => player.agility,
  'left-arm': (player) => (player.strength + player.agility) / 2,
  'left-leg': (player) => (player.strength + player.agility) / 2,
  'left-foot': (player) => (player.strength + player.agility) / 2,
};

function calculateBodyPartStat(player: Player, enemy: Enemy, bodyPart: BodyPart, bodyPartStats: BodyPartStats) {
  const statFunction = bodyPartStats[bodyPart.name];
  if (!statFunction) {
    throw new Error(`No stat function found for body part: ${bodyPart.name}`);
  };

  const statValue = statFunction(player);
  const playerBodyPart = {
    name: bodyPart.name,
    statValue: statValue,
  };
  const enemyStatValue = statFunction(enemy);
  const enemyBodyPart = {
    name: bodyPart.name,
    statValue: enemyStatValue,
  };

  return {
    player: playerBodyPart,
    opponent: enemyBodyPart,
  };
};

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
        <div key={index} className="grappling-move" style={{ animationDelay: `${move.index * 1}s`, '--move-index': index + 0.5 } as GrapplingMoveStyle}>
          {move.move}
        </div>
      ))}
    </div>
  );
}


interface UnderlayProps {
  ascean: Player;
  enemy: Enemy;
  mapState: MapData;
  mapDispatch: React.Dispatch<any>;
  gameState: GameData;
  gameDispatch: React.Dispatch<any>;
  state: CombatData;
  dispatch: React.Dispatch<any>;
  loadingUnderlay: boolean;
};

const GameplayUnderlay = ({ ascean, enemy, state, dispatch, gameState, gameDispatch, mapState, mapDispatch, loadingUnderlay }: UnderlayProps) => {
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
  const [bodyParts, setBodyParts]= useState<BodyPart[]>([
    { name: 'head', statValue: 0 },
    { name: 'right-hand', statValue: 0 },
    { name: 'left-hand', statValue: 0 },
    { name: 'right-arm', statValue: 0 },
    { name: 'left-arm', statValue: 0 },
    { name: 'right-leg', statValue: 0 },
    { name: 'left-leg', statValue: 0 },
    { name: 'right-foot', statValue: 0 },
    { name: 'left-foot', statValue: 0 },
    { name: 'upper-torso', statValue: 0 },
    { name: 'lower-torso', statValue: 0 },
  ]);
  const [enemyBodyParts, setEnemyBodyParts] = useState([
    { name: 'head', statValue: 0 },
    { name: 'right-hand', statValue: 0 },
    { name: 'left-hand', statValue: 0 },
    { name: 'right-arm', statValue: 0 },
    { name: 'left-arm', statValue: 0 },
    { name: 'right-leg', statValue: 0 },
    { name: 'left-leg', statValue: 0 },
    { name: 'right-foot', statValue: 0 },
    { name: 'left-foot', statValue: 0 },
    { name: 'upper-torso', statValue: 0 },
    { name: 'lower-torso', statValue: 0 },
  ]);

  useEffect(() => {
    console.log(bodyParts, enemyBodyParts, "Body Parts");
  }, [bodyParts, enemyBodyParts])

  useEffect(() => {
    if (!enemy) return;
    setBodyParts(bodyParts.map((bodyPart) => {
      const { player, opponent } = calculateBodyPartStat(ascean, enemy, bodyPart, bodyPartStats);
      return player;
    }));
    setEnemyBodyParts(enemyBodyParts.map((bodyPart) => {
      const { player, opponent } = calculateBodyPartStat(ascean, enemy, bodyPart, bodyPartStats);
      return opponent;
    }));
  }, [ascean, enemy])

  // useEffect(() => {
  //   console.log(grapplingSequence, 'Grappling Sequence');
  //   if (grapplingSequence.length > 4) handleGrapple(grapplingSequence);
  // }, [grapplingSequence]);

  useEffect(() => {
    if (positionsGained === 2) {
      setGrapplingWin(true);
      dispatch({ type: ACTIONS.SET_GRAPPLING_WIN, payload: true });
      gameDispatch({ type: GAME_ACTIONS.SET_MINIGAME_SEVAN, payload: false });
    };
  }, [positionsGained]);

  useEffect(() => {
    const winTimer = setTimeout(() => {
      closeEverything();
      setGeneratedSequence([]);
      setBankedSequence([]);
      setGrapplingSequence([]);
      setGrapplingContent('');
      setPositionsGained(0);
      setGrapplingWin(false);
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
      if (positionsGained === 0) setGrapplingContent('You have successfully gained position!');
      if (positionsGained === 1) {
        setGrapplingContent('You have successfully worned down and submitted your opponent!');
      }
      setTimeout(() => {
        setPositionsGained((positionsGained: number) => positionsGained + 1);
        setGrapplingSequence([]);
        setGrapplingContent('');
      }, 1500);
    } else {
      setGrapplingContent('You have failed to gain position!');
      setTimeout(() => {
        setGrapplingSequence([]);
        setGrapplingContent('');
      }, 1500);
    };
  };

  function createGrapplingSequence() {
    console.log('Creating Sequence!');
    let iterations = 0;
    if (positionsGained === 0) iterations = 4;
    if (positionsGained === 1) iterations = 6;
    if (positionsGained === 2) iterations = 8;
    const sequence = [];
    for (let i = 0; i < iterations; i++) {
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
    let moves = 0;
    if (positionsGained === 0) moves = 4;
    if (positionsGained === 1) moves = 6;
    if (positionsGained === 2) moves = 8;
    setGrapplingSequence((grapplingSequence: any) => {
      if (grapplingSequence.length === moves) {
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
      <div className='game-underlay'
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: '17.5%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        zIndex: 9999,
        border: "0.2em solid purple",
        color: "gold"
      }}>
        
        { gameState?.miniGameSevan ? (
          <>
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
              bankedSequence={bankedSequence}
            />

            <Col xs={ 3 } sm={ 3 } md={ 3 } lg={ 3 } xl={ 3 } xxl={ 3 } style={{ color: "gold", marginLeft: "10%" }} className="my-4">
              <br />
              {getGrapplingSequence()}
              <Button variant='' style={{ color: 'green', fontWeight: 600, zIndex: 9999 }} onClick={createGrapplingSequence}>Witness Se'vas's Path</Button>
              { grapplingSequence.length >= 4 ? (
                <Button variant='' style={{ color: 'red', fontWeight: 600, zIndex: 9999 }} onClick={() => handleGrapple(grapplingSequence)}>Initiate Grapple</Button>
                ) : ( null ) }
            </Col>
            <DisplayGrapplingSequence sequence={generatedSequence} />
            <Col xs={ 3 } sm={ 3 } md={ 3 } lg={ 3 } xl={ 3 } xxl={ 3 } className="my-4" style={{ marginLeft: "5%", marginRight: "-2.5%", textAlign: "center" }}>
              </Col>
            <AsceanGrapplingCard 
              weapon_one={enemy.weapon_one}
              weapon_two={enemy.weapon_two}
              weapon_three={enemy.weapon_three}
              shield={enemy.shield}
              helmet={enemy.helmet}
              chest={enemy.chest}
              legs={enemy.legs}
              amulet={enemy.amulet}
              ring_one={enemy.ring_one}
              ring_two={enemy.ring_two}
              trinket={enemy.trinket}
              damage={state.computerDamaged} 
              loading={loading}
              grapplingSequence={grapplingSequence}
              setGrapplingSequence={setGrapplingSequence}
              addToSequence={addToSequence}
              newSequence={newSequence}
              setNewSequence={setNewSequence}
              bankedSequence={bankedSequence}
              />
            <Button variant='' style={{ float: 'right', color: 'red', fontSize: "24px", marginLeft: "40vw", zIndex: 9999 }} onClick={closeEverything}>X</Button>
          </Row>
          </>
        ) : ( 
          <>
            <h6 className='overlay-content' style={ gameState?.underlayContent !== '' ? { animation: "fade 1s ease-in 0.5s forwards" } : { animation: "" } }>
              {gameState?.underlayContent}
            </h6>
            <Button variant='' className='exit-button' style={{ float: 'right', color: 'red', marginTop: "40vh", zIndex: 9999 }} onClick={closeEverything}>X</Button>
          </>
        ) }          
        </div>
    </Overlay>
  );
};

export default GameplayUnderlay;