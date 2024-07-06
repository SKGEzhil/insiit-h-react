import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useShowToast} from "../context/toastContext.tsx";
import {createQuestionThunk} from "../store/actions/questionActions.ts";
import Fuse from "fuse.js";
import {tagDict} from "../config/constants.ts";

const AskQuestionPage = () => {
    const [title, setTitle] =
        useState<string>(localStorage.getItem('ask') ? JSON.parse(localStorage.getItem('ask')).title : '');
    const [body, setBody] =
        useState<string>(localStorage.getItem('ask') ? JSON.parse(localStorage.getItem('ask')).body : '');
    const [tags, setTags] =
        useState<string[]>(localStorage.getItem('ask') ? JSON.parse(localStorage.getItem('ask')).tags : []);
    const [tagInput, setTagInput] = useState<string>('');

    const [tagSuggestions, setTagSuggestions] = useState<string[]>([])

    const options = {
        includeScore: true,
        threshold: 0.4, // Adjust to change sensitivity (0.0 to 1.0)
        keys: []
    };

    // Create a Fuse instance
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

    const addTag = (tag: string) => {
        setTags([...tags, tag]);
        setTagInput('');
        setTagSuggestions([]);
    };


    const dispatch = useDispatch<never>();
    const navigate = useNavigate();

    const {showToast} = useShowToast();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({title, body, tags});

        if (localStorage.getItem('ask')) {
            dispatch(createQuestionThunk({title, body, tags})).then(
                (result) => {
                    localStorage.removeItem('ask');
                    result.error ? showToast({status: 'error', message: result.error.message}) : navigate('/forum');
                }
            );
        }

        localStorage.setItem('ask', JSON.stringify({title, body, tags}));

        navigate(`/ask/related?query=${encodeURIComponent(title)}`);


    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === ' ' && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-bg-3 p-8 rounded-xl shadow-lg w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-6">Ask a public question</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2 text-left">
                            Title*
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Be specific and imagine you’re asking a question to another person"
                            required
                            className="w-full bg-bg-2 px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2 text-left">
                            Body*
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Include all the information someone would need to answer your question"
                            required
                            className="w-full px-3 py-2 bg-bg-2 focus:outline-none focus:ring focus:border-blue-300 h-48"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2 text-left">
                            Tags*
                        </label>

                        {/* For larger screens */}
                        <div
                            className="tablet:flex hidden justify-start gap-2 flex-wrap items-center bg-bg-2 rounded-md px-2 py-1">
                            {tags.map((tag, index) => (
                                <div key={index}
                                     className="flex items-center text-gray-300 justify-center bg-bg-5 rounded-md px-3 py-1">
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-2 text-gray-300 bg-bg-5 hover:text-gray-800 p-0 m-0  focus:outline-none"
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
                                className="flex-grow px-3 py-2 bg-bg-2 focus:outline-none"
                            />
                        </div>

                        {/* For mobile screens */}
                        <div className="tablet:hidden">
                            <div className="flex flex-wrap justify-start gap-2 items-center rounded-md px-2 py-1">
                                {tags.map((tag, index) => (
                                    <div key={index}
                                         className="flex items-center text-gray-300 justify-center bg-bg-5 rounded-md px-3 py-1">
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="ml-2 text-gray-300 bg-bg-5 hover:text-gray-800 p-0 m-0  focus:outline-none"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex mt-2 mx-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={handleTagInputChange}
                                    onKeyDown={handleTagInputKeyDown}
                                    placeholder="Add up to 5 tags to describe what your question is about"
                                    className="flex-grow px-3 py-2 bg-bg-2 focus:outline-none"
                                />
                            </div>
                        </div>

                        {
                            tagSuggestions.length > 0 &&
                            <div className="bg-bg-2 p-2 rounded-xl mt-2">
                                <p className="text-left font-bold text-xl my-2">Suggestions</p>
                                <div className="flex flex-wrap gap-2 ">
                                    {tagSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            onClick={() => addTag(suggestion)}>
                                            <div key={index}
                                                 className="flex items-center text-gray-300 justify-center bg-bg-5 rounded-md px-3 py-1">
                                                <span>{suggestion}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }


                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white font-semibold hover:bg-blue-700"
                    >
                        Review your question
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AskQuestionPage;