import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@coolbytes/editorjs-paragraph';
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@coolbytes/editorjs-header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import FontSize from 'editorjs-inline-font-size-tool'
import FontFamily from 'editorjs-inline-font-family-tool'
import InlineList from "editorjs-inlinelist";


export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: {
        class: List,
        inlineToolbar: true,
    },
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: 'http://65.0.8.179:4000/upload', // Your backend file uploader endpoint
                // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
        }
    },
    raw: Raw,
    header: {
        class: Header,
        config: {
            placeholder: 'Header'
        },
        inlineToolbar: true,
    },
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    fontSize: FontSize,
    paragraph: {
        class: Paragraph,
        config: {
            placeholder: 'Start Typing...',
            preserveBlank: false,
            alignTypes: ['left', 'center', 'right', 'justify'],
            defaultAlignType: 'left'
        }
    },
    fontFamily: FontFamily,
    inlineList: InlineList,
}

