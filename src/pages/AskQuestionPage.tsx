import {useEffect, useState} from 'react';
import {createQuestion} from "../services/questionServices.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/authContext.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {createQuestionThunk} from "../store/actions/questionActions.ts";
import {AppDispatch} from "../main.tsx";

const AskQuestionPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const dispatch = useDispatch<never>();
    const navigate = useNavigate();

    const {profile} = useAuth();

    const {showToast} = useShowToast();

    const questionSliceError = useSelector((state) => state.questionSlice.error);

    // useEffect(() => {
    //     if (questionSliceError) {
    //         console.error('Error creating question:@', questionSliceError);
    //         showToast({status: 'error', message: 'questionSliceError'});
    //     }
    // }, [questionSliceError]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({title, body, tags});

        dispatch(createQuestionThunk({title, body, tags})).then(
            (result) => {
                result.error ? showToast({status: 'error', message: result.error.message}) : navigate('/');
            }
        );
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

                        <div className="flex justify-center items-center bg-bg-2 rounded-md px-2 py-1">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center text-gray-300 justify-center bg-bg-5 rounded-md px-3 py-1 mr-2">
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