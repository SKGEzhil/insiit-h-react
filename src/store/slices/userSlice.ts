import { createSlice } from "@reduxjs/toolkit";
import { QuestionModel } from "../../models/questionModel";
import {getUserQuestionsThunk} from "../actions/userActions.ts";

interface UserState {
    questions: QuestionModel[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    questions: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserQuestionsThunk.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserQuestionsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.questions = action.payload as QuestionModel[];
        });
        builder.addCase(getUserQuestionsThunk.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;