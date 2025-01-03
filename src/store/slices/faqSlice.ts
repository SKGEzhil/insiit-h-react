import {createSlice} from "@reduxjs/toolkit";
import {addFaqThunk, deleteFaqThunk, getFaqsThunk, updateFaqThunk} from "../actions/faqActions.ts";

/**
 * @namespace FaqSlice
 */

interface FAQInterface {
    _id: string;
    question: string;
    answer: string;
}

const initialState = {
    faqs: [],
    loading: false,
    error: null,
};

/**
 * @typedef FaqState
 * @property {FAQInterface[]} faqs
 * @property {boolean} loading
 * @property {string} error
 */

type FaqState = {
    faqs: FAQInterface[];
    loading: boolean;
    error: string | null;
};

/**
 * FAQ Slice
 * @memberof FaqSlice
 * @type {Slice<FaqState>}
 * @name faqSlice
 * @property {string} name - The name of the slice ('faq').
 * @property {FaqState} initialState - The initial state of the slice.
 * @property {Function} reducers.getFaqs - A reducer function that gets the FAQs.
 * @property {Function} extraReducers - A function that handles all async thunk actions.
 */

const faqSlice = createSlice(
    {
        name: 'faq',
        initialState: initialState,
        reducers: {
            getFaqs: (state: FaqState, action) => {
                state.faqs = action.payload
            },
            addFaq: (state: FaqState, action) => {
                state.faqs.push(action.payload)
            },
            updateFaq: (state: FaqState, action) => {
                const index = state.faqs.findIndex((faq) => faq._id === action.payload._id);
                state.faqs[index] = action.payload;
            },
            deleteFaq: (state: FaqState, action) => {
                state.faqs = state.faqs.filter((faq) => faq._id !== action.payload);
            },
        },
        extraReducers: (builder) => {
            builder.addCase(getFaqsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(getFaqsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.faqs = action.payload;
            });
            builder.addCase(getFaqsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            builder.addCase(addFaqThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(addFaqThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.faqs.push(action.payload);
            });
            builder.addCase(addFaqThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            builder.addCase(updateFaqThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(updateFaqThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.faqs.findIndex((faq) => faq._id === action.payload._id);
                state.faqs[index] = action.payload;
            });
            builder.addCase(updateFaqThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }
            );
            builder.addCase(deleteFaqThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(deleteFaqThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            });
            builder.addCase(deleteFaqThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        }
    });

export const {getFaqs, addFaq, updateFaq, deleteFaq} = faqSlice.actions;
export default faqSlice.reducer;
