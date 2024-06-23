import React from "react";
import {QuestionModel} from "../models/questionModel.ts";

function AnswerComponent(props: { question: QuestionModel }) {

    const answers = props.question.answer;

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
                                                <p className="text-right text-gray-400 text-sm">answered
                                                    by {answer.author.name}</p>
                                            </div>
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