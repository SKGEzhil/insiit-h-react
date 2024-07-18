import {getApprovalQueueThunk, takeActionThunk} from "../store/actions/approvalQueueActions.ts";
import ElementRenderer from "./elementRenderer.tsx";
import {graphqlStringToJson} from "../utils/graphqlStringConversion.ts";
import {useShowToast} from "../context/toastContext.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {UserModel} from "../models/userModel.ts";

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
    data: never;
}

/**
 * ApprovalQueue component
 * @param {Object} props
 * @param {QueueItemType[]} props.queue List of items in the approval queue
 *
 * @returns {React.Element} The ApprovalQueue component
 */
function ApprovalQueue(props: {queue: QueueItemType[]}) {


    // States
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [isDataVisible, setIsDataVisible] = useState<boolean[]>(props.queue.map(() => false));
    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    const {showToast} = useShowToast();
    const dispatch = useDispatch<never>();


    useEffect(() => {
        dispatch(getApprovalQueueThunk({action: 'CREATE_ACADEMICS'}));
    }, [dispatch, refreshCounter]);


    return (
        <div className="flex justify-center">
            {
                props.queue.length > 0 &&
                <div className='max-w-4xl w-full'>
                    <div className='flex justify-between'>
                        <h2 className='text-left'>Pending Approvals</h2>

                        {/*Returns show more button when queue length exceeds 5 items*/}

                        {
                            props.queue.length > 4 &&
                            <button
                                onClick={() => setIsShowMore(!isShowMore)}
                                className='text-c10 text-md'>{isShowMore ? 'show less' : 'show more'}
                            </button>}
                    </div>
                    <div className='my-3'>
                        {
                            props.queue.map((item, index) => {
                                {
                                    // Returns only first 4 items when show more is false
                                    if (!isShowMore && index >= 4) {
                                        return null;
                                    }
                                    return (
                                        <div key={index}>
                                            <div
                                                className='flex justify-between items-center bg-c4 my-2 rounded-2xl p-2'>
                                                <div>
                                                    <p className='text-left'><span
                                                        className='font-bold'>Action:</span> {item.action}</p>
                                                    <p className='text-left'><span
                                                        className='font-bold'>Page:</span> {item.data.page}</p>
                                                    <p className='text-left'><span
                                                        className='font-bold'>Initiated by:</span> {item.user.name}</p>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            console.log('View clicked')
                                                            const newIsDataVisible = [...isDataVisible];
                                                            newIsDataVisible[index] = !newIsDataVisible[index];
                                                            setIsDataVisible(newIsDataVisible);
                                                        }}
                                                        className='bg-primary rounded-xl'>{isDataVisible[index] ? 'Hide' : 'View'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            dispatch(takeActionThunk({
                                                                id: item.id,
                                                                status: 'approved'
                                                            })).then((result) => {
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

                                                                    // Refresh the page after dispatch
                                                                    setRefreshCounter(refreshCounter + 1)
                                                                }
                                                            })
                                                        }}
                                                        className='bg-primary rounded-xl'>Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            dispatch(takeActionThunk({
                                                                id: item.id,
                                                                status: 'rejected'
                                                            })).then((result) => {
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

                                                                    // Refresh the page after dispatch
                                                                    setRefreshCounter(refreshCounter + 1)
                                                                }
                                                            })
                                                        }}
                                                        className='bg-red-700 rounded-xl'>Reject
                                                    </button>
                                                </div>
                                            </div>

                                            {
                                                isDataVisible[index] &&
                                                <div className='my-2'>
                                                    <ElementRenderer data={
                                                        {
                                                            "blocks": graphqlStringToJson(item.data.blocks),
                                                        }
                                                    }/>
                                                </div>
                                            }

                                        </div>

                                    )
                                }
                            })

                        }
                    </div>
                </div>}
        </div>

    )
}

export default ApprovalQueue;