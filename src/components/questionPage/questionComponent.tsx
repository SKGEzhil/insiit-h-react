import React, {useState} from 'react';
import {QuestionModel} from "../../models/questionModel.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {useDispatch} from "react-redux";
import {questionActionsThunk} from "../../store/actions/questionActions.ts";
import {useShowToast} from "../../context/toastContext.tsx";
import {useAuth} from "../../context/authContext.tsx";
import {useNavigate} from "react-router-dom";
import {FaEdit, FaFlag, FaRegEdit, FaVoteYea} from "react-icons/fa";
import {BiFlag, BiSolidUpvote, BiUpvote} from "react-icons/bi";
import {FiFlag} from "react-icons/fi";
import {MdOutlineEdit} from "react-icons/md";
import {IoTrashOutline} from "react-icons/io5";
import TagComponent from "../tagComponent.tsx";

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

    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();
    const {profile} = useAuth();
    const navigate = useNavigate();

    // Actions

    /**
     * `editQuestion` is a function that dispatches an action to edit the question.
     */
    const editQuestion = () => {
        dispatch(questionActionsThunk({action: 'EDIT', data: {id: props.question.id, title: edited.title, body: edited.body}})).then(
            (result) => {
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
            (result) => {
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
            (result) => {
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
            (result) => {
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
            <div className="flex justify-center">
                <div className={`flex justify-start `}>
                    <div className={`mt-16`}>
                        <div className="flex flex-col mr-5">
                            <p className="font-bold text-lg text-c7">Votes</p>
                            <p className="font-bold py-0 text-3xl">{props.question.votes.votes}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl w-full p-4 border-l">
                    <div className="flex">
                        {
                            !isEditMode ?
                                <h1 className="text-3xl font-bold text-left">{title}</h1> :
                                <input
                                    type="text"
                                    className="text-3xl w-full font-bold border rounded-xl border-c4/[0.5] focus:outline-none bg-transparent text-left"
                                    value={edited.title}
                                    onChange={(e) => {
                                        setEdited({...edited, title: e.target.value});
                                    }}/>
                        }
                    </div>
                    {/*<hr className="solid my-2"/>*/}
                    <div className="flex text-left my-4">
                        {
                            !isEditMode ?
                                <p className="text-m">{body}</p> :
                                <textarea
                                    className="border rounded-xl min-h-56 border-c4/[0.5] w-full focus:outline-none bg-transparent text-m"
                                    value={edited.body}
                                    onChange={(e) => {
                                        setEdited({...edited, body: e.target.value});
                                    }}/>
                        }
                    </div>
                    <div className={`flex gap-2 justify-start`}>
                        {
                            props.question.tags.map((tag, index) => {
                                return <TagComponent key={index} tag={tag}/>
                            })
                        }
                    </div>
                    <div className={`flex justify-between mt-4`}>
                        <div className={`flex gap-2`}>
                            <div
                                onClick={upvoteQuestion}
                                className={`flex items-center text-sm p-1 border rounded-full cursor-pointer`}>
                                <BiUpvote/>
                                <p>upvote</p>
                            </div>
                            <div
                                onClick={reportQuestion}
                                className={`flex items-center text-sm p-1 border rounded-full cursor-pointer`}>
                                <FiFlag/>
                                <p>Report</p>
                            </div>
                        </div>
                        <p className="text-right text-gray-400 text-sm">{formatDate(props.question.date)} |
                            asked by {author}</p>

                    </div>
                    <div className='flex items-end flex-col'>
                        {/*<p className="text-right text-gray-400 text-sm">{formatDate(props.question.date)} |*/}
                        {/*    asked by {author}</p>*/}
                        {
                            profile?.id === props.question.author.id &&
                            <div>
                                {
                                    !isEditMode ?
                                        <div className='flex flex-wrap'>
                                            <button
                                                onClick={() => {
                                                    setIsEditMode(!isEditMode);
                                                }}
                                                className='text-right text-black text-sm p-0'>
                                                <div className={`flex items-center text-sm`}>
                                                    <MdOutlineEdit />
                                                    <p>Edit</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    console.log("Delete");
                                                    if (window.confirm('Are u sure u want to delete this question?')) {
                                                        deleteQuestion();
                                                    }
                                                }}
                                                className='text-right text-sm p-0'>
                                                <div className={`flex items-center text-sm`}>
                                                    <IoTrashOutline />
                                                    <p>Delete</p>
                                                </div>
                                            </button>

                                        </div> :
                                        <div className='flex flex-wrap'>
                                            <button
                                                onClick={() => {
                                                    setIsEditMode(!isEditMode);
                                                }}
                                                className='text-right'>
                                                Cancel
                                            </button>

                                            <button
                                                onClick={() => {
                                                    console.log("Submit");
                                                    if (window.confirm("Are you sure you want to submit the changes?")) {
                                                        editQuestion();
                                                    }
                                                }}
                                                className='text-right'>
                                                Submit
                                            </button>
                                        </div>
                                }
                            </div>
                        }
                    </div>

                    {/*<div className="flex justify-start">*/}
                    {/*    <button*/}
                    {/*        onClick={() => {*/}
                    {/*            console.log("Upvoted");*/}
                    {/*            upvoteQuestion();*/}
                    {/*            // dispatch(upvoteQuestionThunk({questionId: props.question.id})).then(*/}
                    {/*            //     (result) => {*/}
                    {/*            //         if (result.error) {*/}
                    {/*            //             showToast({status: 'error', message: result.error.message})*/}
                    {/*            //         } else {*/}
                    {/*            //             window.location.reload();*/}
                    {/*            //         }*/}
                    {/*            //     }*/}
                    {/*            // );*/}
                    {/*        }*/}
                    {/*        }*/}
                    {/*        className="bg-c5 text-white py-2 px-4 rounded-lg hover:bg-red-600">Upvote*/}
                    {/*    </button>*/}

                    {/*    <button*/}
                    {/*        onClick={() => {*/}
                    {/*            reportQuestion();*/}
                    {/*        }}*/}
                    {/*        className="bg-c5 text-white py-2 px-4 rounded-lg hover:bg-red-600"*/}
                    {/*    >Report*/}
                    {/*    </button>*/}

                    {/*</div>*/}

                </div>
            </div>

        </>

    );
}

export default QuestionComponent;