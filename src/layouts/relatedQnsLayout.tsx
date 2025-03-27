import SearchPage from "../pages/SearchPage.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useNavigate} from "react-router-dom";
import MediaQuery from "react-responsive";
import { HiOutlineQuestionMarkCircle, HiArrowLeft } from "react-icons/hi";

/**
 * This layout is used to display related questions while user is asking a new question
 *
 * @memberof Layouts
 * @returns {JSX.Element}
 */
function RelatedQnsLayout() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center">
                                <HiOutlineQuestionMarkCircle className="h-6 w-6 text-blue-500 mr-3" />
                                <h1 className="text-xl font-bold text-gray-900">
                                    Is your question similar to any of these questions?
                                </h1>
                            </div>
                            <MediaQuery minWidth={640}>
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => navigate('/ask')}
                                        className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
                                    >
                                        <HiArrowLeft className="mr-1 h-4 w-4" />
                                        Back to question form
                                    </button>
                                    <ProtectedButton 
                                        onClick={() => navigate('/ask')} 
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Ask new question
                                    </ProtectedButton>
                                </div>
                            </MediaQuery>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Review these similar questions before posting to avoid duplicates
                        </p>
                    </div>
                    
                    <div className="p-4">
                        <SearchPage />
                    </div>
                </div>
                
                <div className="flex justify-center tablet:hidden mt-6">
                    <div className="flex flex-col space-y-3 w-full">
                        <button 
                            onClick={() => navigate('/ask')}
                            className="flex items-center justify-center text-gray-600 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none"
                        >
                            <HiArrowLeft className="mr-2 h-4 w-4" />
                            Back to question form
                        </button>
                        <ProtectedButton 
                            onClick={() => navigate('/ask')} 
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Ask new question
                        </ProtectedButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatedQnsLayout;