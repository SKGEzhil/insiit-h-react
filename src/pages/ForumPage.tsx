

import {useQuestionFetch} from "../hooks/useQuestionFetch.ts";
import {useLocation, useNavigate} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import "react-toastify/dist/ReactToastify.css";
import {useShowToast} from "../context/toastContext.tsx";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../store/slices/paginatorSlice.ts";
import {endProgress, startProgress} from "../store/slices/progressSlice.ts";
import {getQuestionsThunk, searchQuestionThunk} from "../store/actions/questionActions.ts";

/**
 * ForumPage component\
 * Renders list of questions in the forum
 * @memberof Pages
 * @return {JSX.Element}
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
    // const tags = getQueryParams().get('tags') ? getQueryParams().get('tags').split(',') : [];
    const tags = getQueryParams().get('tags') || ''
    const tagList = tags.split(',');
    const query = getQueryParams().get('query') || null;

    // const {questionList, setRefresh} = useQuestionFetch(tags, page);
    const questionList = useSelector((state) => state.questionSlice.questions);
    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();

    const navigate = useNavigate();

    useEffect(() => {
        console.log('page!!', page);
        if(query || tags.length > 0) {
            console.log('searching');
            dispatch(searchQuestionThunk({searchTerm: query ? query : "", tags: tagList, page}));
        } else {
            dispatch(getQuestionsThunk({tags: tagList, page: page, limit: 5}));
        }
        // dispatch(setPage(page));
        setCurrentPage(page);
        // setRefresh(true)
    }, [dispatch, page, query, tags]);

    const search = (searchTerm: string) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('query', searchTerm);
        queryParams.set('page', "1");

        // Construct the new path
        const newPath = `${location.pathname}?${queryParams.toString()}`;

        // Navigate to the new path
        navigate(newPath);
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <div className="flex-1 p-1">
                    <div className="tablet:flex hidden items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Questions</h1>
                        </div>
                        <div className="w-1/2">
                            <SearchBar onSearch={(searchTerm) => {
                                search(searchTerm)
                            }}/>
                        </div>

                    </div>

                    <div className={`divide-y`}>
                        {
                            questionList.map((question) => {
                                return (
                                    <QuestionListItem question={question} key={question.id}/>
                                )
                            })
                        }
                    </div>


                    <div>
                        <PaginatorComponent currentPage={currentPage}/>
                    </div>


                </div>


            </div>


        </div>
    );
}

export default ForumPage;