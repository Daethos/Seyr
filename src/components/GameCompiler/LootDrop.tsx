import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import { GAME_ACTIONS } from './GameStore';
import Loading from '../Loading/Loading';
import EventEmitter from '../../game/phaser/EventEmitter';
import { setClearLootDrop, getOnlyInventoryFetch } from '../../game/reducers/gameState';
import { useDispatch } from 'react-redux';
import { getBorderStyle } from '../../game/ui/ItemPopover';

interface Props {
    lootDrop: any;
    ascean: any;
    itemSaved?: boolean;
    gameDispatch?: React.Dispatch<any>;
    story?: boolean;
};

const LootDrop = ({ lootDrop, ascean, itemSaved, gameDispatch, story }: Props) => {
    const dispatch = useDispatch();
    const article = ['a','e','i','o','u'].includes(lootDrop?.name?.[0].toLowerCase()) ? "an" : "a";
    const saveItem = async () => {
        try {
            const data = { ascean: ascean, lootDrop: lootDrop };
            await asceanAPI.saveToInventory(data);
            if (gameDispatch) {
                gameDispatch({ type: GAME_ACTIONS.CLEAR_LOOTDROP, payload: lootDrop });
                gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: true });
                gameDispatch({ type: GAME_ACTIONS.CLEAR_LOOT_DROP, payload: lootDrop._id });
            };
            if (story) {
                dispatch(setClearLootDrop(lootDrop._id));
                dispatch(getOnlyInventoryFetch(ascean._id));
            };
            EventEmitter.emit('destroy-lootdrop', lootDrop._id);
        } catch (err: any) {
            console.log(err.message, 'Error Saving Item to Inventory!');
        };
    }; 

    const lootDropPopover = (
        <Popover className="text-info" id="popover" style={{ zIndex: 9999 }}>
            <Popover.Header id="popover-header" className="" as="h2">{lootDrop?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + lootDrop?.imgURL} alt={lootDrop?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
            { lootDrop?.type && lootDrop?.grip ? (
                <>
                    {lootDrop?.type} [{lootDrop?.grip}] <br />
                    {lootDrop?.attack_type} [{lootDrop?.damage_type?.[0]}{lootDrop?.damage_type?.[1] ? ' / ' + lootDrop?.damage_type[1] : '' }{lootDrop?.damage_type?.[2] ? ' / ' + lootDrop?.damage_type[2] : '' }]  <br />
                </>
            ) : lootDrop?.type ? (  <>{lootDrop?.type} <br /></> ) : ( '' ) }
                {lootDrop?.constitution > 0 ? 'Con: +' + lootDrop?.constitution + ' ' : ( '' )}
                {lootDrop?.strength > 0 ? 'Str: +' + lootDrop?.strength + ' ' : ( '' )}
                {lootDrop?.agility > 0 ? 'Agi: +' + lootDrop?.agility + ' ' : ( '' )}
                {lootDrop?.achre > 0 ? 'Ach: +' + lootDrop?.achre + ' ' : ( '' )}
                {lootDrop?.caeren > 0 ? 'Caer: +' + lootDrop?.caeren + ' ' : ( '' )}
                {lootDrop?.kyosir > 0 ? 'Kyo: +' + lootDrop?.kyosir + ' ' : ( '' )}<br />
                Damage: {lootDrop?.physical_damage} Phys | {lootDrop?.magical_damage} Magi <br />
            { lootDrop?.physical_resistance || lootDrop?.magical_resistance ? (
                <>
                Defense: {lootDrop?.physical_resistance} Phys | {lootDrop?.magical_resistance} Magi <br />
                </>
            ) : ( '' ) }
            { lootDrop?.physical_penetration || lootDrop?.magical_resistance ? (
                <>
                Penetration: {lootDrop?.physical_penetration} Phys | {lootDrop?.magical_penetration} Magi <br />
                </>
            ) : ( '' ) }
                Critical Chance: {lootDrop?.critical_chance}% <br />
                Critical Damage: {lootDrop?.critical_damage}x <br />
                Dodge Timer: {lootDrop?.dodge}s <br />
                Roll Chance: {lootDrop?.roll}% <br />
            { lootDrop?.influences?.length > 0 ? (
                <>
                Influence: {lootDrop?.influences} <br />
                </>
            ) : ( '' ) }
                <br />
                <div>
                {lootDrop?.rarity}
                { itemSaved ? (
                <Loading NavBar={true} />
                ) : (
                    <Button variant='' style={{ color: 'green', fontWeight: 700, float: 'right', marginTop: '-5%', fontSize: '20px', marginRight: '-5%' }} onClick={saveItem}>Save</Button>
                )}
                </div> 
            </Popover.Body>
        </Popover>
    ); 

    const getScale = () => {
        const width = window.innerWidth;
        switch (true) {
          case width < 576:
            return 1;
          case width < 768:
            return 1.1;
          case width < 992:
            return 1.2;
          case width < 1200:
            return 1.3;
          case width < 1400:
            return 1.4;
          case width < 1600:
            return 1.5;
          case width < 1800:
            return 1.6;
          case width < 2000:
            return 1.7;
          case width >= 2000:
            return 1.8;
          default:
            return 1;
        };
    };

    const getItemStyle = {
        background: 'black',
        border: '2px solid ' + getBorderStyle(lootDrop?.rarity),
        transform: `scale(${getScale()})`,
    };

    return (
        <div>
        This appears to be {article} {lootDrop?.name}. <br />
        <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={lootDropPopover}>
            <Button variant=""  className="m-4 p-2" style={getItemStyle}><img src={process.env.PUBLIC_URL + lootDrop.imgURL} alt={lootDrop?.name} /></Button>
        </OverlayTrigger>
        </div>
    );
};

export default LootDrop;