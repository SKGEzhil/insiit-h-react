
const questionList = (state: QuestionModel[] = [], action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
        return [
            ...state,
            action.question
        ]
        case 'UPDATE_QUESTION_LIST':
        return action.questionList
        default:
        return state
    }
}

export default questionList;