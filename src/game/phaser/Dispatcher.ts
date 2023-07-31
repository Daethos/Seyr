import React from "react";
import { getCombatStateUpdate, getEnemyActionFetch, getInitiateFetch } from "../reducers/combatState";
import { KV } from "./CombatMachine";
import { StatusEffect } from "../../components/GameCompiler/StatusEffects";

export const weaponAction = (dispatch: React.Dispatch<any>, combatData: KV): void => {
    console.log("Weapon Action");
    dispatch(getInitiateFetch({ combatData, type: 'Weapon' }));
};

export const instantAction = (dispatch: React.Dispatch<any>, combatData: string): void => {
    console.log("Instant Action");
    dispatch(getInitiateFetch({ combatData, type: 'Instant' }));
};

export const prayerAction = (dispatch: React.Dispatch<any>, combatData: StatusEffect[]): void => {
    console.log("Prayer Action");
    dispatch(getInitiateFetch({ combatData, type: 'Prayer' }));
};

export const enemyAction = (dispatch: React.Dispatch<any>, data: any): void => {
    console.log("Enemy Action");
    dispatch(getEnemyActionFetch(data));
};

export const actionInput = (dispatch: React.Dispatch<any>, { key, value }: { key: string, value: string | number | boolean }): void => {
    console.log("Action Input");
    dispatch(getCombatStateUpdate({ key, value })); //workGetCombatState
};

export const tshaeralAction = (dispatch: React.Dispatch<any>): void => {
    console.log("Tshaeral Action");
    dispatch(getInitiateFetch({ combatData: '', type: 'Tshaeral' }));
};