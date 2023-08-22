export interface StateInterface {
    name: string;
    onEnter?: () => void;
    onUpdate?: (dt: number) => void;
    onExit?: () => void;
};

export const States = {
    DEFEATED: "defeated",
    DEATH: "death",
    
    AWARE: "aware",
    CHASE: "chase",
    IDLE: "idle",
    LEASH: "leash",
    PATROL: "patrol",
    
    COMBAT: "combat",
    NONCOMBAT: "noncombat",
    
    EVADE: "evade",
    ATTACK: "attack",
    COUNTER: "counter",
    DODGE: "dodge",
    POSTURE: "posture",
    ROLL: "roll",
    HEAL: "heal",
    HURT: "hurt",
    INVOKE: "invoke",
    STEALTH: "stealth",

    CONSUMED: "consumed",
    TSHAERAL: "tshaeral",
    POLYMORPHING: "polymorphing",

    CLEAN: "clean",
    POLYMORPH: "polymorph",
    ROOT: "root",
    SNARE: "snare",
    STUN: "stun",
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