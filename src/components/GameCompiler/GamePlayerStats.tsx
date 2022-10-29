import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface Props {
    attributes: any;
    magicalDefense: number;
    magicalPosture: number;
    physicalDefense: number;
    physicalPosture: number;
}

const GamePlayerStats = ({ attributes, magicalDefense, magicalPosture, physicalDefense, physicalPosture }: Props) => {
    const playerPopover = (
        <Popover id="popover">
            <Popover.Header id="popover-header" as="h2">Player Statistics</Popover.Header>
            <Popover.Body id="popover-body">
                <div className="">
                Magical Defense:  {magicalDefense}% / [{magicalPosture}%]
                </div>
                <div className="">
                Physical Defense:  {physicalDefense}% / [{physicalPosture}%]
                </div>
                <div className="">
                Initiative:  {attributes.initiative}
                </div>
                <div>Constitution: {attributes.totalConstitution} [ {attributes.totalConstitution < 10 ? '- ' + attributes.constitutionMod : '+ ' + attributes.constitutionMod} ] </div>
            <div>Strength: {attributes.totalStrength} [ {attributes.totalStrength < 10 ? '- ' + attributes.strengthMod : '+ ' + attributes.strengthMod} ]</div>
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
    <div style={{ textAlign: 'center' }}>
    <OverlayTrigger trigger="click" placement="auto-start" overlay={playerPopover}>
        <Button variant=""  >
            {/* <div className="actions"> */}
        <h3 style={{ fontSize: 10 + 'px' }}>Combat Stats</h3>
        {/* </div> */}
        </Button>
    </OverlayTrigger>
  </div>
  )
}

export default GamePlayerStats