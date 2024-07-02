import {createSlice} from "@reduxjs/toolkit";
import {
    answerQuestionThunk,
    createCommentThunk,
    createQuestionThunk, searchQuestionThunk,
    upvoteQuestionThunk
} from "../actions/questionActions.ts";
import {QuestionModel} from "../../models/questionModel.ts";

export const initialState = {
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
            .addCase(createCommentThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCommentThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Comment created: ", action.payload);
            })
            .addCase(createCommentThunk.rejected, (state: QuestionState, action) => {
                state.loading = false;
                console.error("Error creating comment: ", action.error.message);
                state.error = action.error.message;
            })
            .addCase(upvoteQuestionThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(upvoteQuestionThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Question upvoted: ", action.payload);
            })
            .addCase(upvoteQuestionThunk.rejected, (state: QuestionState, action) => {
                state.loading = false;
                console.error("Error upvoting question: ", action.error.message);
                state.error = action.error.message;
            })
            .addCase(searchQuestionThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchQuestionThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Questions found: ", action.payload);
                state.questions = action.payload as QuestionModel[];
            })
            .addCase(searchQuestionThunk.rejected, (state: QuestionState, action) => {
                state.loading = false;
                console.error("Error searching questions: ", action.error.message);
                state.error = action.error.message;
            })
    }
});

export const {addQuestion, updateQuestionList} = questionSlice.actions;

export default questionSlice.reducer;

