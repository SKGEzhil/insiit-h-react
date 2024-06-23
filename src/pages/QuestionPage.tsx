import {useGetQuestion} from "../hooks/useGetQuestion.ts";
import {useParams} from "react-router";
import QuestionComponent from "../components/questionComponent.tsx";
import AnswerComponent from "../components/answerComponent.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {answerQuestion} from "../services/questionServices.ts";
import React, {useState} from "react";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";

function QuestionPage() {

    const {id} = useParams<{ id: string }>();
    const {question, setRefresh} = useGetQuestion(id!);

    const [yourAnswer, setYourAnswer] = useState("");
    const [isAnswerFieldOpen, setIsAnswerFieldOpen] = useState(false);

    const {showToast} = useShowToast();

    const {profile} = useAuth();



    return (
        question ?
            <div>
                <div className="my-1">
                    <QuestionComponent question={question}/>
                </div>
                <div className="my-1">
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
                                    <div className="border rounded-md p-4">
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
                                            className="w-full p-2 border rounded-md" rows={5}/>
                                        </div>
                                        <div className="flex justify-center my-2">
                                            <ProtectedButton onClick={() => {
                                                answerQuestion(question.id, yourAnswer).then(r => {
                                                    console.log("Answer:", r)
                                                    setRefresh(true);
                                                }).catch(
                                                    (error) => {
                                                        console.error('Error:', error);
                                                        showToast({status: 'error', message: error.message});
                                                    }
                                                );;
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
            : <div>Loading...</div>
    );
}

export default QuestionPage;