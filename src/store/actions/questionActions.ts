import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    answerActions,
    commentActions, getQuestion, getQuestions,
    questionActions,
    searchQuestion,
    upvoteQuestion
} from "../../services/questionServices.ts";

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
 * Get questions thunk
 * @method getQuestionsThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {tags: string[], page: number, limit: number}, {}>}
 * @param {string[]} tags
 * @param {number} page
 * @param {number} limit
 */
export const getQuestionsThunk =
    createAsyncThunk<unknown, { tags: string[], page: number, limit: number }>('questionSlice/getQuestionsThunk',
        async ({tags, page, limit}) => {
            try {
                return await getQuestions(tags, page, limit).catch((error) => {
                    console.error("Error getting questions: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting questions: ", e);
                throw e;
            }
        });

/**
 * Get question thunk
 * @method getQuestionThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {id: string}, {}>}
 * @param {string} id   Question ID
 */
export const getQuestionThunk =
    createAsyncThunk<unknown, { id: string }>('questionSlice/getQuestionThunk',
        async ({id}) => {
            try {
                return await getQuestion(id).catch((error) => {
                    console.error("Error getting question: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting question: ", e);
                throw e;
            }
        });

/**
 * Question actions thunk
 * @method questionActionsThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {action: string, data: questionInterface}, {}>}
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
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {action: string, data: answerInterface}, {}>}
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
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {action: string, data: commentInterface}, {}>}
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
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {questionId: string}, {}>}
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
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, {searchTerm: string, tags: string[], page: number}, {}>}
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

