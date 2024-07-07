import React from "react";
import {NavLink} from "react-router-dom";
import {QuestionModel} from "../models/questionModel.ts";
import TagComponent from "./tagComponent.tsx";

const QuestionListItem = (props: { question: QuestionModel }) => {

    const title = props.question.title;
    const tags = props.question.tags;
    const author = props.question.author.name;

    return (
        <div className="flex bg-white p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex flex-col items-start justify-start">
                <NavLink
                    to={`/question/${props.question.id}`}
                    className="text-primary text-left text-lg font-semibold hover:underline">
                    {title}
                </NavLink>
                <div className="mt-2 space-x-2">
                    {
                        tags.map((tag, index) => (
                            <TagComponent tag={tag} key={index}/>
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