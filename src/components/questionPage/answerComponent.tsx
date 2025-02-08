import React, {useState} from "react";
import {QuestionModel} from "../../models/questionModel.ts";
import {useDispatch} from "react-redux";
import {useShowToast} from "../../context/toastContext.tsx";
import {answerActionsThunk, commentActionsThunk} from "../../store/actions/questionActions.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {useAuth} from "../../context/authContext.tsx";
import {MdEdit, MdOutlineEdit} from "react-icons/md";
import {IoMdClose, IoMdTrash} from "react-icons/io";
import {IoTrashOutline} from "react-icons/io5";
import {TiTick} from "react-icons/ti";
import {BiUpvote} from "react-icons/bi";
import {FiFlag} from "react-icons/fi";
import ProtectedComponent from "../protectedComponent.tsx";

/**
 * `AnswerComponent` is a React component that renders answers and comments on that answer.
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
 * return <AnswerComponent question={question} />;
 *
 */
function AnswerComponent(props: { question: QuestionModel }) {


    const answers = props.question.answers;
    const votes = props.question.votes;

    // States
    /**
     * `isCommentOn` is a state that stores the boolean value of whether the comment section is open or not.
     * @type {boolean[]}
     */
    const [isCommentOn, setIsCommentOn] = useState<boolean[]>(new Array(answers.length).fill(false));
    const [commentText, setCommentText] = useState<string>('');
    const [isAnswerEditMode, setIsAnswerEditMode] = useState<boolean[]>(answers.map(() => false));
    const [isCommentEditMode, setIsCommentEditMode] = useState<boolean[][]>(answers.map((answer) => {
        return answer.comments.map(() => false)
    }));
    const [edited, setEdited] = useState(answers.map((answer) => {
        return {
            answer: answer.answer, comments: answer.comments.map((comment) => {
                return comment.comment
            })
        }
    }));

    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();
    const {profile} = useAuth();


    // Actions
    const editAnswer = (answerId: string, answer: string) => {
        dispatch(answerActionsThunk({
            action: 'EDIT',
            data: {questionId: props.question.id, answerId: answerId, answer: answer}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Answer edited successfully'});
                    window.location.reload();
                }
            }
        )
    }

    const deleteAnswer = (answerId: string) => {
        dispatch(answerActionsThunk({
            action: 'DELETE',
            data: {questionId: props.question.id, answerId: answerId}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Answer deleted successfully'});
                    window.location.reload();
                }
            }
        )
    }

    //Upvote Answer
    const upvoteAnswer = (answerId: string) => {
        dispatch(answerActionsThunk({
            action: 'UPVOTE',
            data: {questionId: props.question.id, answerId: answerId}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Answer upvoted successfully'});
                    window.location.reload();
                }
            }
        )
    }

    const createComment = (answerId: string, comment: string) => {
        dispatch(commentActionsThunk({
            action: 'CREATE',
            data: {questionId: props.question.id, answerId: answerId, comment: comment}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Comment created successfully'});
                    window.location.reload();
                }
            }
        )
    }

    const editComment = (answerId: string, commentId: string, comment: string) => {
        dispatch(commentActionsThunk({
            action: 'EDIT',
            data: {questionId: props.question.id, answerId: answerId, commentId: commentId, comment: comment}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Comment edited successfully'});
                    window.location.reload();
                }
            }
        )
    }

    const deleteComment = (answerId: string, commentId: string) => {
        dispatch(commentActionsThunk({
            action: 'DELETE',
            data: {questionId: props.question.id, answerId: answerId, commentId: commentId}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Comment deleted successfully'});
                    window.location.reload();
                }
            }
        )
    }

    const reportAnswer = (answerId: string) => {
        dispatch(answerActionsThunk({
            action: 'REPORT',
            data: {questionId: props.question.id, answerId: answerId}
        })).then(
            (result) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Answer reported successfully'});
                    window.location.reload();
                }
            }
        )
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-5xl w-full">
                    <div className="my-2 mt-3">
                        <h2 className="font-bold text-c7 text-left">Answers</h2>
                    </div>
                    <div className={`divide-y`}>

                        {/*Answers list*/}

                        {
                            answers.length === 0 ? 'No answers yet' :
                                answers.map((answer, index) => {
                                    return (
                                        <div className="bg-white  p-2 my-2">
                                            <div className="p-3 rounded-2xl " key={index}>

                                                <div className={`flex items-center`}>
                                                    <div>
                                                        <div className="flex flex-col mr-5">
                                                            <p className="font-bold text-lg text-c7">Votes</p>
                                                            <p className="font-bold py-0 text-3xl">{answer.votes.votes}</p>
                                                        </div>
                                                        {/*<button*/}
                                                        {/*    onClick={() => {*/}
                                                        {/*        upvoteAnswer(answer.id);*/}
                                                        {/*    }}*/}
                                                        {/*    className="bg-primary text-white py-1 px-2 rounded-md hover:bg-gray-900">Upvote*/}
                                                        {/*</button>*/}
                                                    </div>
                                                    <div className="w-full">

                                                        {
                                                            !isAnswerEditMode[index] ?
                                                                <p className="text-left text-md"
                                                                   style={{whiteSpace: 'pre-wrap'}}>{answer.answer}</p> :
                                                                <textarea
                                                                    value={edited[index].answer}
                                                                    onChange={(e) => {
                                                                        const newEdited = [...edited];
                                                                        newEdited[index].answer = e.target.value;
                                                                        setEdited(newEdited);
                                                                    }}
                                                                    className="w-full my-1 text-left border focus:outline-none text-md"
                                                                    placeholder="Enter your answer here"/>
                                                        }
                                                        <div className={`flex justify-between mt-4`}>
                                                            <div className={`flex gap-2`}>
                                                                <div
                                                                    onClick={() => {
                                                                        upvoteAnswer(answer.id)
                                                                    }}
                                                                    className={`flex items-center text-sm p-1 border rounded-full cursor-pointer`}>
                                                                    <BiUpvote/>
                                                                    <p>upvote</p>
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        reportAnswer(answer.id)
                                                                    }}
                                                                    className={`flex items-center text-sm p-1 border rounded-full cursor-pointer`}>
                                                                    <FiFlag/>
                                                                    <p>Report</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-right text-gray-400 text-sm">{formatDate(props.question.date)} |
                                                                asked by {answer.author.name}</p>

                                                        </div>


                                                        <div className='flex flex-col items-end'>
                                                            {/*<p className="text-right text-gray-400 text-sm mt-4">{formatDate(answer.date)} |*/}
                                                            {/*    answered by {answer.author.name}</p>*/}

                                                            {
                                                                // (profile?.id === answer.author.id || profile?.role === 'admin') &&
                                                                <ProtectedComponent authorId={answer.author.id}>
                                                                    <div>
                                                                        {
                                                                            !isAnswerEditMode[index] ?
                                                                                <div className='flex flex-wrap '>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setIsAnswerEditMode([...isAnswerEditMode].map((value, i) => {
                                                                                                return i === index ? !value : value;
                                                                                            }));
                                                                                        }}
                                                                                        className='text-right text-black p-0'>
                                                                                        <div
                                                                                            className={`flex items-center text-sm`}>
                                                                                            <MdOutlineEdit/>
                                                                                            <p>Edit</p>
                                                                                        </div>
                                                                                    </button>

                                                                                    <button
                                                                                        onClick={() => {
                                                                                            console.log("Delete");
                                                                                            if (window.confirm('Are u sure u want to delete this question?')) {
                                                                                                deleteAnswer(answer.id);
                                                                                            }
                                                                                        }}
                                                                                        className='text-right text-black p-0'>
                                                                                        <div
                                                                                            className={`flex items-center text-sm`}>
                                                                                            <IoTrashOutline/>
                                                                                            <p>Delete</p>
                                                                                        </div>
                                                                                    </button>

                                                                                </div> :
                                                                                <div className='flex flex-wrap'>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setIsAnswerEditMode([...isAnswerEditMode].map((value, i) => {
                                                                                                return i === index ? !value : value;
                                                                                            }));
                                                                                        }}
                                                                                        className='text-right text-black'>
                                                                                        Cancel
                                                                                    </button>

                                                                                    <button
                                                                                        onClick={() => {
                                                                                            console.log("Submit");
                                                                                            if (window.confirm("Are you sure you want to submit the changes?")) {
                                                                                                editAnswer(answer.id, edited[index].answer)
                                                                                            }
                                                                                        }}
                                                                                        className='text-right text-black'>
                                                                                        Submit
                                                                                    </button>
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </ProtectedComponent>
                                                            }

                                                        </div>


                                                    </div>
                                                </div>

                                                {/*<hr className="solid my-4"/>*/}

                                                <div className='flex my-2 justify-start'>
                                                    <h5 className='font-bold'>Comments</h5>
                                                </div>

                                                {/*Comments list*/}

                                                {
                                                    answer.comments.length === 0 ? '' :
                                                        answer.comments.map((comment, commentIndex) => {
                                                            return (
                                                                <div className={`flex items-center`}>
                                                                    <div className="p-3 bg-c2 rounded-lg my-2 w-full"
                                                                         key={commentIndex}>
                                                                        {
                                                                            !isCommentEditMode[index][commentIndex] ?
                                                                                <p className="text-left text-md"
                                                                                   style={{whiteSpace: 'pre-wrap'}}>{comment.comment}
                                                                                    <span
                                                                                        className={`text-gray-400 text-sm`}>- by {comment.author.name}</span>
                                                                                </p> :
                                                                                <textarea
                                                                                    value={edited[index].comments[commentIndex]}
                                                                                    onChange={(e) => {
                                                                                        const newEdited = [...edited];
                                                                                        newEdited[index].comments[commentIndex] = e.target.value;
                                                                                        setEdited(newEdited);
                                                                                    }}
                                                                                    className="w-full my-1 text-left border focus:outline-none text-md"
                                                                                    placeholder="Enter your answer here"/>
                                                                        }
                                                                        <div className='flex flex-col items-end'>
                                                                            {/*<p className="text-right text-gray-400 text-sm">{} commented*/}
                                                                            {/*    by {comment.author.name}</p>*/}

                                                                            {
                                                                                (profile?.id === comment.author.id || profile?.role === 'admin') &&
                                                                                <div>
                                                                                    {
                                                                                        !isCommentEditMode[index][commentIndex] ?
                                                                                            <div
                                                                                                className='flex flex-wrap '>
                                                                                            </div> :
                                                                                            <div
                                                                                                className='flex flex-wrap'>
                                                                                                <button
                                                                                                    onClick={() => {
                                                                                                        setIsCommentEditMode(
                                                                                                            [...isCommentEditMode].map((value, i) => {
                                                                                                                if (i === index) {
                                                                                                                    return value.map((v, j) => {
                                                                                                                        return j === commentIndex ? !v : v;
                                                                                                                    })
                                                                                                                } else {
                                                                                                                    return value;
                                                                                                                }
                                                                                                            }));
                                                                                                    }}
                                                                                                    className='text-right text-black'>
                                                                                                    Cancel
                                                                                                </button>

                                                                                                <button
                                                                                                    onClick={() => {
                                                                                                        console.log("Submit");
                                                                                                        if (window.confirm("Are you sure you want to submit the changes?")) {
                                                                                                            editComment(answer.id, comment.id, edited[index].comments[commentIndex]);
                                                                                                            // editAnswer(answer.id, edited[commentIndex].answer)
                                                                                                        }
                                                                                                    }}
                                                                                                    className='text-right text-black'>
                                                                                                    Submit
                                                                                                </button>
                                                                                            </div>
                                                                                    }
                                                                                </div>
                                                                            }

                                                                        </div>
                                                                    </div>

                                                                    <ProtectedComponent authorId={comment.author.id}>
                                                                        <div className={`ml-2`}>
                                                                            {
                                                                                !isCommentEditMode[index][commentIndex] ?
                                                                                    <div className={`flex gap-2`}>
                                                                                        <MdOutlineEdit
                                                                                            onClick={() => {
                                                                                                setIsCommentEditMode(
                                                                                                    [...isCommentEditMode].map((value, i) => {
                                                                                                        if (i === index) {
                                                                                                            return value.map((v, j) => {
                                                                                                                return j === commentIndex ? !v : v;
                                                                                                            })
                                                                                                        } else {
                                                                                                            return value;
                                                                                                        }
                                                                                                    }));
                                                                                            }}
                                                                                            className={`text-blue-500 cursor-pointer`}/>
                                                                                        <IoTrashOutline
                                                                                            onClick={() => {
                                                                                                console.log("Delete");
                                                                                                if (window.confirm('Are u sure u want to delete this question?')) {
                                                                                                    deleteComment(answer.id, comment.id);
                                                                                                }
                                                                                            }}
                                                                                            className={`text-red-600 cursor-pointer`}/>
                                                                                    </div> :

                                                                                    <div className={`flex gap-2`}>
                                                                                        {/*<IoMdClose className={`text-red-600`}/>*/}
                                                                                        {/*<TiTick className={`text-blue-500`}/>*/}
                                                                                    </div>

                                                                            }
                                                                        </div>
                                                                    </ProtectedComponent>
                                                                </div>
                                                            )
                                                        })
                                                }

                                                <ProtectedComponent roles={["moderator"]} authorId={answer.author.id}>
                                                    <div className="flex">
                                                        <p
                                                            onClick={() => {
                                                                const newIsCommentOn = [...isCommentOn];
                                                                newIsCommentOn[index] = !newIsCommentOn[index];
                                                                setIsCommentOn(newIsCommentOn);
                                                            }}
                                                            className="py-1 px-2 rounded-md underline text-gray-600 hover:text-blue-900 cursor-pointer">Add
                                                            Comment
                                                        </p>
                                                    </div>
                                                </ProtectedComponent>

                                                {
                                                    isCommentOn[index] ?
                                                        <div>
                                                        <textarea
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                            className="w-full my-1 bg-c2"
                                                            placeholder="Enter your comment here"/>
                                                            <div className="flex justify-end">
                                                                <button
                                                                    onClick={() => {
                                                                        console.log('Commented', answer.id, index)
                                                                        createComment(answer.id, commentText);
                                                                    }}
                                                                    className="bg-primary text-white py-1 px-2 rounded-md hover:bg-gray-900">Submit
                                                                </button>
                                                            </div>
                                                        </div> : null
                                                }

                                            </div>
                                        </div>

                                    )
                                })
                        }
                    </div>
                </div>

            </div>

        </>

    );
}

export default AnswerComponent;