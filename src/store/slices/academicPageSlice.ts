import {createSlice} from "@reduxjs/toolkit";
import {BlockModel} from "../../models/blockModel.ts";
import {addSectionThunk, getSectionsThunk} from "../actions/academicPageActions.ts";
import {graphqlStringToJson} from "../../utils/graphqlStringConversion.ts";

const initialState = {
    sections: [],
    loading: false,
    error: null,
};

type AcademicPageState = {
    sections: BlockModel[];
    loading: boolean;
    error: any;

};

const academicPageSlice = createSlice({
    name: 'academicPage',
    initialState: initialState,
    reducers: {
        addSection(state, action) {
            state.sections.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSectionThunk.pending, (state:AcademicPageState, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSectionThunk.fulfilled, (state:AcademicPageState, action) => {
                state.loading = false;
                const jsonData = graphqlStringToJson(action.payload.blocks);
                state.sections.push(BlockModel.fromJson({
                    time: action.payload.time,
                    blocks: jsonData,
                    version: action.payload.version
                }))

            })
            .addCase(addSectionThunk.rejected, (state:AcademicPageState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getSectionsThunk.pending, (state:AcademicPageState, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSectionsThunk.fulfilled, (state:AcademicPageState, action) => {
                state.loading = false;
                console.log('BLOCKS', action.payload)

                state.sections = action.payload.map((section) => {section.blocks = graphqlStringToJson(section.blocks); return section})


            })
            .addCase(getSectionsThunk.rejected, (state:AcademicPageState, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
});

export const { addSection } = academicPageSlice.actions;

export default academicPageSlice.reducer;