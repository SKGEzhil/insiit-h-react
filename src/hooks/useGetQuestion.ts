
import { useState, useEffect } from 'react';
import { getQuestion } from '../services/questionServices.ts';
import {QuestionModel} from "../models/questionModel.ts";
import {useShowToast} from "../context/toastContext.tsx";
import {useDispatch} from "react-redux";
import {endProgress, resetProgress, startProgress} from "../store/slices/progressSlice.ts";

/**
 * @namespace Hooks
 */

/**
 * This hook is used to get a question by id
 *
 * @memberof Hooks
 * @param {string} id
 */
export function useGetQuestion(id: string) {

    const [question, setQuestion] = useState<QuestionModel>(null);
    const [refresh, setRefresh] = useState(false);

    const dispatch = useDispatch<never>();

    const {showToast} = useShowToast();

    useEffect(() => {
        const fetchQuestion = async () => {
            console.log("Fetching question")
            dispatch(startProgress());
            try {
                const fetchedQuestion = await getQuestion(id).then(
                    (response) => {
                        dispatch(endProgress());
                        return response;
                    }
                )
                    .catch(
                    (error) => {
                        console.error('Error:', error);
                        showToast({status: 'error', message: error.message});
                    }
                );
                setQuestion(fetchedQuestion);
            } catch (error) {
                console.error(error);
            }
            setRefresh(false);
        }

        fetchQuestion();
    }, [id, refresh]);

    return { question, setRefresh };
}