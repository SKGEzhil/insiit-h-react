
import { useState, useEffect } from 'react';
import { getQuestion } from '../services/questionServices.ts';
import {QuestionModel} from "../models/questionModel.ts";
import {useShowToast} from "../context/toastContext.tsx";

export function useGetQuestion(id: string) {

    const [question, setQuestion] = useState<QuestionModel>(null);
    const [refresh, setRefresh] = useState(false);

    const {showToast} = useShowToast();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const fetchedQuestion = await getQuestion(id).catch(
                    (error) => {
                        console.error('Error:', error);
                        showToast({status: 'error', message: error.message});
                    }
                );;
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