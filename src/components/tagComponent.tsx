import React from "react";
import {useLocation, useNavigate} from "react-router-dom";


function TagComponent({tag}) {

    const navigate = useNavigate();

    const location = useLocation();

    const getQueryParams = () => {
        console.log(location)
        return new URLSearchParams(location.search);
    };

    const tags = getQueryParams().get('tags')?.split(',') || []

    const updatePageParam = (newTag: string) => {
        const queryParams = new URLSearchParams(location.search);
        const currentTags = queryParams.get('tags') || '';
        const tagList = currentTags ? currentTags.split(',') : [];

        if(!tagList.includes(newTag.toLowerCase())) {
            tagList.push(newTag.toLowerCase());
        } else {
            const index = tagList.indexOf(newTag.toLowerCase());
            tagList.splice(index, 1);
        }

        const newTags = encodeURIComponent(tagList.join(','));

        navigate(`/search?tags=${newTags}`);
    };

    const handleClick = () => {
        console.log(tag);
        updatePageParam(tag)
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