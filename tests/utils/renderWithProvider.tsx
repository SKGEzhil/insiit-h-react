import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import progressSlice from "../../src/store/slices/progressSlice";
import paginatorSlice from "../../src/store/slices/paginatorSlice";
import navigationSlice from "../../src/store/slices/navigationSlice";
import questionSlice from "../../src/store/slices/questionSlice";
import {MemoryRouter} from "react-router";
// As a basic setup, import your same slice reducers

export function renderWithProviders(
    ui,
    route,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                questionSlice: questionSlice,
                navigationSlice: navigationSlice,
                paginatorSlice: paginatorSlice,
                progressSlice: progressSlice,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
                {children}
            </MemoryRouter>
        </Provider>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

