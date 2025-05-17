import React, {useState} from "react";
import {QuestionModel} from "../../models/questionModel.ts";
import {useDispatch} from "react-redux";
import {useShowToast} from "../../context/toastContext.tsx";
import {answerActionsThunk, commentActionsThunk} from "../../store/actions/questionActions.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {useAuth} from "../../context/authContext.tsx";
import {MdOutlineEdit} from "react-icons/md";
import {IoTrashOutline} from "react-icons/io5";
import {BiUpvote} from "react-icons/bi";
import {FiFlag} from "react-icons/fi";
import ProtectedComponent from "../protectedComponent.tsx";
import {AppDispatch} from "../../store/store.ts";

/**
 * `AnswerComponent` is a React component that renders answers and comments on that answer.
 *
 * @memberOf Components
 * @param {Object} props - The properties for the component.
 * @param {QuestionModel} props.question - The question data.
 *
 * @returns {JSX.Element} The answer component.
 */
function AnswerComponent(props: { question: QuestionModel }) {
    const answers = props.question.answers;
    const votes = props.question.votes;

    // States
    const [isCommentOn, setIsCommentOn] = useState<boolean[]>(new Array(answers.length).fill(false));
    const [commentTexts, setCommentTexts] = useState<string[]>(new Array(answers.length).fill(''));
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

    const dispatch = useDispatch<AppDispatch>();
    const {showToast} = useShowToast();
    const {profile} = useAuth();

    // Actions
    const editAnswer = (answerId: string, answer: string) => {
        if (!answer.trim()) {
            showToast({status: 'error', message: 'Answer cannot be empty'});
            return;
        }
        
        dispatch(answerActionsThunk({
            action: 'EDIT',
            data: {questionId: props.question.id, answerId: answerId, answer: answer}
        })).then(
            (result: any) => {
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
            (result: any) => {
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
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Answer upvoted successfully'});
                    window.location.reload();
                }
            }
        )
    }

    const createComment = (answerId: string, comment: string, answerIndex: number) => {
        if (!comment.trim()) {
            showToast({status: 'error', message: 'Comment cannot be empty'});
            return;
        }
        
        dispatch(commentActionsThunk({
            action: 'CREATE',
            data: {questionId: props.question.id, answerId: answerId, comment: comment}
        })).then(
            (result: any) => {
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
        if (!comment.trim()) {
            showToast({status: 'error', message: 'Comment cannot be empty'});
            return;
        }
        
        dispatch(commentActionsThunk({
            action: 'EDIT',
            data: {questionId: props.question.id, answerId: answerId, commentId: commentId, comment: comment}
        })).then(
            (result: any) => {
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
            (result: any) => {
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
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message})
                } else {
                    showToast({status: 'success', message: 'Answer reported successfully'});
                    window.location.reload();
                }
            }
        )
    }

    // Helper functions for toggling states
    const toggleComment = (index: number) => {
        const newIsCommentOn = [...isCommentOn];
        newIsCommentOn[index] = !newIsCommentOn[index];
        setIsCommentOn(newIsCommentOn);
    }

    const toggleAnswerEditMode = (index: number) => {
        const newIsAnswerEditMode = [...isAnswerEditMode];
        newIsAnswerEditMode[index] = !newIsAnswerEditMode[index];
        setIsAnswerEditMode(newIsAnswerEditMode);
    }

    const toggleCommentEditMode = (answerIndex: number, commentIndex: number) => {
        const newIsCommentEditMode = [...isCommentEditMode];
        newIsCommentEditMode[answerIndex][commentIndex] = !newIsCommentEditMode[answerIndex][commentIndex];
        setIsCommentEditMode(newIsCommentEditMode);
    }

    // Helper function to update a specific comment text
    const updateCommentText = (index: number, text: string) => {
        const newCommentTexts = [...commentTexts];
        newCommentTexts[index] = text;
        setCommentTexts(newCommentTexts);
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="max-w-5xl w-full">
                    <div className="my-2 mt-3">
                        <h2 className="font-bold text-xl text-gray-800 text-left border-b border-gray-100 pb-2">Answers</h2>
                    </div>
                    <div className={`divide-y divide-gray-50`}>
                        {/* Answers list */}
                        {
                            answers.length === 0 ? 
                            <div className="py-6 text-center text-gray-500">No answers yet</div> :
                            answers.map((answer, index) => {
                                return (
                                    <div className="bg-white p-4 my-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-subtle animate-slideUp" key={index}>
                                        <div className="rounded-lg">
                                            <div className={`flex items-start`}>
                                                <div>
                                                    <div className="flex flex-col mr-5 items-center p-3 rounded-lg">
                                                        <p className="font-medium text-xs text-gray-500 mb-1">Votes</p>
                                                        <button 
                                                            onClick={() => upvoteAnswer(answer.id)}
                                                            className="group relative flex flex-col items-center cursor-pointer p-1"
                                                            aria-label="Upvote answer"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                                className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                            </svg>
                                                            <span className="text-xl font-semibold text-blue-600 mt-1">{answer.votes.votes}</span>
                                                            <span className="absolute -bottom-7 bg-blue-50 text-blue-800 text-xs py-0.5 px-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">Upvote</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    {
                                                        !isAnswerEditMode[index] ?
                                                            <div className="prose prose-sm text-left max-w-none mb-3">
                                                                <p className="text-gray-700 whitespace-pre-wrap">{answer.answer}</p>
                                                            </div> :
                                                            <textarea
                                                                value={edited[index].answer}
                                                                onChange={(e) => {
                                                                    const newEdited = [...edited];
                                                                    newEdited[index].answer = e.target.value;
                                                                    setEdited(newEdited);
                                                                }}
                                                                className="w-full p-3 border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-100 min-h-[100px]"
                                                                placeholder="Enter your answer here"
                                                            />
                                                    }
                                                    <div className={`flex flex-wrap justify-between items-center mt-4`}>
                                                        <div className={`flex gap-2 mb-2 sm:mb-0`}>
                                                            <button
                                                                onClick={() => toggleComment(index)}
                                                                className={`flex items-center text-xs py-1.5 px-3 border border-gray-200 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-colors`}
                                                                aria-label="View comments"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                                                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                                                </svg>
                                                                <span>Comments {answer.comments.length > 0 && `(${answer.comments.length})`}</span>
                                                            </button>
                                                            
                                                            <button
                                                                onClick={() => reportAnswer(answer.id)}
                                                                className={`flex items-center text-xs py-1.5 px-3 border border-gray-200 rounded-full hover:border-red-300 hover:bg-red-50 transition-colors`}
                                                                aria-label="Report answer"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>Report</span>
                                                            </button>
                                                        </div>
                                                        <div className="text-right text-gray-400 text-sm flex items-center">
                                                            <span className="mr-1">{formatDate(answer.date)}</span> | 
                                                            <span className="ml-1 flex items-center">
                                                                <span className="w-5 h-5 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700 mr-1">
                                                                    {answer.author.name.charAt(0).toUpperCase()}
                                                                </span>
                                                                <span className="text-gray-600">answered by <span className="font-medium text-gray-700">{answer.author.name}</span></span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Author Actions */}
                                                    <div className='flex flex-col items-end'>
                                                        <ProtectedComponent roles={["admin"]} authorId={answer.author.name}>
                                                            <div>
                                                                {
                                                                    !isAnswerEditMode[index] ?
                                                                        <div className='flex flex-wrap gap-2 mt-3'>
                                                                            <button
                                                                                onClick={() => toggleAnswerEditMode(index)}
                                                                                className='flex items-center text-xs text-gray-600 px-2.5 py-1.5 rounded-md hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors'
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                                </svg>
                                                                                <span>Edit</span>
                                                                            </button>

                                                                            <button
                                                                                onClick={() => {
                                                                                    if (window.confirm('Are you sure you want to delete this answer?')) {
                                                                                        deleteAnswer(answer.id);
                                                                                    }
                                                                                }}
                                                                                className='flex items-center text-xs text-red-600 px-2.5 py-1.5 rounded-md hover:bg-red-50 border border-gray-200 hover:border-red-300 transition-colors'
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span>Delete</span>
                                                                            </button>
                                                                        </div> :
                                                                        <div className='flex flex-wrap gap-2 mt-3'>
                                                                            <button
                                                                                onClick={() => toggleAnswerEditMode(index)}
                                                                                className='text-xs text-gray-600 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors'
                                                                            >
                                                                                Cancel
                                                                            </button>

                                                                            <button
                                                                                onClick={() => {
                                                                                    if (window.confirm("Are you sure you want to submit the changes?")) {
                                                                                        editAnswer(answer.id, edited[index].answer)
                                                                                    }
                                                                                }}
                                                                                className='flex items-center text-xs bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors'
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span>Save Changes</span>
                                                                            </button>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </ProtectedComponent>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Comments section */}
                                            {isCommentOn[index] && (
                                                <div className="ml-14 mt-4 border-t border-gray-100 pt-3 animate-fadeIn">
                                                    <div className='flex justify-between items-center'>
                                                        <h5 className='text-xs uppercase tracking-wider text-gray-500 font-medium mb-2'>
                                                            Comments ({answer.comments.length})
                                                        </h5>
                                                    </div>

                                                    {/* Comments list */}
                                                    <div className="mt-3 space-y-3">
                                                        {answer.comments.length === 0 ? 
                                                            <div className="py-4 text-center text-gray-500 text-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                                </svg>
                                                                No comments yet
                                                            </div> :
                                                            <div className="space-y-0.5">
                                                                {answer.comments.map((comment, commentIndex) => (
                                                                    <div className="py-2.5 border-b border-gray-100 last:border-none" key={commentIndex}>
                                                                        {!isCommentEditMode[index][commentIndex] ? (
                                                                            <div>
                                                                                <div className="flex justify-between items-start mb-1.5">
                                                                                    <p className="text-gray-700 text-sm text-left leading-relaxed">
                                                                                        {comment.comment}
                                                                                    </p>
                                                                                    
                                                                                    {profile && profile.name === comment.author.name && (
                                                                                        <div className="flex space-x-1 ml-2 mt-0.5">
                                                                                            <button
                                                                                                onClick={() => toggleCommentEditMode(index, commentIndex)}
                                                                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                                                                                aria-label="Edit comment"
                                                                                            >
                                                                                                <MdOutlineEdit className="text-xs" />
                                                                                            </button>
                                                                                            
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    if (window.confirm('Are you sure you want to delete this comment?')) {
                                                                                                        deleteComment(answer.id, comment.id);
                                                                                                    }
                                                                                                }}
                                                                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                                                                aria-label="Delete comment"
                                                                                            >
                                                                                                <IoTrashOutline className="text-xs" />
                                                                                            </button>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex justify-end">
                                                                                    <p className="text-xs text-gray-400">
                                                                                        <span className="inline-flex items-center">
                                                                                            {comment.author.name}
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                <textarea
                                                                                    value={edited[index].comments[commentIndex]}
                                                                                    onChange={(e) => {
                                                                                        const newEdited = [...edited];
                                                                                        newEdited[index].comments[commentIndex] = e.target.value;
                                                                                        setEdited(newEdited);
                                                                                    }}
                                                                                    className="w-full p-2 text-sm border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-100 resize-none"
                                                                                    rows={2}
                                                                                />
                                                                                
                                                                                <div className="flex justify-end mt-2 space-x-2">
                                                                                    <button
                                                                                        onClick={() => toggleCommentEditMode(index, commentIndex)}
                                                                                        className="text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>
                                                                                    
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            if (window.confirm("Are you sure you want to submit the changes?")) {
                                                                                                editComment(answer.id, comment.id, edited[index].comments[commentIndex]);
                                                                                            }
                                                                                        }}
                                                                                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                                                                                    >
                                                                                        Save
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        }
                                                    </div>

                                                    {/* Comment form */}
                                                    <div className="mt-4 border-t border-gray-100 pt-3">
                                                        <div className="relative focus-within:ring-effect rounded-md transition-smooth">
                                                            <textarea
                                                                value={commentTexts[index]}
                                                                onChange={(e) => updateCommentText(index, e.target.value)}
                                                                className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none bg-gray-50 focus:bg-white transition-colors resize-none"
                                                                placeholder="Add a comment..."
                                                                rows={1}
                                                            />
                                                            <div className="flex justify-between items-center mt-2 px-1">
                                                                <span className="text-xs text-gray-400">{commentTexts[index].length} characters</span>
                                                                <button
                                                                    onClick={() => {
                                                                        createComment(answer.id, commentTexts[index], index);
                                                                    }}
                                                                    disabled={!commentTexts[index].trim()}
                                                                    className={`flex items-center text-xs py-1.5 px-3 rounded-md ${
                                                                        commentTexts[index].trim() 
                                                                            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
                                                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                    } transition-colors`}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                                    </svg>
                                                                    Post
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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