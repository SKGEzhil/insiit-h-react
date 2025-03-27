import {useLocation, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";

/**
 * TagComponent is a React component that renders a tag.
 *
 * @memberOf Components
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.tag - The tag to be rendered.
 * @returns {JSX.Element} The rendered tag component.
 */
function TagComponent({tag} : {tag: string}) {
    const navigate = useNavigate();
    const location = useLocation();

    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    const tags = getQueryParams().get('tags')?.split(',') || []
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

        // If the current path is forum or faqs, navigate to the new path or else navigate to forum with the new tags
        const tagPaths = ['forum', 'faq']
        const currentPath = location.pathname.split('/')[1]
        if(tagPaths.includes(currentPath)) {
            navigate(newPath);
        } else {
            navigate(`/forum?tags=${newTags}`);
        }
    };

    const handleClick = () => {
        updateTagParam(tag)
    }

    const isSelected = tags.includes(tag.toLowerCase());
    
    // Generate a consistent color for each tag based on the tag text
    const generateTagColor = (tag: string) => {
        // Simple hash function to generate a number from a string
        const hash = tag.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        
        // A list of professional color combinations
        const colors = [
            { bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:bg-blue-100', border: 'border-blue-200' },
            { bg: 'bg-indigo-50', text: 'text-indigo-700', hover: 'hover:bg-indigo-100', border: 'border-indigo-200' },
            { bg: 'bg-violet-50', text: 'text-violet-700', hover: 'hover:bg-violet-100', border: 'border-violet-200' },
            { bg: 'bg-emerald-50', text: 'text-emerald-700', hover: 'hover:bg-emerald-100', border: 'border-emerald-200' },
            { bg: 'bg-amber-50', text: 'text-amber-700', hover: 'hover:bg-amber-100', border: 'border-amber-200' },
            { bg: 'bg-slate-50', text: 'text-slate-700', hover: 'hover:bg-slate-100', border: 'border-slate-200' },
            { bg: 'bg-teal-50', text: 'text-teal-700', hover: 'hover:bg-teal-100', border: 'border-teal-200' },
            { bg: 'bg-sky-50', text: 'text-sky-700', hover: 'hover:bg-sky-100', border: 'border-sky-200' },
        ];
        
        // Use the hash to select a color
        const colorIndex = Math.abs(hash) % colors.length;
        return colors[colorIndex];
    };
    
    const tagColor = generateTagColor(tag);

    return (
        <motion.span
            onClick={handleClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-block px-2.5 py-1 text-sm rounded-md cursor-pointer
                ${tagColor.bg} ${tagColor.text} ${tagColor.hover} transition-all duration-200
                ${isSelected ? `border ${tagColor.border}` : ''}`
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {tag}
        </motion.span>
    );
}

export default TagComponent;