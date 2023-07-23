import { CombatData } from "../../components/GameCompiler/CombatStore";
import { getEnemyActionFetch, getInitiateFetch, setCombatInput } from "../reducers/combatState";
import EventEmitter from "./EventEmitter";
import StateMachine from "./StateMachine";
import * as Dispatcher from "./Dispatcher";


interface Action {
    type: string;
    data: any;
};

export default class CombatMachine extends StateMachine {
    private actionQueue: Action[];
    private dispatch?: any;
    private state: CombatData;

    constructor(context?: object, id?: string, dispatch?: any) {
        super(context, id);
        this.actionQueue = [];
        this.dispatch = dispatch;
        this.state = {} as CombatData;

        this.stateListener();
    };

    actionHandlers = {
        Weapon: (data: CombatData) => Dispatcher.weaponAction(this.dispatch, data),
        Instant: (data: CombatData) => Dispatcher.instantAction(this.dispatch, data),
        Prayer: (data: CombatData) => Dispatcher.prayerAction(this.dispatch, data),
        Enemy: (data: any) => this.sendEnemyActionListener(data),
    };

    stateListener = async () => EventEmitter.on('update-combat-data', (e: CombatData) => this.state = e);

    addAction = (action: Action): number => this.actionQueue.push(action);

    processActions = (): void => {
        while (this.actionQueue.length > 0) {
            const action = this.actionQueue.shift()!;
            const handler = this.actionHandlers[action.type as keyof typeof this.actionHandlers];
            if (handler) {
                handler(action.data);
            } else {
                console.warn(`Action ${action.type} not recognized`);
            }; 
        };
        if (this.state.player_win || this.state.computer_win) this.actionQueue = [];
    };

    setInput = (key: string, value: string | number | boolean) => Dispatcher.actionInput(this.dispatch, { key, value });

    sendEnemyActionListener = (data: any): void => {
        console.log('sendEnemyActionListener'); 
        const newData = { ...data, state: this.state };
        Dispatcher.enemyAction(this.dispatch, newData);
    };

    sendStateActionListener = (state: CombatData): void => { // Was Async
        if ((state.action === 'counter' && state.computer_action === '') || (state.action === '' && state.computer_action === 'counter')) { 
            console.log("--- ERROR --- One Player Is Countering Against Inaction --- ERROR ---");
            return; 
        };
        console.log("Sending State Action");
        Dispatcher.weaponAction(this.dispatch, state);
    }; 
        
    combatUpdate = (): void => {
        this.processActions();
    };
};