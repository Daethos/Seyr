import DialogNodes from "./DialogNodes.json";
import EnemyDialogNodes from './EnemyDialogNodes.json';
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Ascean, Enemy, GAME_ACTIONS, GameData, NPC } from "./GameStore";
import { CombatData } from "./CombatStore";

export interface DialogNodeOption {
    text: string;
    next: string | null;
    npcIds?: any[];
    conditions?: { key: string; operator: string; value: string; }[];
    action?: string | null;
    keywords?: any[] | null;
};

export interface DialogNode {
    id: string;
    text: string;
    options: DialogNodeOption[] | [];
    npcIds: any[];
};

interface NpcIds {
    [key: string]: number;
};

export const npcIds: NpcIds = {
    "Enemy": 0,
    "Merchant-General": 1,
    "Merchant-Weapon": 2,
    "Merchant-Armor": 3,
    "Merchant-Jewelry": 4,
    "Merchant-Alchemy": 5,
    "Merchant-Smith": 6,
    "Merchant-Mystic": 7,
    "Merchant-Tailor": 8,
};

// This is for enemy dialog nodes
// May make 2, 1 for named, 1 for unnamed
export function getNodesForEnemy(enemy: Enemy): DialogNode[] {
    const matchingNodes: DialogNode[] = [];
    for (const node of EnemyDialogNodes.nodes) {
        if (node.options.length === 0) {
            continue;
        };
        const npcOptions = node.options.filter((option) => (option as DialogNodeOption)?.npcIds?.includes(enemy.name))
        if (npcOptions.length > 0) {
            const updatedNode = { ...node, options: npcOptions };
            matchingNodes.push(updatedNode);
        };
    };
    return matchingNodes;
};

export function getNodesForNPC(npcId: number): DialogNode[] {
    const matchingNodes: DialogNode[] = [];
    for (const node of DialogNodes.nodes) {
        if (node.options.length === 0) {
            continue;
        };
        const npcOptions = node.options.filter((option) => (option as DialogNodeOption)?.npcIds?.includes(npcId))
        if (npcOptions.length > 0) {
            const updatedNode = { ...node, options: npcOptions };
            matchingNodes.push(updatedNode);
        };
    };

    return matchingNodes;
};

export interface DialogOptionProps {
    option: DialogNodeOption;
    onClick: (nextNodeId: string | null) => void;
    actions: { [key: string]: Function }
};

export const DialogOption = ({ option, onClick, actions }: DialogOptionProps) => {
    const handleClick = async () => {
      if (option.action && typeof option.action === 'string') {
        const actionName = option.action.trim();
        console.log(actionName, "Did we make it here?")
        const actionFunction = actions[actionName];
        if (actionFunction) {
          actionFunction();
          return;
        };
      };
      onClick(option.next);
    };

    return (
      <div>
      <Button variant='' onClick={handleClick} className='dialog-buttons inner' >
        {option.text}
      </Button>
      </div>
    );
};

interface DialogTreeProps {
  ascean: Ascean;
  enemy: NPC | Enemy | any;
  dialogNodes: DialogNode[];
  engageCombat: () => Promise<void>;
  getLoot: (type: string) => void;
  refillFlask: () => void;
  state: any;
  gameState: GameData;
  gameDispatch: React.Dispatch<any>;
};

const DialogTree = ({ ascean, enemy, engageCombat, getLoot, dialogNodes, gameState, gameDispatch, state, refillFlask }: DialogTreeProps) => {
  const actions = {
    getCombat: () => engageCombat(),
    getArmor: () => getLoot('armor'),
    getGeneral: () => getLoot('general'),
    getJewelry: () => getLoot('jewelry'),
    getMystic: () => getLoot('magical-weapon'),
    getTailor: () => getLoot('cloth'),
    getWeapon: () => getLoot('physical-weapon'),
    getFlask: () => refillFlask()
  };
  const [currentNodeIndex, setCurrentNodeIndex] = useState(gameState?.currentNodeIndex || 0);

useEffect(() => {
  setCurrentNodeIndex(gameState?.currentNodeIndex || 0);
}, [gameState?.currentNodeIndex]);

useEffect(() => {
  console.log("We made it here!", dialogNodes[currentNodeIndex]);
  gameDispatch({
    type: GAME_ACTIONS.SET_CURRENT_DIALOG_NODE,
    payload: dialogNodes[currentNodeIndex]
  });
  gameDispatch({
    type: GAME_ACTIONS.SET_RENDERING,
    payload: {
      options: dialogNodes[currentNodeIndex]?.options,
      text: dialogNodes[currentNodeIndex]?.text
    },
  });
}, [currentNodeIndex]);

  useEffect(() => {
    if (gameState?.currentNode) {
      let newText = gameState?.currentNode?.text;
      let newOptions: DialogNodeOption[] = [];
      if (gameState?.currentNode?.text) {
        newText = gameState?.currentNode?.text?.replace(/\${(.*?)}/g, (_, g) => eval(g));
      };
    if (gameState?.currentNode?.options) {
      newOptions = gameState?.currentNode?.options.filter(option => {
        if (option.conditions) {
          return option.conditions.every(condition => {
            const { key, operator, value } = condition;
            const optionValue = ascean[key] !== undefined ? ascean[key] : state[key]; // Hopefully this works!
            switch (operator) {
              case '>':
                return optionValue > value;
              case '>=':
                return optionValue >= value;
              case '<':
                return optionValue < value;
              case '<=':
                return optionValue <= value;
              case '=':
                return optionValue === value;
              default:
                return false;
            }
          });
        } else {
          return true;
        };
      }).map(option => {
        const renderedOption = option.text.replace(/\${(.*?)}/g, (_, g) => eval(g));
        return {
          ...option,
          text: renderedOption,
        };
      });
    };
    gameDispatch({ type: GAME_ACTIONS.SET_RENDERING, payload: { text: newText, options: newOptions } });
  };

  }, [gameState.currentNode]);

  const handleOptionClick = (nextNodeId: string | null) => {
    if (nextNodeId === null) {
      gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_NODE_INDEX, payload: 0 });
    } else {
      let nextNodeIndex = dialogNodes.findIndex((node) => node.id === nextNodeId);
      if (nextNodeIndex === -1) nextNodeIndex = 0;
      gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_NODE_INDEX, payload: nextNodeIndex });
    };
  };

  if (!gameState?.currentNode) {
    return null;
  };

  return (
    <div>
      <p>{gameState?.renderedText}</p>
      {gameState?.renderedOptions?.map((option: DialogNodeOption) => (
        <DialogOption key={option.text} option={option} onClick={handleOptionClick} actions={actions} />
      ))}
      <br />
    </div>
  );
};

export default DialogTree;