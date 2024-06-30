import React from "react";
import {useNavigate} from "react-router-dom";

function TagComponent({tag}) {

    const navigate = useNavigate();


    const handleClick = () => {
        console.log(tag);
        navigate(`/search?tags=${tag.toLowerCase()}`)
    }

    return (
        <span
            onClick={handleClick}
            className="inline-block bg-bg-5 text-gray-300 text-sm font-medium px-2 py-1 rounded">
            {tag}
        </span>
    );
}

export default TagComponent;