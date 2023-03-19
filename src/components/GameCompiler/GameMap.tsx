import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MapData } from './WorldStore';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MapMode } from '../../pages/GameSolo/GameSolo';

interface Tile {
    x: number;
    y: number;
    content: string;
    color: string;
    visited: boolean;
}

interface MapProps {
    mapData: any;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    canvasPosition: { x: number; y: number };
    setCanvasPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    canvasHeight: number;
    canvasWidth: number;
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>;
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>;
    mapMode: MapMode;
    setMapMode: React.Dispatch<React.SetStateAction<MapMode>>;
};

const GameMap = ({ mapData, canvasRef, canvasPosition, setCanvasPosition, canvasHeight, canvasWidth, setCanvasHeight, setCanvasWidth, mapMode, setMapMode }: MapProps) => {
    const [mapVisible, setMapVisible] = useState(false);
    const [draggableElements, setDraggingElements] = useState([
        { id: "dz-1" },
        { id: "dz-2" },
        { id: "dz-3" },
        { id: "dz-4" },
        { id: "dz-5" },
        { id: "dz-6" },
        { id: "dz-7" },
        { id: "dz-8" },
        { id: "dz-9" },
        { id: "dz-10" },
        { id: "dz-11" },
        { id: "dz-12" },
        { id: "dz-13" },
        { id: "dz-14" },
        { id: "dz-15" },
        { id: "dz-16" },
        { id: "dz-17" },
        { id: "dz-18" },
        { id: "dz-19" },
        { id: "dz-20" },
        { id: "dz-21" },
        { id: "dz-22" },
        { id: "dz-23" },
        { id: "dz-24" },
        { id: "dz-25" },
        { id: "dz-26" },
        { id: "dz-27" },
        { id: "dz-28" },
        { id: "dz-29" },
        { id: "dz-30" },
        { id: "dz-31" },
        { id: "dz-32" },
        { id: "dz-33" },
        { id: "dz-34" },
        { id: "dz-35" },
        { id: "dz-36" },
        { id: "dz-37" },
        { id: "dz-38" },
        { id: "dz-39" },
        { id: "dz-40" },
        { id: "dz-41" },
        { id: "dz-42" },
        { id: "dz-43" },
        { id: "dz-44" },
        { id: "dz-45" },
    ]);
    const [canvasIndex, setCanvasIndex] = useState(draggableElements.length); // assuming canvas is the last element in the array

    useEffect(() => {
        handleMapMode(mapMode);
    }, [mapData, mapVisible, mapMode]);

    useEffect(() => {
        console.log(draggableElements, canvasIndex, canvasPosition, '<- Canvas Index');
    }, [canvasIndex, canvasPosition]);
    
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

    const handleMap = () => {
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
    const [mapModalShow, setMapModalShow] = useState(false);
    const settingsStyle = {
        color: 'orangered',
        fontWeight: 400,
        fontVariant: 'small-caps',
        fontSize: 18 + 'px',
        height: 40 + 'vh',
        overflow: 'auto',
    };

    function handleCanvasHeight(e: React.ChangeEvent<HTMLInputElement>) {
        setCanvasHeight(Number(e.target.value));
    };
    function handleCanvasWidth(e: React.ChangeEvent<HTMLInputElement>) {
        setCanvasWidth(Number(e.target.value));
    };

    function handleCanvasWidthPosition(e: React.ChangeEvent<HTMLInputElement>) {
        setCanvasPosition({ x: Number(e.target.value), y: canvasPosition.y });
    };

    function handleCanvasHeightPosition(e: React.ChangeEvent<HTMLInputElement>) {
        setCanvasPosition({ x: canvasPosition.x, y: Number(e.target.value) });
    };


    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        console.log(source, destination, "Drag End")
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
      
        const canvas = canvasRef.current;
        if (!canvas) return;
      
        const rowLength = 4;
        const newIndex = destination.index;
        const dX = newIndex % rowLength;
        const dY = Math.floor(newIndex / rowLength);

        console.log(newIndex, dX, dY, "Drag End")

        const canvasPosition = { x: dX, y: dY };
        setCanvasPosition(canvasPosition);
    };
        
    const setMapVisibility = () => {
        setMapVisible(!mapVisible);
    };

    return (
        <>
        <Modal show={mapModalShow} onHide={() => setMapModalShow(false)} centered style={{ top: "25%" }}>
            <Modal.Header>
        <h3 style={{ fontSize: 24 + 'px', textAlign: 'center' }}>Map Size Settings</h3>
            </Modal.Header>
        <Modal.Body style={settingsStyle}>
            Default Setup is 402x402 to adjust for the 2-D Map. You may find other sizes to be more useful <br /><br />
        Height {canvasHeight}px: <Form.Range value={canvasHeight} onChange={handleCanvasHeight} min={100.5} max={603} step={25.125} />
        Width {canvasWidth}px: <Form.Range value={canvasWidth} onChange={handleCanvasWidth} min={100.5} max={603} step={25.125} />
        <br />
        <br />
        Positioning: X: {canvasPosition.x * 100}px Y: {canvasPosition.y * 100}px <br /> <br />
        Top {canvasPosition.y * 100}px: <Form.Range value={canvasPosition.y} onChange={handleCanvasHeightPosition} min={0} max={8} step={0.125} />
        Left {canvasPosition.x * 100}px: <Form.Range value={canvasPosition.x} onChange={handleCanvasWidthPosition} min={0} max={8} step={0.125} />
        </Modal.Body>
        </Modal>
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
            mapVisible ? (
                <Button variant='' onClick={() => setMapModalShow(true)} className='map-button' style={{ 
                    color: "goldenrod", 
                    gridColumnStart: 1, 
                    gridRowStart: 1,
                    position: "absolute", 
                    marginTop: "3.25%",
                    marginLeft: "3%",
                    zIndex: 99,
                    clipPath: "rect(30% at 30% 30%)", 
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 511.998 511.998">
                    <path d="M460.596,107.979H51.404C23.06,107.979,0,131.039,0,159.383v43.889c0,28.344,23.06,51.404,51.404,51.404h137.989v140.535    c0,3.327,1.874,6.369,4.845,7.866c2.97,1.496,6.531,1.192,9.204-0.788l25.593-18.958l25.593,18.958    c1.547,1.145,3.389,1.73,5.243,1.73c1.352,0,2.709-0.311,3.961-0.942c2.971-1.496,4.845-4.539,4.845-7.866v-33.752l16.787,12.438    c1.547,1.146,3.39,1.731,5.245,1.731c1.35,0,2.708-0.311,3.961-0.942c2.971-1.496,4.845-4.539,4.845-7.866V254.678h161.078    c28.344,0,51.404-23.06,51.404-51.404v-43.889C512,131.039,488.94,107.979,460.596,107.979z M68.855,232.196    c-7.369-4.451-12.927-11.613-15.224-20.117h30.391C81.727,220.568,76.207,227.743,68.855,232.196z M85.194,194.464H43.66    c-4.864,0-8.807,3.943-8.807,8.807c0,12.808,4.72,24.528,12.497,33.538c-16.726-2.01-29.735-16.279-29.735-33.538v-43.889    c0-18.632,15.158-33.79,33.79-33.79c18.632,0,33.79,15.158,33.79,33.79V194.464z M223.793,365.292l-16.786,12.434V254.677h44.057    v123.049l-16.786-12.434C231.164,362.986,226.909,362.986,223.793,365.292z M266.842,203.272c0,18.632-15.158,33.79-33.79,33.79    H90.093c7.908-9.042,12.715-20.862,12.715-33.79v-43.889c0-12.928-4.808-24.746-12.715-33.79h142.96    c18.632,0,33.79,15.158,33.79,33.79V203.272z M281.902,349.332l-13.223-9.797v-84.858h13.223V349.332z M328.514,203.272    c0,18.632-15.158,33.79-33.79,33.79h-22.982c7.908-9.042,12.715-20.862,12.715-33.79v-43.889c0-12.928-4.808-24.746-12.715-33.79    h22.981c18.633,0,33.791,15.158,33.791,33.79V203.272z M460.596,237.061H333.413c7.908-9.042,12.715-20.862,12.715-33.79v-43.889    c0-12.928-4.808-24.746-12.715-33.79h127.182c18.632,0,33.79,15.158,33.79,33.79v43.889h0.001    C494.385,221.903,479.227,237.061,460.596,237.061z"></path>
                    </svg>
                </Button> 
                ) : ( '' )
        }
        { mapVisible ? (
        <DragDropContext onDragEnd={onDragEnd}>
        
        {draggableElements.map((draggableElement, index) => (
        <Droppable droppableId={`droppable-${index + 1}`} key={index}>
            {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                
                style={{
                    backgroundColor: snapshot.isDraggingOver ? 'lightgreen' : '',
                    border: snapshot.isDraggingOver ? '3px solid gold' : '',
                    display: "grid",
                    gridTemplateColumns: `repeat(5, ${100}px)`,
                    gridAutoRows: `${100}px`,
                    width: "100%",
                    margin: "0 auto",
            }}
            >
                <Draggable
                draggableId={draggableElement.id}
                index={index}
                isDragDisabled
                >
                {(provided) => (
                    <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        ...provided.draggableProps.style,
                        width: `${100.5}px`,
                        height: `${100.5}px`,
                    }}
                    >
                        
                    </div>
                )}
                </Draggable>
                {provided.placeholder}
            </div>
            )}
        </Droppable>
        ))}
<Droppable droppableId="canvas-element">
            {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId="map" index={canvasIndex} >
            {(provided) => (
                <canvas
                ref={(el) => {
                    canvasRef.current = el;
                    provided.innerRef(el); 
                }}
                onClick={handleMap}
                className='game-map'
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                style={{
                    ...provided.draggableProps.style,
                    width: `${canvasWidth}px`,
                    height: `${canvasHeight}px`,
                    top: (canvasPosition.y) * 100,
                    left: (canvasPosition.x) * 100,
                }}
            /> )}
            </Draggable>

        {provided.placeholder}
        </div> )}
        
        </Droppable>
        </DragDropContext>

            ) : ( '' )
        }
        </>
    );
};

export default GameMap;
