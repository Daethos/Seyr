import React from "react";
import { CombatData } from "../../components/GameCompiler/CombatStore";
import { getEnemyActionFetch, getInitiateFetch, setCombatInput } from "../reducers/combatState";

export const weaponAction = (dispatch: React.Dispatch<any>, combatData: CombatData): void => {
    dispatch(getInitiateFetch({ combatData, type: 'Weapon' }));
};

export const instantAction = (dispatch: React.Dispatch<any>, combatData: CombatData): void => {
    dispatch(getInitiateFetch({ combatData, type: 'Instant' }));
};

export const prayerAction = (dispatch: React.Dispatch<any>, combatData: CombatData): void => {
    dispatch(getInitiateFetch({ combatData, type: 'Prayer' }));
};

export const enemyAction = (dispatch: React.Dispatch<any>, data: any): void => {
    dispatch(getEnemyActionFetch(data));
};

export const actionInput = (dispatch: React.Dispatch<any>, { key, value }: { key: string, value: string | number | boolean }): void => {
    dispatch(setCombatInput({ key, value }));
};