import { useSelector } from 'react-redux';
import messageWindow from '../images/message_window.png';

const PhaserCombatText = () => {
    const state = useSelector((state: any) => state.combat); 
    const text = () => {
        let result = "";
        if (state.playerStartDescription) result += state.playerStartDescription + "\n";
        if (state.computerStartDescription) result += state.computerStartDescription + "\n";
        if (state.playerSpecialDescription) result += state.playerSpecialDescription + "\n";
        if (state.computerSpecialDescription) result += state.computerSpecialDescription + "\n";
        if (state.playerActionDescription) result += state.playerActionDescription + "\n";
        if (state.computerActionDescription) result += state.computerActionDescription + "\n";
        if (state.playerInfluenceDescription) result += state.playerInfluenceDescription + "\n";
        if (state.playerInfluenceDescriptionTwo) result += state.playerInfluenceDescriptionTwo + "\n";
        if (state.computerInfluenceDescription) result += state.computerInfluenceDescription + "\n";
        if (state.computerInfluenceDescriptionTwo) result += state.computerInfluenceDescriptionTwo + "\n";
        if (state.playerDeathDescription) result += state.playerDeathDescription + "\n";
        if (state.computerDeathDescription) result += state.computerDeathDescription + "\n";
        if (state.combatTimer) result += `Combat Timer: ${state.combatTimer} \n`;
        return result;
    };
    return (
        <div>
            <textarea 
                id='story-console' 
                value={text()}
                readOnly>
            </textarea>
            <img src={messageWindow} alt="message window" style={{ position: 'absolute', top: '100px', transform: 'scale(1.1)' }} />
        </div>
    );
};

export default PhaserCombatText;