import SearchBar from "../searchBar.tsx";
import { deleteUserThunk, editUserThunk, getUserDataThunk } from "../../store/actions/adminActions.ts";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


/**
 * ManageUsersComponent
 *
 * @memberOf Components
 * @returns {JSX.Element} The rendered ManageUsersComponent component.
 */

function ManageUsersComponent() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [newPermission, setNewPermission] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [hoveredPermission, setHoveredPermission] = useState(null);
    const currentUser = useSelector((state) => state.adminSlice.current);

    const findUser = (searchTerm) => {
        dispatch(getUserDataThunk({ emailId: searchTerm })).then((result) => {
            const currUser = result.payload;
            setName(currUser.name);
            setRole(currUser.role);
            setPermissions(currUser.permissions);
        });
    };

    const deleteUser = (userId) => {
        dispatch(deleteUserThunk({ userId: userId }));
    };

    const updateUser = (userId, name, role, permissions) => {
        dispatch(editUserThunk({ userId: userId, name: name, role: role, permissions: permissions }));
    };

    const addPermission = () => {
        if (newPermission.trim() !== '') {
            setPermissions([...permissions, newPermission]);
            setNewPermission('');
        }
    };

    const removePermission = (permissionToRemove) => {
        setPermissions(permissions.filter(permission => permission !== permissionToRemove));
    };

    return (
        <>
            <div className={`flex justify-start items-center`}>
                <h3>Manage Users</h3>
                <div className={`w-1/2`}>
                    <SearchBar onSearch={(searchTerm) => findUser(searchTerm)} />
                </div>
            </div>

            <div>
                {currentUser && (
                    <div className={`flex items-center gap-3 justify-start bg-gray-100 border rounded-lg mb-2 p-2`}>
                        <img className={`w-20 h-20 rounded-full`} src={currentUser.photoUrl} alt={currentUser.name} />
                        <div className={`text-left`}>
                            <div className={`flex items-center gap-1`}>
                                <p className={`font-bold`}>Name: </p>
                                {!editMode ? (
                                    <p>{currentUser.name}</p>
                                ) : (
                                    <input
                                        className={`p-0 px-1 border border-blue-200 bg-gray-100`}
                                        type={`text`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className={`flex`}>
                                <p className={`font-bold`}>Email: </p>
                                <p>{currentUser.email}</p>
                            </div>
                            <div className={`flex`}>
                                <p className={`font-bold`}>Role: </p>
                                {!editMode ? (
                                    <p>{currentUser.role}</p>
                                ) : (
                                    <input
                                        className={`p-0 px-1 border border-blue-200 bg-gray-100`}
                                        type={`text`}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className={`flex mt-2 items-center gap-1`}>
                                <p className={`font-bold`}>Permissions: </p>
                                <div className={`flex items-center gap-2`}>
                                    {permissions.length === 0 ? (
                                        'None'
                                    ) : (
                                        permissions.map((permission) => (
                                            <div
                                                key={permission}
                                                className={`border border-gray-300 ${editMode && hoveredPermission === permission && `bg-red-200 text-red-600 border-red-500 cursor-pointer`} rounded-lg px-2 relative`}
                                                onMouseEnter={() => setHoveredPermission(permission)}
                                                onMouseLeave={() => setHoveredPermission(null)}
                                            >
                                                {editMode && hoveredPermission === permission && (
                                                    <div
                                                        className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-4 h-4 p-0 flex items-center justify-center cursor-pointer`}
                                                        onClick={() => removePermission(permission)}
                                                    >
                                                        -
                                                    </div>
                                                )}
                                                <span
                                                    className={`${editMode && hoveredPermission === permission && `opacity-50`}`}>
                                                    {permission}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                    {editMode && (
                                        <div className={`flex items-center`}>
                                            <input
                                                className={`p-0 px-1 border border-blue-200 bg-gray-100`}
                                                type={`text`}
                                                value={newPermission}
                                                onChange={(e) => setNewPermission(e.target.value)}
                                            />
                                            <button
                                                className={`ml-2 border border-blue-500 text-blue-500 rounded-lg px-2 p-0`}
                                                onClick={addPermission}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`flex gap-3 mt-2`}>
                                {editMode && (
                                    <div
                                        onClick={() => {
                                            setEditMode(!editMode);
                                            updateUser(currentUser.id, name, role, permissions);
                                            findUser(currentUser.email);
                                        }}
                                        className={`border cursor-pointer hover:bg-blue-200 border-blue-500 text-blue-500 rounded-lg px-2`}
                                    >
                                        Update
                                    </div>
                                )}
                                <div
                                    onClick={() => setEditMode(!editMode)}
                                    className={`border cursor-pointer hover:bg-blue-200 border-blue-500 text-blue-500 
                                    ${editMode ? 'hover:bg-red-200 text-red-500 border-red-500' : ''}
                                    rounded-lg px-2`}
                                >
                                    {editMode ? 'Cancel' : 'Edit'}
                                </div>
                                {
                                    !editMode && (
                                        <div
                                            onClick={() => {
                                                window.confirm('Are you sure you want to delete this user?') && deleteUser(currentUser.id);
                                            }
                                            }
                                            className={`border cursor-pointer hover:bg-red-200 border-red-500 text-red-500 rounded-lg px-2`}
                                        >
                                            Delete
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ManageUsersComponent;