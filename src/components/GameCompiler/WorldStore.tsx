export interface MapData {
    name: string;
    player: string;
    province: string;
    contentOptions: any[];
    size: number;
    contentClusters: object;
    contentCount: object;
    map: {[key: string]: any};
    currentTile: { x: number; y: number; content: string };
    lastCurrentTileContent: string;
    initialPosition: { x: number; y: number; content: string };
    lastTile: { x: number; y: number; content: string };
    visitedTiles: {[key: string]: { color: string; content: string }}; 
    context: string;
    generatingWorld: boolean;
    steps: number;
    contentMoved: boolean;
    joystickDisabled: boolean;
    player1Tile: null | { x: number; y: number; content: string; color: string };
    player2Tile: null | { x: number; y: number; content: string; color: string };
    player3Tile: null | { x: number; y: number; content: string; color: string };
    player4Tile: null | { x: number; y: number; content: string; color: string };
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
    SET_GENERATING_WORLD: 'SET_GENERATING_WORLD',
    SET_MOVE_CONTENT: 'SET_MOVE_CONTENT',
    SET_NEW_ENVIRONMENT: 'SET_NEW_ENVIRONMENT',
    SET_MAP_MOVED: 'SET_MAP_MOVED',
    SET_MULTIPLAYER_PLAYER: 'SET_MULTIPLAYER_PLAYER',
    SET_MAP_DATA_SYNC: 'SET_MAP_DATA_SYNC',
    SET_JOYSTICK_DISABLED: 'SET_JOYSTICK_DISABLED',
    SYNC_NEW_ENVIRONMENT: 'SYNC_NEW_ENVIRONMENT',
};

export const initialMapData: MapData = {
    name: '',
    player: '',
    province: '',
    contentOptions: [],
    size: 0,
    contentClusters: {},
    contentCount: {},
    map: {},
    currentTile: { x: 0, y: 0, content: '' },
    lastCurrentTileContent: '',
    initialPosition: { x: 0, y: 0, content: '' },
    lastTile: { x: 0, y: 0, content: '' },
    visitedTiles: {},
    context: '',
    generatingWorld: false,
    steps: 0,
    contentMoved: false,
    joystickDisabled: false,
    player1Tile:  null,
    player2Tile:  null,
    player3Tile:  null,
    player4Tile:  null,
};

