import { getCombatStateUpdate, getEnemyActionFetch, getInitiateFetch, getPlayerActionFetch } from "../reducers/combatState";
import { KVI } from "./CombatMachine";
import { StatusEffect } from "../../components/GameCompiler/StatusEffects";

export const weaponAction = (dispatch: React.Dispatch<any>, combatData: KVI): void => {
    dispatch(getInitiateFetch({ combatData, type: 'Weapon' }));
};

export const instantAction = (dispatch: React.Dispatch<any>, combatData: string): void => {
    dispatch(getInitiateFetch({ combatData, type: 'Instant' }));
};

export const prayerAction = (dispatch: React.Dispatch<any>, combatData: StatusEffect[]): void => {
    dispatch(getInitiateFetch({ combatData, type: 'Prayer' }));
};

export const playerAction = (dispatch: React.Dispatch<any>, data: any): void => {
    dispatch(getPlayerActionFetch(data));
};

export const enemyAction = (dispatch: React.Dispatch<any>, data: any): void => {
    dispatch(getEnemyActionFetch(data));
};

export const actionInput = (dispatch: React.Dispatch<any>, { key, value }: { key: string, value: string | number | boolean }): void => {
    dispatch(getCombatStateUpdate({ key, value }));
};

export const tshaeralAction = (dispatch: React.Dispatch<any>): void => {
    dispatch(getInitiateFetch({ combatData: '', type: 'Tshaeral' }));
};