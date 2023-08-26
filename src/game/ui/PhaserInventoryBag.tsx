import Inventory from '../../components/GameCompiler/Inventory';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux'; 

interface IBProps {
    highlighted: { item: null; comparing: boolean; };
    setHighlighted: React.Dispatch<React.SetStateAction<{ item: null; comparing: boolean; }>>;
    dragAndDropInventory: any;
    setDragAndDropInventory: React.SetStateAction<any>;
}; 

const PhaserInventoryBag = ({ setHighlighted, highlighted, dragAndDropInventory, setDragAndDropInventory }: IBProps) => {
    const ascean = useSelector((state: any) => state.game.player);
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
    
    return (
        <DragDropContext onDragEnd={onDragEnd}> 
            <div className='story-inventory-bag'>
                { dragAndDropInventory?.length > 0 && (
                    dragAndDropInventory.map((item: any, index: number) => {
                        return (
                            <Droppable key={index} droppableId={item._id}>
                            {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} style={snapshot.isDraggingOver ? getDroppingStyle : {}}>
                                <Inventory ascean={ascean} highlighted={highlighted} setHighlighted={setHighlighted} bag={dragAndDropInventory} inventory={item} index={index} story={true} />
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    )})
                ) } 
            </div>
        </DragDropContext>
    );
};

export default PhaserInventoryBag;