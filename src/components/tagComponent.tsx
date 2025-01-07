import {useLocation, useNavigate} from "react-router-dom";

/**
 * TagComponent is a React component that renders a tag.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.tag - The tag to be rendered.
 * @returns {JSX.Element} The rendered tag component.
 */
function TagComponent({tag} : {tag: string}) {

    const navigate = useNavigate();

    const location = useLocation();

    const getQueryParams = () => {
        // console.log(location)
        return new URLSearchParams(location.search);
    };

    const tags = getQueryParams().get('tags')?.split(',') || []

    /**
     * Function to update only the tags query parameter.
     * @method updateTagParam
     * @param {string} newTag - The new tag to be added to the parameters.
     */
    const queryParams = new URLSearchParams(location.search);

    const updateTagParam = (newTag: string) => {
        const currentTags = queryParams.get('tags') || '';
        const tagList = currentTags ? currentTags.split(',') : [];

        if(!tagList.includes(newTag.toLowerCase())) {
            tagList.push(newTag.toLowerCase());
        } else {
            const index = tagList.indexOf(newTag.toLowerCase());
            tagList.splice(index, 1);
        }

        const newTags = tagList.join(',');

        queryParams.set('tags', `${newTags}`);

        const newPath = `${location.pathname}?${queryParams.toString()}`;

        // Navigate to the new path
        // If the current path is forum or faqs, navigate to the new path or else navigate to forum with the new tags
        const tagPaths = ['forum', 'faqs']
        const currentPath = location.pathname.split('/')[1]
        if(tagPaths.includes(currentPath)) {
            navigate(newPath);
        } else {
            navigate(`/forum?tags=${newTags}`);
        }

    };

    const handleClick = () => {
        console.log(tag);
        updateTagParam(tag)
    }

    return (
        <>
            <span
                onClick={handleClick}
                className={`inline-block bg-c2 text-c10 text-sm font-medium cursor-pointer px-2 py-1 rounded ${tags.includes(tag.toLowerCase()) ? 'border-2 border-primary' : ''}`}>
            {tag}
        </span>
        </>

    );
}

export default TagComponent;