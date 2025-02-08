
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


/**
 * Represents the navigation state of an application.
 * @typedef NavigationState
 * @property {string} current - The current page.
 */
export interface NavigationState {
    current: string;
}

const initialState: NavigationState = {
    current: localStorage.getItem('currentPage') || 'home',
};

/**
 * Represents a Redux slice for navigation.
 *
 * @memberof Slices
 * @name navigationSlice
 * @type {Slice<NavigationState>}
 * @property {string} name - The name of the slice ('navigation').
 * @property {Object} initialState - The initial state of the slice.
 * @property {Function} reducers.navigateTo - A reducer function that handles navigation action.
 * @param {Object} state - The current state of the slice.
 * @param {PayloadAction<string>} action - The payload action containing navigation data.
 */
const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        navigateTo: (state, action: PayloadAction<string>) => {
            console.log('Navigating to', action.payload);
            state.current = action.payload;
            localStorage.setItem('currentPage', action.payload);
        },
    },
});

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;