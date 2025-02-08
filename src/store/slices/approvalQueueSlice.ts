import {createSlice} from "@reduxjs/toolkit";
import {UserModel} from "../../models/userModel.ts";
import {getApprovalQueueThunk, takeActionThunk} from "../actions/approvalQueueActions.ts";
import '../actions/approvalQueueActions.ts';

/**
 * @typedef ApprovalQueueType
 * @property {string} id
 * @property {string} action
 * @property {UserModel} user
 * @property {string} date
 * @property {string} status
 * @property {never} data
 */
type ApprovalQueueType = {
    id: string;
    action: string;
    user: UserModel;
    date: string;
    status: string;
    data: never;
}

const initialState = {
    queueList: [],
    loading: false,
    error: null,
};

/**
 * @typedef ApprovalQueueState
 * @property {ApprovalQueueType[]} queueList
 * @property {boolean} loading
 * @property {string} error
 */
type ApprovalQueueState = {
    queueList: ApprovalQueueType[];
    loading: boolean;
    error: string | null;
};


/**
 * approvalQueueSlice represents the Redux slice for managing approval queue-related state.
 * @memberof Slices
 *
 * @type {Slice<ApprovalQueueState>}
 * @name approvalQueueSlice
 * @property {string} name - The name of the slice ('approvalQueue').
 * @property {ApprovalQueueState} initialState - The initial state of the slice.
 * @property {Function} reducers.getQueue - A reducer function that updates the approval queue.
 * @property {Function} extraReducers - A function that handles all async thunk actions.
 *
 */
const approvalQueueSlice = createSlice(
    {
        name: 'approvalQueue',
        initialState: initialState,
        reducers: {
            getQueue: (state: ApprovalQueueState, action) => {
                state.queueList = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getApprovalQueueThunk.pending, (state: ApprovalQueueState) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getApprovalQueueThunk.fulfilled, (state: ApprovalQueueState, action) => {
                    state.loading = false;
                    state.queueList = action.payload as ApprovalQueueType[];
                })
                .addCase(getApprovalQueueThunk.rejected, (state: ApprovalQueueState, ) => {
                    state.loading = false;
                    // state.error = action.error.message;
                })
                .addCase(takeActionThunk.pending, (state: ApprovalQueueState) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(takeActionThunk.fulfilled, (state: ApprovalQueueState, action) => {
                    state.loading = false;
                    console.log("Action taken: ", action.payload);
                })
                .addCase(takeActionThunk.rejected, (state: ApprovalQueueState, ) => {
                    state.loading = false;
                    // console.error("Error taking action: ", action.error.message);
                    // state.error = action.error.message;
                })
        }
    }
);

export default approvalQueueSlice.reducer;
export const {getQueue} = approvalQueueSlice.actions;