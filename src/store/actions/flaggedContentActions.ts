import {createAsyncThunk} from "@reduxjs/toolkit";
import {getFlaggedContent, resolveFlag} from "../../services/adminServices";

interface getFlaggedContentInterface {
    contentType: string;
}

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