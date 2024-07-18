import {useSelector} from "react-redux";
import ApprovalQueue from "../components/approvalQueue.tsx";

/**
 * Admin Page
 * - All admin related actions can be viewed here
 *
 * @returns {JSX.Element} Admin Page
 */
function AdminPage() {

    const queue = useSelector((state) => state.approvalQueueSlice.queueList);

    return (
        <div>
            <h1>Admin Page</h1>
            <p>This page is only visible to admins</p>

            <ApprovalQueue queue={queue}/>

        </div>
    );
}

export default AdminPage;