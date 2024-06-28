

import {useQuestionFetch} from "../hooks/useQuestionFetch.ts";
import {useNavigate} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useAuth} from "../context/authContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import {useShowToast} from "../context/toastContext.tsx";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";


const HomePage = () => {

    const navigate = useNavigate();
    const {questionList} = useQuestionFetch();
    const {showToast} = useShowToast();
    const {login, logout} = useAuth();

    return (
        <div className="flex flex-col h-screen">

            <div className="flex flex-1">

                <div className="flex-1 p-5">
                    <h1 className=" bg-bg-2 rounded-md p-4 ">Public Forum</h1>

                    <SearchBar/>

                    <div className="flex justify-end">

                        <button onClick={() => {
                            login();
                        }}>
                            login
                        </button>

                        <button onClick={() => {
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
                            // console.log(question.totalQues);
                            return (
                                <QuestionListItem question={question} key={question.id}/>
                            )
                        })
                    }

                    <div>
                        <PaginatorComponent question={questionList[0]} page='home'/>
                    </div>


                </div>


            </div>


        </div>
    );
}

export default HomePage;