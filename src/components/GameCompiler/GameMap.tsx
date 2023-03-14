import { useCallback, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MapData } from './WorldStore';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided, DraggableProvided } from 'react-beautiful-dnd';

interface Tile {
    x: number;
    y: number;
    content: string;
    color: string;
    visited: boolean;
}

enum MapMode {
    FULL_MAP,
    QUADRANT,
    SURROUNDING_TILES,
}

interface Position {
    x: number;
    y: number;
};

interface MapProps {
  mapData: any;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
//   onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
//   translation: { x: number; y: number };
};

const GameMap = ({ mapData, canvasRef }: MapProps) => {
    const [mapMode, setMapMode] = useState<MapMode>(MapMode.FULL_MAP);
    const [mapVisible, setMapVisible] = useState(false);
    const [canvasWidth, setCanvasWidth] = useState<number>(402);
    const [canvasHeight, setCanvasHeight] = useState<number>(402);
    const [canvasPosition, setCanvasPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        handleMapMode(mapMode);
        // console.log(mapData)
    }, [mapData, mapVisible, mapMode]);

    useEffect(() => {
        console.log(canvasWidth, canvasHeight, canvasPosition, '<- Canvas Width, Height, Position');
    }, [canvasWidth, canvasHeight, canvasPosition]);
    
    function handleMapMode(mode: MapMode) {
        switch (mode) {
            case MapMode.FULL_MAP:
                renderFullMap();
                break;
            case MapMode.QUADRANT:
                renderQuadrant();
                break;
            case MapMode.SURROUNDING_TILES:
                renderSurroundingTiles();
                break;
            default:
                break;
        };
    };

    function drawMap(ctx: CanvasRenderingContext2D, mapData: MapData, canvas: HTMLCanvasElement, visitedTiles: {[key: string]: Tile}): void {
        const tileSize = 2; // set the tile size to 16 pixels
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const playerX = mapData?.currentTile?.x;
        const playerY = mapData?.currentTile?.y;
      
        for (const coords in visitedTiles) {
            const [x, y] = coords.split(',').map(Number);
            const tile = visitedTiles[coords];
            let color = tile.color || 'gray'; // set the tile color to gray if no color is specified
            if (x === playerX && y === playerY) {
                color = 'gold'; // set the current tile color to gold
            }
            const offsetX = canvasWidth / 2 + x * tileSize; // calculate the tile position on the canvas
            const offsetY = canvasHeight / 2 - y * tileSize;
            ctx.fillStyle = color;
            ctx.fillRect(offsetX, offsetY, tileSize, tileSize);
        };
    };

    const  handleMap = () => {
        setMapMode((mode) => {
            switch (mode) {
            case MapMode.FULL_MAP:
                return MapMode.QUADRANT;
            case MapMode.QUADRANT:
                return MapMode.SURROUNDING_TILES;
            case MapMode.SURROUNDING_TILES:
                return MapMode.FULL_MAP;
            default:
                return mode;
            };
        });
    };

    function renderFullMap() {
        const canvasWidth = 402;
        const canvasHeight = 402;
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawMap(ctx, mapData, canvas, mapData?.visitedTiles);
            };
        };
    };

    function renderQuadrant() {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const canvasWidth = 200;
                const canvasHeight = 200;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                const playerX = mapData?.currentTile?.x;
                const playerY = mapData?.currentTile?.y;
                let quadX = '';
                let quadOffsetX = 0;
                if (playerX < 0) {
                    quadX = 'left';
                    quadOffsetX = -50;
                } else {
                    quadX = 'right';
                    quadOffsetX = 50;
                }
                let quadY = '';
                let quadOffsetY = 0;
                if (playerY < 0) {
                    quadY = 'bottom';
                    quadOffsetY = -50;
                } else {
                    quadY = 'top';
                    quadOffsetY = 50;
                };
                const quadrantTiles = getQuadrantTiles(mapData?.visitedTiles, quadX, quadY);
                drawMapQuadrant(ctx, mapData, canvas, quadrantTiles, [quadOffsetX, quadOffsetY]);
            };
        };
    };

    function drawMapQuadrant(ctx: CanvasRenderingContext2D, mapData: MapData, canvas: HTMLCanvasElement, visitedTiles: {[key: string]: Tile}, quadOffset: [number, number]): void {
        const tileSize = 2;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      
        const playerX = mapData?.currentTile?.x;
        const playerY = mapData?.currentTile?.y;
      
        for (const coords in visitedTiles) {
            const [x, y] = coords.split(',').map(Number);
            const tile = visitedTiles[coords];
            let color = tile.color || 'gray'; // set the tile color to gray if no color is specified
            if (x === playerX && y === playerY) {
                color = 'gold'; // set the current tile color to gold
            }
            const offsetX = canvasWidth / 2 + (x - quadOffset[0]) * tileSize; // calculate the tile position on the canvas
            const offsetY = canvasHeight / 2 - (y - quadOffset[1]) * tileSize;
            ctx.fillStyle = color;
            ctx.fillRect(offsetX, offsetY, tileSize, tileSize);
        };
    };

    function getQuadrantTiles(visitedTiles: {[key: string]: Tile}, quadX: string, quadY: string): {[key: string]: Tile} {
        const quadrantTiles: {[key: string]: Tile} = {};
        const xMin = quadX === 'left' ? -100 : 0;
        const xMax = quadX === 'left' ? 0 : 101;
        const yMin = quadY === 'top' ? 0 : -100;
        const yMax = quadY === 'top' ? 101 : 0;
        
        for (const coords in visitedTiles) {
            const [x, y] = coords.split(',').map(Number);
            quadrantTiles[coords] = visitedTiles[coords];
            if (x >= xMin && x < xMax && y >= yMin && y < yMax) {
                // Do nothing, this tile is within the desired quadrant
            } else {
                delete quadrantTiles[coords]; // Remove this tile from the quadrantTiles object
            };
        };
        return quadrantTiles;
    };
      
    function drawSurroundingTiles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, surroundingTiles: {[key: string]: Tile}, playerPosition: {x: number, y: number}): void {
        const tileSize = 2; 
      
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      
        for (const coords in surroundingTiles) {
            const [x, y] = coords.split(',').map(Number);
            const tile = surroundingTiles[coords];
            let color = tile.color || 'gray'; // set the tile color to gray if no color is specified
            if (x === playerPosition.x && y === playerPosition.y) {
                color = 'gold'; // set the current tile color to gold
            };
            const offsetX = canvasWidth / 2 + (x - playerPosition.x) * tileSize; // calculate the tile position on the canvas
            const offsetY = canvasHeight / 2 - (y - playerPosition.y) * tileSize;
            ctx.fillStyle = color;
            ctx.fillRect(offsetX, offsetY, tileSize, tileSize); 
        };
    };
      
    function renderSurroundingTiles() {
        const canvasWidth = 100;
        const canvasHeight = 100;
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const playerX = mapData?.currentTile?.x;
                const playerY = mapData?.currentTile?.y;
                const surroundingTiles = getSurroundingTiles(mapData?.visitedTiles, { x: playerX, y: playerY });
                ctx.translate(canvasWidth / 2, canvasHeight / 2); // translate the canvas to center on the player
                drawSurroundingTiles(ctx, canvas, surroundingTiles, { x: playerX, y: playerY });
            };
        };
    };
      
    function getSurroundingTiles(visitedTiles: {[key: string]: Tile}, playerPosition: {x: number, y: number}): {[key: string]: Tile} {
        const surroundingTiles: {[key: string]: Tile} = {};
        for (let x = playerPosition.x - 24; x <= playerPosition.x + 24; x++) {
            for (let y = playerPosition.y - 24; y <= playerPosition.y + 24; y++) {
                const coords = `${x},${y}`;
                if (visitedTiles && visitedTiles[coords]) {
                    surroundingTiles[coords] = visitedTiles[coords];
                };
            };
        };
        return surroundingTiles;
    };

    function debounce<T>(func: (this: T, ...args: any[]) => void, delay: number): (this: T, ...args: any[]) => void {
        let timer: ReturnType<typeof setTimeout>;
        return function (this: T, ...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };


    const canvasSizes = [100.5, 201, 301.5, 402, 502.5, 603];
    const debounceDelay = 100; // milliseconds

    // function handleResize(event: React.UIEvent<HTMLCanvasElement>) {
    //     const maxWidth = canvasSizes[canvasSizes.length - 1];
    //     const maxHeight = canvasSizes[canvasSizes.length - 1];
        
    //     let currentWidth = canvasWidth;
    //     let currentHeight = canvasHeight;
        
    //     for (let i = 0; i < canvasSizes.length; i++) {
    //         console.log(i, canvasSizes[i], currentWidth, "Resizing")
    //         if (canvasSizes[i] === currentWidth) {
    //             if (currentWidth === maxWidth) {
    //                 currentWidth = canvasSizes[0];
    //                 currentHeight = canvasSizes[0];
    //                 break;
    //             } else {
    //                 currentWidth = canvasSizes[i + 1];
    //                 currentHeight = canvasSizes[i + 1];
    //                 break;
    //             };
    //         };
    //     };

    //     const canvas = canvasRef.current;
    //     if (canvas) {
    //     canvas.width = currentWidth;
    //     canvas.height = currentHeight;
    //     }

    //     setCanvasWidth(currentWidth);
    //     setCanvasHeight(currentHeight);
    // };

    // const debouncedResize = useCallback(debounce(handleResize, debounceDelay), []);

    // function handleTouchEnd(event: React.TouchEvent<HTMLCanvasElement>) {
    //     console.log("End Touch")
    //     debouncedResize(event);
    // }
    // const [translation, setTranslation] = useState({ x: -50, y: -50 });

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (!canvas) {
    //       return;
    //     }
      
    //     const ctx = canvas.getContext("2d");
    //     if (!ctx) {
    //       return;
    //     }
      
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.save();
    //     ctx.translate(translation.x, translation.y);
      
    //     // Draw your canvas content here
      
    //     ctx.restore();
    // }, [translation]);
      

    // const onDragEnd = (result: DropResult) => {
    //     if (!result.destination) {
    //       return;
    //     }
    //     const mapElement = canvasRef.current;
    //     if (result.draggableId === 'map' && mapElement) {
    //       const destination = result.destination as unknown as { x: number, y: number };
    //       const droppableRect = mapElement.getBoundingClientRect();
    //       const newPosition = {
    //         x: destination.x - droppableRect.left,
    //         y: destination.y - droppableRect.top,
    //       };
    //       setTranslation(newPosition);
    //     }
    // };
      
      
      
      
      
    
      
    // const onDragEnd = (result: DropResult) => {
    //     const { destination, source } = result;
    //     console.log(destination, source, "Drag End")
    //     if (!destination) {
    //       return;
    //     }
    //     // Calculate the change in position of the draggable element
    //     const deltaX = destination.index - source.index;
    //     const deltaY = destination.index - source.index;
      
    //     // Get the current position of the canvas
    //     const canvasElement = canvasRef.current;
    //     if (!canvasElement) return;
    //     const currentLeft = parseFloat(canvasElement.style.left);
    //     const currentTop = parseFloat(canvasElement.style.top);
      
    //     // Update the style of the canvas based on the change in position of the draggable element
    //     canvasElement.style.left = `${currentLeft + deltaX}px`;
    //     canvasElement.style.top = `${currentTop + deltaY}px`;
    //   };
      

    const setMapVisibility = () => {
        setMapVisible(!mapVisible);
    };

    return (
        <>
        <Button variant='' onClick={setMapVisibility} className='map-button' style={{ 
            color: "goldenrod", 
            gridColumnStart: 1, 
            gridRowStart: 1,
            position: "absolute", 
            marginTop: "-2.25%",
            marginLeft: "3%",
            zIndex: 99,
            clipPath: "rect(30% at 30% 30%)", 
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 464.06 464.06">
            <path d="M401.824,133.379c3.038,0,5.5-2.462,5.5-5.5v-8.87h21.826c3.038,0,5.5-2.462,5.5-5.5v-10.72h23.91   c3.038,0,5.5-2.462,5.5-5.5v-21.32c0-3.038-2.462-5.5-5.5-5.5h-23.91v-10.72c0-3.038-2.462-5.5-5.5-5.5h-21.826v-8.866   c0-3.038-2.462-5.5-5.5-5.5H62.243c-3.038,0-5.5,2.462-5.5,5.5v8.866H34.92c-3.038,0-5.5,2.462-5.5,5.5v10.72H5.5   c-3.038,0-5.5,2.462-5.5,5.5v21.32c0,3.038,2.462,5.5,5.5,5.5h23.92v10.72c0,3.038,2.462,5.5,5.5,5.5h21.823v8.87   c0,3.038,2.462,5.5,5.5,5.5h3.212v197.302h-3.212c-3.038,0-5.5,2.462-5.5,5.5v8.866H34.92c-3.038,0-5.5,2.462-5.5,5.5v10.72H5.5   c-3.038,0-5.5,2.462-5.5,5.5v21.32c0,3.038,2.462,5.5,5.5,5.5h23.92v10.72c0,3.038,2.462,5.5,5.5,5.5h21.823v8.87   c0,3.038,2.462,5.5,5.5,5.5h339.581c3.038,0,5.5-2.462,5.5-5.5v-8.87h21.826c3.038,0,5.5-2.462,5.5-5.5v-10.72h23.91   c3.038,0,5.5-2.462,5.5-5.5v-21.32c0-3.038-2.462-5.5-5.5-5.5h-23.91v-10.72c0-3.038-2.462-5.5-5.5-5.5h-21.826v-8.866   c0-3.038-2.462-5.5-5.5-5.5h-3.213V133.379H401.824z M453.06,81.469v10.32h-18.41v-10.32H453.06z M11,91.789v-10.32h18.42v10.32H11   z M40.42,108.009v-42.76h16.323v42.76H40.42z M11,382.587v-10.32h18.42v10.32H11z M40.42,398.807v-42.76h16.323v42.76H40.42z    M453.06,372.267v10.32h-18.41v-10.32H453.06z M423.65,65.249v42.76h-16.326v-42.76H423.65z M67.743,50.883h328.581v71.496H67.743   V50.883z M396.324,413.177H67.743v-71.496h328.581V413.177z M423.65,356.047v42.76h-16.326v-42.76H423.65z M387.611,330.681H76.456   V133.379h311.156V330.681z"></path>
            <path d="M156.14,166.379h100c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-100c-3.038,0-5.5,2.462-5.5,5.5   S153.103,166.379,156.14,166.379z"></path>
            <path d="M280.64,166.379h72.89c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-72.89c-3.038,0-5.5,2.462-5.5,5.5   S277.603,166.379,280.64,166.379z"></path>
            <path d="M110.54,166.379h21.1c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-21.1c-3.038,0-5.5,2.462-5.5,5.5   S107.502,166.379,110.54,166.379z"></path>
            <path d="M353.53,179.129H210.64c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h142.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,179.129,353.53,179.129z"></path>
            <path d="M110.54,190.129h75.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-75.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,190.129,110.54,190.129z"></path>
            <path d="M353.53,202.879h-96.89c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h96.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,202.879,353.53,202.879z"></path>
            <path d="M110.54,213.879h121.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-121.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,213.879,110.54,213.879z"></path>
            <path d="M308.64,232.119c0-3.038-2.462-5.5-5.5-5.5h-123.5c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h123.5   C306.178,237.619,308.64,235.157,308.64,232.119z"></path>
            <path d="M353.53,226.619h-25.89c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h25.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,226.619,353.53,226.619z"></path>
            <path d="M110.54,237.619h44.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-44.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,237.619,110.54,237.619z"></path>
            <path d="M353.53,250.369h-87.39c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h87.39c3.038,0,5.5-2.462,5.5-5.5   S356.568,250.369,353.53,250.369z"></path>
            <path d="M110.54,261.369h131.1c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-131.1c-3.038,0-5.5,2.462-5.5,5.5   S107.502,261.369,110.54,261.369z"></path>
            <path d="M353.53,274.119H160.64c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h192.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,274.119,353.53,274.119z"></path>
            <path d="M110.54,285.119h25.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-25.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,285.119,110.54,285.119z"></path>
            <path d="M353.53,297.869h-42.39c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h42.39c3.038,0,5.5-2.462,5.5-5.5   S356.568,297.869,353.53,297.869z"></path>
            <path d="M110.54,308.869h176.1c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-176.1c-3.038,0-5.5,2.462-5.5,5.5   S107.502,308.869,110.54,308.869z"></path>
            <path d="M368.82,68.53h15.213c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5H368.82c-3.038,0-5.5,2.462-5.5,5.5   S365.783,68.53,368.82,68.53z"></path>
            <path d="M223.034,68.53H343.82c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5H223.034c-3.038,0-5.5,2.462-5.5,5.5   S219.996,68.53,223.034,68.53z"></path>
            <path d="M241.034,395.53H229.82c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h11.213c3.038,0,5.5-2.462,5.5-5.5   S244.071,395.53,241.034,395.53z"></path>
            <path d="M208.82,395.53H80.034c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5H208.82c3.038,0,5.5-2.462,5.5-5.5   S211.857,395.53,208.82,395.53z"></path>
            </svg>
        </Button>
        {
            mapVisible ?
            (

        // <DragDropContext onDragEnd={onDragEnd}>
        // <Droppable droppableId="canvas-element">
        //     {(provided) => (
        //         <div ref={provided.innerRef} {...provided.droppableProps}>
        //     <Draggable draggableId="map" index={1} >
        //     {(provided) => (
                <canvas
                ref={canvasRef}
                // ref={(el) => {
                //     canvasRef.current = el;
                //     provided.innerRef(el); 
                // }}
                onClick={handleMap}
                className='game-map'
                // {...provided.draggableProps} 
                // {...provided.dragHandleProps} 
                style={{
                    // ...provided.draggableProps.style,
                    // transform: `translate(${translation.x}%, ${translation.y}%)`
                }}
                />

                // )}
        //     </Draggable>
        //     {provided.placeholder}
        // </div>
        // )}
        // </Droppable>
        // </DragDropContext>

            ) : ( '' )
        }
        </>
    );
};

export default GameMap;
