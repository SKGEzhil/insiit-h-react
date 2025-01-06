import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    getFaqsThunk,
    addFaqThunk,
    updateFaqThunk,
    deleteFaqThunk,
    searchFaqsThunk
} from "../store/actions/faqActions.ts";
import { useAuth } from "../context/authContext.tsx";
import { useShowToast } from "../context/toastContext.tsx";
import { FaRegEdit } from "react-icons/fa";
import { CgClose, CgTrash } from "react-icons/cg";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import ProtectedComponent from "../components/protectedComponent.tsx";

interface FAQInterface {
    _id: string;
    question: string;
    answer: string;
}

function FAQPage() {
    const dispatch = useDispatch<never>();
    const location = useLocation();
    const { showToast } = useShowToast();
    const [showAddFAQ, setShowAddFAQ] = useState(false);
    const [showEditFAQ, setShowEditFAQ] = useState(false);
    const [editFaqId, setEditFaqId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const faqs = useSelector((state) => state.faqSlice.faqs);
    const { profile } = useAuth();

    const page = parseInt(new URLSearchParams(location.search).get("page") as string) || 1;

    useEffect(() => {
        dispatch(getFaqsThunk({ page, limit: 8 }));
    }, [dispatch, page]);

    const searchFaqs = (search: string) => {
        //TODO: Add tags feature to FAQs
        dispatch(searchFaqsThunk({ search, tags: [], page, limit: 8 })).then((result) => {
            if (result.error) {
                showToast({ status: "error", message: "Error searching FAQ" });
            } else {
                showToast({ status: "success", message: "FAQ searched successfully" });
                setShowAddFAQ(false);
            }
        });
    }

    const addFAQ = (question: string, answer: string) => {
        dispatch(addFaqThunk({ question, answer })).then((result) => {
            if (result.error) {
                showToast({ status: "error", message: "Error adding FAQ" });
            } else {
                showToast({ status: "success", message: "FAQ added successfully" });
                setShowAddFAQ(false);
            }
        });
    };

    const updateFAQ = (_id: string, question: string, answer: string) => {
        dispatch(updateFaqThunk({ _id, question, answer })).then((result) => {
            if (result.error) {
                showToast({ status: "error", message: "Error updating FAQ" });
            } else {
                showToast({ status: "success", message: "FAQ updated successfully" });
                setShowEditFAQ(false);
            }
        });
    };

    const deleteFAQ = (id: string) => {
        dispatch(deleteFaqThunk({ id })).then((result) => {
            if (result.error) {
                showToast({ status: "error", message: "Error deleting FAQ" });
            } else {
                showToast({ status: "success", message: "FAQ deleted successfully" });
                dispatch(getFaqsThunk({ page: 1, limit: 5 }));
            }
        });
    };

    return (
        <div className="p-4">

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
                <ProtectedComponent permissions={["write"]}>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            setAnswer("");
                            setQuestion("");
                            setShowAddFAQ(!showAddFAQ);
                        }}
                    >
                        {showAddFAQ ? "Cancel" : "Add FAQ"}
                    </button>
                </ProtectedComponent>

                <div className={`w-1/2`}>
                    <SearchBar onSearch={(searchTerm) => {
                        searchFaqs(searchTerm);
                    }}/>
                </div>
            </div>

            {showAddFAQ && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
          <textarea
              className="w-full p-2 mb-2 rounded-lg border"
              placeholder="Enter the question"
              onChange={(e) => setQuestion(e.target.value)}
          />
                    <textarea
                        className="w-full p-2 mb-2 rounded-lg border"
                        placeholder="Enter the answer"
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            addFAQ(question, answer);
                        }}
                    >
                        Add FAQ
                    </button>
                </div>
            )}

            <ul className="space-y-4">
                {faqs.map((faq: FAQInterface) => (
                    <li key={faq._id} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-center">
                            {showEditFAQ && faq._id === editFaqId ? (
                                <div className="w-full">
                                    <input
                                        className="w-full p-2 mb-2 rounded-lg border"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                    <input
                                        className="w-full p-2 mb-2 rounded-lg border"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    />
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => {
                                            updateFAQ(faq._id, question, answer);
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full">
                                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                            {(profile?.role === "admin" || profile?.permissions.includes("write")) && (
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-400 text-white p-2 rounded-lg"
                                        onClick={() => {
                                            setEditFaqId(faq._id);
                                            setQuestion(faq.question);
                                            setAnswer(faq.answer);
                                            setShowEditFAQ(!showEditFAQ);
                                        }}
                                    >
                                        {showEditFAQ && faq._id === editFaqId ? <CgClose/> : <FaRegEdit/>}
                                    </button>
                                    <button
                                        className="bg-red-600 text-white p-2 rounded-lg"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this FAQ?")) {
                                                deleteFAQ(faq._id);
                                            }
                                        }}
                                    >
                                        <CgTrash/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <PaginatorComponent currentPage={page}/>
        </div>
    );
}

export default FAQPage;