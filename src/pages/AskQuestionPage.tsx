import { useState } from 'react';
import {createQuestion} from "../services/questionServices.ts";
import {useDispatch} from "react-redux";
import {addQuestion} from "../actions";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";

const AskQuestionPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {profile} = useAuth();

    const {showToast} = useShowToast();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({title, body, tags});
        const question = await createQuestion(title, body, tags).catch(
            (error) => {
                console.error('Error:', error);
                showToast({status: 'error', message: error.message});
            }
        );
        dispatch(addQuestion(question));
        navigate('/');
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-6">Ask a public question</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-left">
                            Title*
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Be specific and imagine you’re asking a question to another person"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-left">
                            Body*
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Include all the information someone would need to answer your question"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 h-48"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-left">
                            Tags*
                        </label>

                        <div className="flex justify-center items-center border rounded px-2 py-1">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center justify-center bg-gray-200 rounded-md px-3 py-1 mr-2">
                                            <span>{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
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
                                    className="flex-grow px-3 py-2 focus:outline-none"
                                />
                        </div>

                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                        Review your question
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AskQuestionPage;