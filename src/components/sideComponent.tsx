import React, { useState } from "react";
import TagComponent from "./tagComponent.tsx";
import { useSelector } from "react-redux";
import { 
    HiOutlineBookmark, 
    HiOutlineBuildingLibrary, 
    HiOutlineAcademicCap, 
    HiOutlineChevronRight, 
    HiOutlineChevronDown,
    HiOutlineTag 
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import type { TagInterface } from "../store/slices/tagSlice";

interface StoreState {
    tagSlice: {
        tags: TagInterface[];
    };
}

/**
 * `SideComponent` is a React component that renders a side component with tags and categories.
 *
 * @memberOf Components
 * @returns {JSX.Element} The side component element.
 */

function SideComponent() {
    const [showAllDepts, setShowAllDepts] = useState(false);
    const tagDict = useSelector((state: StoreState) => state.tagSlice.tags);

    const departments = [
        { name: "Computer Science", url: "https://cse.iith.ac.in" },
        { name: "Electrical Engineering", url: "https://ee.iith.ac.in" },
        { name: "Mechanical Engineering", url: "https://mae.iith.ac.in" },
        { name: "Chemical Engineering", url: "https://che.iith.ac.in" },
        { name: "Civil Engineering", url: "https://ce.iith.ac.in" },
        { name: "Materials Science", url: "https://msme.iith.ac.in" }
    ];

    return (
        <div className=" w-64 mb-6 m-4 border-r">
            <div className="bg-white w-full max-w-64 rounded-xl">
                <div className="flex flex-col h-full">
                    {/* Tags Section */}
                    <div className="p-4 border-b">
                        <div className="flex items-center mb-3">
                            <HiOutlineTag className="w-4 h-4 text-blue-600 mr-2" />
                            <h2 className="text-sm font-semibold text-gray-900">Popular Tags</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tagDict.map((tag: TagInterface, index: number) => (
                                <TagComponent tag={tag.name} key={index}/>
                            ))}
                        </div>
                    </div>

                    {/* Department Resources */}
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <HiOutlineBuildingLibrary className="w-4 h-4 text-blue-600 mr-2" />
                                <h2 className="text-sm text-left font-semibold text-gray-900">Department Links</h2>
                            </div>
                            <button 
                                onClick={() => setShowAllDepts(!showAllDepts)}
                                className="flex items-center text-xs text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0"
                            >
                                {showAllDepts ? (
                                    <>
                                        Show Less
                                        <HiOutlineChevronDown className="w-3 h-3 ml-1" />
                                    </>
                                ) : (
                                    <>
                                        View All
                                        <HiOutlineChevronRight className="w-3 h-3 ml-1" />
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="space-y-2">
                            {departments.slice(0, showAllDepts ? departments.length : 3).map((dept, index) => (
                                <a 
                                    key={index}
                                    href={dept.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                                >
                                    {dept.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Helpful Resources */}
                    <div className="p-4 border-b">
                        <div className="flex items-center mb-3">
                            <HiOutlineAcademicCap className="w-4 h-4 text-blue-600 mr-2" />
                            <h2 className="text-sm font-semibold text-gray-900">Helpful Resources</h2>
                        </div>
                        <div className="space-y-2">
                            <a 
                                href="https://iith.ac.in/academics/academic-calendar/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                            >
                                Academic Calendar
                            </a>
                            <a 
                                href="https://aims.iith.ac.in" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                            >
                                AIMS Portal
                            </a>
                            <a 
                                href="https://library.iith.ac.in" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                            >
                                Library Resources
                            </a>
                        </div>
                    </div>

                    {/* Saved Items */}
                    <div className="p-4 mt-auto border-t">
                        <NavLink to="/bookmarks" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                            <HiOutlineBookmark className="w-4 h-4 mr-2" />
                            <span>Saved Items</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideComponent;