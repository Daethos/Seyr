import DialogNodes from "./DialogNodes.json";
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Ascean, Enemy, NPC } from "./GameStore";

interface DialogNodeOption {
    text: string;
    next: string | null;
    npcIds?: any[];
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

export function getNodesForNPC(npcId: number): DialogNode[] {
    const matchingNodes: DialogNode[] = [];
    console.log(npcId, "Npc Id")
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

interface DialogTreeProps {
    ascean: Ascean;
    enemy: NPC | Enemy;
    dialogNodes: DialogNode[];
    currentNodeIndex: number;
    setCurrentNodeIndex: (index: number) => void;
}
  
interface DialogOptionProps {
    option: DialogNodeOption;
    onClick: (nextNodeId: string | null) => void;
}

const DialogOption = ({ option, onClick }: DialogOptionProps) => {
    const handleClick = () => {
      onClick(option.next);
    };

    const buttonStyle = {
      backgroundColor: "black",
      color: "green"
    }

    return (
      <div>
      <Button variant='' onClick={handleClick} style={buttonStyle} className='my-1'>
        {option.text}
      </Button>
      </div>
    );
};

const DialogTree = ({ ascean, enemy, dialogNodes, currentNodeIndex, setCurrentNodeIndex }: DialogTreeProps) => {
  const [renderedText, setRenderedText] = useState<any>('');
  const [renderedOptions, setRenderedOptions] = useState<DialogNodeOption[]>([]);
  const [currentNode, setCurrentNode] = useState<DialogNode | undefined>(undefined);

  // Compute the rendered text and options whenever the current node changes.
  useEffect(() => {
    console.log(currentNodeIndex, "Current Node Index")
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
        newOptions = currentNode.options.map((option) => {
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
        <DialogOption key={option.text} option={option} onClick={handleOptionClick} />
      ))}
      <br /><br />
    </div>
  );
};

export default DialogTree;


// const DialogTree = ({ ascean, dialogNodes }: DialogTreeProps) => {
//   const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
//   const [currentNode, setCurrentNode] = useState(dialogNodes?.[currentNodeIndex])
//   const [renderedText, setRenderedText] = useState<any>('');
//   const [renderedOptions, setRenderedOptions] = useState<any>([]);
//   useEffect(() => {
//     console.log(currentNode, "Current Node Index")
//     const newText = currentNode?.text?.replace(/\${(.*?)}/g, (_, g) => eval(g))
//     console.log(newText, "New Text")
//     if (newText !== undefined) {
//       setRenderedText(newText)
//     } else {
//       setRenderedText(currentNode?.text)
//     };
//     const newOptions = currentNode?.options.map(option => {
//       const renderedOptions = option?.text?.replace(/\${(.*?)}/g, (_, g) => eval(g));
//       return {
//         ...option,
//         text: renderedOptions,
//       };
//     });
//     if (newOptions !== undefined) {
//       setRenderedOptions(newOptions)
//     } else {
//       setRenderedOptions(currentNode?.options)
//     }
//   }, [currentNodeIndex]);

//   useEffect(() => {
//     console.log(renderedText, "Rendered Text")
//   }, [renderedText])
  
//   const handleOptionClick = (nextNodeId: string | null) => {
//     if (nextNodeId === null) {
//       // End of dialog tree
//       setCurrentNodeIndex(0);
//     } else {
//       const nextNodeIndex = dialogNodes.findIndex(node => node.id === nextNodeId);
//       setCurrentNodeIndex(nextNodeIndex);
//     }
//   };
  
//   return (
//     <div>
//       <p>{renderedText}</p>
//       {renderedOptions?.map((option: DialogNodeOption) => (
//         <DialogOption key={option.text} option={option} onClick={handleOptionClick} />
//       ))}
//       <br /><br />
//     </div>
//   );
// };
  
// export default DialogTree;