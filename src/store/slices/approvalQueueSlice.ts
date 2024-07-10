import {createSlice} from "@reduxjs/toolkit";
import {UserModel} from "../../models/userModel.ts";
import {getApprovalQueueThunk, takeActionThunk} from "../actions/approvalQueueActions.ts";

type ApprovalQueue = {
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

type ApprovalQueueState = {
    queueList: ApprovalQueue[];
    loading: boolean;
    error: string | null;
};



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
                    state.queueList = action.payload as ApprovalQueue[];
                })
                .addCase(getApprovalQueueThunk.rejected, (state: ApprovalQueueState, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
                .addCase(takeActionThunk.pending, (state: ApprovalQueueState) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(takeActionThunk.fulfilled, (state: ApprovalQueueState, action) => {
                    state.loading = false;
                    console.log("Action taken: ", action.payload);
                })
                .addCase(takeActionThunk.rejected, (state: ApprovalQueueState, action) => {
                    state.loading = false;
                    console.error("Error taking action: ", action.error.message);
                    state.error = action.error.message;
                })
        }
    }
);

export default approvalQueueSlice.reducer;
export const {getQueue} = approvalQueueSlice.actions;