import {getApprovalQueue, takeAction} from "../../services/adminServices.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

/**
 * @namespace ApprovalQueueSlice
 */

/**
 * @typedef getApprovalQueueInterface
 * @property {string} action
 */
interface getApprovalQueueInterface {
    action: string;
}

/**
 * @typedef takeActionInterface
 * @property {string} id
 * @property {string} status
 */
interface takeActionInterface {
    id: string;
    status: string;
}

/**
 * Get approval queue
 * @method getApprovalQueueThunk
 * @memberof ApprovalQueueSlice
 * @param {getApprovalQueueInterface} action
 */
export const getApprovalQueueThunk =
    createAsyncThunk<unknown, getApprovalQueueInterface>('approvalQueueSlice/getApprovalQueueThunk',
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

/**
 * Takes action on approval request
 * @method takeActionThunk
 * @memberof ApprovalQueueSlice
 * @param {takeActionInterface} id Queue ID
 * @param {takeActionInterface} status {'approved', 'rejected'}
 */
export const takeActionThunk =
    createAsyncThunk<unknown, takeActionInterface>('approvalQueueSlice/takeActionThunk',
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