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
    
    private listener = () => EventEmitter.on('update-combat-data', (e: CombatData) => (this.state = e));

    private actionHandlers: { [key: string]: ActionHandler } = {
        Weapon: (data: KVI) => Dispatcher.weaponAction(this.dispatch, data),
        Instant: (data: string) => Dispatcher.instantAction(this.dispatch, data),
        Consume: (data: StatusEffect[]) => Dispatcher.prayerAction(this.dispatch, data),
        Tshaeral: (_data: KVI) => Dispatcher.tshaeralAction(this.dispatch),
        Player: (data: any) => Dispatcher.playerAction(this.dispatch, data),
        Enemy: (data: any) => Dispatcher.enemyAction(this.dispatch, data),
    };

    private process = (): void => {
        if (this.state.computerWin) {
            this.inputQueue = [];
            this.actionQueue = [];
        };

        while (this.clearQueue.length) {
            const _id = this.clearQueue.shift()!;
            console.log(`Clearing ${_id} from queues.`);
            this.inputQueue = this.inputQueue.filter(({ id }) => id !== _id);
            this.actionQueue = this.actionQueue.filter(({ id }) => id !== _id);
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

    public add = (action: Action): number => this.actionQueue.push(action);
    public input = (key: string, value: string | number | boolean, id?: string): number => this.inputQueue.push({key, value, id}); 
    public clear = (id: string): number => this.clearQueue.push(id); 
    public processor = (): void => this.process();
};