/**
 * @namespace Elements
 */

/**
 * @typedef {Object} Block - A block has specified the type and the data to be rendered in
 * {@link ElementRenderer}
 * @property {string} type - The type of the block.
 * @property {any} data - The data to be rendered in the block.
 */
type Block = {
    type: string,
    data: any
}

/**
 * ElementRenderer is a functional component that renders different types of blocks.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Block[]} props.data.blocks - The blocks to be rendered.
 *
 * @example
 *
 * const data = {
 *   blocks: [
 *     { type: 'paragraph', data: { text: 'Hello, world!', align: 'center' } },
 *     { type: 'header', data: { text: 'Welcome!', level: 1, align: 'left' } },
 *     // More blocks...
 *   ]
 * };
 *
 * return <ElementRenderer data={data} />;
 *
 * @returns {React.Element} The rendered blocks.
 */

function ElementRenderer(props: {data: {blocks: Block[]}}) {

    return (
        <div className="flex justify-center">
            <div className="w-full mx-2  my-2 bg-white px-8 rounded-xl">
                {
                    props.data.blocks.map((block, index) => {
                    switch (block.type) {
                        case 'paragraph':
                            return <Paragraph key={index} data={block.data}/>;
                        case 'header':
                            return <Header key={index} data={block.data}/>;
                        case 'list':
                            return <List key={index} data={block.data}/>;
                        case 'image':
                            return <Image key={index} data={block.data}/>;
                        case 'raw':
                            return <div key={index} dangerouslySetInnerHTML={{__html: block.data.html}}/>;
                        case 'table':
                            return <Table key={index} data={block.data}/>;

                        // Add cases for other block types
                        default:
                            return null;
                    }
                })}
            </div>
        </div>

    )
}

/**
 * Paragraph is a functional component that renders a paragraph block.
 * @memberof Elements
 * @param {Object} data - The data for the paragraph block.
 * @param {string} data.text - The text content of the paragraph.
 * @param {string} data.align - The alignment of the paragraph.
 *
 * @returns {React.Element} The rendered paragraph block.
 */
const Paragraph = ({data}) => {
    return <p className='mb-6' style={{textAlign: data.align}} dangerouslySetInnerHTML={{__html: data.text}}/>;
};

/**
 * Table is a functional component that renders a table block.
 *
 * @memberof Elements
 * @param {Object} data - The data for the table block.
 * @param {string[][]} data.content - The content of the table. format: [row][column]
 *
 *
 * @returns {React.Element} The rendered table block.
 */
const Table = ({data}) => {
    return (
        <table className='mb-6'>
            <thead>
                <tr>
                    {
                        data.content[0].map((item, index) => {
                            return <th key={index} className='border border-gray-400'>{item}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.content.slice(1).map((row, index) => {
                        return (
                            <tr key={index}>
                                {
                                    row.map((item, index) => {
                                        return <td key={index} className='border border-gray-400'>{item}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

/**
 * Header is a functional component that renders a header block.
 *
 * @memberof Elements
 * @param {Object} data - The data for the header block.
 * @param {string} data.text - The text content of the header.
 * @param {number} data.level - The level of the header.
 * @param {string} data.align - The alignment of the header.
 *
 * @returns {React.Element} The rendered header block.
 */
const Header = ({data}) => {
    const Tag = `h${data.level}`;
    return <Tag className='mt-6 mb-3 leading-tight' style={{textAlign: data.align}} dangerouslySetInnerHTML={{__html: data.text}}/>;
};


/**
 * List is a functional component that renders a list block.
 *
 * @memberof Elements
 * @param {Object} data - The data for the list block.
 * @param {string[]} data.items - The items in the list.
 *
 * @returns {React.Element} The rendered list block.
 */
const List = ({data}) => {
    return (
        <ul className='mb-6 pl-6'>
            {
                data.items.map((item, index) => {
                    return <li className='mb-2 leading-relaxed' key={index} dangerouslySetInnerHTML={{__html: item}}/>
                })
            }
        </ul>
    );
};

/**
 * Image is a functional component that renders an image block.
 *
 * @memberof Elements
 * @param {Object} data - The data for the image block.
 * @param {string} data.file.url - The URL of the image.
 *
 * @returns {React.Element} The rendered image block.
 */
const Image = ({data}) => {
    return <img className='my-3' src={data.file.url} alt='altimage'/>;
}

export default ElementRenderer;