import questionSlice, {initialState, updateQuestionList} from "../../src/store/slices/questionSlice";

describe("tests for QuestionSlice", () => {
    test("initialize slice with initialValue", () => {
        const listSliceInit = questionSlice(initialState, { type: "unknown" });
        expect(listSliceInit).toBe(initialState);
    });

    test("updateQuestionList", () => {
        const testData = [
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
        ];

        const afterReducerOperation = questionSlice(
            initialState,
            updateQuestionList(testData)
        );

        expect(afterReducerOperation).toStrictEqual({
            questions: testData,
            loading: false,
            error: null,
        });
    });
});