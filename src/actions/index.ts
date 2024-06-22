
const addQuestion = (question: Question) => {
    return {
        type: 'ADD_QUESTION',
        question: question
    }
}

const updateQuestionList = (questionList: Question[]) => {
    return {
        type: 'UPDATE_QUESTION_LIST',
        questionList: questionList
    }
}

export {
    addQuestion,
    updateQuestionList
}