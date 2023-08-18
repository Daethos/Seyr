import { CombatData } from "../../components/GameCompiler/CombatStore";
import EventEmitter from "./EventEmitter";
import * as Dispatcher from "./Dispatcher";
import Play from "../scenes/Play";
import { StatusEffect } from "../../components/GameCompiler/StatusEffects";

type ActionHandler = (data: any) => void;
interface Action {
    type: string;
    data: any;
    id?: string;
};
export interface KVI {
    key: string;
    value: string | number | boolean;
    id?: string; 
};

export default class CombatMachine {
    private context: Play;
    private actionQueue: Action[];
    private clearQueue: string[];
    private inputQueue: KVI[];
    private dispatch: any;
    private state: CombatData;

    constructor(context: Play, dispatch: any) {
        this.context = context;
        this.actionQueue = [];
        this.clearQueue = [];
        this.inputQueue = [];
        this.dispatch = dispatch;
        this.state = {} as CombatData;
        this.listener();
    };
    
    private actionHandlers: { [key: string]: ActionHandler } = {
        Weapon: (data: KVI) => {
            const { key, value } = data;
            if (key === 'action' && value === 'counter' && this.state.computerAction === '') {
                return; // Don't allow counter if computer hasn't acted yet. Null action.
            };
            if (key === 'computerAction' && value === 'counter' && this.state.action === '') {
                return; // Don't allow counter if player hasn't acted yet. Null action.
            };
            Dispatcher.weaponAction(this.dispatch, data);
        },
        Health: (data: KVI) => Dispatcher.healthAction(this.dispatch, data),
        Instant: (data: string) => Dispatcher.instantAction(this.dispatch, data),
        Consume: (data: StatusEffect[]) => Dispatcher.prayerAction(this.dispatch, data),
        Tshaeral: (_data: KVI) => Dispatcher.tshaeralAction(this.dispatch),
        Player: (data: any) => Dispatcher.playerAction(this.dispatch, data),
        Enemy: (data: any) => Dispatcher.enemyAction(this.dispatch, data),
    };

    private listener = () => EventEmitter.on('update-combat-data', (e: CombatData) => (this.state = e));

    private process = (): void => {
        if (this.state.computerWin) {
            this.inputQueue = [];
            this.actionQueue = [];
        };

        while (this.clearQueue.length) {
            const cId = this.clearQueue.shift()!;
            this.inputQueue = this.inputQueue.filter(({ id }) => id !== cId);
            this.actionQueue = this.actionQueue.filter(({ id }) => id !== cId);
        };

        while (this.inputQueue.length) {
            const { key, value, id } = this.inputQueue.shift()!;
            if (!id || this.state.enemyID === id) Dispatcher.actionInput(this.dispatch, { key, value });
        };

        while (this.actionQueue.length) {
            const action = this.actionQueue.shift()!;
            const handler = this.actionHandlers[action.type as keyof typeof this.actionHandlers];
            if (handler) {
                handler(action.data); 
            } else {
                console.warn(`No handler for action type: ${action.type}. Console data: ${action.data}.`);
            };
        };
    };

    public action = (act: Action): number => this.actionQueue.push(act);
    public clear = (id: string): number => this.clearQueue.push(id); 
    public input = (key: string, value: string | number | boolean, id?: string): number => this.inputQueue.push({key, value, id}); 
    public processor = (): void => this.process();
};