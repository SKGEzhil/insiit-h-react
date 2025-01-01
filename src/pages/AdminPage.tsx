import {useDispatch, useSelector} from "react-redux";
import ApprovalQueue from "../components/approvalQueue.tsx";
import FlaggedContentQueue from "../components/flaggedContentQueue.tsx";
import {useEffect} from "react";
import {getFlaggedContentThunk} from "../store/actions/flaggedContentActions.ts";

/**
 * Admin Page
 * - All admin related actions can be viewed here
 *
 * @returns {JSX.Element} Admin Page
 */
function AdminPage() {

    const queue = useSelector((state) => state.approvalQueueSlice.queueList);
    const flaggedContent = useSelector((state) => state.flaggedContentSlice.flaggedContentList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFlaggedContentThunk({contentType: 'Question'}));
        console.log('Flagged Content Queue', flaggedContent);

    }, [dispatch]);

    return (
        <div>
            <h1>Admin Page</h1>
            <p>This page is only visible to admins</p>

            <ApprovalQueue queue={queue}/>
            <FlaggedContentQueue queue={flaggedContent}/>

        </div>
    );
}

export default AdminPage;