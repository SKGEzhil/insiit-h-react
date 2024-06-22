
import React from 'react';

function QuestionComponent( props: {question: QuestionModel} ) {

    const title = props.question.title;
    const author = props.question.author.name;
    const body = props.question.body;

    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-4xl w-full border rounded-md p-4">
                    <div className="flex">
                        <h1 className="text-3xl font-bold">{title}</h1>
                    </div>
                    <hr className="solid my-2"/>
                    <div className="flex text-left">
                        <p className="text-xl">{body}</p>
                    </div>
                    <div>
                        <p className="text-right text-gray-500">asked by {author}</p>
                    </div>
                </div>
            </div>

        </>

    );
}

export default QuestionComponent;