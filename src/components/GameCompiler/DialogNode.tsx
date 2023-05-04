import DialogNodes from "./DialogNodes.json";
import EnemyDialogNodes from './EnemyDialogNodes.json';
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Ascean, Enemy, GameData, NPC } from "./GameStore";
import { CombatData } from "./CombatStore";

interface DialogNodeOption {
    text: string;
    next: string | null;
    npcIds?: any[];
    conditions?: { key: string; operator: string; value: string; }[];
    action?: string | null;
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

interface DialogOptionProps {
    option: DialogNodeOption;
    onClick: (nextNodeId: string | null) => void;
    actions: { [key: string]: Function }
};

const DialogOption = ({ option, onClick, actions }: DialogOptionProps) => {
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
  currentNodeIndex: number;
  setCurrentNodeIndex: (index: number) => void;
  engageCombat: () => Promise<void>;
  getLoot: (type: string) => void;
  refillFlask: () => void;
  state: any;
  gameState: GameData;
};

const DialogTree = ({ ascean, enemy, engageCombat, getLoot, dialogNodes, currentNodeIndex, setCurrentNodeIndex, gameState, state, refillFlask }: DialogTreeProps) => {
  const [renderedText, setRenderedText] = useState<any>('');
  const [renderedOptions, setRenderedOptions] = useState<DialogNodeOption[]>([]);
  const [currentNode, setCurrentNode] = useState<DialogNode | undefined>(undefined);
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
  useEffect(() => {
    setCurrentNode(dialogNodes[currentNodeIndex]);
  }, [currentNodeIndex, dialogNodes]);
  
  useEffect(() => {
    if (currentNode) {
      let newText = currentNode.text;
      let newOptions: DialogNodeOption[] = [];
      if (currentNode.text) {
        newText = currentNode.text.replace(/\${(.*?)}/g, (_, g) => eval(g));
      };
    if (currentNode.options) {
      newOptions = currentNode.options.filter(option => {
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
    setRenderedText(newText);
    setRenderedOptions(newOptions);
  };

  }, [currentNode]);

  const handleOptionClick = (nextNodeId: string | null) => {
    if (nextNodeId === null) {
      // End of dialog tree
      setCurrentNodeIndex(0);
    } else {
      let nextNodeIndex = dialogNodes.findIndex((node) => node.id === nextNodeId);
      if (nextNodeIndex === -1) nextNodeIndex = 0;
      setCurrentNodeIndex(nextNodeIndex);
    }
  };

  if (!currentNode) {
    return null;
  };

  return (
    <div>
      <p>{renderedText}</p>
      {renderedOptions?.map((option: DialogNodeOption) => (
        <DialogOption key={option.text} option={option} onClick={handleOptionClick} actions={actions} />
      ))}
      <br />
    </div>
  );
};

export default DialogTree;