
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
    current: string;
}

const initialState: NavigationState = {
    current: 'home',
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        navigateTo: (state, action: PayloadAction<string>) => {
            console.log('Navigating to', action.payload);
            state.current = action.payload;
        },
    },
});

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;