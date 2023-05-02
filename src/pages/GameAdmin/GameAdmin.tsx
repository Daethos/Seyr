import { useEffect, useState, useReducer } from 'react';
import * as eqpAPI from '../../utils/equipmentApi';
import * as asceanAPI from '../../utils/asceanApi';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../components/Loading/Loading';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import AsceanListItem from '../../components/GameCompiler/AsceanListItem';
import AdminAscean from '../../components/GameCompiler/AdminAscean';
import MerchantTable from '../../components/GameCompiler/MerchantTable';
import { Enemy, GAME_ACTIONS, GameStore, initialGameData } from '../../components/GameCompiler/GameStore';
import LevelUpModal from '../../game/LevelUpModal';
import { MapStore, initialMapData } from '../../components/GameCompiler/WorldStore';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import EnemyDialogNodes from '../../components/GameCompiler/EnemyDialogNodes.json';

interface DialogNodeOption {
    text: string;
    next: string | null;
    npcIds?: any[];
    conditions?: { key: string; operator: string; value: string; }[];
    action?: string | null;
};

export interface DialogNode {
    id: string;
    text: string;
    options: DialogNodeOption[] | [];
    npcIds: any[];
};

interface NpcIds {
    [key: string]: number;
};
interface DialogOptionProps {
    option: DialogNodeOption;
    onClick: (nextNodeId: string | null) => void;
    actions: { [key: string]: Function }
};

interface NodeFormProps {
    node: DialogNode;
    onSave: (node: DialogNode) => void;
    optionDelete: (nodeId: string, optionId: number) => void;
};

const DialogNodeForm = ({ node, onSave, optionDelete }: NodeFormProps) => {
    const [nodeId, setNodeId] = useState(node.id);
    const [text, setText] = useState(node.text);
    const [options, setOptions] = useState(node.options);
    const [npcIds, setNpcIds] = useState(node.npcIds);

    useEffect(() => {
        setNodeId(node.id);
        setText(node.text);
        setOptions(node.options);
        setNpcIds(node.npcIds);
    }, [node]);

    const handleOptionChange = async (index: number, option: DialogNodeOption) => {
        const newOptions = [...options];
        newOptions[index] = option;
        setOptions(newOptions);
    };
    
    const handleAddOption = () => {
        const newOption: DialogNodeOption = {
            text: '',
            next: null,
            npcIds: [],
            conditions: [],
            action: null,
        };
        setOptions([...options, newOption]);
      };
    
    const handleSave = () => {
        const newNode: DialogNode = {
            ...node,
            id: nodeId,
            text,
            options,
            npcIds,
        };
        onSave(newNode);
    };
    return (
        <Form>
        {/* <Form.Group>
        <FloatingLabel controlId="text" label='Node ID'>
        <Form.Control
            type="text"
            placeholder="Node ID"
            name='nodeId'
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            />
        </FloatingLabel>
        </Form.Group>
        <br />
        <Form.Group>
        <FloatingLabel controlId="text" label='Node Text'>
        <Form.Control
            type="text"
            placeholder="Node Text"
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </FloatingLabel>
        </Form.Group> */}
        <label htmlFor="nodeId">Node ID:</label>{' '}
        <input
            id="nodeId"
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
        /><br />

        <label htmlFor="text">Node Text:</label>{' '}
        <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
        /><br />
    
        <label htmlFor="npcIds">NPC Ids:</label>{' '}
        <input
            id="npcIds"
            type="text"
            value={npcIds.join(',')}
            onChange={(e) => setNpcIds(e.target.value.split(','))}
        /><br />
        <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleAddOption}>Add Option</Button>
        <h5 style={{ color: "#fdf6d8" }}>Options</h5>
        {options.map((option, index) => (
            <OptionForm
              key={index}
              option={option}
              nodeId={nodeId}
              index={index}
              onSave={(newOption) => handleOptionChange(index, newOption)}
              optionDelete={async (nodeId, index) => optionDelete(nodeId, index)}
            />
        ))}
        <Button variant='' style={{ color: 'gold', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleSave}>Save Node</Button>
        </Form>
    );
};

interface OptionFormProps {
    option: DialogNodeOption;
    nodeId: string;
    index: number;
    onSave: (option: DialogNodeOption) => Promise<void>;
    optionDelete: (nodeId: string, optionId: number) => Promise<void>;
};

const OptionForm = ({ option, nodeId, index, onSave, optionDelete }: OptionFormProps) => {
    const [text, setText] = useState(option.text);
    const [next, setNext] = useState(option.next);
    const [npcIds, setNpcIds] = useState(option.npcIds);
    const [conditions, setConditions] = useState(option.conditions);
    const [action, setAction] = useState(option.action);

    useEffect(() => {
        setText(option.text);
        setNext(option.next);
        setNpcIds(option.npcIds);
        setConditions(option.conditions);
        setAction(option.action);
    }, [option])

    const handleSave = () => {
        const newOption: DialogNodeOption = {
            text,
            next,
            npcIds,
            conditions,
            action,
        };
        onSave(newOption);
    };

    const handleDelete = () => {
        optionDelete(nodeId, index);
    };

    return (
        <div style={{  }} >
            <label htmlFor="text">Option Text:</label>{' '}
            <input
                id="text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            /><br />
            <label htmlFor="next">Next Node ID:</label>{' '}
            <input 
                id="next"
                type="text"
                value={next ?? ''}
                onChange={(e) => setNext(e.target.value)}
            /><br />
            <label htmlFor="npcIds">NPC Ids:</label>{' '}
            <input
                id="npcIds"
                type="text"
                value={npcIds?.join(',')}
                onChange={(e) => setNpcIds(e.target.value.split(','))}
            /><br />
            <label htmlFor="conditions">Conditions:</label>{' '}
            <input
                id="conditions"
                type="text"
                value={conditions?.map((condition) => `${condition.key} ${condition.operator} ${condition.value}`).join(',')}
                onChange={(e) => setConditions(e.target.value.split(',').map((condition) => {
                    const [key, operator, value] = condition.split(' ');
                    return { key, operator, value };
                }))}
            /><br />
            <label htmlFor="action">Action:</label>{' '}
            <input
                id="action"
                type="text"
                value={action ?? ''}
                onChange={(e) => setAction(e.target.value)}
            /><br />
            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleSave}>Save Option</Button>
            <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleDelete}>Delete Option</Button>
            <br /><br />
        </div>
    );
};

interface NodeTableProps {
    nodes: DialogNode[];
    getNodeById: (nodeId: string) => DialogNode | undefined;
    onEdit: (node: DialogNode) => void;
    onDelete: (nodeId: string) => void;
    optionDelete: (nodeId: string, optionId: number) => Promise<void>;
};

const DialogNodeTable = ({ nodes, getNodeById, onEdit, onDelete, optionDelete }: NodeTableProps) => {
    const [tableNodes, setTableNodes] = useState(nodes);
    useEffect(() => {
        console.log(nodes, "Nodes in Table");
        setTableNodes(nodes);
    }, [nodes])
    const getNodeId = (id: string) => {
        getNodeById(id);
    };
    const handleOptionDelete = (nodeId: string, optionId: number) => {
        optionDelete(nodeId, optionId);
    };
    return (
        <div>
            <h5 style={{ color: "#fdf6d8" }}>Nodes</h5>
            <Table striped bordered hover variant="dark" size="sm" style={{ color: "gold" }}>
                <thead>
                    <tr>
                        <th>Node ID</th>
                        <th>Node Text</th>
                        <th>Options</th>
                        <th>NPC Ids</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableNodes.map((node) => (
                        <tr key={node.id}>
                            <td onClick={() => getNodeId(node.id)}>{node.id}</td>
                            <td>{node.text}</td>
                            <td>{node.options.map((option: DialogNodeOption, index: number) => {
                                return (
                                    <div key={index}>
                                        <p>Option {index + 1}</p>
                                        <p>Text: {option.text}</p>
                                        <p>Next Node: {option.next}</p>
                                        <p>NPCs: {option?.npcIds?.join(',')}</p>
                                        <p>Conditions: {option?.conditions?.map((condition) => `${condition.key} ${condition.operator} ${condition.value}`).join(',')}</p>
                                        <p>Actions: {option.action}</p>
                                        <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={() => handleOptionDelete(node.id, index)}>Delete</Button>{' '}
                                    </div>
                                )
                            } )}
                            </td>
                            <td>{node.npcIds.join(',')}</td>
                            <td>
                                <Button variant='' style={{ color: 'gold', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={() => getNodeId(node.id)}>Edit</Button>{' '}
                                <br /><br />
                                <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={() => onDelete(node.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export interface Ascean {
    _id: string;
    user: object;
    visibility: string;
    shareable: string;
    origin: string;
    sex: string;
    mastery: string;
    index: string;
    name: string;
    level: number;
    experience: number;
    high_score: number;
    currency: object;
    inventory: any[];
    description: string;
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    weapon_one: object;
    weapon_two: object;
    weapon_three: object;
    shield: object;
    helmet: object;
    chest: object;
    legs: object;
    ring_one: object;
    ring_two: object;
    amulet: object;
    trinket: object;
    faith: string;
    likes: any[];
    dislikes: any[];
    double_dislikes: any[];
};

const asceanTemplate: Ascean = {
    _id: '',
    user: {},
    visibility: '',
    shareable: '',
    origin: '',
    sex: '',
    mastery: '',
    index: '',
    name: '',
    level: 0,
    experience: 0,
    high_score: 0,
    currency: { gold: 0, silver: 0 },
    inventory: [],
    description: '',
    constitution: 0,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 0,
    weapon_one: {},
    weapon_two: {},
    weapon_three: {},
    shield: {},
    helmet: {},
    chest: {},
    legs: {},
    ring_one: {},
    ring_two: {},
    amulet: {},
    trinket: {},
    faith: '',
    likes: [],
    dislikes: [],
    double_dislikes: [],
};

interface AsceanState {
    ascean: Ascean;
    currentHealth: number;
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    level: number;
    opponent: number;
    opponentExp: number;
    experience: number;
    experienceNeeded: number;
    mastery: string;
    faith: string;
};

const initialAsceanState: AsceanState = {
    ascean: {...asceanTemplate},
    currentHealth: 0,
    constitution: 0,
    strength: 0,
    agility: 0,
    achre: 0,
    caeren: 0,
    kyosir: 0,
    level: 0,
    opponent: 0,
    opponentExp: 0,
    experience: 0,
    experienceNeeded: 0,
    mastery: '',
    faith: '',
};

export interface GameAdminData {
    loading: boolean;
    asceanLoaded: boolean;
    testLevel: number;
    testEquipment: { name: string; type: string; rarity: string; };
    equipmentTable: any[];
    searchQuery: string;
    asceanSearched: Ascean;
    asceanSearchData: any[];
    generatedAscean: object;
    asceanInventory: any[];
    error: { title: string, content: string };
    setError: Function;
};

export interface Action {
    type: string;
    payload: any;
};

export const ACTIONS = {
    SET_LOADING: 'set-loading',
    SET_TEST_LEVEL: 'set-test-level',
    SET_EQUIPMENT_NAME: 'set-equipment-name',
    SET_EQUIPMENT_TABLE: 'set-equipment-table',
    SET_ASCEAN: 'set-ascean',
    SET_ASCEAN_DATA: 'set-ascean-data',
    SET_INVENTORY: 'set-inventory',
    SET_SEARCH_QUERY: 'set-search-query',
    SET_ERROR: 'set-error',
    GENERATE_ASCEAN: 'generate-ascean',
    DELETE_EQUIPMENT_TABLE: 'delete-equipment-table',
};

const initialGameAdaminData: GameAdminData = {
    loading: false,
    asceanLoaded: false,
    testLevel: 0,
    testEquipment: { name: '', type: '', rarity: '' },
    equipmentTable: [],
    searchQuery: '',
    asceanSearched: {...asceanTemplate},
    asceanSearchData: [],
    generatedAscean: {...asceanTemplate},
    asceanInventory: [],
    error: { title: '', content: '' },
    setError: () => {},
};

const GameAdminStore = (state: GameAdminData, action: Action) => {
    switch (action.type) {
        case 'set-loading': {
            return { 
                ...state, 
                loading: action.payload 
            };
        };
        case 'set-test-level': {
            return { 
                ...state,
                loading: false, 
                testLevel: action.payload 
            };
        };
        case 'set-equipment-table': {
            return { 
                ...state,
                loading: false, 
                equipmentTable: action.payload 
            };

        };
        case 'set-ascean': {
            return { 
                ...state,
                loading: false, 
                asceanSearched: action.payload 
            };
        };
        case 'set-ascean-data': {
            console.log(action.payload, 'Payload in SET_ASCEAN_DATA');
            return {
                ...state,
                loading: false,
                asceanSearchData: action.payload,
            };
        };
        case 'set-search-query': {
            return {
                ...state,
                searchQuery: action.payload
            };
        };
        case 'generate-ascean': {
            console.log(action.payload, 'Payload in GENERATE_ASCEAN');
            return {
                ...state,
                loading: false,
                asceanLoaded: true,
                generatedAscean: action.payload
            };
        };
        case 'set-error': {
            return {
                ...state,
                loading: false,
                error: { title: action.payload.title, content: action.payload.content }
            };
        };
        case 'delete-equipment-table': {
            return {
                ...state,
                loading: false,
                equipmentTable: []
            };
        };
        case 'set-equipment-name': {
            return {
                ...state,
                loading: false,
                testEquipment: action.payload
            };
        };
        case 'set-inventory': {
            return {
                ...state,
                loading: false,
                asceanInventory: action.payload
            };
        };
        default: {
            return state;
        };
    };
};

interface GameAdminProps {
    user: { username: string, _id: string };
};

const GameAdmin = ({ user }: GameAdminProps) => {
    const [state, dispatch] = useReducer(GameAdminStore, initialGameAdaminData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [asceanState, setAsceanState] = useState<AsceanState>(initialAsceanState);
    const [showInventory, setShowInventory] = useState<boolean>(false);
    const navigate = useNavigate();
    const [dialogNodes, setDialogNodes] = useState<DialogNode>({ id: '', text: '', options: [], npcIds: [] });
    const [enemyNodes, setEnemyNodes] = useState<any[]>([]);
    const [searchedEnemy, setSearchedEnemy] = useState<string>('');

    useEffect(() => {
        if (user.username !== 'lonely guy' && user._id !== '636f2510f0ad1c1ad6a373a8') navigate('/');
    }, [user]);

    useEffect(() => {
        if (gameState.itemSaved === false) return;
        console.log("Saving Item", gameState.itemSaved);
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
        };
    }, [gameState, gameState.itemSaved]);

    useEffect(() => {
        if (gameState.eqpSwap === false) return;
        console.log("Swapping Equipment", gameState.eqpSwap);
        getAsceanAndInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: false });
        };
    }, [gameState, gameState.eqpSwap]);

    useEffect(() => {
        if (gameState.removeItem === false) return;
        console.log("Removing Item", gameState.removeItem);
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: false });
        };
    }, [gameState, gameState.removeItem]);

    useEffect(() => {
        if (gameState.repositionInventory === false) return;
        console.log("Repositioning Inventory", gameState.repositionInventory);
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.REPOSITION_INVENTORY, payload: false });
        };
    }, [gameState, gameState.repositionInventory]);

    useEffect(() => {
        if (gameState.purchasingItem === false) return;
        console.log("Purchasing Item", gameState.purchasingItem);
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SET_PURCHASING_ITEM, payload: false });
        };
    }, [gameState, gameState.purchasingItem]);

    const getAsceanAndInventory = async () => {
        try {
            console.log("Getting Ascean and Inventory");
            const firstResponse = await asceanAPI.getAsceanInventory(state?.generatedAscean?.ascean._id);
            dispatch({ type: ACTIONS.SET_INVENTORY, payload: firstResponse.inventory });
            const response = await asceanAPI.getAsceanStats(state?.generatedAscean?.ascean._id);
            dispatch({
                type: ACTIONS.GENERATE_ASCEAN,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const getOnlyInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(state?.generatedAscean?.ascean._id);
            console.log(firstResponse, "Ascean Inventory ?")
            dispatch({ type: ACTIONS.SET_INVENTORY, payload: firstResponse.inventory });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };
    
    const getEquipment = async (equipment: { name: string; type: string; rarity: string; }) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        try {
            if (state.equipmentTable.length > 0) {
                const deleteResponse = await eqpAPI.deleteEquipment(state.equipmentTable);
                console.log(deleteResponse, 'Delete Response');
            };
            console.log(equipment, 'Equipment')
            const response = await eqpAPI.getTestEquipment(equipment);
            dispatch({
                type: ACTIONS.SET_EQUIPMENT_TABLE,
                payload: [response.data],
            });
        } catch (err: any) {
            console.log(err.message);
        };
    };

    const deleteEquipment = async (eqp: any) => {
        try {
            const deleteResponse = await eqpAPI.deleteEquipment(eqp);
            console.log(deleteResponse, 'Delete Response');
            dispatch({ type: ACTIONS.DELETE_EQUIPMENT_TABLE, payload: []});
        } catch (err: any) {
            console.log(err.message);
        };
    };

    const setTestEquipment = async (e: any) => {
        try {
        const data = e.target.value.split(/,\s?/);
        console.log(data, 'Data')
        const equipment = {
            name: data[0].split(' ').map((word: string, index: number) => {
                        if (index === 0 || (index > 0 && word.toLowerCase() !== 'of')) {
                            return word.charAt(0).toUpperCase() + word.slice(1);
                        } else {
                            return word.toLowerCase();
                        };
                }).join(' '),
            type: data?.[1] ? data?.[1].charAt(0).toUpperCase() + data?.[1].slice(1) : '',
            rarity: data?.[2] ? data?.[2].charAt(0).toUpperCase() + data?.[2].slice(1) : '',
        };
        dispatch({ type: ACTIONS.SET_EQUIPMENT_NAME, payload: equipment });
        } catch (err: any) {
            console.log(err.message);
        };
    };

    const fetchAscean = async (id: string) => {
        if (id === '') {
            dispatch({ type: ACTIONS.SET_ASCEAN_DATA, payload: [] });
            return;
        };
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        try {
            const response = await asceanAPI.getNamedAscean(id);
            console.log(response, 'Response in fetchAscean')
            dispatch({
                type: ACTIONS.SET_ASCEAN_DATA,
                payload: response,
            });
        } catch (err: any) {
            console.log(err.message);
        };
    };
    
    const generateAscean = async (id: string) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        try {
            const updatedResponse = await asceanAPI.getAsceanStats(id);
            dispatch({
                type: ACTIONS.GENERATE_ASCEAN,
                payload: updatedResponse.data.data,
            });
            setAsceanState({ ...asceanState, ascean: updatedResponse.data.data.ascean, level: updatedResponse.data.data.ascean.level, experience: updatedResponse.data.data.ascean.experience, experienceNeeded: (updatedResponse.data.data.ascean.experience * 1000), mastery: updatedResponse.data.data.ascean.mastery, faith: updatedResponse.data.data.ascean.faith });
            const firstResponse = await asceanAPI.getAsceanInventory(id);
            console.log(firstResponse, "Ascean Inventory ?")
            dispatch({ type: ACTIONS.SET_INVENTORY, payload: firstResponse.inventory });
        } catch (err: any) {
            console.log(err.message);
        };
    };

    const levelUpAscean = async (vaEsai: any) => {
        try {
            let response = await asceanAPI.levelUp(vaEsai);
            setAsceanState({
                ...asceanState,
                ascean: response.data,
                currentHealth: response.data.health.current,
                constitution: 0,
                strength: 0,
                agility: 0,
                achre: 0,
                caeren: 0,
                kyosir: 0,
                level: response.data.level,
                experience: 0,
                experienceNeeded: response.data.level * 1000,
                mastery: response.data.mastery,
                faith: response.data.faith,
            });
            await getAsceanLeveled(response.data);
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up')
        };
    };

    const getAsceanLeveled = async (ascean: Ascean) => {
        try {
            const firstResponse = await asceanAPI.getCleanAscean(ascean._id);
            const response = await asceanAPI.getAsceanStats(ascean._id);
            console.log(firstResponse, response, "First Response, Response")
            dispatch({
                type: ACTIONS.GENERATE_ASCEAN,
                payload: response.data.data
             });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Leveled');
        };
    };

    const writeEquipmentFile = async () => {
        try {
            const response = await eqpAPI.writeEquipment();
            console.log(response, 'Response in writeEquipmentFile');
        } catch (err: any) {
            console.log(err.message);
        };
    };

    useEffect(() => {
        if (searchedEnemy !== '') {
            getNodesForEnemy(searchedEnemy);
        };
    }, [EnemyDialogNodes]);

    async function enemyNodeMiddleware(e: any) {
        e.preventDefault();
        // need to clean up, and capitalize first letter of each word
        const enemy = e.target.value.split(' ').map((word: string, index: number) => {
            if (index === 0 || (index > 0 && word.toLowerCase() !== 'of')) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
                return word.toLowerCase();
            };
        }).join(' ');

        await getNodesForEnemy(enemy);
    };

    async function getNodesForEnemy(enemy: string) {
        const matchingNodes: DialogNode[] = [];
        for (const node of EnemyDialogNodes.nodes) {
            if (node.options.length === 0) {
                continue;
            };
            const npcOptions = node.options.filter((option) => (option as DialogNodeOption)?.npcIds?.includes(enemy));
            if (npcOptions.length > 0) {
                const updatedNode = { ...node, options: npcOptions };
                matchingNodes.push(updatedNode);
            };
        };
        console.log(matchingNodes, 'Matching Nodes');
        setEnemyNodes(matchingNodes);
        setSearchedEnemy(enemy);
    };

    function getNodeById(nodeId: string): DialogNode | undefined {
        const node = EnemyDialogNodes.nodes.find((node) => node.id === nodeId);
        if (node) {
            console.log(node, 'Node');
            setDialogNodes(node);
        };
        return node;
    };
    const handleNodeDelete = async (nodeID: string) => {
        console.log(nodeID, 'Node in Handle Node Delete');
        const response = await eqpAPI.deleteEnemyDialog(nodeID);
        console.log(response, 'Response in Handle Node Delete');
        await getNodesForEnemy(searchedEnemy);
    };

    const handleNodeEdit = (node: DialogNode) => {
        console.log(node, 'Node in handle node edit');
    };

    const handleNodeSave = async (node: DialogNode) => {
        console.log(node, 'Node in handleNodeSave');
        try {
            const response = await eqpAPI.writeEnemyDialog(node);
            console.log(response, 'Response in handleNodeSave');
            await getNodesForEnemy(searchedEnemy);
        } catch (err: any) {
            console.log(err.message);
        };
    };

    const handleOptionDelete = async (nodeId: string, optionId: number) => {
        console.log(nodeId, optionId, 'NodeID, OptionID in handleOptionDelete');
        try {
            const data = { nodeId, optionId };
            const response = await eqpAPI.deleteEnemyDialogOption(data);
            console.log(response, 'Response in handleOptionDelete');
            await getNodesForEnemy(searchedEnemy);
        } catch (err: any) {
            console.log(err.message);
        };
    };
    
    return (
        <Container>
            <Row className='mb-5'>
            <Card style={{ background: 'black', color: 'white' }}>
                <Card.Body>
                    <Card.Title>Test Ascean</Card.Title>
                    <Card.Text>
                        Placeholder Test for the Ascean
                    </Card.Text>
                    <Form>
                    <Form.Group>
                        <Form.Label>Ascean Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Ascean Name" onChange={(e) => fetchAscean(e.target.value)} />
                    </Form.Group>
                    </Form>
                    { state.asceanSearchData.length > 0 ? (
                        state.asceanSearchData.map((ascean: Ascean, index: number) => {
                            return (
                                <AsceanListItem ascean={ascean} state={state} dispatch={dispatch} key={index} fetch={() => generateAscean(ascean._id)} />
                        )})
                    ) : ( '' ) }
                    { state.asceanLoaded ?
                    <>
                    <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
                    <AdminAscean ascean={state.generatedAscean} loading={false} />
                    { state.asceanInventory.length > 0 ?
                        <>
                        <Button variant='outline' className='' style={{ color: '#fdf6d8', fontSize: '18px', marginLeft: "27.5%", marginTop: "20%" }} onClick={() => setShowInventory(!showInventory)}>Inspect Inventory</Button>
                        </>
                    : '' }
                    { showInventory ?
                        <InventoryBag admin={true}  gameDispatch={gameDispatch} inventory={state.asceanInventory} ascean={state.generatedAscean.ascean} dispatch={dispatch} gameState={gameState} mapState={mapState} />
                    : '' }
                    </>
                    : ''}
                    <br /><br /><br /><br />
                </Card.Body>
            </Card>
            </Row>
            <Row className='my-5'>
            <Card style={{ background: 'black', color: 'white' }}>
                <Card.Body>
                    <Card.Title>Test Equipment</Card.Title>
                    <Card.Text>Find Equipment Using Name, Type, Rarity</Card.Text>
                    <Card.Text>{state?.testEquipment?.name} {state?.testEquipment?.type} {state?.testEquipment?.rarity}</Card.Text>
                    {/* <Button variant='' style={{ color: 'blue', fontVariant: 'small-caps' }} onClick={writeEquipmentFile}>Write Equipment</Button> */}
                    <Form>
                        <Form.Group>
                            <Form.Label>Test Equipment</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Enter Test Equipment"
                                onChange={(e) => setTestEquipment(e)}
                            />
                        </Form.Group>
                    </Form>
                    <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={() => getEquipment(state.testEquipment)}>Get Equipment</Button>
                    { state.equipmentTable.length > 0 ?
                        <MerchantTable table={state.equipmentTable} ascean={state.generatedAscean.ascean} gameDispatch={gameDispatch} gameState={gameState} error={state.error} setError={state.setError} />
                    : '' }
                    <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={() => deleteEquipment(state.equipmentTable)}>Delete Equipment</Button>
                    </Card.Body>
            </Card>
            </Row>
            <Row className='my-5'>
            <Card style={{ background: 'black', color: 'white' }}>
                <Card.Body>
                    <Card.Title style={{ color: "#fdf6d8" }}>Test Dialog</Card.Title>
                    <Card.Text style={{ color: "#fdf6d8" }}>Find Dialog Nodes Using Enemy Name</Card.Text>
                    <Form className='my-2'>
                        <Form.Group>
                            <Form.Label style={{ color: "#fdf6d8" }}>Test Dialog</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Enter Enemy Name"
                                onChange={(e) => enemyNodeMiddleware(e)}
                            />
                        </Form.Group>
                    </Form>
                    { enemyNodes.length > 0 ?
                        <DialogNodeTable nodes={enemyNodes} getNodeById={getNodeById} onEdit={handleNodeEdit} onDelete={handleNodeDelete} optionDelete={handleOptionDelete} />
                    : '' }
                    <DialogNodeForm node={dialogNodes} onSave={handleNodeSave} optionDelete={handleOptionDelete} />
                </Card.Body>
            </Card>
            </Row>
        </Container>
    );
};

export default GameAdmin;