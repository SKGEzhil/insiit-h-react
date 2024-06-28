import {createSlice} from "@reduxjs/toolkit";

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