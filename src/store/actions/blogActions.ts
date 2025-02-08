import {createAsyncThunk} from "@reduxjs/toolkit";
import {addSection, deleteSection, editSection, getSections} from "../../services/blogServices.ts";

/**
 * Interface for adding blog section
 * @typedef addSectionInterface
 * @property {string} time
 * @property {string} blocks
 * @property {string} version
 * @property {string} page
 */
interface addSectionInterface {
    time: string;
    blocks: string;
    version: string;
    page: string;
}

/**
 * Interface for deleting blog section
 * @typedef deleteSectionInterface
 * @property {string} id
 */
interface deleteSectionInterface {
    id: string;
}

/**
 * Interface for editing blog section
 * @typedef editSectionInterface
 * @property {string} id
 * @property {string} blocks
 */
interface editSectionInterface {
    id: string;
    blocks: string;
}

/**
 * Interface for getting blog sections
 * @typedef getSectionsInterface
 * @property {string} page
 */
export interface getSectionsInterface {
    page: string;
}

/**
 * Async Thunk to add a blog section
 * @function addSectionThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, addSectionInterface, {}>}
 * @param {string} time
 * @param {string} blocks
 * @param {string} version
 * @param {string} page
 */
export const addSectionThunk =
    createAsyncThunk<unknown, addSectionInterface>('academicPageSlice/addSectionThunk',
    async ({
               time,
               blocks,
                version,
                page
           }) => {
        try {
            return await addSection(time, blocks, version, page).catch((error) => {
                console.error("Error adding section: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error adding section: ", e);
            throw e;
        }
    });

/**
 * Async Thunk to delete a blog section
 *
 * @function deleteSectionThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, deleteSectionInterface, {}>}
 * @param {string} id
 */
export const deleteSectionThunk =
    createAsyncThunk<unknown, deleteSectionInterface>('academicPageSlice/deleteSectionThunk',
    async ({id}) => {
        try {
            return await deleteSection(id).catch((error) => {
                console.error("Error deleting section: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error deleting section: ", e);
            throw e;
        }
    });

/**
 * Async Thunk to get blog sections
 * @function getSectionsThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, getSectionsInterface, {}>}
 * @param {string} page
 */
export const getSectionsThunk =
    createAsyncThunk<unknown, getSectionsInterface>('academicPageSlice/getSectionsThunk',
    async ({
                page,
           }) => {
        try {
            return await getSections(page).catch((error) => {
                console.error("Error getting sections: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error getting sections: ", e);
            throw e;
        }
    });


/**
 * Async Thunk to edit a blog section
 * @function editSectionThunk
 * @memberof Redux-Actions
 * @type {AsyncThunk<unknown, editSectionInterface, {}>}
 * @param {string} id
 * @param {string} blocks
 */
export const editSectionThunk =
    createAsyncThunk<unknown, editSectionInterface>('academicPageSlice/editSectionThunk',
    async ({
               id,
               blocks,
           }) => {
        try {
            return await editSection(id, blocks).catch((error) => {
                console.error("Error editing section: ", error.message);
                throw error.message;
            });
        } catch (e) {
            console.error("Error editing section: ", e);
            throw e;
        }
    });