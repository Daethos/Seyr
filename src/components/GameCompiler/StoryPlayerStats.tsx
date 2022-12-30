import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface Props {
    attributes: any;
    weaponAttributes: any;
    magicalDefense: number;
    magicalPosture: number;
    physicalDefense: number;
    physicalPosture: number;
    player: any;
}

const StoryPlayerStats = ({ attributes, weaponAttributes, magicalDefense, magicalPosture, physicalDefense, physicalPosture, player }: Props) => {
    let totalConstitution: number = attributes.totalConstitution + weaponAttributes?.constitution;
    let totalStrength: number = attributes.totalStrength + weaponAttributes?.strength;
    let totalAgility: number = attributes.totalAgility + weaponAttributes?.agility;
    let totalAchre: number = attributes.totalAchre + weaponAttributes?.achre;
    let totalCaeren: number = attributes.totalCaeren + weaponAttributes?.caeren;
    let totalKyosir: number = attributes.totalKyosir + weaponAttributes?.kyosir;

    let constitutionMod: number = Math.round((totalConstitution - 10) / 2); 
    let strengthMod: number = Math.round((totalStrength - 10) / 2);
    let agilityMod: number = Math.round((totalAgility - 10) / 2);
    let achreMod: number = Math.round((totalAchre - 10) / 2);
    let caerenMod: number = Math.round((totalCaeren - 10) / 2);
    let kyosirMod: number = Math.round((totalKyosir - 10) / 2);

    const playerPopover = (
        <Popover id="popover">
            <Popover.Header id="popover-header" as="h2">{player.name}'s Statistics
            </Popover.Header>
            <Popover.Body id="popover-body">
            <div className='creature-heading'>
                <h2>
                {player.description}
                </h2>
            </div>
            <div>
                Level: {player.level}<br />
                Experience: {player.experience} / {player.level * 1000}<br />
                Magical Defense:  {magicalDefense}% / [{magicalPosture}%]<br />
                Physical Defense:  {physicalDefense}% / [{physicalPosture}%]<br />
                Initiative:  {attributes.initiative}<br />
            </div>
            <div>Constitution: {attributes.totalConstitution} [ {attributes.totalConstitution < 10 ? '- ' + attributes.constitutionMod : '+ ' + attributes.constitutionMod} ] </div>
            <div>Strength: {attributes.totalStrength} [ {attributes.totalStrength < 10 ? '- ' + attributes.strengthMod : '+ ' + attributes.strengthMod} ]</div>
            <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + `/images/` + player.origin + '-' + player.sex + '.jpg'} alt="Origin Culture Here" id="origin-pic" /></span>
            <div>Agility: {attributes.totalAgility} [ {attributes.totalAgility < 10 ? '- ' + attributes.agilityMod : '+ ' + attributes.agilityMod} ]</div>
            <div>Achre: {attributes.totalAchre} [ {attributes.totalAchre < 10 ? '- ' + attributes.achreMod : '+ ' + attributes.achreMod} ]</div>
            <div>Caeren: {attributes.totalCaeren} [ {attributes.totalCaeren < 10 ? '- ' + attributes.caerenMod : '+ ' + attributes.caerenMod} ]</div>
            <div>Kyosir: {attributes.totalKyosir} [ {attributes.totalKyosir < 10 ? '- ' + attributes.kyosirMod : '+ ' + attributes.kyosirMod} ]</div>
            </Popover.Body>
        </Popover>
      );
      const attributePopover = (
        <Popover id="popover">
            <Popover.Header id="popover-header" as="h2">Player Statistics</Popover.Header>
            <Popover.Body id="popover-body">
                <div className="" >
                Health:  {attributes.healthTotal}
                </div>
                <div className="">
                Magical Defense:  {magicalDefense}% / [{magicalPosture}%]
                </div>
                <div className="">
                Physical Defense:  {physicalDefense}% / [{physicalPosture}%]
                </div>
                <div className="">
                Initiative:  {attributes.initiative}
                </div>
            </Popover.Body>
        </Popover>
      );
  return (
    <div style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center' }}>
    <OverlayTrigger trigger="click" placement="auto-start" overlay={playerPopover}>
        <Button variant=""  id='ascean-stats'>
            {/* <div className="actions"> */}
        <h3 style={{ fontSize: 16 + 'px', color: '#fdf6d8' }} className='mt-3 mb-5'>
        <span id="story-popover-image"><img src={process.env.PUBLIC_URL + `/images/` + player.origin + '-' + player.sex + '.jpg'} alt="Origin Culture Here" id="story-pic" /></span>{' '}
            {player.name}</h3>
        {/* </div> */}
        </Button>
    </OverlayTrigger>
  </div>
  )
}

export default StoryPlayerStats