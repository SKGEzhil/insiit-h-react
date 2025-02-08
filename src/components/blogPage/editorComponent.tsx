
import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../editorTools.js";
import '../../App.css'

/**
 * Editor component is used to render the editorjs (Rich Text Editor)
 *
 * @method EditorComponent
 * @param {Object} data Data in the Editor
 * @param {string} data.time
 * @param {Array} data.blocks
 * @param {string} data.version
 * @param {function} onChange Function to handle data change
 * @param editorblock
 */
const EditorComponent = ({ data, onChange, editorblock }) => {
    const ref = useRef();
    //Initialize editorjs
    useEffect(() => {
        //Initialize editorjs if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorblock,
                minHeight: 50,
                tools: EDITOR_JS_TOOLS,
                data: data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                    console.log(data);
                },
            });
            ref.current = editor;
        }

        //Add a return function to handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);
    return <div id={editorblock} />;
};

export default memo(EditorComponent);