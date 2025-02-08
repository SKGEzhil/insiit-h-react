import {useDispatch, useSelector} from "react-redux";
import ApprovalQueue from "../components/adminPage/approvalQueue.tsx";
import FlaggedContentQueue from "../components/adminPage/flaggedContentQueue.tsx";
import {useEffect} from "react";
import {getFlaggedContentThunk} from "../store/actions/flaggedContentActions.ts";
import {getAllUsersThunk} from "../store/actions/adminActions.ts";
import ManageUsersComponent from "../components/adminPage/manageUsersComponent.tsx";

/**
 * Admin Page
 * - All admin related actions can be viewed here
 *
 * @returns {JSX.Element} Admin Page
 */

type editUserType = {
    name: string;
    role: string;
    permissions: string[];
}

function AdminPage() {

    const queue = useSelector((state) => state.approvalQueueSlice.queueList);
    const flaggedContent = useSelector((state) => state.flaggedContentSlice.flaggedContentList);
    const adminUsers = useSelector((state) => state.adminSlice.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFlaggedContentThunk({contentType: 'Question'}));
        console.log('Flagged Content Queue', flaggedContent);

    }, [dispatch]);

    // get admin users
    useEffect(() => {
        dispatch(getAllUsersThunk({role: 'admin'}))
        console.log('Admin Users', adminUsers);
    }, [dispatch]);

    return (
        <div className={`flex justify-center`}>
            <div className={`max-w-5xl w-full mx-4`}>
                <h1>Admin Page</h1>

                <h2 className={`text-left mb-4`}>All Admins</h2>
                {
                    adminUsers.map((user) => {
                        return (
                            <div className={`flex items-center gap-3 justify-start bg-gray-100 border rounded-lg mb-2 p-2`} key={user.id}>
                                <img className={`w-12 h-12 rounded-full`} src={user.photoUrl} alt={user.name}/>
                                <div className={`text-left`}>
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        );
                    })
                }

                <div className={`p-2 rounded-2xl border mt-8`}>
                    <ManageUsersComponent/>
                </div>

                <ApprovalQueue queue={queue}/>
                <FlaggedContentQueue queue={flaggedContent}/>

            </div>
        </div>
    );
}

export default AdminPage;