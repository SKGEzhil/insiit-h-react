import {createSlice} from "@reduxjs/toolkit";

import {getFlaggedContentThunk, resolveFlagThunk} from "../actions/flaggedContentActions.ts";

type FlaggedContentType = {
    _id: string;
    contentType: string;
    questionId: string;
    contentId: string;
    status: string;
    content: string;
}

const initialState = {
    flaggedContentList: [],
    loading: false,
    error: null,
};

type FlaggedContentState = {
    flaggedContentList: FlaggedContentType[];
    loading: boolean;
    error: string | null;
};

const flaggedContentSlice = createSlice(
    {
        name: 'flaggedContent',
        initialState: initialState,
        reducers: {
            getFlaggedContent: (state: FlaggedContentState, action) => {
                state.flaggedContentList = action.payload
            }
        },
        extraReducers: (builder) => {
            builder.addCase(getFlaggedContentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(getFlaggedContentThunk.fulfilled, (state, action) => {
                // console.log('ACTION',action.payload);
                state.flaggedContentList = action.payload;
                state.loading = false;
                state.error = null;
            });
            builder.addCase(getFlaggedContentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            builder.addCase(resolveFlagThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(resolveFlagThunk.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            });
            builder.addCase(resolveFlagThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        }
    }
);

export default flaggedContentSlice.reducer;