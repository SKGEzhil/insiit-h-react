
import {useEffect} from "react";
import {getQuestions} from "../services/questionServices.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateQuestionList} from "../store/slices/questionSlice.ts";

export function useQuestionFetch() {

    const dispatch = useDispatch();
    const questionList = useSelector((state) => state.questionSlice.questions);
    const currentPage = useSelector((state) => state.paginatorSlice.page);

    useEffect(() => {
        console.log('Fetching questions');
        const fetchQuestions = async () => {
            try {
                dispatch(updateQuestionList(await getQuestions(currentPage, 5)));
            } catch (error) {
                console.error(error);
            }
        }

        fetchQuestions();
    }, [currentPage]);

    return { questionList };
}