import React, { useState } from 'react'
import MerchantLoot from './MerchantLoot'

interface Props {
    table: any;
    ascean: any;
    itemPurchased: boolean;
    setItemPurchased: React.Dispatch<React.SetStateAction<boolean>>;
    error: any;
    setError: any;
    setMerchantEquipment?: any;
}

const MerchantTable = ({ table, ascean, itemPurchased, setItemPurchased, error, setError, setMerchantEquipment }: Props) => {
    return (
        <>
        { table.map((item: any, index: number) => {
            return (
                <MerchantLoot item={item} table={table} setMerchantEquipment={setMerchantEquipment} ascean={ascean} itemPurchased={itemPurchased} setItemPurchased={setItemPurchased} error={error} setError={setError} key={index} />
            )
        }) }
        </>
    );
};

export default MerchantTable;