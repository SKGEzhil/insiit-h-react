
import {useEffect, useState} from "react";
import {getQuestions} from "../services/questionServices.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateQuestionList} from "../store/slices/questionSlice.ts";

export function useQuestionFetch(currentPage) {

    const dispatch = useDispatch();
    const questionList = useSelector((state) => state.questionSlice.questions);
    const [refresh, setRefresh] = useState(false);
    // const currentPage = useSelector((state) => state.paginatorSlice.page);

    useEffect(() => {
        console.log('Fetching questions');
        const fetchQuestions = async () => {
            try {
                dispatch(updateQuestionList(await getQuestions(parseInt(currentPage), 3)));
                setRefresh(false);
            } catch (error) {
                console.error(error);
                setRefresh(false);
            }
        }

        fetchQuestions();
    }, [refresh]);

    return { questionList, setRefresh };
}