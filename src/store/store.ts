import {configureStore} from "@reduxjs/toolkit";
import questionSlice from "./slices/questionSlice.ts";
import navigationSlice from "./slices/navigationSlice.ts";
import paginatorSlice from "./slices/paginatorSlice.ts";
import progressSlice from "./slices/progressSlice.ts";
import academicPageSlice from "./slices/academicPageSlice.ts";
import approvalQueueSlice from "./slices/approvalQueueSlice.ts";

export const store = configureStore({
    reducer: {
        questionSlice: questionSlice,
        navigationSlice: navigationSlice,
        paginatorSlice: paginatorSlice,
        progressSlice: progressSlice,
        academicPageSlice: academicPageSlice,
        approvalQueueSlice: approvalQueueSlice
    }
})
