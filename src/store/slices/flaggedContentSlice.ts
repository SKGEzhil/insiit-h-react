import {createSlice} from "@reduxjs/toolkit";

import {getFlaggedContentThunk, resolveFlagThunk} from "../actions/flaggedContentActions.ts";

/**
 * @typedef FlaggedContentType
 * @property {string} _id
 * @property {string} contentType
 * @property {string} questionId
 * @property {string} contentId
 * @property {string} status
 * @property {string} content
 */
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

/**
 * @typedef FlaggedContentState
 * @property {FlaggedContentType[]} flaggedContentList
 * @property {boolean} loading
 * @property {string} error
 */
type FlaggedContentState = {
    flaggedContentList: FlaggedContentType[];
    loading: boolean;
    error: string | null;
};

/**
 * flaggedContentSlice represents the Redux slice for managing flagged content-related state.
 * @memberof Slices
 *
 * @type {Slice<FlaggedContentState>}
 * @name flaggedContentSlice
 * @property {string} name - The name of the slice ('flaggedContent').
 * @property {FlaggedContentState} initialState - The initial state of the slice.
 * @property {Function} reducers.getFlaggedContent - A reducer function that updates the flagged content list.
 * @property {Function} extraReducers - A function that handles all async thunk actions.
 *
 */
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