
import React from 'react';
import {QuestionModel} from "../models/questionModel";
import {formatDate} from "../utils/formatDate.ts";
import {useDispatch} from "react-redux";
import {upvoteQuestionThunk} from "../store/actions/questionActions.ts";
import {useShowToast} from "../context/toastContext.tsx";

function QuestionComponent( props: {question: QuestionModel} ) {

    const title = props.question.title;
    const author = props.question.author.name;
    const body = props.question.body;

    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();


    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-4xl w-full bg-c8 rounded-2xl p-4">
                    <div className="flex">
                        <h1 className="text-3xl font-bold text-c3 text-left">{title}</h1>
                    </div>
                    {/*<hr className="solid my-2"/>*/}
                    <div className="flex text-left text-c1 my-4">
                        <p className="text-m">{body}</p>
                    </div>
                    <div>
                        <p className="text-right text-c1/[.7]">Votes: {props.question.votes.votes} | {formatDate(props.question.date)} | asked by {author}</p>
                    </div>

                    <div className="flex justify-start">
                        <button
                            onClick={() => {
                                console.log("Upvoted");
                                dispatch(upvoteQuestionThunk({questionId: props.question.id})).then(
                                    (result) => {
                                        if(result.error){
                                            showToast({status: 'error', message: result.error.message})
                                        } else {
                                            window.location.reload();
                                        }
                                    }
                                );
                            }
                        }
                            className="bg-c5 text-white py-2 px-4 rounded-lg hover:bg-red-600">Upvote</button>
                    </div>

                </div>
            </div>

        </>

    );
}

export default QuestionComponent;