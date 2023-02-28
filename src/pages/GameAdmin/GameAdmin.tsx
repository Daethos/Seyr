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
import { useNavigate } from 'react-router-dom';
import AsceanListItem from '../../components/GameCompiler/AsceanListItem';
import AdminAscean from '../../components/GameCompiler/AdminAscean';
import MerchantTable from '../../components/GameCompiler/MerchantTable';

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
}

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
}

export interface GameAdminData {
    loading: boolean;
    asceanLoaded: boolean;
    testLevel: number;
    equipmentTable: any[];
    searchQuery: string;
    asceanSearched: Ascean;
    asceanSearchData: any[];
    generatedAscean: object;
    error: { title: string, content: string };
    setError: Function;
}

export interface Action {
    type: string;
    payload: any;
};

export const ACTIONS = {
    SET_LOADING: 'set-loading',
    SET_TEST_LEVEL: 'set-test-level',
    SET_EQUIPMENT_TABLE: 'set-equipment-table',
    SET_ASCEAN: 'set-ascean',
    SET_ASCEAN_DATA: 'set-ascean-data',
    SET_SEARCH_QUERY: 'set-search-query',
    SET_ERROR: 'set-error',
    GENERATE_ASCEAN: 'generate-ascean',
    DELETE_EQUIPMENT_TABLE: 'delete-equipment-table',
};

const initialGameAdaminData: GameAdminData = {
    loading: false,
    asceanLoaded: false,
    testLevel: 0,
    equipmentTable: [],
    searchQuery: '',
    asceanSearched: {...asceanTemplate},
    asceanSearchData: [],
    generatedAscean: {...asceanTemplate},
    error: { title: '', content: '' },
    setError: () => {},
}

const GameAdminStore = (state: GameAdminData, action: Action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING: {
            return { 
                ...state, 
                loading: action.payload 
            };
        };
        case ACTIONS.SET_TEST_LEVEL: {
            return { 
                ...state,
                loading: false, 
                testLevel: action.payload 
            };
        };
        case ACTIONS.SET_EQUIPMENT_TABLE: {
            return { 
                ...state,
                loading: false, 
                equipmentTable: action.payload 
            };

        };
        case ACTIONS.SET_ASCEAN: {
            return { 
                ...state,
                loading: false, 
                asceanSearched: action.payload 
            };
        };
        case ACTIONS.SET_ASCEAN_DATA: {
            console.log(action.payload, 'Payload in SET_ASCEAN_DATA');
            return {
                ...state,
                loading: false,
                asceanSearchData: action.payload,
            };
        };
        case ACTIONS.SET_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.payload
            };
        };
        case ACTIONS.GENERATE_ASCEAN: {
            console.log(action.payload, 'Payload in GENERATE_ASCEAN');
            return {
                ...state,
                loading: false,
                asceanLoaded: true,
                generatedAscean: action.payload
            };
        };
        case ACTIONS.SET_ERROR: {
            return {
                ...state,
                loading: false,
                error: { title: action.payload.title, content: action.payload.content }
            };
        };
        case ACTIONS.DELETE_EQUIPMENT_TABLE: {
            return {
                ...state,
                loading: false,
                equipmentTable: []
            };
        };
        default: {
            return state;
        };
    };
};

interface GameAdminProps {
    user: { username: string, _id: string };
}

const GameAdmin = ({ user }: GameAdminProps) => {
    const [state, dispatch] = useReducer(GameAdminStore, initialGameAdaminData);
    const [itemPurchased, setItemPurchased] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(state, 'The State ~=V');

    }, [state])

    useEffect(() => {
        if (user.username !== 'lonely guy') navigate('/');
        return () => {
            console.log('Unmounting');
        }
    }, [user]);
    

    const getEquipment = async (level: number) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        try {
            if (state.equipmentTable.length > 0) {
                const deleteResponse = await eqpAPI.deleteEquipment(state.equipmentTable);
                console.log(deleteResponse, 'Delete Response');
                // dispatch({ type: ACTIONS.DELETE_EQUIPMENT_TABLE, payload: []});
            }
            const response = await eqpAPI.getMerchantEquipment(level);
            dispatch({
                type: ACTIONS.SET_EQUIPMENT_TABLE,
                payload: response.data,
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

    const setTestLevel = (e: any) => {
        if (e.target.value > 20) e.target.value = 20;
        if (e.target.value < 0) e.target.value = 0;
        dispatch({ type: ACTIONS.SET_TEST_LEVEL, payload: e.target.value });
    };

    const searchAsceanName = async (name: string) => {
        dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: name });
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
            // const response = await asceanAPI.getOneAscean(id);
            const updatedResponse = await asceanAPI.getAsceanStats(id);
            dispatch({
                type: ACTIONS.GENERATE_ASCEAN,
                payload: updatedResponse.data.data,
            });
        } catch (err: any) {
            console.log(err.message);
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
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Ascean Name"
                                    onChange={(e) => fetchAscean(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        {state.asceanSearchData.length > 0 ? 
                            state.asceanSearchData.map((ascean: Ascean, index: number) => {
                                return (
                                    <AsceanListItem ascean={ascean} state={state} dispatch={dispatch} key={index} fetch={() => generateAscean(ascean._id)} />
                                    )})
                             : '' }
                        { state.asceanLoaded ?
                        <AdminAscean ascean={state.generatedAscean} loading={false} />
                        : ''}
                        {/* <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', fontSize: 25 + 'px' }} onClick={() => generateAscean(state.asceanSearched._id)}>Generate Ascean</Button> */}
                    </Card.Body>
                </Card>
            </Row>
            <Row className='my-5'>
                <Card style={{ background: 'black', color: 'white' }}>
                    <Card.Body>
                        <Card.Title>Test Equipment</Card.Title>
                        <Card.Text>Placeholder Test for the Equipment</Card.Text>
                        {/* <Button variant='' style={{ color: 'blue', fontVariant: 'small-caps' }} onClick={writeEquipmentFile}>Write Equipment</Button> */}
                        <Form>
                            <Form.Group>
                                <Form.Label>Test Level</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="20"
                                    placeholder="Enter Test Level"
                                    onChange={(e) => setTestLevel(e)}
                                />
                            </Form.Group>
                        </Form>
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={() => getEquipment(state.testLevel)}>Get Equipment</Button>
                            { state.equipmentTable.length > 0 ?
                            ''
                            // <MerchantTable table={state.equipmentTable} ascean={state.generatedAscean.ascean} itemPurchased={itemPurchased} setItemPurchased={setItemPurchased} error={state.error} setError={state.setError} />
                            : '' }
                        <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={() => deleteEquipment(state.equipmentTable)}>Delete Equipment</Button>
                        </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default GameAdmin;