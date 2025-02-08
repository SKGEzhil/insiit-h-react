import {createAsyncThunk} from "@reduxjs/toolkit";
import {getFlaggedContent, resolveFlag} from "../../services/adminServices";

/**
 * Interface for getting flagged content
 * @typedef getFlaggedContentInterface
 * @property {string} contentType
 */
interface getFlaggedContentInterface {
    contentType: string;
}

/**
 * Get flagged content
 * @method getFlaggedContentThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, getFlaggedContentInterface, {}>}
 * @param {string} contentType
 */
export const getFlaggedContentThunk =
    createAsyncThunk<unknown, getFlaggedContentInterface>('flaggedContentSlice/getFlaggedContentThunk',
        async ({
                     contentType
               }) => {
            try {
                return await getFlaggedContent(contentType).catch((error: { message: any; }) => {
                    console.error("Error getting flagged content: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting flagged content: ", e);
                throw e;
            }
        });

/**
 * Resolve flag
 * @method resolveFlagThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {id: string, status: string}, {}>}
 * @param {string} id Flag ID
 * @param {string} status {'resolved'}
 */
export const resolveFlagThunk = createAsyncThunk<unknown, { id: string, status: string }>('flaggedContentSlice/resolveFlagThunk',
    async ({id}) => {
        try {
            return await resolveFlag(id).catch((error: { message: any; }) => {
                console.error("Error resolving flag: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error resolving flag: ", e);
            throw e;
        }
    });