import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    getFaqsThunk,
    addFaqThunk,
    updateFaqThunk,
    deleteFaqThunk,
    searchFaqsThunk
} from "../store/actions/faqActions.ts";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {FaRegEdit} from "react-icons/fa";
import {CgClose, CgTrash} from "react-icons/cg";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import ProtectedComponent from "../components/protectedComponent.tsx";
import TagComponent from "../components/tagComponent.tsx";
import Fuse from "fuse.js";
import {questionActionsThunk} from "../store/actions/questionActions.ts";
import {tagDict} from "../config/constants.ts";

interface FAQInterface {
    _id: string;
    question: string;
    answer: string;
    tags: string[];
}

function FAQPage() {
    const dispatch = useDispatch<never>();
    const location = useLocation();
    const {showToast} = useShowToast();
    const [showAddFAQ, setShowAddFAQ] = useState(false);
    const [showEditFAQ, setShowEditFAQ] = useState(false);
    const [editFaqId, setEditFaqId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const faqs = useSelector((state) => state.faqSlice.faqs);
    const {profile} = useAuth();

    const page = parseInt(new URLSearchParams(location.search).get("page") as string) || 1;
    const query = new URLSearchParams(location.search).get("query") || "";
    const tags = new URLSearchParams(location.search).get("tags") || '';
    const tagList = tags.split(',')

    const navigate = useNavigate();

    const [addTagList, setAddTagList] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([])

    useEffect(() => {
        if (query || tagList.length > 0) {
            //TODO: Implement tags feature for faqs
            console.log('searching FAQS');
            dispatch(searchFaqsThunk({search: query, tags: tagList, page, limit: 8}))
        } else {
            dispatch(getFaqsThunk({page, limit: 8}));
        }
    }, [dispatch, page, query, tags]);

    const options = {
        includeScore: true,
        threshold: 0.4, // Adjust to change sensitivity (0.0 to 1.0)
        keys: []
    };
    const fuse = new Fuse(tagDict, options);

    useEffect(() => {
        if (tagInput.trim()) {
            const result = fuse.search(tagInput);
            const fetchedTagSuggestions = result.map((tag) => tag.item);
            setTagSuggestions(fetchedTagSuggestions);
        } else {
            setTagSuggestions([]);
        }
    }, [tagInput]);

    const searchFaqs = (searchTerm: string) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('query', searchTerm);
        queryParams.set('page', "1");

        // Construct the new path
        const newPath = `${location.pathname}?${queryParams.toString()}`;

        // Navigate to the new path
        navigate(newPath);
    }

    const addFAQ = (question: string, answer: string) => {
        dispatch(addFaqThunk({question, answer, tags: addTagList})).then((result) => {
            if (result.error) {
                showToast({status: "error", message: "Error adding FAQ"});
            } else {
                showToast({status: "success", message: "FAQ added successfully"});
                setShowAddFAQ(false);
            }
        });
    };

    const updateFAQ = (_id: string, question: string, answer: string) => {
        dispatch(updateFaqThunk({_id, question, answer})).then((result) => {
            if (result.error) {
                showToast({status: "error", message: "Error updating FAQ"});
            } else {
                showToast({status: "success", message: "FAQ updated successfully"});
                setShowEditFAQ(false);
            }
        });
    };

    const deleteFAQ = (id: string) => {
        dispatch(deleteFaqThunk({id})).then((result) => {
            if (result.error) {
                showToast({status: "error", message: "Error deleting FAQ"});
            } else {
                showToast({status: "success", message: "FAQ deleted successfully"});
                dispatch(getFaqsThunk({page: 1, limit: 5}));
            }
        });
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' && tagInput.trim()) {
            setAddTagList([...addTagList, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        setAddTagList(addTagList.filter((_, index) => index !== indexToRemove));
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //
    // };

    const addTag = (tag: string) => {
        setAddTagList([...addTagList, tag]);
        setTagInput('');
        setTagSuggestions([]);
    };

    return (
        <div className="p-4">

            <div className="flex justify-between items-center mb-4">
                <div className={`flex justify-start items-center gap-2`}>
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
                </div>

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
                    <div
                        className="tablet:flex hidden justify-start gap-2 flex-wrap items-center bg-c1 border border-c8/[.2] rounded-2xl px-2 py-1">
                        {addTagList.map((tag, index) => (
                            <div key={index}
                                 className="flex items-center text-c10 justify-center bg-c2 rounded-md px-3 py-1">
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                    className="ml-2 text-c10 bg-c2 hover:text-gray-800 p-0 m-0  focus:outline-none"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagInputKeyDown}
                            placeholder="Add up to 5 tags to describe what your question is about"
                            className="flex-grow px-3 py-2 bg-c1 focus:outline-none"
                        />
                    </div>
                    {
                        tagSuggestions.length > 0 &&
                        <div className="bg-c1 border-c8/[.2] border p-2 rounded-2xl mt-2">
                            <p className="text-left font-bold text-c7 text-xl my-2">Suggestions</p>
                            <div className="flex flex-wrap gap-2 ">
                                {tagSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        onClick={() => addTag(suggestion)}>
                                        <div key={index}
                                             className="flex items-center text-c10 justify-center bg-c2 rounded-md px-3 py-1">
                                            <span>{suggestion}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
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
                                    {
                                        faq.tags && (
                                            <div className="flex space-x-2">
                                                {faq.tags.map((tag) => (
                                                    <TagComponent tag={tag} key={tag}/>
                                                ))}
                                            </div>
                                        )
                                    }
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