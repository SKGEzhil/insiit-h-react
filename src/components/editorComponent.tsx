
import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../editorTools.js";
import '../App.css'

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