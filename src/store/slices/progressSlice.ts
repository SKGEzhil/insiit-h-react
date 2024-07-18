import {createSlice} from "@reduxjs/toolkit";

/**
 * @namespace ProgressSlice
 */

/**
 * Represents the progress state of an application.
 * @typedef ProgressState
 * @property {number} value - The current value of the progress.
 */
type ProgressState = {
    value: number;
}

/**
 * Represents a Redux slice for managing progress state.
 *
 * @memberof ProgressSlice
 * @type {Slice}
 * @name progressSlice
 * @param {Slice}
 * @property {string} name - The name of the slice.
 * @property {ProgressState} initialState - The initial state of the slice.
 * @property {Function} reducers.startProgress - A function that updates the progress value to a random number between 10 and 50.
 * @property {Function} reducers.endProgress - A function that updates the progress value to 100.
 * @property {Function} reducers.resetProgress - A function that updates the progress value to 0.
 */
const progressSlice = createSlice({
    name: 'progress',
    initialState: {
        value: 0,
    },
    reducers: {
        startProgress: (state: ProgressState) => {
            state.value = Math.floor(Math.random() * 40) + 10
        },
        endProgress: (state:ProgressState) => {
            state.value = 100
        },
        resetProgress: (state: ProgressState) => {
            state.value = 0
        }
    },
});

export const {startProgress, endProgress, resetProgress} = progressSlice.actions;
export default progressSlice.reducer;
