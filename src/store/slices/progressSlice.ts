import {createSlice} from "@reduxjs/toolkit";

const progressSlice = createSlice({
    name: 'progress',
    initialState: {
        value: 0,
    },
    reducers: {
        startProgress: (state) => {
            state.value = Math.floor(Math.random() * 40) + 10
        },
        endProgress: (state) => {
            state.value = 100
        },
        resetProgress: (state) => {
            state.value = 0
        }
    },
});

export const {startProgress, endProgress, resetProgress} = progressSlice.actions;
export default progressSlice.reducer;
