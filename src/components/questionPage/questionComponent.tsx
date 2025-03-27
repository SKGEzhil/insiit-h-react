import React, {useState} from 'react';
import {QuestionModel} from "../../models/questionModel.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {useDispatch} from "react-redux";
import {questionActionsThunk} from "../../store/actions/questionActions.ts";
import {useShowToast} from "../../context/toastContext.tsx";
import {useAuth} from "../../context/authContext.tsx";
import {useNavigate} from "react-router-dom";
import {BiUpvote} from "react-icons/bi";
import {FiFlag} from "react-icons/fi";
import {MdOutlineEdit} from "react-icons/md";
import {IoTrashOutline} from "react-icons/io5";
import TagComponent from "../tagComponent.tsx";
import {AppDispatch} from "../../store/store.ts";

/**
 * `QuestionComponent` is a React component that renders a question.
 * It provides functionalities to edit, delete, and upvote a question.
 *
 * @memberOf Components
 * @param {Object} props - The properties for the component.
 * @param {QuestionModel} props.question - The question data.
 *
 * @returns {JSX.Element} The question component.
 *
 * @example
 *
 * const question = {
 *   id: "1",
 *   title: "How to learn React?",
 *   body: "I am new to React. Can someone guide me on how to learn React?",
 *   tags: ["React", "JavaScript"],
 *   answer: [
 *     {
 *       id: "1",
 *       answer: "You can start by reading the official documentation of React."
 *       author: { name: "John Doe" },
 *       comments: [
 *          { comment: "Great answer!", author: { name: "Jane Doe" } }
 *       ],
 *       date: "2022-01-01T00:00:00Z",
 *     }
 *   ],
 *   author: { name: "Alice" },
 *   date: "2022-01-01T00:00:00Z",
 *   votes: { votes: 10 },
 *   totalQues: 1
 * };
 *
 * return <QuestionComponent question={question} />;
 *
 */
function QuestionComponent(props: { question: QuestionModel }) {

    const title = props.question.title;
    const author = props.question.author.name;
    const body = props.question.body;

    const [edited, setEdited] = useState({title, body, author});
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const {showToast} = useShowToast();
    const {profile} = useAuth();
    const navigate = useNavigate();

    // Actions

    /**
     * `editQuestion` is a function that dispatches an action to edit the question.
     */
    const editQuestion = () => {
        if (!edited.title.trim() || !edited.body.trim()) {
            showToast({status: 'error', message: 'Title and body cannot be empty'});
            return;
        }
        
        dispatch(questionActionsThunk({action: 'EDIT', data: {id: props.question.id, title: edited.title, body: edited.body}})).then(
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Question edited successfully'});
                    window.location.reload();
                }
            }
        )
    }

    /**
     * `deleteQuestion` is a function that dispatches an action to delete the question.
     */
    const deleteQuestion = () => {
        dispatch(questionActionsThunk({action: 'DELETE', data: {id: props.question.id}})).then(
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Question deleted successfully'});
                    navigate('/forum');
                }
            }
        )
    }

    /**
     * `upvoteQuestion` is a function that dispatches an action to upvote the question.
     */
    const upvoteQuestion = () => {
        dispatch(questionActionsThunk({action: 'UPVOTE', data: {id: props.question.id}})).then(
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Question upvoted successfully'});
                    window.location.reload();
                }
            }
        )
    }

    /**
     * `reportQuestion` is a function that dispatches an action to report the question.
     */
    const reportQuestion = () => {
        dispatch(questionActionsThunk({action: 'REPORT', data: {id: props.question.id}})).then(
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Question reported successfully'});
                    window.location.reload();
                }
            }
        )
    }


    return (
        <>
            <div className="flex justify-center animate-fadeIn">
                <div className={`flex justify-start`}>
                    <div className={`mt-16`}>
                        <div className="flex flex-col mr-5 items-center">
                            <p className="font-medium text-xs text-gray-500 mb-1">Votes</p>
                            <button 
                                onClick={upvoteQuestion}
                                className="group relative flex flex-col items-center cursor-pointer p-1 transition-smooth hover:scale-105"
                                aria-label="Upvote question"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                <span className="text-xl font-semibold text-blue-600 mt-1">{props.question.votes.votes}</span>
                                <span className="absolute -bottom-7 bg-blue-50 text-blue-800 text-xs py-0.5 px-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">Upvote</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl w-full p-4 border-l border-gray-100 transition-smooth animate-fadeIn">
                    <div className="flex">
                        {
                            !isEditMode ?
                                <h1 className="text-3xl font-bold text-left text-gray-800">{title}</h1> :
                                <div className="w-full focus-within:ring-effect rounded-md">
                                    <input
                                        type="text"
                                        className="text-3xl w-full font-bold border rounded-lg border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 bg-transparent text-left px-2 py-1"
                                        value={edited.title}
                                        onChange={(e) => {
                                            setEdited({...edited, title: e.target.value});
                                        }}
                                    />
                                </div>
                        }
                    </div>
                    <div className="flex text-left my-4">
                        {
                            !isEditMode ?
                                <p className="text-gray-700 whitespace-pre-wrap">{body}</p> :
                                <div className="w-full focus-within:ring-effect rounded-md">
                                    <textarea
                                        className="border rounded-lg min-h-56 border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 w-full bg-transparent p-3 text-gray-700"
                                        value={edited.body}
                                        onChange={(e) => {
                                            setEdited({...edited, body: e.target.value});
                                        }}
                                    />
                                </div>
                        }
                    </div>
                    <div className={`flex gap-2 justify-start flex-wrap my-3`}>
                        {
                            props.question.tags.map((tag, index) => {
                                return <TagComponent key={index} tag={tag}/>
                            })
                        }
                    </div>
                    <div className={`flex flex-wrap justify-between mt-4`}>
                        <div className={`flex gap-2 mb-2 sm:mb-0`}>
                            <button
                                onClick={upvoteQuestion}
                                className={`flex items-center text-xs py-1.5 px-3 border border-gray-200 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-colors hover:float`}
                                aria-label="Upvote question"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Upvote</span>
                            </button>
                            <button
                                onClick={reportQuestion}
                                className={`flex items-center text-xs py-1.5 px-3 border border-gray-200 rounded-full hover:border-red-300 hover:bg-red-50 transition-colors hover:float`}
                                aria-label="Report question"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                                </svg>
                                <span>Report</span>
                            </button>
                        </div>
                        <div className="text-right text-gray-400 text-sm flex items-center">
                            <span className="mr-1">{formatDate(props.question.date)}</span> | 
                            <span className="ml-1 flex items-center">
                                <span className="w-5 h-5 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700 mr-1">
                                    {author.charAt(0).toUpperCase()}
                                </span>
                                <span className="text-gray-600">asked by <span className="font-medium text-gray-700">{author}</span></span>
                            </span>
                        </div>
                    </div>
                    <div className='flex items-end flex-col'>
                        {
                            profile && profile.name === props.question.author.name &&
                            <div>
                                {
                                    !isEditMode ?
                                        <div className='flex flex-wrap gap-2 mt-3'>
                                            <button
                                                onClick={() => {
                                                    setIsEditMode(!isEditMode);
                                                }}
                                                className='flex items-center text-xs text-gray-600 px-2.5 py-1.5 rounded-md hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors hover:float'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                <span>Edit</span>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this question?')) {
                                                        deleteQuestion();
                                                    }
                                                }}
                                                className='flex items-center text-xs text-red-600 px-2.5 py-1.5 rounded-md hover:bg-red-50 border border-gray-200 hover:border-red-300 transition-colors hover:float'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span>Delete</span>
                                            </button>
                                        </div> :
                                        <div className='flex flex-wrap gap-2 mt-3 animate-fadeIn'>
                                            <button
                                                onClick={() => {
                                                    setIsEditMode(!isEditMode);
                                                }}
                                                className='text-xs text-gray-600 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors hover:float'
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to submit the changes?")) {
                                                        editQuestion();
                                                    }
                                                }}
                                                className='flex items-center text-xs bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors hover:float'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionComponent;