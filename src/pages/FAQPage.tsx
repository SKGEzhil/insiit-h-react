import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getFaqsThunk, addFaqThunk, updateFaqThunk, deleteFaqThunk} from "../store/actions/faqActions.ts";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {FaRegEdit} from "react-icons/fa";
import {CgClose, CgTrash} from "react-icons/cg";

interface FAQInterface {
    _id: string;
    question: string;
    answer: string;
}

function FAQPage() {

    const dispatch = useDispatch<never>();
    const {showToast} = useShowToast();
    const [showAddFAQ, setShowAddFAQ] = useState(false);
    const [showEditFAQ, setShowEditFAQ] = useState(false);
    const [editFaqId, setEditFaqId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const faqs = useSelector((state) => state.faqSlice.faqs);
    const {profile} = useAuth();

    useEffect(() => {
        dispatch(getFaqsThunk({page:1, limit:3}));
        console.log("Profile: ", profile?.role);
    }, [dispatch]);


    const addFAQ = (question: string, answer: string) => {
        dispatch(addFaqThunk({question, answer})).then((result) => {
            if(result.error) {
                showToast({status: "error", message: "Error adding FAQ"});
            }
            else {
                showToast({status: "success", message: "FAQ added successfully"});
            }
        });
    }

    const updateFAQ = (_id: string, question: string, answer: string) => {
        dispatch(updateFaqThunk({_id, question, answer})).then((result) => {
            if(result.error) {
                showToast({status: "error", message: "Error updating FAQ"});
            }
            else {
                showToast({status: "success", message: "FAQ updated successfully"});
            }
        });
    }

    const deleteFAQ = (id: string) => {
        dispatch(deleteFaqThunk({id})).then((result) => {
            if(result.error) {
                showToast({status: "error", message: "Error deleting FAQ"});
            }
            else {
                showToast({status: "success", message: "FAQ deleted successfully"});
                dispatch(getFaqsThunk({page: 1, limit: 3}));
            }
        });
    }

  return (
    <div>
      <h1>FAQ</h1>
      <p>Here are some frequently asked questions:</p>
        {
            profile?.role === "admin" || profile?.permissions.includes("write") ?
                <div>
                    <div>
                        <button
                            className={`bg-black text-white p-2 rounded-lg`}
                            onClick={() => {
                                setAnswer("");
                                setQuestion("");
                                setShowAddFAQ(!showAddFAQ);
                        }}>
                            {showAddFAQ ? "Cancel" : "Add FAQ"}
                        </button>
                        <div>
                            {
                                showAddFAQ ?
                                    <div>
                                        <div>
                                        <textarea
                                            className={`w-full p-2 rounded-lg border`}
                                            placeholder={"Enter the question"}
                                            onChange={(e) => {
                                                setQuestion(e.target.value)
                                            }}
                                        />
                                            <textarea
                                                className={`w-full p-2 rounded-lg border`}
                                                placeholder={"Enter the answer"}
                                                onChange={(e) => {
                                                    setAnswer(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className={`bg-black text-white p-2 rounded-lg`}
                                                onClick={() => {
                                                    addFAQ(question, answer);
                                                    setShowAddFAQ(false);
                                                }}
                                            >
                                                Add FAQ
                                            </button>
                                        </div>
                                    </div>

                                    :
                                    <div></div>
                            }
                        </div>
                    </div>
                </div>
                :
                <div></div>
        }
        <ul>
            {faqs.map((faq: FAQInterface) => {
                return (
                    <>
                        <div className={`flex`}>
                            <div>
                                <li key={faq._id}>
                                    {
                                        showEditFAQ && faq._id == editFaqId ?
                                            <div>
                                                <input
                                                    className={`w-full p-2 rounded-lg border`}
                                                    value={question}
                                                    onChange={(e) => {
                                                        setQuestion(e.target.value);
                                                    }}
                                                />
                                                <input
                                                    className={`w-full p-2 rounded-lg border`}
                                                    value={answer}
                                                    onChange={(e) => {
                                                        setAnswer(e.target.value);
                                                    }}
                                                />
                                                <button
                                                    className={`bg-black text-white p-2 rounded-lg`}
                                                    onClick={() => {
                                                        updateFAQ(faq._id, question, answer);
                                                        setShowEditFAQ(false);
                                                    }}
                                                >
                                                    Update FAQ
                                                </button>
                                            </div>
                                            :
                                            <div>
                                                <h3>{faq.question}</h3>
                                                <p>{faq.answer}</p>
                                            </div>

                                    }
                                </li>
                            </div>
                            <div className={` px-10`}>
                            {
                                    profile?.role === "admin" || profile?.permissions.includes("write") ?
                                        <div className={`flex`}>
                                            <button
                                                className={`bg-black text-white p-2 rounded-lg`}
                                                onClick={() => {
                                                    setEditFaqId(faq._id);
                                                    setQuestion(faq.question);
                                                    setAnswer(faq.answer);
                                                    setShowEditFAQ(!showEditFAQ);
                                                }}
                                            >
                                                {
                                                    showEditFAQ ?
                                                        <CgClose/>
                                                        :
                                                        <FaRegEdit/>
                                                }
                                            </button>
                                            <button
                                                className={`bg-black text-white p-2 rounded-lg`}
                                                onClick={() => {
                                                    window.confirm("Are you sure you want to delete this FAQ?") && deleteFAQ(faq._id);
                                                }}
                                                >
                                                <CgTrash/>
                                            </button>
                                        </div>
                                        :
                                        <div></div>
                                }
                            </div>
                        </div>
                    </>

                )
            })}
        </ul>
    </div>
  );
}

export default FAQPage;