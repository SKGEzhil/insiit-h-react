import React from "react";
import {NavLink} from "react-router-dom";
import {QuestionModel} from "../models/questionModel.ts";
import TagComponent from "./tagComponent.tsx";

/**
 * `QuestionListItem` is a React component that renders a single question item.
 *
 * @param {Object} props - The properties for the question list item.
 * @param {QuestionModel} props.question - The question model.
 *
 * @returns {JSX.Element} The question list item element.
 *
 * @example
 * questionList.map((question, index) => (
 *    <QuestionListItem question={question} key={index}/>
 *  ))
 *
 */

const QuestionListItem = (props: { question: QuestionModel }) => {
    const title = props.question.title;
    const body = props.question.body;
    const tags = props.question.tags;
    const author = props.question.author.name;
    const votes = props.question.votes.votes;
    const answers = (props.question.answers) ? props.question.answers.length : 0;

    return (
        <div className="flex bg-white p-4">
            <div className={`flex gap-4 w-full`}>
                <div className={`border-r pr-4`}>
                    <div className="flex flex-col items-center justify-center mb-2">
                        <div className="text-center text-lg font-bold">{answers}</div>
                        <div className="text-center text-b7 text-xs">answers</div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <div className="text-center text-lg font-bold">{votes}</div>
                        <div className="text-center text-b7 text-xs">votes</div>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-start w-full">
                    <NavLink
                        to={`/question/${props.question.id}`}
                        className="text-b9 text-left text-lg font-semibold hover:underline">
                        {title}
                    </NavLink>
                    <div className="mt-2 text-gray-500 text-sm text-left line-clamp-2">
                        {body}
                    </div>
                    <div className="flex items-center justify-between mt-2 w-full">
                        <div className="flex space-x-2">
                            {
                                tags.map((tag, index) => (
                                    <TagComponent tag={tag} key={index} />
                                ))
                            }
                        </div>
                        <div className="ml-auto text-sm text-gray-400">
                            asked by {author}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionListItem;