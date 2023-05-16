import { useEffect, useState, useReducer } from 'react';
import * as eqpAPI from '../../utils/equipmentApi';
import * as asceanAPI from '../../utils/asceanApi';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
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
import { Tree } from 'react-d3-tree';

interface DialogNodeOption {
    text: string;
    next: string | null;
    npcIds?: any[];
    conditions?: { key: string; operator: string; value: string; }[];
    action?: string | null;
    keywords?: string[] | null;
};

export interface DialogNode {
    id: string;
    text: string;
    options: DialogNodeOption[] | [];
    npcIds: any[];
    rootId?: string;
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
    const [rootId, setRootId] = useState(node?.rootId);

    useEffect(() => {
        setNodeId(node.id);
        setText(node.text);
        setOptions(node.options);
        setNpcIds(node.npcIds);
        setRootId(node?.rootId);
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
            rootId,
        };
        onSave(newNode);
    };
    return (
        <Form style={{ fontSize: "12px" }}>
        <label htmlFor="nodeId">Node ID:</label>{' '}
        <Form.Control
            id="nodeId"
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
        /><br />

        <label htmlFor="text">Node Text:</label>{' '}
        <Form.Control
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
        /><br />
    
        <label htmlFor="npcIds">NPC Ids:</label>{' '}
        <Form.Control
            id="npcIds"
            type="text"
            value={npcIds.join(',')}
            onChange={(e) => setNpcIds(e.target.value.split(','))}
        /><br />

        <label htmlFor="rootId">Root ID:</label>{' '}
        <Form.Control
            id="rootId"
            type="text"
            value={rootId}
            onChange={(e) => setRootId(e.target.value)}
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
        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleSave}>Save Node {node.id}</Button>
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
    const [keywords, setKeywords] = useState(option.keywords);
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        setText(option.text);
        setNext(option.next);
        setNpcIds(option.npcIds);
        setConditions(option.conditions);
        setAction(option.action);
        setKeywords(option.keywords);
    }, [option]);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const condition = option.conditions ?? [{ key: '', operator: '', value: '' }];
        const conditionState = conditions ?? [{ key: '', operator: '', value: '' }];
        console.log(condition, conditions, "Condition Created and current Conditions")
        const newOption: DialogNodeOption = {
            ...option,
            conditions: [{
                ...condition[0],
                ...conditionState[0],
                [e.target.name]: e.target.value,
            }]
        };
        console.log(newOption, "New Option")
        setConditions(newOption.conditions);
    };

    const handleSave = () => {
        const newOption: DialogNodeOption = {
            text,
            next,
            npcIds,
            conditions,
            action,
            keywords,
        };
        onSave(newOption);
    };

    const handleDelete = () => {
        optionDelete(nodeId, index);
    };

    const toggleOption = () => setShowOption(!showOption);

    return (
        <div style={{ fontSize: "10px" }}>
            <Button variant='' style={{ color: 'gold', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={toggleOption}>Show Option</Button><br />
            {showOption ? (
                <>
            <Form.Label htmlFor="text">Option Text:</Form.Label>{' '}
            <Form.Control
                id="text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                /><br />
            <Form.Label htmlFor="next">Next Node ID:</Form.Label>{' '}
            <Form.Control 
                id="next"
                type="text"
                value={next ?? ''}
                onChange={(e) => setNext(e.target.value)}
            /><br />
            <Form.Label htmlFor="npcIds">NPC Ids:</Form.Label>{' '}
            <Form.Control
                id="npcIds"
                type="text"
                value={npcIds?.join(',')}
                onChange={(e) => setNpcIds(e.target.value.split(','))}
                /><br />
            <Form.Label htmlFor="keywords">Keywords:</Form.Label>{' '}
            <Form.Control
                id="keywords"
                type="text"
                value={keywords?.join(',')}
                onChange={(e) => setKeywords(e.target.value.split(','))}
                /><br />
            <Form.Label htmlFor="conditions">Conditions:</Form.Label><br />
            <Form.Label htmlFor="key">Key:</Form.Label>{' '}
            <Form.Control
                id="key"
                type="text"
                name='key'
                value={conditions && conditions?.map((condition) => `${condition?.key}`)}
                onChange={(e) => handleOptionChange(e as React.ChangeEvent<HTMLInputElement>)}
                /><br />
            <Form.Label htmlFor="operator">Operator:</Form.Label>{' '}
            <Form.Control
                id="operator"
                type="text"
                name='operator'
                value={conditions && conditions?.map((condition) => `${condition?.operator}`)}
                onChange={(e) => handleOptionChange(e as React.ChangeEvent<HTMLInputElement>)}
                /><br />
            <Form.Label htmlFor="value">Value:</Form.Label>{' '}
            <Form.Control
                id="value"
                type="text"
                name='value'
                value={conditions && conditions?.map((condition) => `${condition?.value}`)}
                onChange={(e) => handleOptionChange(e as React.ChangeEvent<HTMLInputElement>)}
                /><br />
            <Form.Label htmlFor="action">Action:</Form.Label>{' '}
            <Form.Control
                id="action"
                type="text"
                value={action ?? ''}
                onChange={(e) => setAction(e.target.value)}
                /><br />
            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleSave}>Save Option</Button>
            <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={handleDelete}>Delete Option</Button>
            <br /><br />
                </>
            ) : ('')}
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
    const [selectedNode, setSelectedNode] = useState<DialogNode | undefined>(nodes[0]);
  
    const handleSelectNode = (nodeId: string) => {
        const newNode = getNodeById(nodeId);
        setSelectedNode(newNode);
        getNodeById(nodeId);
    };

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
            <Dropdown className='my-2'>
            <Dropdown.Toggle variant="dark" id="dropdown-nodes">
                {selectedNode?.id} {selectedNode?.text.slice(0, 40)}
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
                {nodes.map((node) => (
                <Dropdown.Item key={node.id} onClick={() => handleSelectNode(node.id)}>{node.id} {node.text.slice(0, 50)}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>
            <Table striped bordered hover variant="dark" size="sm" style={{ color: "gold" }}>
                <thead>
                    <tr>
                        <th>Node ID</th>
                        <th>Node Text</th>
                        <th>Options</th>
                        <th>NPC Ids</th>
                        <th>Root ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableNodes.map((node) => (
                        node.id === selectedNode?.id && (
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
                            <td>{node?.rootId}</td>
                            <td>
                                <Button variant='' style={{ color: 'gold', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={() => getNodeId(node.id)}>Edit</Button>{' '}
                                <br /><br />
                                <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', fontWeight: 600, fontSize: "20px" }} onClick={() => onDelete(node.id)}>Delete</Button>
                            </td>
                        </tr>
                        )
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

async function convertToReactDeTreeFormat(nodes: DialogNode[]) {
    const treeData: { id: any; text: any; children: any[]; }[] = [];
    console.log(nodes, "Nodes in convertToReactDeTreeFormat") 
    async function traverse(node: DialogNode | undefined, parent?: { id?: string; text?: any; children?: any; }, depth = 0, maxDepth = 3) {
        const newNode: {
            id: any;
            text: any;
            parent: boolean;
            children: {
                id?: string;
                text?: any;
                children?: any[];
            }[];
        } = {
            id: node?.id || "",
            text: node?.text || "",
            parent: node?.options ? true : false,
            children: []
        };
    
        if (parent) {
            parent.children.push(newNode);
        } else {
            treeData.push(newNode);
        };
    
        if (depth < maxDepth && node?.options && node?.options.length) {
            await Promise.all(node.options.map(async option => {
                const newChildNode = {
                    id: `${node.id}-${option.next}`,
                    text: option.text,
                    parent: false,
                    children: []
                };
    
                newNode.children.push(newChildNode);
                await traverse(nodes.find(n => n.id === option.next), newChildNode, depth + 1, maxDepth);
            }));
        };
    };
    
  
    await traverse(nodes?.[0], undefined, 0, 5);
    console.log(treeData, "Tree Data")
    return treeData;
};

interface CustomTreeProps {
    data: any;
};
  
function CustomTree({ data }: CustomTreeProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [nodeExpanded, setNodeExpanded] = useState<boolean>(true); 

    const nodeExpansionHandler = (nodes: any, setIsExpanded: any) => {
        nodes.forEach((node: any) => {
            if (node.children && node.children.length > 0) {
                node.isExpanded = nodeExpanded;
                setIsExpanded(!isExpanded);
                nodeExpansionHandler(node.children, setIsExpanded);
                setNodeExpanded(!nodeExpanded);
            };
        });
    };
      
    const renderTree = (nodes: any, parent: any) => {
        return (
            <div>
            <ul className='mt-1'>
                {nodes.map((node: any, index: number) => (
                    <li key={index}>
                    <div className="node">
                    <div className="node-content">
                        <span style={{ color: node.parent ? "gold" : "#fdf6d8" }}> <p style={{ fontSize: "10px", display: "inline", color: "forestgreen" }}>[{node.id}]</p> {node.text}</span>
                        {node.children && node.children.length > 0 && (
                            <span
                            className={`${
                                node.isExpanded ? 'minus' : 'plus'
                            }-button`}
                            onClick={() => {
                                node.isExpanded = !node.isExpanded;
                                setIsExpanded(!isExpanded);
                            }}
                            >
                            {node.isExpanded ? ' --' : ' ++'}
                        </span>
                        )}
                    </div>
                    {node.children && node.children.length > 0 && node.isExpanded && (
                        <div className="node-children">
                        {renderTree(node.children, node)}
                        </div>
                    )}
                    </div>
                </li>
                ))}
            </ul>
            </div>
        );
    };
  
    return (
        <div>
            {/* <Tree 
                data={data}
                nodeSize={{ x: 150, y: 150 }}
                collapsible={false}
                orientation="vertical"
                separation={{ siblings: 2, nonSiblings: 2 }}
                translate={{ x: 50, y: 200 }} 
                transitionDuration={0}
                zoom={0.8}
            /> */}
                <Button variant='' style={{ color: nodeExpanded ? 'red' : 'green', fontSize: "20px" }} onClick={() => nodeExpansionHandler(data, setIsExpanded)}>{nodeExpanded ? 'Collapsed ' : 'Expanded '}Dialog Tree</Button>
                {renderTree(data, null)}
        </div>
    );
}

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
    const [lastNodeId, setLastNodeId] = useState<string>('');
    const [enemyNodes, setEnemyNodes] = useState<any[]>([]);
    const [searchedEnemy, setSearchedEnemy] = useState<string>('');
    const [treeData, setTreeData] = useState<any>([]);

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
        if (lastNodeId !== '') {
            getNodeById(lastNodeId);
        };
    }, [EnemyDialogNodes]);

    async function enemyNodeMiddleware(e: any) {
        e.preventDefault();
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
            const npcOptions = (node.options as any).filter((option: DialogNodeOption) => (option as DialogNodeOption)?.npcIds?.includes(enemy));
            if (npcOptions.length > 0) {
                const updatedNode = { ...node, options: npcOptions };
                matchingNodes.push(updatedNode);
            }
        };
        console.log(matchingNodes, 'Matching Nodes');
        setEnemyNodes(matchingNodes);
        const setupTreeData = await convertToReactDeTreeFormat(matchingNodes);
        console.log(setupTreeData, 'Setup Tree Data');
        setTreeData(setupTreeData);
        setSearchedEnemy(enemy);
        
    };

    function getNodeById(nodeId: string): DialogNode | undefined {
        const node = EnemyDialogNodes.nodes.find((node) => node.id === nodeId);
        if (node) {
            console.log(node, 'Node');
            setDialogNodes(node);
            setLastNodeId(nodeId);
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

    const cleanTitleText = (title: string) => {
        // {dialogNodes?.text.slice(0, 50)}...
        if (title.length > 40) {
            return `${title.slice(0, 40)}...`;
        } else {
            return title;
        };
    }
    
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
            <Col>
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
                </Card.Body>
            </Card>
            </Col>
            </Row>
            <Row className='my-5'>
            <Col >
            <Card style={{ background: 'black', color: 'white' }}>
            <Card.Title style={{ color: "#fdf6d8", marginTop: "1.5%", marginLeft: "5%" }}>Test Dialog: [ ID: {dialogNodes?.id} ] {cleanTitleText(dialogNodes?.text)}</Card.Title>
                <Card.Body className='mx-5'>
                <DialogNodeForm node={dialogNodes} onSave={handleNodeSave} optionDelete={handleOptionDelete} />
                </Card.Body>
            </Card>
            </Col>
            <Col style={{ background: "black" }}>
            { treeData.length > 0 ?
                <div className='tree-container'> 
                    <CustomTree data={treeData} />
                </div>
            : '' }
            </Col>
            </Row>
        </Container>
    );
};

export default GameAdmin;