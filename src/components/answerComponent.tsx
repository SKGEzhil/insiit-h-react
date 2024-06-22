import React from "react";

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
                            <p className="text-xl">{

                                answers.length === 0 ? <p>No answers yet</p> :

                                answers.map((answer) => {
                                    return (
                                        <div className="p-2 border rounded-md my-1">
                                            <p className="text-left" style={{whiteSpace: 'pre-wrap'}}>{answer.answer}</p>
                                            <div>
                                                <p className="text-right text-gray-400 text-sm">answered
                                                    by {answer.author.name}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }</p>
                        </div>
                    </div>
                </div>

            </div>

        </>

    );
}

export default AnswerComponent;