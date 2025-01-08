import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    getUserData,
    getAllUsers,
    deleteUser,
    editUser
} from "../../services/adminServices.ts";

export const getUserDataThunk =
    createAsyncThunk<unknown, {emailId: string}>('adminSlice/getUserDataThunk',
        async ({emailId}) => {
            try {
                return await getUserData(emailId).catch((error) => {
                    console.error("Error getting user data: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting user data: ", e);
                throw e;
            }
        });

export const getAllUsersThunk =
    createAsyncThunk<unknown, { role: string }>('adminSlice/getAllUsersThunk',
        async ({role}) => {
            try {
                return await getAllUsers(role).catch((error) => {
                    console.error("Error getting all users: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error getting all users: ", e);
                throw e;
            }
        });

export const editUserThunk =
    createAsyncThunk<unknown, { userId: string, name: string, permissions: string[], role: string }>('adminSlice/updateUserRoleThunk',
        async ({userId, role, name, permissions}) => {
            try {
                return await editUser(userId, name, permissions, role).catch((error) => {
                    console.error("Error updating user role: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error updating user role: ", e);
                throw e;
            }
        });

export const deleteUserThunk =
    createAsyncThunk<unknown, { userId: string }>('adminSlice/deleteUserThunk',
        async ({userId}) => {
            try {
                return await deleteUser(userId).catch((error) => {
                    console.error("Error deleting user: ", error.message);
                    throw error.message;
                });
            } catch (e) {
                console.error("Error deleting user: ", e);
                throw e;
            }
        });
