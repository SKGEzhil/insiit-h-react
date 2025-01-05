

import {useQuestionFetch} from "../hooks/useQuestionFetch.ts";
import {useLocation} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import "react-toastify/dist/ReactToastify.css";
import {useShowToast} from "../context/toastContext.tsx";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setPage} from "../store/slices/paginatorSlice.ts";
import {endProgress, startProgress} from "../store/slices/progressSlice.ts";

/**
 * ForumPage component\
 * Renders list of questions in the forum
 * @method ForumPage
 * @return JSX.Element
 */
const ForumPage = () => {

    const location = useLocation();

    // Function to extract query parameters
    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    const [currentPage, setCurrentPage] = useState(1);

    // Extracting query and page parameters
    const page = parseInt(getQueryParams().get('page') as string) || 1;
    const tags = getQueryParams().get('tags') ? getQueryParams().get('tags').split(',') : [];

    const {questionList, setRefresh} = useQuestionFetch(tags, page);
    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();

    useEffect(() => {
        console.log('page!!', page);
        // dispatch(setPage(page));
        setCurrentPage(page);
        setRefresh(true)
    }, [page]);


    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <div className="flex-1 p-5">
                    <div className="tablet:flex hidden justify-end">
                        <div className="w-1/2">
                            <SearchBar/>
                        </div>

                        <button onClick={() => {
                            dispatch(startProgress());
                            showToast({status: "success", message: "Success message"});
                        }}>
                            toast
                        </button>

                        <button onClick={() => {
                            dispatch(endProgress());
                            showToast({status: "success", message: "Success message"});
                        }}>
                            toast
                        </button>

                    </div>

                    {
                        questionList.map((question) => {
                            return (
                                <QuestionListItem question={question} key={question.id}/>
                            )
                        })
                    }

                    <div>
                        <PaginatorComponent currentPage={currentPage}/>
                    </div>


                </div>


            </div>


        </div>
    );
}

export default ForumPage;