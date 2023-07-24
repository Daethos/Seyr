import { CombatData } from "../../components/GameCompiler/CombatStore";
import EventEmitter from "./EventEmitter";
import * as Dispatcher from "./Dispatcher";
import Play from "../scenes/Play";

interface Action {
    type: string;
    data: any;
};

export default class CombatMachine {
    private context: Play;
    private queue: Action[];
    private dispatch?: any;
    private state: CombatData;

    constructor(context: Play, dispatch?: any) {
        this.context = context;
        this.queue = [];
        this.dispatch = dispatch;
        this.state = {} as CombatData;
        this.listener();
    };
    
    actionHandlers = {
        Weapon: (data: CombatData) => Dispatcher.weaponAction(this.dispatch, data),
        Instant: (data: CombatData) => Dispatcher.instantAction(this.dispatch, data),
        Consume: (data: CombatData) => Dispatcher.prayerAction(this.dispatch, data),
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

    add = (action: Action): number => this.queue.push(action);
    input = (key: string, value: string | number | boolean) => Dispatcher.actionInput(this.dispatch, { key, value });  
    listener = async () => EventEmitter.on('update-combat-data', (e: CombatData) => this.state = e);
    process = (): void => {
        if (this.state.player_win || this.state.computer_win) this.queue = [];
        while (this.queue.length > 0) {
            const action = this.queue.shift()!;
            const handler = this.actionHandlers[action.type as keyof typeof this.actionHandlers];
            if (handler) {
                handler(action.data);
            } else {
                console.warn(`Action ${action.type} not recognized`);
            }; 
        };
    };

    processor = (): void => this.process();
};