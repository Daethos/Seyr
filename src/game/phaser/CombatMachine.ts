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
    private aQueue: Action[];
    private iQueue: KV[];
    private dispatch?: any;
    private state: CombatData;

    constructor(context: Play, dispatch?: any) {
        this.context = context;
        this.aQueue = [];
        this.iQueue = [];
        this.dispatch = dispatch;
        this.state = {} as CombatData;
        this.listener();
    };
    
    private listener = async () => EventEmitter.on('update-combat-data', (e: CombatData) => this.state = e);

    private actionHandlers: { [key: string]: ActionHandler } = {
        Weapon: (data: KV) => Dispatcher.weaponAction(this.dispatch, data),
        Instant: (data: string) => Dispatcher.instantAction(this.dispatch, data),
        Consume: (data: StatusEffect[]) => Dispatcher.prayerAction(this.dispatch, data),
        Enemy: async (data: any) => {
            if (!this.context?.player?.actionSuccess && (this.state.action !== 'counter' && this.state.action !== '')) {
                const actionReset = async () => this.input('action', '');
                await actionReset();
                Dispatcher.enemyAction(this.dispatch, { ...data, state: this.state });
            } else {
                Dispatcher.enemyAction(this.dispatch, { ...data, state: this.state });
            };
        },
    };

    private process = (): void => {
        if (this.state.player_win || this.state.computer_win) {
            this.iQueue = [];
            this.aQueue = [];
        };
        while (this.iQueue.length > 0) {
            const { key, value } = this.iQueue.shift()!;
            Dispatcher.actionInput(this.dispatch, { key, value });
        };
        while (this.aQueue.length > 0) {
            const action = this.aQueue.shift()!;
            const handler = this.actionHandlers[action.type as keyof typeof this.actionHandlers];
            if (handler) {
                handler(action.data);
            } else {
                console.warn(`Action ${action.type} not recognized`);
            }; 
        };
    };

    public add = (action: Action): number => this.aQueue.push(action);
    public input = (key: string, value: string | number | boolean): number => this.iQueue.push({key, value});  
    public processor = (): void => this.process();
};