export const MapStore = (map: MapData, action: Action) => {
    switch (action.type) {
        case 'SET_MAP_DATA':
            return {
                ...action.payload,
            };
        case 'SET_MAP_DATA_SYNC':
            return {
                ...map,
                map: action.payload.map
            };
        case 'SET_MAP_COORDS':
            return {
                ...map,
                currentTile: action.payload,
                initialPosition: action.payload,
                lastTile: action.payload,
                lastCurrentTileContent: '',
            };
        case 'SET_NEW_MAP_COORDS':
            const newCoords = action.payload.newTile;
            const visitedTiles = {...action.payload.map.visitedTiles};
            visitedTiles[`${newCoords.x},${newCoords.y}`] = { 
                color: newCoords.color,
                content: newCoords.content, 
            };
            for (const tile of action.payload.newTiles) {
                visitedTiles[`${tile.x},${tile.y}`] = { 
                    color: tile.color,
                    content: tile.content, 
                };
            };
            const disableJoystick = action.payload.newTile.content === 'enemy' || action.payload.newTile.content === 'npc' ? true : false;
            return {
                ...map,
                currentTile: action.payload.newTile,
                lastTile: action.payload.oldTile,
                visitedTiles: visitedTiles,
                steps: map.steps + 1,
                lastCurrentTileContent: '',
                joystickDisabled: disableJoystick,
            };
        case 'SET_MULTIPLAYER_PLAYER':
            const player = action.payload.player;
            const newerTile = action.payload.newTile;
            if (player === 1) {
                return {
                    ...map,
                    player1Tile: newerTile
                };
            } else if (player === 2) {
                return {
                    ...map,
                    player2Tile: newerTile
                };
            } else if (player === 3) {
                return {
                    ...map,
                    player3Tile: newerTile
                };
            } else if (player === 4) {
                return {
                    ...map,
                    player4Tile: newerTile
                };
            } else {
                return map;
            };
        case 'SET_MOVE_CONTENT':
            console.log("Moving Content");
            moveContent(action.payload, action.payload.contentClusters, action.payload.visitedTiles);
            const { x, y } = action.payload.currentTile;
            const mapX = x + 100;
            const mapY = y + 100;
            const newTile = action.payload.map[mapX][mapY];
            if (newTile.content !== action.payload.currentTile.content) {
                map.currentTile = newTile;      
            };
            return {
                    ...map,
                    contentMoved: true,
            };
        case 'SET_MAP_NAME':
            return {
                ...map,
                name: action.payload,
            };
        case 'SET_MAP_CONTEXT':
            return {
                ...map,
                context: action.payload,
            };
        case 'SET_GENERATING_WORLD':
            return {
                ...map,
                generatingWorld: action.payload,
            };
        case 'SET_NEW_ENVIRONMENT':
            const newLastCurrentTileContent = action.payload.currentTile.content;
            setEnvironmentTile(action.payload.currentTile.x, action.payload.currentTile.y, action.payload);
            sliceContentCluster(action.payload.currentTile.x, action.payload.currentTile.y, newLastCurrentTileContent, action.payload.contentClusters);
            setVisitedTile(action.payload.currentTile.x, action.payload.currentTile.y, action.payload.currentTile.x, action.payload.currentTile.y, action.payload);
            return {
                ...map,
                lastCurrentTileContent: newLastCurrentTileContent,
            };
        case 'SYNC_NEW_ENVIRONMENT':
            const preConvertedContent = action.payload.convertedTile.content;
            setEnvironmentTile(action.payload.convertedTile.x, action.payload.convertedTile.y, action.payload);
            sliceContentCluster(action.payload.convertedTile.x, action.payload.convertedTile.y, preConvertedContent, action.payload.contentClusters);
            syncVisitedTile(action.payload.convertedTile.x, action.payload.convertedTile.y, action.payload);
            return {
                ...map,
            };
        case 'SET_MAP_MOVED':
            return {
                ...map,
                contentMoved: action.payload,
            };
        case 'SET_JOYSTICK_DISABLED':
            return {
                ...map,
                joystickDisabled: action.payload,
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

function setEnvironmentTile(x: number, y: number, map: MapData) {
    const mapX = x + 100;
    const mapY = y + 100;
    
    if (mapX >= 0 && mapX < map.map.length && mapY >= 0 && mapY < map.map.length) {
        map.map[mapX][mapY].content = 'nothing';
        map.map[mapX][mapY].color = 'green';
    };
};

function syncVisitedTile(x: number, y: number, map: MapData) {
    if (map?.visitedTiles?.[`${x},${y}`]) {
        map.visitedTiles[`${x},${y}`].content = 'nothing';
        map.visitedTiles[`${x},${y}`].color = 'green';
    };
};

function setVisitedTile(x: number, y: number, newX: number, newY: number, map: MapData) {
    // console.log(map.visitedTiles[`${x},${y}`], "Visited Tile")
    let oldContent = map.visitedTiles[`${x},${y}`].content;
    let oldColor = map.visitedTiles[`${x},${y}`].color;

    map.visitedTiles[`${x},${y}`].content = 'nothing';
    map.visitedTiles[`${x},${y}`].color = 'green';

    if (map.visitedTiles[`${newX},${newY}`]) {
        map.visitedTiles[`${newX},${newY}`].content = oldContent;
        map.visitedTiles[`${newX},${newY}`].color = oldColor;
    };
};

function sliceContentCluster(oldX: number, oldY: number, contentType: string, contentClusters: any) {
    // Get the index of the old coordinate in the corresponding array in contentClusters
    const oldClusterIndex = contentClusters[contentType].findIndex((coord: number[]) => coord[0] === oldX && coord[1] === oldY);

    // Remove the old coordinate from the array
    if (oldClusterIndex !== -1) {
      contentClusters[contentType].splice(oldClusterIndex, 1);
    };
    
};
  
export function moveContent(mapState: MapData, contentClusters: any, visitedTiles: any) {
    // Define a function to get the adjacent tiles for a given coordinate
    function getAdjacentTiles(x: number, y: number): [number, number][] {
        return [
            [x, y + 1],
            [x, y - 1],
            [x + 1, y],
            [x - 1, y],
            [x + 1, y + 1],
            [x + 1, y - 1],
            [x - 1, y - 1],
            [x - 1, y + 1],
        ];
    };

    function setColor(content: string) {
        switch (content) {
            case 'enemy': {
                return 'red';
            };
            case 'npc': {
                return 'blue';
            };
            case 'treasure': {
                return 'gold';
            };
            case 'landmark': {
                return 'blueviolet';
            };
            case 'hazard': {
                return 'darkorange';
            };
            case 'dungeon': {
                return 'brown';
            };
            case 'city': {
                return 'purple';
            };
            case 'nothing': {
                return 'green';
            };
            case 'weather': {
                return 'teal';
            };
            case 'ruins': {
                return 'grey';
            };
            case 'cave': {
                return 'sienna';
            };
            case 'phenomena': {
                return 'pink';
            };
            case 'wonder': {
                return 'white';
            };
        };
    };

    function updateContentClusters(oldX: number, oldY: number, newX: number, newY: number, contentType: string) {
        // Get the index of the old coordinate in the corresponding array in contentClusters
        const oldClusterIndex = contentClusters[contentType].findIndex((coord: number[]) => coord[0] === oldX && coord[1] === oldY);
      
        // Remove the old coordinate from the array
        if (oldClusterIndex !== -1) {
          contentClusters[contentType].splice(oldClusterIndex, 1);
        };
      
        // Add the new coordinate to the array for the new content value
        contentClusters[contentType].push([newX, newY]);
    };
    // Loop through each content cluster
    for (const cluster in contentClusters) {
        // If the cluster is 'nothing', skip it
        if (cluster === 'weather' || cluster === 'nothing' || cluster === 'ruins' || cluster === 'city' || cluster === 'dungeon' || cluster === 'cave' || cluster === 'hazard' || cluster === 'landmark' || cluster === 'treasure' || cluster === 'wonder') continue;
        // Adding weather to the list for now cause that's usually 3-4k where enemies/npcs/phenomena combined typically are 400~
        // Loop through each coordinate in the cluster
        for (const coord of contentClusters[cluster]) {
            const [x, y] = coord;
            const oldMapX: number = x + 100;
            const oldMapY: number = y + 100;

            // Get the adjacent tiles
            const adjacentTiles: [number, number][] = getAdjacentTiles(x, y);
            
            // Filter the adjacent tiles to find the ones that are 'nothing'
            const eligibleTiles: [number, number][] = adjacentTiles.filter((tile) => {
                const [tileX, tileY] = tile;
                const mapX = tileX + 100;
                const mapY = tileY + 100;
                return (
                    mapX >= 0 &&
                    mapX < mapState.map.length &&
                    mapY >= 0 &&
                    mapY < mapState.map.length &&
                    mapState.map[mapX][mapY].content === 'nothing'
                );
            });
    
            // If there are eligible tiles, choose one at random and move the content
            if (eligibleTiles.length > 0) {
                const randomIndex: number = Math.floor(Math.random() * eligibleTiles.length);
                const [newX, newY] = eligibleTiles[randomIndex];
                const newMapX: number = newX + 100;
                const newMapY: number = newY + 100;

                // Update the content property of the new tile
                const oldContent = mapState.map[oldMapX][oldMapY].content;
                mapState.map[newMapX][newMapY].content = cluster;
                mapState.map[newMapX][newMapY].color = setColor(cluster);
                setEnvironmentTile(x, y, mapState);
                updateContentClusters(x, y, newX, newY, cluster);
                const visitedTile = visitedTiles?.[`${x},${y}`];
                if (visitedTile) {
                    setVisitedTile(x, y, newX, newY, mapState);
                };
            };
        };
    };
    return mapState;
};

export function debounce<T>(func: (this: T, ...args: any[]) => void, delay: number): (this: T, ...args: any[]) => void {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: T, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
};

export async function getAsceanCoords(x: number, y: number, map: any) {
    const tile = map?.[x + 100]?.[y + 100];
    return tile ?? null;
};

export async function getAsceanGroupCoords(x: number, y: number, map: any) {
    let tiles = [];
    for (let i = -4; i < 5; i++) {
        for (let j = -4; j < 5; j++) {
            const tileX = x + 100 + i;
            const tileY = y + 100 + j;
            const tile = map?.[tileX]?.[tileY];
            if (tile) {
                tiles.push(tile);
            };
        };
    };      
    return tiles;
};

// if (oldContent !== 'nothing') {

                    // console.log(mapState.map[oldMapX][oldMapY], "Old Tile?");
                    // mapState.visitedTiles[`${x},${y}`].content = 'nothing';
                    // mapState.visitedTiles[`${x},${y}`].color = 'green';
                    // console.log(mapState.map[oldMapX][oldMapY], "New Tile?");
                    // if (mapState.visitedTiles[`${x},${y}`]) {
                    //     console.log(mapState.visitedTiles[`${x},${y}`], mapState.map[oldMapX][oldMapY], "Visited Tile, Map Tile Pre-Func");
                    //     setVisitedTile(x, y, mapState);
                    //     console.log(mapState.visitedTiles[`${x},${y}`], mapState.map[oldMapX][oldMapY], "Visited Tile, Map Tile Post-Func");
                    // };
                // };



                // Loop through each visited tile
                // for (const tileCoord in visitedTiles) {
                //     let visitedTile = visitedTiles[tileCoord];
                //     const [tileX, tileY] = tileCoord.split(",").map(Number);
                //     const newMapX = tileX + 100;
                //     const newMapY = tileY + 100;

                //     // console.log(visitedTile, visitedTiles[`${tileX},${tileY}`], "Visited Tile & visitedTiles pre for loop");
                //     // If the visited tile's content matches the current cluster being moved, update the visited tile with the new cluster information
                //     visitedTile.content = mapState.map[newMapX][newMapY].content;
                //     visitedTile.color = mapState.map[newMapX][newMapY].color;
                //     visitedTiles[`${tileX},${tileY}`] = visitedTile;
                //     // console.log(visitedTile, visitedTiles[`${tileX},${tileY}`], "Visited Tile & visitedTiles post for loop");
                //     // visitedTiles[`${tileX},${tileY}`].content = mapState.map[newMapX][newMapY].content;
                //     // visitedTiles[`${tileX},${tileY}`].color = mapState.map[newMapX][newMapY].color;
                //     // setVisitedTile(tileX, tileY, mapState);
                // };
                // mapState.visitedTiles = visitedTiles;