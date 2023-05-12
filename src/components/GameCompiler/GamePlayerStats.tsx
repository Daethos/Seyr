import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
    attributes: any;
    magicalDefense: number;
    magicalPosture: number;
    physicalDefense: number;
    physicalPosture: number;
    player: any;
    spectator?: boolean;
};

const GamePlayerStats = ({ attributes, magicalDefense, magicalPosture, physicalDefense, physicalPosture, player, spectator }: Props) => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const modalStyle = {
        fontWeight: 600,
        fontFamily: "Cinzel",
        overflow: 'auto',
        zIndex: spectator ? 99999 : '',
    };
    return (
        <>
        <Modal show={modalShow} style={modalStyle} onHide={() => setModalShow(false)}>
            <Modal.Header style={{ color: "gold", fontSize: '24px' }}>
                {player.name} 
                { player?.animal ?
                    <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + player?.helmet?.imgURL} alt="Origin Culture Here" id="origin-pic" /></span>
                :
                    <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + `/images/` + player.origin + '-' + player.sex + '.jpg'} alt="Origin Culture Here" id="origin-pic" /></span>
                }
            </Modal.Header>
            <Modal.Body style={{ color: "#fdf6d8" }}>
            <div className='creature-heading'>
                <h2 style={{ fontSize: "18px", color: "gold" }}>{player.description}</h2>
            </div>
            <div>
            Level: {player.level}<br />
            Health: {player.health.current} / {player.health.total}<br />
            Experience: {player.experience} / {player.level * 1000}<br />
            {player?.currency?.silver ? <>Silver: {player.currency.silver} Gold: {player.currency.gold} <br /></> : '' }
            Mastery: {player.mastery}<br />
            Magical Defense:  {magicalDefense}% / [{magicalPosture}%]<br />
            Physical Defense:  {physicalDefense}% / [{physicalPosture}%]<br />
            Initiative:  {attributes.initiative}
            </div>
            <div>Constitution: {attributes.totalConstitution} [ {attributes.totalConstitution < 10 ? '- ' + attributes.constitutionMod : '+ ' + attributes.constitutionMod} ] </div>
            <div>Strength: {attributes.totalStrength} [ {attributes.totalStrength < 10 ? '- ' + attributes.strengthMod : '+ ' + attributes.strengthMod} ]</div>
            <div>Agility: {attributes.totalAgility} [ {attributes.totalAgility < 10 ? '- ' + attributes.agilityMod : '+ ' + attributes.agilityMod} ]</div>
            <div>Achre: {attributes.totalAchre} [ {attributes.totalAchre < 10 ? '- ' + attributes.achreMod : '+ ' + attributes.achreMod} ]</div>
            <div>Caeren: {attributes.totalCaeren} [ {attributes.totalCaeren < 10 ? '- ' + attributes.caerenMod : '+ ' + attributes.caerenMod} ]</div>
            <div>Kyosir: {attributes.totalKyosir} [ {attributes.totalKyosir < 10 ? '- ' + attributes.kyosirMod : '+ ' + attributes.kyosirMod} ]</div>
            </Modal.Body>
        </Modal>
            <Button variant="" onClick={() => setModalShow(true)} className='game-player-button'>
                <h3 className='gameplayername'>{player.name}</h3>
            </Button>
        </>
    );
};

export default GamePlayerStats;