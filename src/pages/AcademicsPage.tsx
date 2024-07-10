
import {useEffect, useState} from "react";
import EditorComponent from "../components/editorComponent.tsx";
import ElementRenderer from "../components/elementRenderer.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    addSectionThunk,
    deleteSectionThunk,
    editSectionThunk,
    getSectionsThunk
} from "../store/actions/academicPageActions.ts";
import {jsonToGraphqlString} from "../utils/graphqlStringConversion.ts";
import {useAuth} from "../context/authContext.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useShowToast} from "../context/toastContext.tsx";
import {FaTrash} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";

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
    const [isEditingMode, setIsEditingMode] = useState<boolean[]>(sections.map(() => false));

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
                        <div className='bg-white rounded-2xl min-h-64 w-full mx-2 tablet:max-w-5xl'>
                            <EditorComponent data={data} onChange={setData} editorblock="editorjs-container"/>
                        </div>
                    </div>
                    <ProtectedButton onClick={() => {
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
                                message: 'Action sent for review'
                            })
                        })
                        setIsEditorVisible(false)
                    }}>
                        Save
                    </ProtectedButton>
                </>

            }


            {
                sections ?
                    sections.map((section, index) => {
                        return (
                            <div>

                                {
                                    profile?.role === 'admin' &&
                                    <div className="flex justify-center mx-2">
                                        <div className='tablet:max-w-5xl w-full flex justify-end'>
                                            <button
                                                onClick={() => {

                                                    setData({
                                                        time: section.time,
                                                        blocks: section.blocks,
                                                        version: section.version
                                                    })

                                                    const newIsEditingMode = [...isEditingMode];
                                                    newIsEditingMode[index] = true;
                                                    setIsEditingMode(newIsEditingMode);

                                                }}
                                            >
                                                <FaEdit className="text-c8"/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this section?')) {
                                                        dispatch(deleteSectionThunk({id: section.id})).then((result) => {
                                                            result.error ? showToast({
                                                                status: 'error',
                                                                message: result.error.message
                                                            }) : showToast({
                                                                status: 'success',
                                                                message: 'Action sent for review'
                                                            })
                                                            dispatch(getSectionsThunk());
                                                        })
                                                    }
                                                }}
                                            >
                                                <FaTrash className="text-c8"/>
                                            </button>
                                        </div>
                                    </div>
                                }

                                {

                                    isEditingMode[index] &&
                                    <>
                                        <ProtectedButton onClick={() => {
                                            const newIsEditingMode = [...isEditingMode];
                                            newIsEditingMode[index] = false;
                                            setIsEditingMode(newIsEditingMode);
                                        }}>
                                            Cancel
                                        </ProtectedButton>
                                        <div className="flex justify-center ">
                                            <div className='bg-white rounded-2xl min-h-64 w-full mx-2 tablet:max-w-5xl'>
                                                <EditorComponent data={data} onChange={setData}
                                                                 editorblock="editorjs-container"/>
                                            </div>
                                        </div>
                                        <ProtectedButton onClick={() => {
                                            console.log('DATA', data)
                                            dispatch(editSectionThunk({
                                                id: section.id,
                                                blocks: jsonToGraphqlString(data.blocks),
                                            })).then((result) => {
                                                result.error ? showToast({
                                                    status: 'error',
                                                    message: result.error.message
                                                }) : showToast({
                                                    status: 'success',
                                                    message: 'Action sent for review'
                                                })
                                                dispatch(getSectionsThunk());
                                            })
                                            const newIsEditingMode = [...isEditingMode];
                                            newIsEditingMode[index] = false;
                                            setIsEditingMode(newIsEditingMode);
                                        }}>
                                            Update Changes
                                        </ProtectedButton>
                                    </>

                                }

                                {

                                    !isEditingMode[index] &&
                                    <div className='flex justify-center'>
                                        <div className='tablet:max-w-5xl w-full'>
                                            <ElementRenderer data={section}/>
                                        </div>
                                    </div>

                                }
                            </div>
                        )
                    }) : null
            }


        </div>
    );
}

export default AcademicsPage;