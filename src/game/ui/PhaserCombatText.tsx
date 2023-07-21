import { useSelector } from 'react-redux';
import messageWindow from '../images/message_window.png';

const PhaserCombatText = () => {
    const state = useSelector((state: any) => state.combat); 
    const text = () => {
        let result = "";
        if (state.player_start_description) result += state.player_start_description + "\n";
        if (state.computer_start_description) result += state.computer_start_description + "\n";
        if (state.player_special_description) result += state.player_special_description + "\n";
        if (state.computer_special_description) result += state.computer_special_description + "\n";
        if (state.player_action_description) result += state.player_action_description + "\n";
        if (state.computer_action_description) result += state.computer_action_description + "\n";
        if (state.player_influence_description) result += state.player_influence_description + "\n";
        if (state.player_influence_description_two) result += state.player_influence_description_two + "\n";
        if (state.computer_influence_description) result += state.computer_influence_description + "\n";
        if (state.computer_influence_description_two) result += state.computer_influence_description_two + "\n";
        if (state.player_death_description) result += state.player_death_description + "\n";
        if (state.computer_death_description) result += state.computer_death_description + "\n";
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