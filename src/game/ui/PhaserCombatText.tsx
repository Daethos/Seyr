import { useSelector } from 'react-redux';
import messageWindow from '../images/message_window.png';

const PhaserCombatText = () => {
    const state = useSelector((state: any) => state.combat);
    const storyStyle = {
        height: "120px",
        width: "450px",  
        fontSize: "12px",
        borderRadius: "3px",
        border: "4px solid #2A0134",
        boxShadow: "2px 2px 2px black"
    };
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
            <img src={messageWindow} alt="message window" style={{ position: 'absolute' }} />
            <textarea 
                style={storyStyle}
                id='story-console' 
                value={text()}
                readOnly>
            </textarea>
        </div>
    );
};

export default PhaserCombatText;