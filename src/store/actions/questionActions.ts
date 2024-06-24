import {createAsyncThunk} from "@reduxjs/toolkit";
import {answerQuestion, createQuestion} from "../../services/questionServices.ts";

export const createQuestionThunk
    = createAsyncThunk('questionSlice/createQuestionThunk',
    async ({
               title,
               body,
               tags
           }) => {
        try {
            return await createQuestion(title, body, tags).catch((error) => {
                console.error("Error creating question: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error creating question: ", e);
            throw e;
        }
    });

export const answerQuestionThunk
    = createAsyncThunk('questionSlice/answerQuestionThunk',
    async ({
               questionId,
               answer
           }) => {
        try {
            return await answerQuestion(questionId, answer).catch((error) => {
                console.error("Error answering question: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error answering question: ", e);
            throw e;
        }

    });
