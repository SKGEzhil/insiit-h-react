import {useGetQuestion} from "../hooks/useGetQuestion.ts";
import {useParams} from "react-router";
import QuestionComponent from "../components/questionPage/questionComponent.tsx";
import AnswerComponent from "../components/questionPage/answerComponent.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useState} from "react";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {useDispatch} from "react-redux";
import {answerActionsThunk} from "../store/actions/questionActions.ts";
import {AppDispatch} from "../store/store.ts";
import ProtectedComponent from "../components/protectedComponent.tsx";
import {IoMdClose} from "react-icons/io";

/**
 * QuestionPage component\
 * Renders a single question with its answers and comments
 * - Takes ***question id*** as a parameter from url
 * - Example: `app/question/questionId`
 * @memberof Pages
 * @return {JSX.Element}
 */
function QuestionPage() {

    const {id} = useParams<{ id: string, contentId: string }>();
    const {question, setRefresh} = useGetQuestion(id!);

    /*** State to store user's answer ***/
    const [yourAnswer, setYourAnswer] = useState("");
    const [isAnswerFieldOpen, setIsAnswerFieldOpen] = useState(false);

    const {showToast} = useShowToast();
    const {profile} = useAuth();

    const dispatch = useDispatch<AppDispatch>();

    /*** Dispatches an action to create an answer ***/
    const createAnswer = () => {
        // Check if answer is empty
        if (!yourAnswer.trim()) {
            showToast({status: 'error', message: 'Answer cannot be empty'});
            return;
        }
        
        dispatch(answerActionsThunk({action: 'CREATE', data: {questionId: id as string, answer: yourAnswer}})).then(
            (result: any) => {
                if (result.error) {
                    showToast({status: 'error', message: result.error.message});
                } else {
                    showToast({status: 'success', message: 'Answer submitted successfully'});
                    setRefresh(true);
                }
            }
        );
        setYourAnswer("");
        setIsAnswerFieldOpen(false);
    }

    return (
        question ?
            <div className="py-4 transition-all duration-300">
                <div className="flex-grow flex-col justify-center mx-2 divide-y">
                    <div className="py-1 transform transition-transform duration-300 hover:scale-[1.01]">
                        <QuestionComponent question={question}/>
                    </div>
                    <div className="py-1">
                        <AnswerComponent question={question}/>
                    </div>

                    {
                        !isAnswerFieldOpen ?
                            profile?.role === "moderator" || profile?.role === 'admin' ?
                                <div className="flex justify-center my-6">
                                    <ProtectedComponent roles={["moderator", "admin"]}>
                                        <button
                                            onClick={() => {
                                                setIsAnswerFieldOpen(true);
                                            }}
                                            className="group relative overflow-hidden bg-white border border-blue-200 text-blue-600 py-2.5 px-6 rounded-md hover:bg-blue-50 transition-all duration-300"
                                        >
                                            <span className="relative z-10 flex items-center font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add your answer
                                            </span>
                                            <div className="absolute top-0 left-0 w-full h-full bg-blue-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
                                        </button>
                                    </ProtectedComponent>
                                </div> : null : null
                    }
                    <div className="flex justify-center">
                        <div className="max-w-4xl w-full">
                            {
                                isAnswerFieldOpen ?
                                    <div className="my-6 animate-fadeIn animate-slideUp">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                            <div className="flex items-center p-5 border-b border-gray-100">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <h1 className="text-lg font-medium text-gray-800 flex-1">Your Answer</h1>
                                                <button
                                                    onClick={() => setIsAnswerFieldOpen(false)}
                                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
                                                    aria-label="Close"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="p-5">
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                                    <textarea
                                                        value={yourAnswer}
                                                        onChange={(e) => setYourAnswer(e.target.value)}
                                                        placeholder="Share your knowledge..."
                                                        required
                                                        className="w-full p-4 bg-transparent focus:outline-none transition-all resize-none" 
                                                        rows={6}
                                                    />
                                                </div>
                                                
                                                <div className="flex justify-end mt-4 gap-3">
                                                    <button 
                                                        onClick={() => setIsAnswerFieldOpen(false)}
                                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={createAnswer}
                                                        disabled={!yourAnswer.trim()}
                                                        className={`px-6 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center min-w-[120px] ${
                                                            yourAnswer.trim() 
                                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm' 
                                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        } transition-colors`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Submit Answer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            : <div className="py-10 min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center animate-fadeIn">
                    <div className="w-[300px] h-10 bg-gray-200 rounded-md mb-5 animate-shimmer"></div>
                    <div className="w-[240px] h-5 bg-gray-200 rounded-md mb-4 animate-shimmer"></div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 animate-pulse-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="w-full max-w-xl h-40 bg-gray-200 rounded-md animate-shimmer mt-6"></div>
                    </div>
                </div>
            </div>
    );
}

export default QuestionPage;