import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import StoryHealthBar from './StoryHealthBar';
import LevelUpModal from '../../game/LevelUpModal';
import GamePlayerStats from './GamePlayerStats';
import StatusEffects from './StatusEffects';
import ExperienceBar from './ExperienceBar';
import { useEffect, useState } from 'react';
import PhaserInventoryBag from '../../game/PhaserInventoryBag';
import { GameData } from './GameStore';
import statPng from '../../game/images/newStats.png';
import inventoryPng from '../../game/images/newInventory.png';
import equipSlot from '../../game/images/equip_slot.png';
import equipSlotSelected from '../../game/images/equip_slot_selected.png';
import Inventory from './Inventory';

interface Props {
    ascean: any;
    state: any;
    dispatch: React.Dispatch<any>;
    loading: boolean;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    asceanState: any;
    setAsceanState: any;
    levelUpAscean: any;
    damaged?: boolean;
    asceanViews: string;
};

const StoryAscean = ({ ascean, state, dispatch, loading, asceanState, setAsceanState, levelUpAscean, damaged, gameState, gameDispatch, asceanViews }: Props) => {
    const [highlighted, setHighlighted] = useState({
        item: null,
        comparing: false,
    });
    const VIEWS = {
        CHARACTER: 'Character',
        INVENTORY: 'Inventory',
    };
    useEffect(() => {
        console.log(asceanState)
    }, [asceanState])
    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
    return (
        <>
        <img src ={statPng} alt="Player Portrait" style={{ position: "absolute" }} />
        { asceanViews === VIEWS.CHARACTER ? (
            <h3 style={{ position: "absolute", fontFamily: "Cinzel", color: "#fdf6d8", top: "80px", left: "60px", fontWeight: 600 }}>
            Character
            </h3>
        ) : asceanViews === VIEWS.INVENTORY ? (
            <h3 style={{ position: "absolute", fontFamily: "Cinzel", color: "#fdf6d8", top: "80px", left: "60px", fontWeight: 600 }}>
            Inventory
            </h3>
        ) : ( '' ) }
        <div className="story-block">
            <div className='story-ascean'> 
                { asceanState.experience === asceanState.experienceNeeded ? (
                    <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} story={true} />
                ) : ( '' ) } 
                <div style={{ textAlign: 'center', color: "#fdf6d8" }}>
                    {state.player.name}
                </div>
                <div style={{ textAlign: "center", marginBottom: "15%" }}>
                    <StoryHealthBar totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} story={true} />
                </div>
                <AsceanImageCard
                    weapon_one={state.weapons[0]}
                    weapon_two={state.weapons[1]}
                    weapon_three={state.weapons[2]}
                    shield={ascean.shield}
                    helmet={ascean.helmet}
                    chest={ascean.chest}
                    legs={ascean.legs}
                    amulet={ascean.amulet}
                    ring_one={ascean.ring_one}
                    ring_two={ascean.ring_two}
                    trinket={ascean.trinket}
                    gameDisplay={true}
                    loading={loading}
                    damage={damaged}
                    key={ascean._id}
                    story={true}
                />
                <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} story={true} />
            </div>
        </div>
        <div style={{ position: "absolute", color: "#fdf6d8", textAlign: "center", width: "27%", height: "55%", left: "350px", top: "22.5%", fontSize: "12px", padding: "0.5%", 
        overflow: "scroll", scrollbarWidth: "none", zIndex: 9999 }}>
            { asceanViews === VIEWS.CHARACTER ? (
                <>
                <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + `/images/` + state.player.origin + '-' + state.player.sex + '.jpg'} alt="Origin Culture Here" id="origin-pic" /></span>
                <div className='creature-heading'>
                    <h2 style={{ fontSize: "14px", color: "gold" }}>{state.player.description}</h2>
                </div>
                <div>
                Level: {state.player.level}<br />
                {state.player?.currency?.silver ? <>Silver: {state.player.currency.silver} Gold: {state.player.currency.gold} <br /></> : '' }
                Mastery: {state.player.mastery}<br />
                Magical Defense:  {state.player_defense.magicalDefenseModifier}% / [{state.player_defense.magicalPosture}%]<br />
                Physical Defense:  {state.player_defense.physicalDefenseModifier}% / [{state.player_defense.physicalPosture}%]<br />
                Initiative:  {state.player_attributes.initiative}
                </div>
                <div>Constitution: {state.player_attributes.totalConstitution} [ {state.player_attributes.totalConstitution < 10 ? '- ' + state.player_attributes.constitutionMod : '+ ' + state.player_attributes.constitutionMod} ] </div>
                <div>Strength: {state.player_attributes.totalStrength} [ {state.player_attributes.totalStrength < 10 ? '- ' + state.player_attributes.strengthMod : '+ ' + state.player_attributes.strengthMod} ]</div>
                <div>Agility: {state.player_attributes.totalAgility} [ {state.player_attributes.totalAgility < 10 ? '- ' + state.player_attributes.agilityMod : '+ ' + state.player_attributes.agilityMod} ]</div>
                <div>Achre: {state.player_attributes.totalAchre} [ {state.player_attributes.totalAchre < 10 ? '- ' + state.player_attributes.achreMod : '+ ' + state.player_attributes.achreMod} ]</div>
                <div>Caeren: {state.player_attributes.totalCaeren} [ {state.player_attributes.totalCaeren < 10 ? '- ' + state.player_attributes.caerenMod : '+ ' + state.player_attributes.caerenMod} ]</div>
                <div>Kyosir: {state.player_attributes.totalKyosir} [ {state.player_attributes.totalKyosir < 10 ? '- ' + state.player_attributes.kyosirMod : '+ ' + state.player_attributes.kyosirMod} ]</div>
                </>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <>
                { highlighted.comparing ? (
                    <>
                    <Inventory gameState={gameState} gameDispatch={gameDispatch} bag={gameState.player.inventory} inventory={highlighted.item} ascean={ascean} index={0} compare={true} />
                    </>
                ) : ( '' ) }
                </>
            ) : ( '' ) }
        </div>
        <div style={{ position: "absolute", color: "#fdf6d8", textAlign: "center", width: "27%", height: "54.5%", left: "635px", top: "22.5%", fontSize: "12px" }}>
            { asceanViews === VIEWS.CHARACTER ? (
                <>
                {/* Statistics */}
                </>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <>
                {/* <img src={equipSlot} alt='equip-slot' style={{ position: "absolute", width: "80px", height: "80px", left: "109px" }} /> */}
                <PhaserInventoryBag highlighted={highlighted} setHighlighted={setHighlighted} inventory={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={gameState.player} dispatch={dispatch} /> 
                </>
            ) : ( '' ) }
        </div>
        </>
    );
};

export default StoryAscean;

{/* Health: {state.player.health.current} / {state.player.health.total}<br />
Experience: {state.player.experience} / {state.player.level * 1000}<br /> */}