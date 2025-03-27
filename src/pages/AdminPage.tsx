import {useDispatch, useSelector} from "react-redux";
import ApprovalQueue from "../components/adminPage/approvalQueue.tsx";
import FlaggedContentQueue from "../components/adminPage/flaggedContentQueue.tsx";
import {useEffect} from "react";
import {getFlaggedContentThunk} from "../store/actions/flaggedContentActions.ts";
import {getAllUsersThunk} from "../store/actions/adminActions.ts";
import ManageUsersComponent from "../components/adminPage/manageUsersComponent.tsx";
import {HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineFlag} from "react-icons/hi";
import {store} from "../store/store.ts";
import {UserModel} from "../models/userModel.ts";

type RootState = ReturnType<typeof store.getState>;

/**
 * Admin Page
 * - All admin related actions can be viewed here
 *
 * @memberof Pages
 * @returns {JSX.Element} Admin Page
 */

type editUserType = {
    name: string;
    role: string;
    permissions: string[];
}

function AdminPage() {
    const queue = useSelector((state: RootState) => state.approvalQueueSlice.queueList);
    const flaggedContent = useSelector((state: RootState) => state.flaggedContentSlice.flaggedContentList);
    const adminUsers = useSelector((state: RootState) => state.adminSlice.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFlaggedContentThunk({contentType: 'Question'}) as any);
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllUsersThunk({role: 'admin'}) as any);
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-600">Manage users, content, and system settings</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <HiOutlineUserGroup className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Admins</p>
                                <p className="text-2xl font-semibold text-gray-900">{adminUsers.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <HiOutlineShieldCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                                <p className="text-2xl font-semibold text-gray-900">{queue.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-50 rounded-lg">
                                <HiOutlineFlag className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Flagged Content</p>
                                <p className="text-2xl font-semibold text-gray-900">{flaggedContent.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin List */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {adminUsers.map((user: UserModel) => (
                            <div key={user.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
                                <img 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                                    src={user.photoUrl} 
                                    alt={user.name}
                                />
                                <div>
                                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Management */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
                    <ManageUsersComponent/>
                </div>

                {/* Approval Queue */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
                    <ApprovalQueue queue={queue}/>
                </div>

                {/* Flagged Content */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <FlaggedContentQueue queue={flaggedContent}/>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;