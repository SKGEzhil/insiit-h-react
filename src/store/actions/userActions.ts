import { getUserQuestions } from "../../services/userService";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getUserQuestionsThunk =
    createAsyncThunk<unknown, {emailId: string}>('userSlice/getUserQuestionsThunk',
        async ({emailId}) => {
            try {
                console.log("Fetching user questions for email: ", emailId);
                const questions = await getUserQuestions(emailId).catch((error) => {
                    console.error("Error getting user questions: ", error.message);
                    throw error.message;
                });
                console.log("User questions: ", questions.questions);
                return questions.questions;
            } catch (e) {
                console.error("Error getting user data: ", e);
                throw e;
            }
        });