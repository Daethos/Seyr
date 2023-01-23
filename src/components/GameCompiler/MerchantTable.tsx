import React from 'react'
import MerchantLoot from './MerchantLoot'

interface Props {
    table: any;
    ascean: any;
    itemPurchased: boolean;
    setItemPurchased: React.Dispatch<React.SetStateAction<boolean>>;
}

const MerchantTable = ({ table, ascean, itemPurchased, setItemPurchased }: Props) => {

    console.log('At the Merchant Table', table)
    return (
        <>
            { table.map((item: any, index: number) => {
                return (
                    <MerchantLoot item={item} ascean={ascean} itemPurchased={itemPurchased} setItemPurchased={setItemPurchased} key={index} />
                )
            }) }
        </>
    )
}

export default MerchantTable