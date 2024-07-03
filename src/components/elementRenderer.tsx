function ElementRenderer(props: {data: any}) {

    return (
        <div className="flex justify-center">
            <div className="w-full mx-56 my-2 bg-bg-3 px-8 rounded-xl">
                {
                    props.data.blocks.map((block, index) => {
                    switch (block.type) {
                        case 'paragraph':
                            return <Paragraph key={index} data={block.data}/>;
                        case 'header':
                            return <Header key={index} data={block.data}/>;
                        case 'list':
                            return <List key={index} data={block.data}/>;
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
export default ElementRenderer;