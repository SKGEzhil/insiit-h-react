import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getApprovalQueueThunk, takeActionThunk} from "../store/actions/approvalQueueActions.ts";
import ElementRenderer from "../components/elementRenderer.tsx";
import {graphqlStringToJson} from "../utils/graphqlStringConversion.ts";
import {useShowToast} from "../context/toastContext.tsx";

function AdminPage() {

    const queue = useSelector((state) => state.approvalQueueSlice.queueList);
    const dispatch = useDispatch<never>();

    const [refreshCounter, setRefreshCounter] = useState(0);


    useEffect(() => {
        dispatch(getApprovalQueueThunk({action: 'CREATE_ACADEMICS'}));
    }, [dispatch, refreshCounter]);


    const [isDataVisible, setIsDataVisible] = useState<boolean[]>(queue.map(() => false));
    const [isShowMore, setIsShowMore] = useState<boolean>(false);
    const {showToast} = useShowToast();

    return (
        <div>
            <h1>Admin Page</h1>
            <p>This page is only visible to admins</p>

            <div className="flex justify-center">
                {
                    queue.length > 0 &&
                    <div className='max-w-4xl w-full'>
                        <div className='flex justify-between'>
                            <h2 className='text-left'>Pending Approvals</h2>
                            {
                                queue.length > 4 &&
                                <button
                                onClick={() => setIsShowMore(!isShowMore)}
                                className='text-c10 text-md'>{isShowMore ? 'show less' : 'show more'}
                            </button>}
                        </div>
                        <div className='my-3'>
                            {
                            queue.map((item, index) => {
                                {
                                    if (!isShowMore && index >= 4 ) {
                                        return null;
                                    }
                                    return (
                                        <div key={index}>
                                            <div className='flex justify-between bg-c4 my-2 rounded-2xl p-2'>
                                                <div>
                                                    <p className='text-left'><span
                                                        className='font-bold'>Action:</span> {item.action}</p>
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
                                                            "time": item.data.time,
                                                            "version": item.data.version
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


        </div>
    );
}

export default AdminPage;