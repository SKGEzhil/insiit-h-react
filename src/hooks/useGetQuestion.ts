
import { useState, useEffect } from 'react';
import { getQuestion } from '../services/questionServices.ts';

export function useGetQuestion(id: string) {

    const [question, setQuestion] = useState<QuestionModel>(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const fetchedQuestion = await getQuestion(id);
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