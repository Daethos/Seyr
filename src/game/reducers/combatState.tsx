import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCombatData } from '../../components/GameCompiler/CombatStore';

const initialState = initialCombatData;

const combatSlice = createSlice({
    name: 'combat',
    initialState,
    reducers: {
        
    }
});

export default combatSlice.reducer;