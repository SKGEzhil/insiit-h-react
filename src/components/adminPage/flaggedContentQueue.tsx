import {NavLink} from "react-router-dom";
import {AppDispatch} from "../../store/store.ts";
import {useShowToast} from "../../context/toastContext.tsx";
import {useDispatch} from "react-redux";
import {resolveFlagThunk} from "../../store/actions/flaggedContentActions.ts";
import {HiOutlineExternalLink, HiOutlineCheck} from "react-icons/hi";

/**
 * @namespace Components
 */

/**
 * @typedef {Object} FlaggedContentQueueType
 * @property {string} _id - Unique identifier for the flagged content.
 * @property {string} contentType - Type of the content ['QUESTION', 'ANSWER', 'COMMENT'].
 * @property {string} questionId  - Associated question ID.
 * @property {string} contentId - Content ID of the flagged item.
 * @property {string} status - Current status of the flag.
 * @property {string} content   - The flagged content text.
 */

interface FlaggedContentQueueType {
    _id: string;
    contentType: string;
    questionId: string;
    contentId: string;
    status: string;
    content: string;
}

/**
 * FlaggedContentQueue component
 *
 * @memberOf Components
 * @param {Object} props - The properties passed to the component.
 * @param {FlaggedContentQueueType[]} props.queue - An array of flagged content items to review.
 * @param {string} props.queue._id - Unique identifier for the flagged content.
 * @param {string} props.queue.contentType - Type of the content ['QUESTION', 'ANSWER', 'COMMENT'].
 * @param {string} props.queue.contentId - Content ID of the flagged item.
 * @param {string} props.queue.status - Current status of the flag.
 * @param {string} props.queue.content - The flagged content text.
 * @returns {JSX.Element} The rendered FlaggedContentQueue component.
 */

const FlaggedContentQueue = (props: {queue: FlaggedContentQueueType[]}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {showToast} = useShowToast();

    const resolveFlag = (id: string) => {
        dispatch(resolveFlagThunk({id: id, status: 'RESOLVED'}) as any).then((result) => {
            if (result.error) {
                showToast({
                    status: 'error',
                    message: result.error.message
                });
            } else {
                showToast({
                    status: 'success',
                    message: 'Flag resolved successfully'
                });
                window.location.reload();
            }
        });
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg text-left font-semibold text-gray-900">Flagged Content</h3>
            <div className="space-y-3">
                {props.queue.map((content) => (
                    <div 
                        key={content._id}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-2 text-left">
                                <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {content.contentType}
                                </div>
                                <p className="text-sm text-gray-900">{content.content}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <NavLink
                                    to={`/question/${content.questionId}`}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <HiOutlineExternalLink className="w-4 h-4 mr-1.5" />
                                    View
                                </NavLink>
                                <button
                                    onClick={() => resolveFlag(content._id)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    <HiOutlineCheck className="w-4 h-4 mr-1.5" />
                                    Resolve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FlaggedContentQueue;
