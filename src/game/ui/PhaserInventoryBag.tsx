import Inventory from '../../components/GameCompiler/Inventory';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
 
interface IBProps {
    ascean: any;
    gameDispatch: React.Dispatch<any>;
    gameState: any;
    highlighted: { item: null; comparing: boolean; };
    setHighlighted: React.Dispatch<React.SetStateAction<{ item: null; comparing: boolean; }>>;
    dragAndDropInventory: any;
    setDragAndDropInventory: React.SetStateAction<any>;
}; 

const PhaserInventoryBag = ({ ascean, gameDispatch, gameState, setHighlighted, highlighted, dragAndDropInventory, setDragAndDropInventory }: IBProps) => {
  
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.index === source.index) return;
        const itemIndex = dragAndDropInventory.findIndex((item: { _id: string; }) => item._id === draggableId);
        if (itemIndex !== -1) {
            const itemsCopy = Array.from(dragAndDropInventory);
            const [reorderedItem] = itemsCopy.splice(source.index, 1);
            itemsCopy.splice(destination.index, 0, reorderedItem);
            setDragAndDropInventory(itemsCopy);
        };
    }; 

    const getDroppingStyle = {
        boxShadow: '0 0 0 0.5rem purple',
        display: "inline-block",
        transform: 'scale(0.9)',
    }; 
    const relaxedStyle = {};
    
    return (
        <DragDropContext onDragEnd={onDragEnd}> 
            <div className='story-inventory-bag'>
                { dragAndDropInventory?.length > 0 ? (
                    dragAndDropInventory.map((item: any, index: number) => {
                        return (
                            <Droppable key={index} droppableId={item._id}>
                            {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} style={snapshot.isDraggingOver ? getDroppingStyle : relaxedStyle}>
                                <Inventory highlighted={highlighted} setHighlighted={setHighlighted} gameState={gameState} gameDispatch={gameDispatch} bag={dragAndDropInventory} inventory={item} ascean={ascean} index={index} story={true} />
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    )})
                ) : ( '' ) } 
            </div>
        </DragDropContext>   
    );
};

export default PhaserInventoryBag;