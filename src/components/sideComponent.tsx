import TagComponent from "./tagComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTagsReducer} from "../store/slices/tagSlice.ts";
import {getTags} from "../services/tagService.ts";
import {tagDict} from "../config/constants.ts";


/**
 * `SideComponent` is a React component that renders a side component with tags and categories.
 *
 * @memberOf Components
 * @returns {JSX.Element} The side component element.
 */

function SideComponent() {

    const tagDict = useSelector((state) => state.tagSlice.tags);

    return (
        <div className="fixed top-16 bottom-2 w-64 mb-6 m-4 border-r">
            <div className="bg-white w-full max-w-64 overflow-auto rounded-xl" style={{height: "85vh"}}>
                <div className="flex flex-col">
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-left my-3">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {tagDict.map((tag, index) => (
                                <TagComponent tag={tag.name} key={index}/>
                            ))}
                        </div>
                    </div>
                    <hr></hr>
                    <div className={`flex-col h-full justify-end`}>
                        <p>&#169; IIT Hyderabad</p>
                    </div>

                    {/*<div className="p-4">*/}
                    {/*    <h2 className="text-xl font-bold flex my-3">Categories</h2>*/}
                    {/*    <div className="flex flex-col gap-2">*/}
                    {/*  <span*/}
                    {/*      className="inline-block bg-c2 text-c10 text-left text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 1</span>*/}
                    {/*        <span*/}
                    {/*            className="inline-block bg-c2 text-c10 text-left text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 2</span>*/}
                    {/*        <span*/}
                    {/*            className="inline-block bg-c2 text-c10 text-left text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 3</span>*/}
                    {/*        <span*/}
                    {/*            className="inline-block bg-c2 text-c10 text-left text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 4</span>*/}
                    {/*        <span*/}
                    {/*            className="inline-block bg-c2 text-c10 text-left text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 5</span>*/}
                    {/*        <span*/}
                    {/*            className="inline-block bg-c2 text-c10 text-left text-sm font-medium cursor-pointer px-2 py-1 rounded">Category 6</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>

        </div>

    );
}

export default SideComponent;