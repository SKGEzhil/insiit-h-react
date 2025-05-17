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
import {HiOutlinePencil, HiOutlinePlus, HiOutlineX} from "react-icons/hi";
import {HiOutlineTrash, HiOutlineArrowSmRight, HiOutlineTag, HiOutlineQuestionMarkCircle, HiOutlineDocumentText} from "react-icons/hi";
import PaginatorComponent from "../components/paginatorComponent.tsx";
import SearchBar from "../components/searchBar.tsx";
import ProtectedComponent from "../components/protectedComponent.tsx";
import TagComponent from "../components/tagComponent.tsx";
import Fuse from "fuse.js";
import {tagDict} from "../config/constants.ts";
import { Helmet } from 'react-helmet-async';

/**
 * @typedef FAQInterface
 * @property {string} _id
 * @property {string} question
 * @property {string} answer
 * @property {string[]} tags
 */
interface FAQInterface {
    _id: string;
    question: string;
    answer: string;
    tags: string[];
}

interface RootState {
    faqSlice: {
        faqs: FAQInterface[];
    }
}

/**
 * FAQ page of the website
 *
 * @memberof Pages
 * @returns {JSX.Element}
 */
function FAQPage() {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const {showToast} = useShowToast();
    const [showAddFAQ, setShowAddFAQ] = useState(false);
    const [showEditFAQ, setShowEditFAQ] = useState(false);
    const [editFaqId, setEditFaqId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const faqs = useSelector((state: RootState) => state.faqSlice.faqs);
    const {profile} = useAuth();

    const page = parseInt(new URLSearchParams(location.search).get("page") as string) || 1;
    const query = new URLSearchParams(location.search).get("query") || "";
    const tags = new URLSearchParams(location.search).get("tags") || '';
    const tagList = tags.split(',')

    const navigate = useNavigate();

    const [addTagList, setAddTagList] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        if (query || tagList.length > 0) {
            dispatch(searchFaqsThunk({search: query, tags: tagList, page, limit: 8}))
        } else {
            dispatch(getFaqsThunk({page, limit: 8}));
        }
    }, [dispatch, page, query, tags]);

    const options = {
        includeScore: true,
        threshold: 0.4,
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
        const newPath = `${location.pathname}?${queryParams.toString()}`;
        navigate(newPath);
    }

    const addFAQ = (question: string, answer: string) => {
        if (!question.trim() || !answer.trim()) {
            showToast({status: "error", message: "Question and answer are required"});
            return;
        }
        
        dispatch(addFaqThunk({question, answer, tags: addTagList})).then((result: any) => {
            if (result.error) {
                showToast({status: "error", message: "Error adding FAQ"});
            } else {
                showToast({status: "success", message: "FAQ added successfully"});
                resetForm();
                setIsPanelOpen(false);
            }
        });
    };

    const updateFAQ = (_id: string, question: string, answer: string) => {
        if (!question.trim() || !answer.trim()) {
            showToast({status: "error", message: "Question and answer are required"});
            return;
        }
        
        dispatch(updateFaqThunk({_id, question, answer})).then((result: any) => {
            if (result.error) {
                showToast({status: "error", message: "Error updating FAQ"});
            } else {
                showToast({status: "success", message: "FAQ updated successfully"});
                setShowEditFAQ(false);
            }
        });
    };

    const deleteFAQ = (id: string) => {
        dispatch(deleteFaqThunk({id})).then((result: any) => {
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
            if (addTagList.length < 5) {
                setAddTagList([...addTagList, tagInput.trim()]);
                setTagInput('');
            } else {
                showToast({status: "warning", message: "Maximum 5 tags allowed"});
            }
        }
    };

    const removeTag = (indexToRemove: number) => {
        setAddTagList(addTagList.filter((_, index) => index !== indexToRemove));
    };

    const addTag = (tag: string) => {
        if (addTagList.length < 5) {
            setAddTagList([...addTagList, tag]);
            setTagInput('');
            setTagSuggestions([]);
        } else {
            showToast({status: "warning", message: "Maximum 5 tags allowed"});
        }
    };

    const resetForm = () => {
        setQuestion("");
        setAnswer("");
        setAddTagList([]);
        setShowAddFAQ(false);
        setShowEditFAQ(false);
    }

    const openAddPanel = () => {
        resetForm();
        setIsPanelOpen(true);
    };

    return (
        <>
            <Helmet>
                <title>FAQs | InsIIT</title>
            </Helmet>
            <div className="bg-white min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h1>
                            <ProtectedComponent permissions={["write"]}>
                                <button
                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all"
                                    onClick={openAddPanel}
                                >
                                    <HiOutlinePlus className="text-lg" />
                                    <span>Add FAQ</span>
                                </button>
                            </ProtectedComponent>
                        </div>

                        <div className="w-1/3">
                            <SearchBar onSearch={searchFaqs} />
                        </div>
                    </div>

                    {/* FAQ Panel */}
                    <div className={`fixed inset-0 bg-black bg-opacity-30 z-50 transition-opacity ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className={`absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="h-full flex flex-col">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">Add New FAQ</h2>
                                    <button 
                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                        onClick={() => setIsPanelOpen(false)}
                                    >
                                        <HiOutlineX className="text-gray-500 text-xl" />
                                    </button>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <HiOutlineQuestionMarkCircle className="text-blue-500 mr-2" />
                                                <label className="font-medium text-gray-700">Question</label>
                                            </div>
                                            <textarea
                                                className="w-full p-3 rounded-md border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                                                placeholder="Enter your question here"
                                                rows={3}
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <HiOutlineDocumentText className="text-blue-500 mr-2" />
                                                <label className="font-medium text-gray-700">Answer</label>
                                            </div>
                                            <textarea
                                                className="w-full p-3 rounded-md border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                                                placeholder="Enter the answer here"
                                                rows={8}
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <HiOutlineTag className="text-blue-500 mr-2" />
                                                <label className="font-medium text-gray-700">Tags</label>
                                                <span className="text-xs text-gray-500 ml-2">(Max 5)</span>
                                            </div>
                                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                                <div className="p-3 bg-gray-50 border-b border-gray-200">
                                                    <div className="flex flex-wrap gap-2">
                                                        {addTagList.map((tag, index) => (
                                                            <div key={index}
                                                                className="flex items-center text-gray-700 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-100">
                                                                <span className="text-sm">{tag}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeTag(index)}
                                                                    className="ml-2 text-gray-400 hover:text-gray-600 p-0 m-0 focus:outline-none"
                                                                >
                                                                    <HiOutlineX className="text-xs" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <input
                                                        type="text"
                                                        value={tagInput}
                                                        onChange={handleTagInputChange}
                                                        onKeyDown={handleTagInputKeyDown}
                                                        placeholder="Type tag and press space to add"
                                                        className="w-full px-2 py-2 bg-transparent focus:outline-none text-sm border-b border-gray-100"
                                                    />
                                                    
                                                    {tagSuggestions.length > 0 && (
                                                        <div className="mt-3">
                                                            <p className="text-left text-gray-500 text-xs mb-2">Suggestions:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {tagSuggestions.map((suggestion, index) => (
                                                                    <div
                                                                        key={index}
                                                                        onClick={() => addTag(suggestion)}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        <div className="flex items-center text-gray-700 bg-gray-50 rounded-full px-3 py-1 hover:bg-gray-100 transition-all">
                                                                            <span className="text-sm">{suggestion}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 border-t border-gray-200 bg-gray-50">
                                    <div className="flex justify-end gap-3">
                                        <button
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                                            onClick={() => setIsPanelOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm transition-all"
                                            onClick={() => addFAQ(question, answer)}
                                        >
                                            <HiOutlinePlus className="text-lg" />
                                            <span>Add FAQ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                        {faqs.map((faq: FAQInterface) => (
                            <div key={faq._id} className="p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div className="w-full text-left">
                                        {showEditFAQ && faq._id === editFaqId ? (
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                                <input
                                                    className="w-full p-3 mb-3 rounded-md border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                />
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                                                <textarea
                                                    className="w-full p-3 mb-4 rounded-md border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                                    value={answer}
                                                    rows={3}
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-all"
                                                        onClick={() => {
                                                            setShowEditFAQ(false);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all"
                                                        onClick={() => {
                                                            updateFAQ(faq._id, question, answer);
                                                        }}
                                                    >
                                                        <HiOutlinePencil className="text-base" />
                                                        <span>Save</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center">
                                                    <HiOutlineArrowSmRight className="text-blue-500 mr-2 flex-shrink-0 text-xl" />
                                                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                                                </div>
                                                <p className="text-gray-600 mt-2 ml-6">{faq.answer}</p>
                                                {faq.tags && faq.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3 ml-6">
                                                        {faq.tags.map((tag) => (
                                                            <TagComponent tag={tag} key={tag}/>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    
                                    {(profile?.role === "admin" || profile?.permissions.includes("write")) && !showEditFAQ && (
                                        <div className="flex space-x-2 ml-4 flex-shrink-0">
                                            <button
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-md transition-all"
                                                onClick={() => {
                                                    setEditFaqId(faq._id);
                                                    setQuestion(faq.question);
                                                    setAnswer(faq.answer);
                                                    setShowEditFAQ(true);
                                                }}
                                            >
                                                <HiOutlinePencil size={18} />
                                            </button>
                                            <button
                                                className="bg-gray-100 hover:bg-gray-200 text-red-500 p-2 rounded-md transition-all"
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this FAQ?")) {
                                                        deleteFAQ(faq._id);
                                                    }
                                                }}
                                            >
                                                <HiOutlineTrash size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {faqs.length === 0 && (
                        <div className="p-8 rounded-lg shadow text-center border border-gray-100">
                            <p className="text-gray-500">No FAQs found. Try a different search term or add a new FAQ.</p>
                        </div>
                    )}

                    <div className="mt-8">
                        <PaginatorComponent currentPage={page}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQPage;