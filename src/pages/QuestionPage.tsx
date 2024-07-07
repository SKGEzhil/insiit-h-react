import {useGetQuestion} from "../hooks/useGetQuestion.ts";
import {useParams} from "react-router";
import QuestionComponent from "../components/questionComponent.tsx";
import AnswerComponent from "../components/answerComponent.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import React, {useState} from "react";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {useDispatch} from "react-redux";
import {answerQuestionThunk} from "../store/actions/questionActions.ts";

function QuestionPage() {

    const {id} = useParams<{ id: string }>();
    const {question, setRefresh} = useGetQuestion(id!);

    const [yourAnswer, setYourAnswer] = useState("");
    const [isAnswerFieldOpen, setIsAnswerFieldOpen] = useState(false);

    const {showToast} = useShowToast();

    const {profile} = useAuth();

    const dispatch = useDispatch<never>();

    return (
        question ?
            <div className="py-4">
                <div className="flex-grow flex-col justify-center mx-2">
                    <div className="py-1">
                        <QuestionComponent question={question}/>
                    </div>
                    <div className="py-1">
                        <AnswerComponent question={question}/>
                    </div>

                    {
                        !isAnswerFieldOpen ?
                            profile?.role === "moderator" ?
                                <div className="flex justify-center my-2">
                                    <ProtectedButton onClick={() => {
                                        setIsAnswerFieldOpen(true);
                                        console.log("Answer Field Open: ", isAnswerFieldOpen);
                                    }}>
                                        Add your Answer
                                    </ProtectedButton>
                                </div> : null : null
                    }
                    <div className="flex justify-center">
                        <div className="max-w-4xl w-full">
                            {
                                isAnswerFieldOpen ?
                                    <div className="my-2">
                                        <div className=" rounded-2xl bg-white p-4">
                                            <div className="flex justify-between">
                                                <h1 className="text-2xl font-bold">Your Answer</h1>
                                                <button
                                                    onClick={() => {
                                                        setIsAnswerFieldOpen(false);
                                                    }}
                                                >
                                                    <p className="text-red-500">X</p>
                                                </button>
                                            </div>
                                            <hr className="solid my-2"/>
                                            <div>
                                        <textarea
                                            value={yourAnswer}
                                            onChange={(e) => setYourAnswer(e.target.value)}
                                            placeholder="Write something..."
                                            required
                                            className="w-full p-2 border bg-c1 border-c8/[.2] rounded-2xl" rows={5}/>
                                            </div>
                                            <div className="flex justify-center my-2">
                                                <ProtectedButton onClick={() => {

                                                    dispatch(answerQuestionThunk({
                                                        questionId: question.id,
                                                        answer: yourAnswer
                                                    })).then(
                                                        (result) => {
                                                            result.error ? showToast({
                                                                status: 'error',
                                                                message: result.error.message
                                                            }) : setRefresh(true);
                                                        }
                                                    );

                                                    setYourAnswer("");
                                                }}>
                                                    Submit
                                                </ProtectedButton>
                                            </div>
                                        </div>
                                    </div> : null
                            }
                        </div>
                    </div>


                </div>
            </div>
            : <div>Loading...</div>
    );
}

export default QuestionPage;