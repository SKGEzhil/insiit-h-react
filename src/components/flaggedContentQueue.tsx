
import {NavLink} from "react-router-dom";
import {AppDispatch} from "../store/store.ts";
import {useShowToast} from "../context/toastContext.tsx";
import {useDispatch} from "react-redux";
import {resolveFlagThunk} from "../store/actions/flaggedContentActions.ts";

interface FlaggedContentQueueType {
    _id: string;
    contentType: string;
    questionId: string;
    contentId: string;
    status: string;
    content: string;
}



const FlaggedContentQueue = (props: {queue: FlaggedContentQueueType[]}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {showToast} = useShowToast();


    const resolveFlag = (id: string) => {
        dispatch(resolveFlagThunk({id: id, status: 'RESOLVED'})).then((result) => {
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
        <div className={`mb-12`}>
            <h3 className={`text-left mt-6 mb-4`}>Review Flagged Contents</h3>
            {props.queue.map((content) => {
                return (
                    <>
                        <div className={`flex justify-between items-center mb-4 gap-2 border rounded-lg p-2`}
                             key={content.id}>
                            <div>
                                <p className="text-left font-bold">{content.contentType}</p>
                                <p className="text-left">{content.content}</p>
                            </div>
                            <div className={`flex gap-2 items-center`}>
                                <NavLink
                                    to={`/question/${content.questionId}`}
                                    className="text-primary text-left text-lg font-semibold hover:underline">
                                    Link
                                </NavLink>
                                <button
                                    className="bg-primary text-white rounded-md p-2"
                                    onClick={() => {
                                        resolveFlag(content._id);
                                    }
                                    }
                                >
                                    Resolve
                                </button>
                            </div>
                        </div>
                    </>

                );
            })}
        </div>
    );
}

export default FlaggedContentQueue;
