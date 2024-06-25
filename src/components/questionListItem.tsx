import React from "react";
import {NavLink} from "react-router-dom";
import {QuestionModel} from "../models/questionModel.ts";

const QuestionListItem = (props: { question: QuestionModel }) => {

    const title = props.question.title;
    const tags = props.question.tags;
    const author = props.question.author.name;

    return (
        <div className="flex bg-bg-3 p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex flex-col items-start justify-start">
                <NavLink
                    to={`/question/${props.question.id}`}
                    className="text-primary text-lg font-semibold hover:underline">
                    {title}
                </NavLink>
                <div className="mt-2 space-x-2">
                    {
                        tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-bg-5 text-gray-300 text-sm font-medium px-2 py-1 rounded"
                        >
              {tag}
            </span>
                    ))}
                </div>
                <div className="mt-4 text-sm text-gray-400">
                    <span className="font-bold">{}</span> asked by {author}
                </div>
            </div>
        </div>
    );
};

export default QuestionListItem;