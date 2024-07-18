import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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

/**
 * @typedef BlogState
 * @property {BlockModel[]} sections
 * @property {boolean} loading
 * @property {string} error
 */
type BlogState = {
    sections: BlockModel[];
    loading: boolean;
    error: string | null;

};


type ActionPayload = [{
    id: string;
    time: string;
    blocks: string;
    version: string;
    page: string;
}]

/**
 * Blog Slice
 * @memberof BlogSlice
 * @type {Slice<BlogState>}
 * @name blogSlice
 * @property {string} name - The name of the slice ('blogSlice').
 * @property {BlogState} initialState - The initial state of the slice.
 * @property {Function} reducers.addSection - A reducer function that adds a section to the list of sections.
 * @property {Function} extraReducers - A function that handles all async thunk actions.
 */
const blogSlice = createSlice({
    name: 'blogSlice',
    initialState: initialState,
    reducers: {
        addSection(state: BlogState, action: PayloadAction<BlockModel>) {
            state.sections.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSectionThunk.pending, (state:BlogState,) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSectionThunk.fulfilled, (state:BlogState, ) => {
                state.loading = false;

            })
            .addCase(addSectionThunk.rejected, (state:BlogState, ) => {
                state.loading = false;
                // state.error = action.error.message;
            })
            .addCase(getSectionsThunk.pending, (state:BlogState, ) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSectionsThunk.fulfilled, (state:BlogState, action: PayloadAction<ActionPayload>) => {
                state.loading = false;
                console.log('BLOCKS2', action.payload)

                // state.sections = action.payload.map((section) => {section.blocks = graphqlStringToJson(section.blocks); return section}) as BlockModel[]
                state.sections = [];
                action.payload.forEach((section) => {
                    section.blocks = graphqlStringToJson(section.blocks as string);
                    state.sections.push(BlockModel.fromJson(section))
                })


            })
            .addCase(getSectionsThunk.rejected, (state:BlogState, ) => {
                state.loading = false;
                // state.error = action.error.message;
            })
            .addCase(deleteSectionThunk.pending, (state:BlogState, ) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSectionThunk.fulfilled, (state:BlogState, ) => {
                state.loading = false;
            })
            .addCase(deleteSectionThunk.rejected, (state:BlogState, ) => {
                state.loading = false;
                // state.error = action.error.message;
            })
            .addCase(editSectionThunk.pending, (state:BlogState, ) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editSectionThunk.fulfilled, (state:BlogState, ) => {
                state.loading = false;
            })
            .addCase(editSectionThunk.rejected, (state:BlogState, ) => {
                state.loading = false;
                // state.error = action.error.message;
            })

    }
});

export const { addSection } = blogSlice.actions;

export default blogSlice.reducer;