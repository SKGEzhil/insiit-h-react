import {createSlice} from "@reduxjs/toolkit";
import {BlockModel} from "../../models/blockModel.ts";
import {
    addSectionThunk,
    deleteSectionThunk,
    editSectionThunk,
    getSectionsThunk
} from "../actions/blogActions.ts";
import {graphqlStringToJson} from "../../utils/graphqlStringConversion.ts";

export const initialState = {
    sections: [],
    loading: false,
    error: null,
};

type BlogState = {
    sections: BlockModel[];
    loading: boolean;
    error: any;

};

const blogSlice = createSlice({
    name: 'blogSlice',
    initialState: initialState,
    reducers: {
        addSection(state, action) {
            state.sections.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSectionThunk.pending, (state:BlogState, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSectionThunk.fulfilled, (state:BlogState, action) => {
                state.loading = false;
                const jsonData = graphqlStringToJson(action.payload.blocks);
                state.sections.push(BlockModel.fromJson({
                    id: action.payload.id,
                    time: action.payload.time,
                    blocks: jsonData,
                    version: action.payload.version,
                    page: action.payload.page
                }))

            })
            .addCase(addSectionThunk.rejected, (state:BlogState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getSectionsThunk.pending, (state:BlogState, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSectionsThunk.fulfilled, (state:BlogState, action) => {
                state.loading = false;
                console.log('BLOCKS', action.payload)

                state.sections = action.payload.map((section) => {section.blocks = graphqlStringToJson(section.blocks); return section})


            })
            .addCase(getSectionsThunk.rejected, (state:BlogState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteSectionThunk.pending, (state:BlogState, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSectionThunk.fulfilled, (state:BlogState, action) => {
                state.loading = false;
            })
            .addCase(deleteSectionThunk.rejected, (state:BlogState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editSectionThunk.pending, (state:BlogState, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editSectionThunk.fulfilled, (state:BlogState, action) => {
                state.loading = false;
            })
            .addCase(editSectionThunk.rejected, (state:BlogState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});

export const { addSection } = blogSlice.actions;

export default blogSlice.reducer;