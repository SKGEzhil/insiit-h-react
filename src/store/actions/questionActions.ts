import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    answerActions,
    commentActions,
    questionActions,
    searchQuestion,
    upvoteQuestion
} from "../../services/questionServices.ts";

/**
 * @namespace QuestionSlice
 */

/**
 * @typedef questionInterface
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string[]} tags
 */
interface questionInterface {
    id?: string;
    title?: string;
    body?: string;
    tags?: string[];
}

/**
 * @typedef answerInterface
 * @property {string} questionId
 * @property {string} answer
 */
interface answerInterface {
    questionId: string;
    answerId?: string;
    answer?: string;
}

/**
 * @typedef commentInterface
 * @property {string} questionId
 * @property {string} answerId
 * @property {string} commentId
 * @property {string} comment
 */
interface commentInterface {
    questionId: string;
    answerId?: string;
    commentId?: string;
    comment?: string;
}

/**
 * Question actions thunk
 * @method questionActionsThunk
 * @memberof QuestionSlice
 * @param {string} action
 * @param {questionInterface} data
 */
export const questionActionsThunk
    = createAsyncThunk<unknown, {
    action: string,
    data: questionInterface
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

/**
 * Answer actions thunk
 * @method answerActionsThunk
 * @memberof QuestionSlice
 * @param {string} action
 * @param {answerInterface} data
 */
export const answerActionsThunk
    = createAsyncThunk<unknown, {
    action: string,
    data: answerInterface
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

/**
 * Comment actions thunk
 * @method commentActionsThunk
 * @memberof QuestionSlice
 * @param {string} action
 * @param {commentInterface} data
 */
export const commentActionsThunk
    = createAsyncThunk<unknown, {
    action: string,
    data: commentInterface
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

/**
 * Upvote question thunk
 * @method upvoteQuestionThunk
 * @memberof QuestionSlice
 * @param {string} questionId
 */
export const upvoteQuestionThunk =
    createAsyncThunk<unknown, {questionId: string}>('questionSlice/upvoteQuestionThunk',
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

/**
 * Search question thunk
 * @method searchQuestionThunk
 * @memberof QuestionSlice
 * @param {string} searchTerm
 * @param {string[]} tags
 * @param {number} page
 */
export const searchQuestionThunk =
    createAsyncThunk<unknown, {searchTerm: string, tags: string[], page: number}>('questionSlice/searchQuestionsThunk',
        async ({searchTerm, tags, page}) => {
            try {
                return await searchQuestion(searchTerm, tags, page, 7).catch((error) => {
                    console.error("Error searching questions: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error searching questions: ", e);
                throw e;
            }
        });

