import {getApprovalQueueThunk, takeActionThunk} from "../../store/actions/approvalQueueActions.ts";
import ElementRenderer from "../blogPage/elementRenderer.tsx";
import {graphqlStringToJson} from "../../utils/graphqlStringConversion.ts";
import {useShowToast} from "../../context/toastContext.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {UserModel} from "../../models/userModel.ts";
import {HiOutlineCheck, HiOutlineX, HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi";

/**
 * @typedef {Object} QueueItemType
 * @property {string} id
 * @property {string} action
 * @property {UserModel} user
 * @property {string} date
 * @property {string} status
 * @property {never} data
 *
 */
type QueueItemType = {
    id: string;
    action: string;
    user: UserModel;
    date: string;
    status: string;
    data: {
        page: string;
        blocks: string;
    };
}

/**
 * ApprovalQueue component
 *
 * @memberOf Components
 * @param {Object} props
 * @param {QueueItemType[]} props.queue List of items in the approval queue
 * @param {string} props.queue.id Unique identifier for the approval queue item
 * @param {string} props.queue.action Action to be taken on the item
 * @param {UserModel} props.queue.user User who initiated the action
 * @param {string} props.queue.date Date the action was initiated
 * @param {string} props.queue.status Status of the action
 * @param {never} props.queue.data Data associated with the action
 *
 * @returns {React.Element} The ApprovalQueue component
 */
function ApprovalQueue(props: {queue: QueueItemType[]}) {
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [isDataVisible, setIsDataVisible] = useState<boolean[]>(props.queue.map(() => false));
    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    const {showToast} = useShowToast();
    const dispatch = useDispatch<never>();

    useEffect(() => {
        dispatch(getApprovalQueueThunk({action: 'CREATE_ACADEMICS'}) as any);
    }, [dispatch, refreshCounter]);

    return (
        <div className="space-y-4">
            {props.queue.length > 0 && (
                <>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                        {props.queue.length > 4 && (
                            <button
                                onClick={() => setIsShowMore(!isShowMore)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                {isShowMore ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>

                    <div className="space-y-3">
                        {props.queue.map((item, index) => {
                            if (!isShowMore && index >= 4) {
                                return null;
                            }
                            return (
                                <div key={index} className="space-y-3">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-600">Action:</span>
                                                    <span className="text-sm text-gray-900">{item.action}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-600">Page:</span>
                                                    <span className="text-sm text-gray-900">{item.data.page}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-600">Initiated by:</span>
                                                    <span className="text-sm text-gray-900">{item.user.name}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => {
                                                        const newIsDataVisible = [...isDataVisible];
                                                        newIsDataVisible[index] = !newIsDataVisible[index];
                                                        setIsDataVisible(newIsDataVisible);
                                                    }}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    {isDataVisible[index] ? (
                                                        <>
                                                            <HiOutlineEyeOff className="w-4 h-4 mr-1.5" />
                                                            Hide
                                                        </>
                                                    ) : (
                                                        <>
                                                            <HiOutlineEye className="w-4 h-4 mr-1.5" />
                                                            View
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        dispatch(takeActionThunk({
                                                            id: item.id,
                                                            status: 'approved'
                                                        }) as any).then((result) => {
                                                            if (result.error) {
                                                                showToast({
                                                                    status: 'error',
                                                                    message: result.error.message
                                                                });
                                                            } else {
                                                                showToast({
                                                                    status: 'success',
                                                                    message: 'Action approved successfully'
                                                                });
                                                                setRefreshCounter(refreshCounter + 1);
                                                            }
                                                        });
                                                    }}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                >
                                                    <HiOutlineCheck className="w-4 h-4 mr-1.5" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        dispatch(takeActionThunk({
                                                            id: item.id,
                                                            status: 'rejected'
                                                        }) as any).then((result) => {
                                                            if (result.error) {
                                                                showToast({
                                                                    status: 'error',
                                                                    message: result.error.message
                                                                });
                                                            } else {
                                                                showToast({
                                                                    status: 'success',
                                                                    message: 'Action rejected successfully'
                                                                });
                                                                setRefreshCounter(refreshCounter + 1);
                                                            }
                                                        });
                                                    }}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                >
                                                    <HiOutlineX className="w-4 h-4 mr-1.5" />
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {isDataVisible[index] && (
                                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                            <ElementRenderer data={{
                                                blocks: graphqlStringToJson(item.data.blocks),
                                            }} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default ApprovalQueue;