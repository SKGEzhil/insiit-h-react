import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useShowToast} from "../context/toastContext.tsx";
import {questionActionsThunk} from "../store/actions/questionActions.ts";
import Fuse from "fuse.js";
import { HiOutlineInformationCircle, HiOutlineTag, HiOutlineX } from 'react-icons/hi';
import { motion } from 'framer-motion';
// import {tagDict} from "../config/constants.ts";

/**
 * Renders the AskQuestionPage
 *
 * @memberof Pages
 * @returns {JSX.Element} AskQuestionPage
 */
const AskQuestionPage = () => {
    const [title, setTitle] =
        useState<string>(localStorage.getItem('ask') ? JSON.parse(localStorage.getItem('ask') as string).title : '');
    const [body, setBody] =
        useState<string>(localStorage.getItem('ask') ? JSON.parse(localStorage.getItem('ask') as string).body : '');
    const [tags, setTags] =
        useState<string[]>(localStorage.getItem('ask') ? JSON.parse(localStorage.getItem('ask') as string).tags : []);
    const [tagInput, setTagInput] = useState<string>('');
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const tagListJson = useSelector((state: any) => state.tagSlice.tags);
    const tagDict = tagListJson.map((tag: any) => tag.name);

    const options = {
        includeScore: true,
        threshold: 0.4,
        keys: []
    };

    // Create a Fuse instance
    const fuse = new Fuse(tagDict, options);

    useEffect(() => {
        if (tagInput.trim()) {
            const result = fuse.search(tagInput);
            const fetchedTagSuggestions = result.map((tag) => tag.item as string);
            setTagSuggestions(fetchedTagSuggestions);
        } else {
            setTagSuggestions([]);
        }
    }, [tagInput]);

    const addTag = (tag: string) => {
        if (tags.length < 5 && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setTagInput('');
            setTagSuggestions([]);
        }
    };

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const {showToast} = useShowToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!title.trim()) {
            showToast({ status: 'error', message: 'Please enter a title for your question' });
            return;
        }
        
        if (!body.trim()) {
            showToast({ status: 'error', message: 'Please provide details in the body of your question' });
            return;
        }
        
        if (tags.length === 0) {
            showToast({ status: 'error', message: 'Please add at least one tag to help categorize your question' });
            return;
        }

        setIsSubmitting(true);

        if (localStorage.getItem('ask')) {
            dispatch(questionActionsThunk({action: 'CREATE', data: {title, body, tags}})).then(
                (result: any) => {
                    localStorage.removeItem('ask');
                    if (result.error) {
                        showToast({status: 'error', message: result.error.message});
                        setIsSubmitting(false);
                    } else {
                        navigate('/forum');
                    }
                }
            );
        }

        localStorage.setItem('ask', JSON.stringify({title, body, tags}));
        navigate(`/ask/related?query=${encodeURIComponent(title)}`);
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' && tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-100/50"
                >
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Ask a public question</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Get help from the community by asking a clear, specific question
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <span className="text-xs text-gray-500">
                                    {title.length}/150
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value.slice(0, 150))}
                                    placeholder="What's your question? Be specific"
                                    required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                                />
                                <div className="mt-2 text-xs text-gray-500 flex items-center">
                                    <HiOutlineInformationCircle className="inline mr-1 text-blue-500" />
                                    Your title should summarize the specific problem you're trying to solve
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Details
                                </label>
                                <span className="text-xs text-gray-500">
                                    {body.length}/10000
                                </span>
                            </div>
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value.slice(0, 10000))}
                                placeholder="Include all relevant information someone would need to answer your question"
                                required
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 h-48 resize-none"
                            />
                            <div className="mt-2 text-xs text-gray-500 flex items-center">
                                <HiOutlineInformationCircle className="inline mr-1 text-blue-500" />
                                Describe what you've tried and what you're trying to accomplish
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>
                                <span className="text-xs text-gray-500">
                                    {tags.length}/5 tags
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 p-2 mb-2 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
                                {tags.map((tag, index) => (
                                    <div key={index} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-lg px-2 py-1 text-xs h-7 border border-blue-100">
                                        <HiOutlineTag className="mr-1 h-3 w-3" />
                                        <span className="leading-relaxed">{tag}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            aria-label="Remove tag"
                                            className="flex items-center ml-1 text-blue-500 hover:text-blue-700 focus:outline-none p-0.5 rounded-full hover:bg-blue-100 transition-colors"
                                        >
                                            <HiOutlineX className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                
                                {tags.length < 5 && (
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={handleTagInputChange}
                                        onKeyDown={handleTagInputKeyDown}
                                        placeholder={tags.length ? "Add another tag" : "Add up to 5 tags (press space to add)"}
                                        className="flex-grow min-w-[120px] border-0 focus:outline-none focus:ring-0 p-1 text-xs h-7 bg-transparent"
                                    />
                                )}
                            </div>
                            
                            <div className="mt-2 text-xs text-gray-500 flex items-center">
                                <HiOutlineInformationCircle className="inline mr-1 text-blue-500" />
                                Add up to 5 tags to describe what your question is about
                            </div>
                            
                            {tagSuggestions.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 p-3 border border-gray-100 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
                                >
                                    <p className="text-xs font-medium text-gray-700 mb-2">Suggested tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tagSuggestions.map((suggestion, index) => (
                                            <button
                                                type="button"
                                                key={index}
                                                onClick={() => addTag(suggestion)}
                                                disabled={tags.includes(suggestion) || tags.length >= 5}
                                                className={`text-xs px-3 py-1 rounded-lg transition-all duration-200
                                                ${tags.includes(suggestion) || tags.length >= 5 
                                                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100'}`}
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                        
                        <div className="flex items-center justify-end pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isSubmitting || !title.trim() || !body.trim() || tags.length === 0}
                                className={`px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-200 flex items-center gap-2
                                ${isSubmitting || !title.trim() || !body.trim() || tags.length === 0
                                    ? 'bg-blue-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        {
                                            localStorage.getItem('ask') ? 'Ask Question' : 'Search for similar questions'
                                        }
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AskQuestionPage;