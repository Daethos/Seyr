
import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS, GameData, Player } from './GameStore';
import { MAP_ACTIONS, MapData } from './WorldStore';
import Loading from '../Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { CombatData } from './CombatStore';

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
  const underlayRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const closeEverything = () => {
    gameDispatch({ type: GAME_ACTIONS.SET_UNDERLAY_CONTENT, payload: '' });
    gameDispatch({ type: GAME_ACTIONS.CLOSE_UNDERLAY, payload: false });
  };
  return (
    <Overlay target={underlayRef} show={loadingUnderlay}>
      <div className='d-flex align-items-center justify-content-center'
      style={{
        position: 'fixed',
        top: '17.5%',
        left: 0,
        width: '100%',
        height: '100%%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        zIndex: 9999,
        border: "0.2em solid purple",
      }}>
        <h6 className='overlay-content' style={ gameState?.underlayContent !== '' ? { animation: "fade 1s ease-in 0.5s forwards" } : { animation: "" } }>
          {gameState?.underlayContent}
        </h6>          
        <Button variant='' style={{ float: 'right', color: 'red', fontSize: "24px", marginTop: "40vh", marginLeft: "90vw", zIndex: 9999 }} onClick={closeEverything}>X</Button>
        </div>
    </Overlay>
  );
};

export default GameplayUnderlay;