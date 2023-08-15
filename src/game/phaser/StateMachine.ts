export interface StateInterface {
    name: string;
    onEnter?: () => void;
    onUpdate?: (dt: number) => void;
    onExit?: () => void;
};

let idCount = 0;

export default class StateMachine {
    private states: Map<string, StateInterface>;
    private currentState?: StateInterface;
    private id: string = (++idCount).toString();
    private context?: object;
    private isChangingState: boolean = false;
    private changeStateQueue: string[] = []; 

    constructor(context?: object, id?: string) {
        this.id = id || this.id;
        this.context = context;
        this.states = new Map();
    };

    isCurrentState(name: string) {
        if (!this.currentState) return false;
        return this.currentState.name === name;
    };

    addState(name: string, config?: StateInterface) {
        this.states.set(name, {
            name,
            onEnter: config?.onEnter?.bind(this.context),
            onUpdate: config?.onUpdate?.bind(this.context),
            onExit: config?.onExit?.bind(this.context)
        });
        return this;
    };

    setState(name: string) {  
        if (!this.states.has(name)) {
            console.warn(`State ${name} does not exist`);
            return;
        }; 
        if (this.isCurrentState(name)) return;
        if (this.isChangingState) {
            this.changeStateQueue.push(name); 
            return;
        }; 
        this.isChangingState = true;
        if (this.currentState && this.currentState.onExit) this.currentState.onExit();
        this.currentState = this.states.get(name)!;
        if (this.currentState && this.currentState.onEnter) this.currentState.onEnter();
        this.isChangingState = false;
    };

    update(dt: number) {
        if (this.changeStateQueue.length > 0) {
            this.setState(this.changeStateQueue.shift()!);
            return;
        };
        if (this.currentState && this.currentState.onUpdate) this.currentState?.onUpdate?.(dt);
    }; 
};

export const States = {
    CLEAN: "clean",
    DEATH: "death",
    IDLE: "idle",
    PATROL: "patrol",
    AWARE: "aware",
    CHASE: "chase",
    COMBAT: "combat",
    EVADE: "evade",
    LEASH: "leash",
    ATTACK: "attack",
    COUNTER: "counter",
    DODGE: "dodge",
    POSTURE: "posture",
    ROLL: "roll",
    NONCOMBAT: "noncombat",
    HEAL: "heal",
    HURT: "hurt",
    ROOT: "root",
    SNARE: "snare",
    STUN: "stun",
    INVOKE: "invoke",
    DEFEATED: "defeated",
    CONSUMED: "consumed",
    TSHAERAL: "tshaeral",
};