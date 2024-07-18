import {useLocation} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import "react-toastify/dist/ReactToastify.css";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchQuestionThunk} from "../store/actions/questionActions.ts";
import {setPage} from "../store/slices/paginatorSlice.ts";
import {AppDispatch} from "../store/store.ts";
import { QuestionModel } from "../models/questionModel.ts";


/**
 * SearchPage component\
 * Renders list of questions based on search query
 * - Uses `useLocation` hook from `react-router-dom` to get the current location
 * - Gets the query parameters from the url
 * - Example: `app/search?query=question&page=1&tags=tag1,tag2`
 * @method SearchPage
 */
const SearchPage = () => {

    type RootState = {
        questionSlice: {
            questions: QuestionModel[];
        };
    }

    const questionList = useSelector((state: RootState) => state.questionSlice.questions);

    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    /*** Function to extract query parameters ***/
    const getQueryParams = () => {
        // console.log(location)
        return new URLSearchParams(location.search);
    };

    /*** Extracting query and page parameters ***/
    const query = getQueryParams().get('query') || '';
    const page = parseInt(getQueryParams().get('page') as string) || 1;
    const tags = getQueryParams().get('tags') || ''
    const tagList = tags.split(',');
    // const tags = getQueryParams().get('tags') || '';

    /*** Call the search function whenever the component mounts or query/page changes ***/
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
                        questionList.map((question: QuestionModel) => {
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