import {useLocation, useNavigate} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useAuth} from "../context/authContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import {useShowToast} from "../context/toastContext.tsx";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchQuestionThunk} from "../store/actions/questionActions.ts";
import {setPage} from "../store/slices/paginatorSlice.ts";


const SearchPage = () => {

    // const {page} = useParams<{ page: number }>();

    const navigate = useNavigate();
    // const {questionList, setRefresh} = useQuestionFetch(page);
    const questionList = useSelector((state) => state.questionSlice.questions);
    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();
    const {login, logout} = useAuth();

    const location = useLocation();

    // Function to extract query parameters
    const getQueryParams = () => {
        // console.log(location)
        return new URLSearchParams(location.search);
    };

    // Extracting query and page parameters
    const query = getQueryParams().get('query') || '';
    const page = parseInt(getQueryParams().get('page')) || 1;
    const tags = getQueryParams().get('tags') || ''
    const tagList = tags.split(',');
    // const tags = getQueryParams().get('tags') || '';

    // Call the search function whenever the component mounts or query/page changes
    useEffect(() => {
        dispatch(setPage(page));
        console.log('tag!!', tagList);
        dispatch(searchQuestionThunk({searchTerm: query, tags: tagList, page: page}));
        console.log(`Performing search with query: ${query}, page: ${page}`);
    }, [query, page, tags]);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <div className="flex-1 p-5">
                    {
                        location.pathname === '/search' ?
                            <div className="tablet:flex hidden justify-end">
                                <div className="w-1/2">
                                    <SearchBar/>
                                </div>
                            </div> : null
                    }

                    {
                        questionList.map((question) => {
                            return (
                                <QuestionListItem question={question} key={question.id}/>
                            )
                        })
                    }

                    <div>
                        <PaginatorComponent/>
                    </div>


                </div>


            </div>


        </div>
    );
}

export default SearchPage;