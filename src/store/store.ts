import {configureStore} from "@reduxjs/toolkit";
import questionSlice from "./slices/questionSlice.ts";
import navigationSlice from "./slices/navigationSlice.ts";
import paginatorSlice from "./slices/paginatorSlice.ts";
import progressSlice from "./slices/progressSlice.ts";
import blogSlice from "./slices/blogSlice.ts";
import approvalQueueSlice from "./slices/approvalQueueSlice.ts";
import flaggedContentSlice from "./slices/flaggedContentSlice.ts";

/**
 * Represents a Redux store.\
 * Contains all the slices.\
 * [questionSlice, navigationSlice, paginatorSlice, progressSlice, blogSlice, approvalQueueSlice]
 * @type {Store}
 * @name store
 * @property {Object} reducer - The reducer object. Contains all the slices.\
 * [questionSlice, navigationSlice, paginatorSlice, progressSlice, blogSlice, approvalQueueSlice]
 */
export const store = configureStore({
    reducer: {
        questionSlice: questionSlice,
        navigationSlice: navigationSlice,
        paginatorSlice: paginatorSlice,
        progressSlice: progressSlice,
        blogSlice: blogSlice,
        approvalQueueSlice: approvalQueueSlice,
        flaggedContentSlice: flaggedContentSlice
    }
})

export type AppDispatch = typeof store.dispatch;