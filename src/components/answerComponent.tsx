import React, {useEffect, useState} from "react";
import {QuestionModel} from "../models/questionModel.ts";
import {useDispatch} from "react-redux";
import {useGetQuestion} from "../hooks/useGetQuestion.ts";
import {useShowToast} from "../context/toastContext.tsx";
import {createCommentThunk} from "../store/actions/questionActions.ts";
import {formatDate} from "../utils/formatDate.ts";

function AnswerComponent(props: { question: QuestionModel }) {

    const answers = props.question.answer;

    // const [answers, setAnswers] = useState(props.question.answer);
    const [isCommentOn, setIsCommentOn] = useState<boolean[]>(new Array(answers.length).fill(false));
    const [commentText, setCommentText] = useState<string>('');
    const dispatch = useDispatch<any>();
    const {setRefresh} = useGetQuestion(props.question.id)
    const {showToast} = useShowToast();

    // useEffect(() => {
    //     console.log('TRIGGERED')
    //     if(question){
    //         console.log('AnswerComponent', question.answer);
    //         setAnswers(props.question.answer);
    //     }
    // }, [question]);

    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-4xl w-full">
                    <div className="border rounded-md p-4">
                        <div className="flex">
                            <h1 className="text-2xl font-bold">Answers</h1>
                        </div>
                        <hr className="solid my-2"/>
                        <div>
                            {
                                answers.length === 0 ? 'No answers yet' :
                                answers.map((answer, index) => {
                                    return (
                                        <div className="p-2 border rounded-md my-1" key={index} >

                                            <p className="text-left text-md" style={{whiteSpace: 'pre-wrap'}}>{answer.answer}</p>

                                            <div>
                                                <p className="text-right text-gray-400 text-sm">{formatDate(answer.date)} | answered
                                                    by {answer.author.name}</p>
                                            </div>

                                            {
                                                answer.comments.length === 0 ? '' :
                                                    answer.comments.map((comment, index) => {
                                                        return (
                                                            <div className="p-2 border rounded-md my-1" key={index}>
                                                                <p className="text-left text-md" style={{whiteSpace: 'pre-wrap'}}>{comment.comment}</p>
                                                                <div>
                                                                    <p className="text-right text-gray-400 text-sm">{} commented
                                                                        by {comment.author.name}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                            }

                                            <div className="flex">
                                                <button
                                                    onClick={() => {
                                                        const newIsCommentOn = [...isCommentOn];
                                                        newIsCommentOn[index] = !newIsCommentOn[index];
                                                        setIsCommentOn(newIsCommentOn);
                                                    }}
                                                    className="bg-gray-800 text-white py-1 px-2 rounded-md hover:bg-gray-900">Comment
                                                </button>
                                            </div>

                                            {
                                                isCommentOn[index] ?
                                                    <div>
                                                        <textarea
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                            className="w-full border rounded-md p-2 my-1"
                                                            placeholder="Enter your comment here"/>
                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={() => {
                                                                    console.log('Commented', answer.id, index)

                                                                    dispatch(createCommentThunk({questionId: props.question.id, answerId: answer.id, comment: commentText})).then(
                                                                        (result) => {

                                                                            if(result.error){
                                                                                showToast({status: 'error', message: result.error.message})
                                                                            } else {
                                                                                setRefresh(true);
                                                                                setCommentText('')
                                                                                window.location.reload();
                                                                            }
                                                                        }
                                                                    )

                                                                }}
                                                                className="bg-gray-800 text-white py-1 px-2 rounded-md hover:bg-gray-900">Submit
                                                            </button>
                                                        </div>
                                                    </div> : null
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>

        </>

    );
}

export default AnswerComponent;