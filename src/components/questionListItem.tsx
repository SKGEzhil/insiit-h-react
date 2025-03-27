import React from "react";
import {NavLink} from "react-router-dom";
import {QuestionModel} from "../models/questionModel.ts";
import TagComponent from "./tagComponent.tsx";
import { motion } from "framer-motion";

/**
 * `QuestionListItem` is a React component that renders a single question item.
 *
 * @memberOf Components
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
        <motion.div 
            className="flex bg-white p-4 border-b border-gray-100 hover:bg-gray-50"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
        >
            <div className={`flex gap-5 w-full`}>
                <div className={`border-r pr-6 flex flex-col justify-start items-center space-y-6 min-w-[80px]`}>
                    <div className="flex flex-col items-center">
                        <div className="text-center text-lg font-medium text-gray-800">{answers}</div>
                        <div className="text-center text-gray-500 text-sm">answers</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-center text-lg font-medium text-gray-800">{votes}</div>
                        <div className="text-center text-gray-500 text-sm">votes</div>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-start w-full">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NavLink
                            to={`/question/${props.question.id}`}
                            className="text-gray-800 text-left text-lg font-semibold hover:text-blue-600 transition-colors">
                            {title}
                        </NavLink>
                    </motion.div>
                    <div className="mt-2 text-gray-600 text-sm text-left line-clamp-2 mb-4">
                        {body}
                    </div>
                    <div className="flex items-center justify-between mt-1 w-full">
                        <div className="flex flex-wrap gap-2">
                            {
                                tags.map((tag, index) => (
                                    <TagComponent tag={tag} key={index} />
                                ))
                            }
                        </div>
                        <div className="ml-auto text-sm text-gray-500 flex items-center">
                            <span className="w-5 h-5 rounded-full bg-gray-100 mr-2 flex items-center justify-center text-gray-600 text-xs font-bold">
                                {author.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-gray-600">asked by</span> <span className="font-medium ml-1">{author}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionListItem;