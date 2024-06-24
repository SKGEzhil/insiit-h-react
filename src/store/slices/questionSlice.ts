import {createSlice} from "@reduxjs/toolkit";
import {answerQuestionThunk, createQuestionThunk} from "../actions/questionActions.ts";
import {QuestionModel} from "../../models/questionModel.ts";

const initialState = {
    questions: [],
    loading: false,
    error: null,
};

type QuestionState = {
    questions: QuestionModel[];
    loading: boolean;
    error: string | null;
};


const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        addQuestion(state, action) {
            state.questions.push(action.payload);
        },
        updateQuestionList(state, action) {
            console.log("Updating question list")
            console.log(action.payload);
            state.questions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuestionThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuestionThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Question created: ", action.payload);
                state.questions.push(action.payload as QuestionModel);
            })
            .addCase(createQuestionThunk.rejected, (state: QuestionState, action) => {
                state.loading = false;
                console.error("Error creating question: ", action.error.message);
                state.error = action.error.message;
            })
            .addCase(answerQuestionThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(answerQuestionThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Question answered: ", action.payload);
            })
            .addCase(answerQuestionThunk.rejected, (state: QuestionState, action) => {
                state.loading = false;
                console.error("Error answering question: ", action.error.message);
                state.error = action.error.message;
            })
    }
});

export const {addQuestion, updateQuestionList} = questionSlice.actions;

export default questionSlice.reducer;

