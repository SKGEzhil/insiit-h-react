import {createSlice} from "@reduxjs/toolkit";
import {
    answerActionsThunk,
    commentActionsThunk,
    questionActionsThunk, searchQuestionThunk,
    upvoteQuestionThunk
} from "../actions/questionActions.ts";
import {QuestionModel} from "../../models/questionModel.ts";

export const initialState = {
    questions: [],
    loading: false,
    error: null,
};

/**
 * @typedef QuestionState
 * @property {QuestionModel[]} questions
 * @property {boolean} loading
 * @property {string} error
 */
type QuestionState = {
    questions: QuestionModel[];
    loading: boolean;
    error: string | null;
};

/**
 * questionSlice represents the Redux slice for managing question-related state.
 * @memberof QuestionSlice
 *
 * @type {Slice<QuestionState>}
 * @name questionSlice
 * @property {string} name - The name of the slice ('question').
 * @property {QuestionState} initialState - The initial state of the slice.
 * @property {Function} reducers.addQuestion - A reducer function that adds a question to the list of questions.
 * @property {Function} reducers.updateQuestionList - A reducer function that updates the list of questions.
 * @property {Function} extraReducers - A function that handles all async thunk actions.
 *
 */
const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        addQuestion(state: QuestionState, action) {
            state.questions.push(action.payload as QuestionModel);
        },
        updateQuestionList(state, action) {
            console.log("Updating question list")
            console.log(action.payload);
            state.questions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(questionActionsThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(questionActionsThunk.fulfilled, (state: QuestionState, ) => {
                state.loading = false;
                // console.log("Question created: ", action.payload);
                // state.questions.push(action.payload as QuestionModel);
            })
            .addCase(questionActionsThunk.rejected, (state: QuestionState) => {
                state.loading = false;
                // console.error("Error creating question: ", action.error.message);
                // state.error = action.error.message;
            })
            .addCase(answerActionsThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(answerActionsThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Question answered: ", action.payload);
            })
            .addCase(answerActionsThunk.rejected, (state: QuestionState, ) => {
                state.loading = false;
                // console.error("Error answering question: ", action.error.message);
                // state.error = action.error.message;
            })
            .addCase(commentActionsThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentActionsThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Comment created: ", action.payload);
            })
            .addCase(commentActionsThunk.rejected, (state: QuestionState, ) => {
                state.loading = false;
                // console.error("Error creating comment: ", action.error.message);
                // state.error = action.error.message;
            })
            .addCase(upvoteQuestionThunk.pending, (state: QuestionState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(upvoteQuestionThunk.fulfilled, (state: QuestionState, action) => {
                state.loading = false;
                console.log("Question upvoted: ", action.payload);
            })
            .addCase(upvoteQuestionThunk.rejected, (state: QuestionState, ) => {
                state.loading = false;
                // console.error("Error upvoting question: ", action.error.message);
                // state.error = action.error.message;
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
            .addCase(searchQuestionThunk.rejected, (state: QuestionState, ) => {
                state.loading = false;
                // console.error("Error searching questions: ", action.error.message);
                // state.error = action.error.message;
            })
    }
});

export const {addQuestion, updateQuestionList} = questionSlice.actions;

export default questionSlice.reducer;

