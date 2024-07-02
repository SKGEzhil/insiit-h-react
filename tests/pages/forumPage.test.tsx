import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import ForumPage from '../../src/pages/ForumPage';
import {MemoryRouter} from "react-router";
import {store} from "../../src/store/store";
import {Provider} from "react-redux";
import '@testing-library/jest-dom';

import configureMockStore from 'redux-mock-store';
import {renderWithProviders} from "../utils/renderWithProvider.tsx";
// other imports...

// Create a mock store
const mockStore = configureMockStore();


// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

global.fetch = fetch;

describe('ForumPage Component', () => {
    test('renders ForumPage component', () => {
        renderWithProviders(<ForumPage />, '/forum');
        expect(screen.getByText(/Ask a Question/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();
    });

    test('button click events', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ForumPage />
                </MemoryRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText(/login/i));
        fireEvent.click(screen.getByText(/logout/i));
        fireEvent.click(screen.getAllByText(/toast/i)[0]); // Clicks the first "toast" button
        fireEvent.click(screen.getAllByText(/toast/i)[1]); // Clicks the second "toast" button
        fireEvent.click(screen.getByText(/Ask a Question/i));
        // Assertions can be added based on the expected behavior of the button clicks
    });

    test('renders QuestionListItem for each question', async () => {

        const mockState = {
            questionSlice: {
                questions: [
                    {
                        id: '1',
                        title: 'Question 1',
                        body: 'This is the body of Question 1',
                        tags: ['tag1', 'tag2'],
                        answer: [
                            {
                                id: '1',
                                answer: 'Answer 1',
                                author: { name: 'Author 1' },
                                comments: [
                                    {
                                        comment: 'Comment 1',
                                        author: { name: 'Comment Author 1' },
                                    },
                                ],
                                date: '2022-01-01',
                            },
                        ],
                        author: { name: 'Question Author 1' },
                        date: '2022-01-01',
                        votes: { votes: 5 },
                        totalQues: 10,
                    },
                    {
                        id: '2',
                        title: 'Question 2',
                        body: 'This is the body of Question 2',
                        tags: ['tag3', 'tag4'],
                        answer: [
                            {
                                id: '2',
                                answer: 'Answer 2',
                                author: { name: 'Author 2' },
                                comments: [
                                    {
                                        comment: 'Comment 2',
                                        author: { name: 'Comment Author 2' },
                                    },
                                ],
                                date: '2022-01-02',
                            },
                        ],
                        author: { name: 'Question Author 2' },
                        date: '2022-01-02',
                        votes: { votes: 3 },
                        totalQues: 20,
                    },
                    // Add more questions as needed...
                ],
            },
            paginatorSlice: {
                page: 1,
            }
            // Add other slices as needed...
        };

        const store = mockStore(mockState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ForumPage/>
                </MemoryRouter>
            </Provider>
        );


        mockState.questionSlice.questions.forEach((question) => {
            expect(screen.getByText(question.title)).toBeInTheDocument();
        });
    });
});