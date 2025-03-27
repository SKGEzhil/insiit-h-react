import SearchBar from "../searchBar.tsx";
import { deleteUserThunk, editUserThunk, getUserDataThunk } from "../../store/actions/adminActions.ts";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import { store } from "../../store/store.ts";
import { UserModel } from "../../models/userModel.ts";

type RootState = ReturnType<typeof store.getState>;

/**
 * ManageUsersComponent
 *
 * @memberOf Components
 * @returns {JSX.Element} The rendered ManageUsersComponent component.
 */

function ManageUsersComponent() {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [permissions, setPermissions] = useState<string[]>([]);
    const [newPermission, setNewPermission] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [hoveredPermission, setHoveredPermission] = useState<string | null>(null);
    const currentUserData = useSelector((state: RootState) => state.adminSlice.current);
    const currentUser = currentUserData as UserModel | null;

    const findUser = (searchTerm: string) => {
        dispatch(getUserDataThunk({ emailId: searchTerm }) as any).then((result: { payload: UserModel }) => {
            const currUser = result.payload;
            setName(currUser.name);
            setRole(currUser.role);
            setPermissions(currUser.permissions);
        });
    };

    const deleteUser = (userId: string) => {
        dispatch(deleteUserThunk({ userId }) as any);
    };

    const updateUser = (userId: string, name: string, role: string, permissions: string[]) => {
        dispatch(editUserThunk({ userId, name, role, permissions }) as any);
    };

    const addPermission = () => {
        if (newPermission.trim() !== '') {
            setPermissions([...permissions, newPermission]);
            setNewPermission('');
        }
    };

    const removePermission = (permissionToRemove: string) => {
        setPermissions(permissions.filter(permission => permission !== permissionToRemove));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
                <div className="w-96">
                    <SearchBar onSearch={findUser} />
                </div>
            </div>

            {currentUser && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-start space-x-4">
                        <img 
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" 
                            src={currentUser.photoUrl} 
                            alt={currentUser.name} 
                        />
                        <div className="flex-1 space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-600">Name</label>
                                    {!editMode ? (
                                        <p className="text-gray-900">{currentUser.name}</p>
                                    ) : (
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <p className="text-gray-900">{currentUser.email}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-600">Role</label>
                                    {!editMode ? (
                                        <p className="text-gray-900">{currentUser.role}</p>
                                    ) : (
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <div className="bg-gray-200 text-xs py-0.5 rounded-full px-2 inline-flex ">
                                    <p className="text-gray-900">Permissions</p>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {permissions.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No permissions assigned</p>
                                    ) : (
                                        permissions.map((permission) => (
                                            <div
                                                key={permission}
                                                className={`group inline-flex items-center h-6 px-2 text-xs rounded-lg ${
                                                    editMode 
                                                        ? 'bg-red-50 text-red-700 border border-red-200' 
                                                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                }`}
                                                onMouseEnter={() => setHoveredPermission(permission)}
                                                onMouseLeave={() => setHoveredPermission(null)}
                                            >
                                                {permission}
                                                {editMode && (
                                                    <button
                                                        onClick={() => removePermission(permission)}
                                                        className="ml-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <HiOutlineX className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                    {editMode && (
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={newPermission}
                                                onChange={(e) => setNewPermission(e.target.value)}
                                                placeholder="Add permission..."
                                                className="h-6 px-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                onClick={addPermission}
                                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <HiOutlinePlus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        {editMode ? (
                            <>
                                <button
                                    onClick={() => {
                                        setEditMode(false);
                                        updateUser(currentUser.id, name, role, permissions);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <HiOutlinePencil className="w-4 h-4 mr-2" />
                                    Edit User
                                </button>
                                <button
                                    onClick={() => {
                                        window.confirm('Are you sure you want to delete this user?') && deleteUser(currentUser.id);
                                    }}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    <HiOutlineTrash className="w-4 h-4 mr-2" />
                                    Delete User
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageUsersComponent;