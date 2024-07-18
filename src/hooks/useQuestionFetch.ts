
import {useEffect, useState} from "react";
import {getQuestions} from "../services/questionServices.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateQuestionList} from "../store/slices/questionSlice.ts";
import {endProgress, startProgress} from "../store/slices/progressSlice.ts";

/**
 * This hook is used to fetch questions
 * @param {string[]} tags
 * @param {number} currentPage
 */
export function useQuestionFetch(tags, currentPage) {

    const dispatch = useDispatch();
    const questionList = useSelector((state) => state.questionSlice.questions);
    const [refresh, setRefresh] = useState(false);

    // const currentPage = useSelector((state) => state.paginatorSlice.page);

    useEffect(() => {
        console.log('Fetching questions');
        dispatch(startProgress())
        const fetchQuestions = async () => {
            try {
                dispatch(updateQuestionList(await getQuestions(tags,parseInt(currentPage), 3).then(
                    (response) => {
                        dispatch(endProgress());
                        return response;
                    }
                )));
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