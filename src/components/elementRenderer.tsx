function ElementRenderer(props: {data: any}) {

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

const Paragraph = ({data}) => {
    return <p className='mb-6' style={{textAlign: data.align}} dangerouslySetInnerHTML={{__html: data.text}}/>;
};

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

const Header = ({data}) => {
    const Tag = `h${data.level}`;
    return <Tag className='mt-6 mb-3 leading-tight' style={{textAlign: data.align}} dangerouslySetInnerHTML={{__html: data.text}}/>;
};

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

const Image = ({data}) => {
    return <img className='my-3' src={data.file.url} alt='altimage'/>;
}

export default ElementRenderer;