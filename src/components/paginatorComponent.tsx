import {useNavigate} from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * PaginatorComponent is a functional component that renders a paginator.
 *
 * @memberOf Components
 * @param {Object} props - The properties for the paginator.
 * @param {number} props.currentPage - The current page number.
 * @returns {React.Element} The rendered paginator.
 */
function PaginatorComponent(props: {currentPage: number}) {
    const navigate = useNavigate();

    const updatePageParam = (newPage: number) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', newPage.toString());
        const newPath = `${location.pathname}?${queryParams.toString()}`;
        navigate(newPath);
    };

    // Function to create page number buttons
    const renderPageNumbers = () => {
        const pages = [];
        const currentPage = props.currentPage;
        
        // Always show first page
        pages.push(
            <button
                key="page-1"
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 ${
                    currentPage === 1 
                        ? 'bg-blue-600 text-white font-medium shadow-md scale-110' 
                        : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
                onClick={() => updatePageParam(1)}
                disabled={currentPage === 1}
            >
                1
            </button>
        );
        
        // Show ellipsis if current page is more than 3
        if (currentPage > 3) {
            pages.push(
                <span key="ellipsis-1" className="w-6 flex items-center justify-center text-gray-400 text-xs">
                    •••
                </span>
            );
        }
        
        // Show previous page if it exists and isn't the first page
        if (currentPage > 2) {
            pages.push(
                <button
                    key={`page-${currentPage-1}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                    onClick={() => updatePageParam(currentPage - 1)}
                >
                    {currentPage - 1}
                </button>
            );
        }
        
        // Show current page if it isn't the first page
        if (currentPage > 1) {
            pages.push(
                <button
                    key={`page-${currentPage}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm bg-blue-600 text-white font-medium shadow-md transition-all duration-200 scale-110"
                    onClick={() => updatePageParam(currentPage)}
                >
                    {currentPage}
                </button>
            );
        }
        
        // Show next page
        pages.push(
            <button
                key={`page-${currentPage+1}`}
                className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                onClick={() => updatePageParam(currentPage + 1)}
            >
                {currentPage + 1}
            </button>
        );
        
        return pages;
    };

    return (
        <div className="flex justify-center items-center space-x-1 py-3">
            <button
                className={`flex items-center justify-center h-8 px-3 text-xs font-medium rounded-full transition-all duration-200 ${
                    props.currentPage === 1 
                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                }`}
                onClick={() => {
                    if (props.currentPage > 1) {
                        updatePageParam(props.currentPage-1);
                    }
                }}
                disabled={props.currentPage === 1}
            >
                <FaChevronLeft className="mr-1 text-[10px]" />
                Prev
            </button>

            <div className="hidden md:flex items-center space-x-1 mx-1">
                {renderPageNumbers()}
            </div>

            <button
                className="flex items-center justify-center h-8 px-3 text-xs font-medium rounded-full text-gray-700 hover:bg-gray-100 hover:shadow-sm transition-all duration-200"
                onClick={() => {
                    updatePageParam(props.currentPage+1);
                }}
            >
                Next
                <FaChevronRight className="ml-1 text-[10px]" />
            </button>
        </div>
    );
}

export default PaginatorComponent;