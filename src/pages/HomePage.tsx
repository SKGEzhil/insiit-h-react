// HomePage.js


import {useQuestionFetch} from "../hooks/useQuestionFetch.ts";
import {useNavigate} from "react-router-dom";
import QuestionListItem from "../components/questionListItem.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useAuth} from "../context/authContext.tsx";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useShowToast} from "../context/toastContext.tsx";


const HomePage = () => {

    // const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    const {questionList} = useQuestionFetch();

    const {showToast} = useShowToast();

    const {login, logout} = useAuth();

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-yellow-200 text-center p-5">
                <h1 className="text-4xl font-bold">InsIIT</h1>
                <p className="text-xl">All the Insights you need!</p>
            </div>

            <div className="flex flex-1">
                <div className="bg-red-300 w-48 flex flex-col">
                    <button className="p-4 text-left hover:bg-red-400">Public Forum</button>
                    <button className="p-4 text-left hover:bg-red-400">Courses</button>
                    <button className="p-4 text-left hover:bg-red-400">Campus Life</button>
                    <button className="p-4 text-left hover:bg-red-400">Extras</button>
                    <button className="p-4 text-left hover:bg-red-400">Predictor</button>
                </div>
                <div className="flex-1 p-5">
                    <h2 className="bg-gray-300 p-4 ">Public Forum</h2>

                    <div className="flex justify-end">

                        <button onClick={() => {
                            login();
                        }}>
                            login
                        </button>

                        <button onClick={() => {
                            // toast.success("Added to cart !", {
                            //     position: "top-right",
                            // });

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

                </div>


            </div>


        </div>
    );
}

export default HomePage;