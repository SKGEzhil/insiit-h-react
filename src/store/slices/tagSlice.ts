import {createSlice} from "@reduxjs/toolkit";

/**
 * @typedef TagInterface
 * @property {string} name
 */
interface TagInterface {
    name: string;
}

const initialState = {
    tags: [],
    loading: false,
    error: null,
};

/**
 * @typedef TagState
 * @property {TagInterface[]} tags
 * @property {boolean} loading
 * @property {string} error
 */
type TagState = {
    tags: TagInterface[];
    loading: boolean;
    error: string | null;
};

/**
 * tagSlice represents the Redux slice for managing tag-related state.
 * @memberof Slices
 *
 * @type {Slice<TagState>}
 * @name tagSlice
 * @property {string} name - The name of the slice ('tag').
 * @property {TagState} initialState - The initial state of the slice.
 * @property {Function} reducers.getTagsReducer - A reducer function that updates the tag list.
 */
const tagSlice = createSlice(
    {
        name: 'tag',
        initialState: initialState,
        reducers: {
            getTagsReducer: (state: TagState, action) => {
                console.log("Updating tag list: ", action.payload)
                state.tags = action.payload
                console.log("Updated tag list: ", state.tags)
            },
        },
    }
);

export const {getTagsReducer} = tagSlice.actions;
export default tagSlice.reducer;