import {getApprovalQueue, takeAction} from "../../services/adminServices.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getApprovalQueueThunk =
    createAsyncThunk('approvalQueueSlice/getApprovalQueueThunk',
        async ({
                     action
               }) => {
            try {
                return await getApprovalQueue(action).catch((error) => {
                    console.error("Error getting approval queue: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting approval queue: ", e);
                throw e;
            }
        });

export const takeActionThunk =
    createAsyncThunk('approvalQueueSlice/takeActionThunk',
        async ({
                     id,
                     status
               }) => {
            try {
                return await takeAction(id, status).catch((error) => {
                    console.error("Error taking action: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error taking action: ", e);
                throw e;
            }
        });