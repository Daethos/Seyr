import React from 'react'
import Inventory from './Inventory'

interface Props {
    inventory: any;
    ascean: any;
    eqpSwap: boolean;
    removeItem: boolean;
    setEqpSwap: React.Dispatch<React.SetStateAction<boolean>>;
    setRemoveItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const InventoryBag = ({ ascean, inventory, eqpSwap, removeItem, setEqpSwap, setRemoveItem }: Props) => {
  return (
    <div className='inventory-bag'>
        {
            inventory?.length > 0 ?
            inventory.map((item: any, index: number) => {
                return (
                    <Inventory inventory={item} ascean={ascean} eqpSwap={eqpSwap} removeItem={removeItem} setEqpSwap={setEqpSwap} setRemoveItem={setRemoveItem} key={index} />
                    )
            })
            : ''
        }
    </div>
  )
}

export default InventoryBag