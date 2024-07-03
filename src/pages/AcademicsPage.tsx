
import {useEffect, useState} from "react";
import {EditorState} from "draft-js";
import EditorComponent from "../components/editorComponent.tsx";
import ElementRenderer from "../components/elementRenderer.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addSection} from "../store/slices/academicPageSlice.ts";
import {BlockModel} from "../models/blockModel.ts";
import {addSectionThunk, getSectionsThunk} from "../store/actions/academicPageActions.ts";
import {jsonToGraphqlString} from "../utils/graphqlStringConversion.ts";

function AcademicsPage() {


    const INITIAL_DATA = {
        "time": 1719975272222,
        "blocks": [],
        "version": "2.29.1"
    }

    const [data, setData] = useState(INITIAL_DATA);

    const sections = useSelector((state) => state.academicPageSlice.sections)
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1);
        console.log('Count', count);
        dispatch(getSectionsThunk());
    }, []);

    const dispatch = useDispatch<never>();

    return (
        <div>

            {
                sections ?
                sections.map((section) => {
                    return (
                        <ElementRenderer data={section}/>
                    )
                }) : null
            }

            <div className="flex justify-center ">
                <div className='bg-bg-3 rounded-2xl min-h-64 w-full max-w-4xl'>
                    <EditorComponent data={data} onChange={setData} editorblock="editorjs-container"/>
                </div>
            </div>
            <button onClick={() => {
                // dispatch(addSection(BlockModel.fromJson(data)))
                dispatch(addSectionThunk({time: data.time.toString(), blocks: jsonToGraphqlString(data.blocks), version: data.version}))
            }}>
                Save
            </button>

        </div>
    );
}

export default AcademicsPage;