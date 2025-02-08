import {createSlice} from "@reduxjs/toolkit";

/**
 * Paginator Slice
 * @memberof Slices
 * @type {Slice<PaginatorState>}
 * @name paginatorSlice
 * @property {string} name - The name of the slice ('paginator').
 * @property {Object} initialState - The initial state of the slice.
 * @property {Function} reducers.setPage - A reducer function that sets the current page.
 */
const paginatorSlice = createSlice({
    name: 'paginator',
    initialState: {
        page: 1,
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
    }
});

export const { setPage } = paginatorSlice.actions;
export default paginatorSlice.reducer;