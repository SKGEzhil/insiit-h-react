import {createSlice} from "@reduxjs/toolkit";
import {getUserDataThunk, getAllUsersThunk, editUserThunk, deleteUserThunk} from "../actions/adminActions.ts";

/**
 * @namespace Slices
 */

const initialState = {
    users: [],
    current: null,
    loading: false,
    error: null,
};

interface UserInterface {
    id: string;
    name: string;
    email: string;
    role: string;
    photoURL: string;
    permissions: string[];
}

/**
 * @typedef AdminState
 * @property {UserInterface[]} users
 * @property {boolean} loading
 * @property {string} error
 */

type AdminState = {
    users: UserInterface[];
    current: UserInterface | null;
    loading: boolean;
    error: string | null;
};

/**
 * adminSlice represents the Redux slice for managing admin-related state.
 * @memberof Slices
 *
 * @type {Slice<AdminState>}
 * @name adminSlice
 * @property {string} name - The name of the slice ('admin').
 * @property {AdminState} initialState - The initial state of the slice.
 * @property {Function} extraReducers - A function that handles all async thunk actions.
 *
 */

const adminSlice = createSlice(
    {
        name: 'admin',
        initialState: initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(getUserDataThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            });
            builder.addCase(getUserDataThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            builder.addCase(getAllUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            });
            builder.addCase(getAllUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            builder.addCase(editUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(editUserThunk.fulfilled, (state, action) => {
                state.loading = false;
            });
            builder.addCase(editUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            builder.addCase(deleteUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.loading = false;
            });
            builder.addCase(deleteUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        }
    }
);

export default adminSlice.reducer;