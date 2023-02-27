export interface MapData {
    name: string;
    player: string;
    province: string;
    contentOptions: any[];
    size: number;
    contentClusters: object;
    map: {[key: string]: any};
    currentTile: object;
    initialPosition: object;
    lastTile: object;
    visitedTiles: {[key: string]: { color: string }}; 
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
    SET_NEW_MAP_COORDS: 'SET_NEW_MAP_COORDS',
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
    lastTile: {},
    visitedTiles: {},
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
                lastTile: action.payload,
            };
        case MAP_ACTIONS.SET_NEW_MAP_COORDS:
            const newCoords = action.payload.newTile;
            const visitedTiles = {...map.visitedTiles};
            visitedTiles[`${newCoords.x},${newCoords.y}`] = { color: newCoords.color };
            return {
                ...map,
                currentTile: action.payload.newTile,
                lastTile: action.payload.oldTile,
                visitedTiles: visitedTiles,
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
  