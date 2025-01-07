import {createAsyncThunk} from "@reduxjs/toolkit";
import {addFaq, deleteFaq, getFaqs, searchFaqs, updateFaq} from "../../services/faqServices.ts";

/**
 * @namespace FaqSlice
 */

/**
 * Get FAQs
 * @method getFaqsThunk
 * @memberof FaqSlice
 */

interface addFaqInterface {
    question: string;
    answer: string;
    tags: string[];
}

interface updateFaqInterface {
    _id: string;
    question: string;
    answer: string;
}

export const getFaqsThunk =
    createAsyncThunk<unknown, {page: number, limit: number}>('faqSlice/getFaqsThunk',
        async ({page, limit}) => {
            try {
                return await getFaqs(page, limit).catch((error) => {
                    console.error("Error getting FAQs: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting FAQs: ", e);
                throw e;
            }
        });

export const searchFaqsThunk =
    createAsyncThunk<unknown, {search: string, tags: string[], page: number, limit: number}>('faqSlice/searchFaqsThunk',
        async ({search, tags, page, limit}) => {
            try {
                return await searchFaqs(search, tags, page, limit).catch((error) => {
                    console.error("Error searching FAQs: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error searching FAQs: ", e);
                throw e;
            }
        });

/**
 * Add FAQ
 * @method addFaqThunk
 * @memberof FaqSlice
 */

export const addFaqThunk =
    createAsyncThunk<unknown, addFaqInterface>('faqSlice/addFaqThunk',
        async ({question, answer, tags}) => {
            try {
                return await addFaq(question, answer, tags).catch((error) => {
                    console.error("Error adding FAQ: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error adding FAQ: ", e);
                throw e;
            }
        });

/**
 * Update FAQ
 * @method updateFaqThunk
 * @memberof FaqSlice
 */

export const updateFaqThunk =
    createAsyncThunk<unknown, updateFaqInterface>('faqSlice/updateFaqThunk',
        async ({_id, question, answer}) => {
            try {
                return await updateFaq(_id, question, answer).catch((error) => {
                    console.error("Error updating FAQ: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error updating FAQ: ", e);
                throw e;
            }
        });

export const deleteFaqThunk =
    createAsyncThunk<unknown, { id: string }>('faqSlice/deleteFaqThunk',
        async ({id}) => {
            try {
                return await deleteFaq(id).catch((error) => {
                    console.error("Error deleting FAQ: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error deleting FAQ: ", e);
                throw e;
            }
        });