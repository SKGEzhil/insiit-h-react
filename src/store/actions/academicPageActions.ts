import {createAsyncThunk} from "@reduxjs/toolkit";
import {addSection, getSections} from "../../services/academicPageServices.ts";

export const addSectionThunk = createAsyncThunk('academicPageSlice/addSectionThunk',
    async ({
               time,
               blocks,
                version
           }) => {
        try {
            return await addSection(time, blocks, version).catch((error) => {
                console.error("Error adding section: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error adding section: ", e);
            throw e;
        }
    });

export const getSectionsThunk = createAsyncThunk('academicPageSlice/getSectionsThunk',
    async () => {
        try {
            return await getSections().catch((error) => {
                console.error("Error getting sections: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error getting sections: ", e);
            throw e;
        }
    });