import { CombatData } from "../../components/GameCompiler/CombatStore";
import EventEmitter from "./EventEmitter";
import * as Dispatcher from "./Dispatcher";
import Play from "../scenes/Play";
import { StatusEffect } from "../../components/GameCompiler/StatusEffects";

type ActionHandler = (data: any) => void;
interface Action {
    type: string;
    data: any;
};
export interface KV {
    key: string;
    value: string | number | boolean; 
};

export default class CombatMachine {
    private context: Play;
    private actionQueue: Action[];
    private inputQueue: KV[];
    private dispatch: any;
    private state: CombatData;

    constructor(context: Play, dispatch: any) {
        this.context = context;
        this.actionQueue = [];
        this.inputQueue = [];
        this.dispatch = dispatch;
        this.state = {} as CombatData;
        this.listener();
    };
    
    private listener = () => EventEmitter.on('update-combat-data', (e: CombatData) => this.state = e);

    private actionHandlers: { [key: string]: ActionHandler } = {
        Weapon: (data: KV) => Dispatcher.weaponAction(this.dispatch, data),
        Instant: (data: string) => Dispatcher.instantAction(this.dispatch, data),
        Consume: (data: StatusEffect[]) => Dispatcher.prayerAction(this.dispatch, data),
        Tshaeral: (data: KV) => Dispatcher.tshaeralAction(this.dispatch),
        Player: (data: any) => {
            console.log('Player Blind Attack', data.ascean.name);
        //     if (!this.context?.player?.attacking?.actionSuccess && (this.state.computerAction !== 'counter' && this.state.computerAction !== '')) {
        //         this.input('computerAction', '');
        //         Dispatcher.playerAction(this.dispatch, data);
        //     } else if (this.state.action === 'counter' && this.state.computerAction === '') {
        //         return;
        //     } else {
                Dispatcher.playerAction(this.dispatch, data);
            // };
        },
        Enemy: (data: any) => {
            if (!this.context?.player?.actionSuccess && (this.state.action !== 'counter' && this.state.action !== '')) {
                // const actionReset = async () => this.input('action', '');
                // await actionReset();
                this.input('action', '');
                Dispatcher.enemyAction(this.dispatch, data);
            } else if (this.state.action === '' && this.state.computerAction === 'counter') {
                return;
            } else {
                Dispatcher.enemyAction(this.dispatch, data);
            };
        },
    };

    private process = (): void => {
        if (this.state.playerWin || this.state.computerWin) {
            this.inputQueue = [];
            this.actionQueue = [];
        };
        while (this.inputQueue.length > 0) {
            const { key, value } = this.inputQueue.shift()!;
            Dispatcher.actionInput(this.dispatch, { key, value });
        };
        while (this.actionQueue.length > 0) {
            const action = this.actionQueue.shift()!;
            const handler = this.actionHandlers[action.type as keyof typeof this.actionHandlers];
            if (handler) {
                handler(action.data);
            } else {
                console.warn(`Action ${action.type} not recognized`);
            }; 
        };
    };

    public add = (action: Action): number => this.actionQueue.push(action);
    public input = (key: string, value: string | number | boolean): number => this.inputQueue.push({key, value});  
    public processor = (): void => this.process();
};