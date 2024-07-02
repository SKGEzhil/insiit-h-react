

import {useQuestionFetch} from "../hooks/useQuestionFetch.ts";
import {useLocation, useNavigate} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useAuth} from "../context/authContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import {useShowToast} from "../context/toastContext.tsx";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setPage} from "../store/slices/paginatorSlice.ts";
import {endProgress, startProgress} from "../store/slices/progressSlice.ts";


const ForumPage = () => {

    const location = useLocation();

    // Function to extract query parameters
    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    // Extracting query and page parameters
    const page = parseInt(getQueryParams().get('page') as string) || 1;
    const tags = getQueryParams().get('tags') ? getQueryParams().get('tags').split(',') : [];

    const navigate = useNavigate();
    const {questionList, setRefresh} = useQuestionFetch(tags, page);
    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();
    const {login, logout} = useAuth();

    useEffect(() => {
        console.log('page!!', page);
        dispatch(setPage(page));
        setRefresh(true)
    }, [page]);


    return (
        <div className="flex flex-col h-screen">


            <div className="flex flex-1">

                <div className="flex-1 p-5">

                    <div className="flex justify-end">

                        <SearchBar/>

                        <button onClick={() => {
                            login();
                        }}>
                            login
                        </button>

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

                        <button className="mx-4" onClick={() => {
                            logout();
                        }}>
                            logout
                        </button>
                        <ProtectedButton onClick={() => {
                            navigate('/ask')
                        }}>
                            Ask a Question
                        </ProtectedButton>

                    </div>

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

export default ForumPage;