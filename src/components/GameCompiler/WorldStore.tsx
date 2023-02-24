interface MapData {
    name: string;
    player: string;
    province: string;
    contentOptions: any[];
    size: number;
    contentClusters: object;
    map: object;
    currentTile: object;
    initialPosition: object;
    context: string;
};

interface Action {
    type: string;
    payload: any;
};

export const MAP_ACTIONS = {
    SET_MAP_DATA: 'SET_MAP_DATA',
    SET_MAP_COORDS: 'SET_MAP_COORDS',
    SET_MAP_NAME: 'SET_MAP_NAME',
    SET_MAP_PLAYER: 'SET_MAP_PLAYER',
    SET_MAP_PROVINCE: 'SET_MAP_PROVINCE',
    SET_MAP_CONTENT_OPTIONS: 'SET_MAP_CONTENT_OPTIONS',
    SET_MAP_SIZE: 'SET_MAP_SIZE',
    SET_MAP_CONTENT_CLUSTERS: 'SET_MAP_CONTENT_CLUSTERS',
    SET_MAP: 'SET_MAP',
    SET_MAP_CONTEXT: 'SET_MAP_CONTEXT',
};

export const initialMapData: MapData = {
    name: '',
    player: '',
    province: '',
    contentOptions: [],
    size: 0,
    contentClusters: {},
    map: {},
    currentTile: {},
    initialPosition: { x: 0, y: 0, content: '' },
    context: '',
};

export const MapStore = (map: MapData, action: Action) => {
    switch (action.type) {
        case MAP_ACTIONS.SET_MAP_DATA:
            return {
                ...action.payload,
            };
        case MAP_ACTIONS.SET_MAP_COORDS:
            return {
                ...map,
                currentTile: action.payload,
                initialPosition: action.payload,
            };
        case MAP_ACTIONS.SET_MAP_NAME:
            return {
                ...map,
                name: action.payload,
            };
        case MAP_ACTIONS.SET_MAP_CONTEXT:
            return {
                ...map,
                context: action.payload,
            };
        default: return map;
    }
};

export const DIRECTIONS = {
    'up': { x: 0, y: 1 },
    'down': { x: 0, y: -1 },
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 },
    'upLeft': { x: -1, y: 1 },
    'upRight': { x: 1, y: 1 },
    'downLeft': { x: -1, y: -1 },
    'downRight': { x: 1, y: -1 },
};
  