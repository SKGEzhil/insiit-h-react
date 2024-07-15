import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    answerActions,
    commentActions,
    questionActions,
    searchQuestion,
    upvoteQuestion
} from "../../services/questionServices.ts";

interface upvoteQuestionInterface {
    questionId: string;
}

interface searchQuestionInterface {
    searchTerm: string;
    tags: string[];
    page: number;
}

export const questionActionsThunk
    = createAsyncThunk<unknown, {
    action: string,
    data: { id?: string, title?: string, body?: string, tags?: string[] }
}>('questionSlice/questionActionsThunk',
    async ({
               action, data
           }) => {
        try {
            return await questionActions(action, data).catch((error) => {
                console.error("Error creating question: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error creating question: ", e);
            throw e;
        }
    });

export const answerActionsThunk
    = createAsyncThunk<unknown, {
    action: string,
    data: { questionId: string, answerId?: string, answer?: string }
}>('questionSlice/answerActionsThunk',
    async ({
               action, data
           }) => {
        try {
            return await answerActions(action, data).catch((error) => {
                console.error("Error creating question: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error creating question: ", e);
            throw e;
        }
    });

export const commentActionsThunk
    = createAsyncThunk<unknown, {
    action: string,
    data: { questionId: string, answerId?: string, commentId?: string, comment?: string }
}>('questionSlice/commentActionsThunk',
    async ({
               action, data
           }) => {
        try {
            return await commentActions(action, data).catch((error) => {
                console.error("Error creating question: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error creating question: ", e);
            throw e;
        }
    });

export const upvoteQuestionThunk =
    createAsyncThunk<unknown, upvoteQuestionInterface>('questionSlice/upvoteQuestionThunk',
        async ({questionId}) => {
            try {
                return await upvoteQuestion(questionId).catch((error) => {
                    console.error("Error upvoting question: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error upvoting question: ", e);
                throw e;
            }
        });

export const searchQuestionThunk =
    createAsyncThunk<unknown, searchQuestionInterface>('questionSlice/searchQuestionsThunk',
        async ({searchTerm, tags, page}) => {
            try {
                return await searchQuestion(searchTerm, tags, page, 3).catch((error) => {
                    console.error("Error searching questions: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error searching questions: ", e);
                throw e;
            }
        });

