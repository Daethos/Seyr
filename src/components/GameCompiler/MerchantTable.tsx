import React, { useState } from 'react'
import MerchantLoot from './MerchantLoot'
import Row from 'react-bootstrap/Row';


interface Props {
    table: any;
    ascean: any;
    error: any;
    setError: any;
    gameDispatch: React.Dispatch<any>;
}

const MerchantTable = ({ table, ascean, error, setError, gameDispatch }: Props) => {
    return (
        <Row>
        { table.map((item: any, index: number) => {
            return (
                <MerchantLoot item={item} table={table} ascean={ascean} error={error} setError={setError} key={index} gameDispatch={gameDispatch} />
            )
        }) }
        </Row>
    );
};

export default MerchantTable;