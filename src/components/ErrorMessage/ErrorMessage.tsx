import React, { FC } from 'react';

export default function ErrorMessage({ error}){
    return <span className={"error"}>{error}</span>
}