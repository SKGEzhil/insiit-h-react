
import {useEffect, useState} from "react";
import EditorComponent from "../components/editorComponent.tsx";
import ElementRenderer from "../components/elementRenderer.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addSectionThunk, deleteSectionThunk, getSectionsThunk} from "../store/actions/academicPageActions.ts";
import {jsonToGraphqlString} from "../utils/graphqlStringConversion.ts";
import {useAuth} from "../context/authContext.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {FaTrash} from "react-icons/fa6";

function AcademicsPage() {


    const INITIAL_DATA = {
        "time": 1719975272222,
        "blocks": [],
        "version": "2.29.1"
    }

    const [data, setData] = useState(INITIAL_DATA);

    const {profile} = useAuth();

    const [isEditorVisible, setIsEditorVisible] = useState(false);

    const sections = useSelector((state) => state.academicPageSlice.sections)
    const [count, setCount] = useState(0);

    const {showToast} = useShowToast();

    useEffect(() => {
        setCount(count + 1);
        console.log('Count', count);
        dispatch(getSectionsThunk());
    }, []);

    const dispatch = useDispatch<never>();

    return (
        <div>
            {
                profile?.role === 'admin' ? <ProtectedButton onClick={() => {
                    setIsEditorVisible(!isEditorVisible);
                    }}>{
                    isEditorVisible ? 'Cancel' : 'Add Section'
                }</ProtectedButton> : null

            }

            {

                isEditorVisible &&
                <>
                    <div className="flex justify-center ">
                        <div className='bg-bg-3 rounded-2xl min-h-64 w-full mx-56'>
                            <EditorComponent data={data} onChange={setData} editorblock="editorjs-container"/>
                        </div>
                    </div>
                    <button onClick={() => {
                        // dispatch(addSection(BlockModel.fromJson(data)))
                        console.log('DATA', data)
                        dispatch(addSectionThunk({
                            time: data.time.toString(),
                            blocks: jsonToGraphqlString(data.blocks),
                            version: data.version
                        })).then((result) => {
                            result.error ? showToast({
                                status: 'error',
                                message: result.error.message
                            }) : showToast({
                                status: 'success',
                                message: 'Section added successfully'
                            })
                        })
                        setIsEditorVisible(false)
                    }}>
                        Save
                    </button>
                </>

            }


            {
                sections ?
                    sections.map((section) => {
                        return (
                            <div>

                                {
                                    profile?.role === 'admin' &&
                                    <div className="flex justify-end mx-56">
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this section?')) {
                                                    dispatch(deleteSectionThunk({id: section.id})).then((result) => {
                                                        result.error ? showToast({
                                                            status: 'error',
                                                            message: result.error.message
                                                        }) : showToast({
                                                            status: 'success',
                                                            message: 'Section deleted successfully'
                                                        })
                                                        dispatch(getSectionsThunk());
                                                    })
                                                }
                                            }}
                                        >
                                            <FaTrash/>
                                        </button>
                                    </div>
                                }
                                <ElementRenderer data={section}/>
                            </div>
                        )
                    }) : null
            }


        </div>
    );
}

export default AcademicsPage;