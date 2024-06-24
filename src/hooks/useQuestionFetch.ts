
import {useEffect} from "react";
import {getQuestions} from "../services/questionServices.ts";
import {useDispatch, useSelector} from "react-redux";
// import {updateQuestionList} from "../actions";
import {updateQuestionList} from "../store/slices/questionSlice.ts";

export function useQuestionFetch() {

    const dispatch = useDispatch();
    const questionList = useSelector((state) => state.questionSlice.questions);

    useEffect(() => {
        console.log('Fetching questions');
        const fetchQuestions = async () => {
            try {
                dispatch(updateQuestionList(await getQuestions()));
            } catch (error) {
                console.error(error);
            }
        }

        fetchQuestions();
    }, []);

    return { questionList };
}