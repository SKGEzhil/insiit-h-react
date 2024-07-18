import {useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 * `SearchBar` is a React component that renders a search bar.
 *
 * @param {Object} props - The properties for the search bar.
 * @param {function} props.setMobileMenu - The function to show and hide menu while using mobile screen.
 *
 * @returns {JSX.Element} The search bar element.
 */
function SearchBar(props: { setMobileMenu?: (bool: boolean) => void }) {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Navigates to the search page with the given search term.
     * - Navigates to `/search?query=${searchTerm}`
     *
     * @method search
     * @param {string} searchTerm - The search term.
     */
    const search = (searchTerm: string) => {
        console.log(searchTerm);
        if (searchTerm) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            props.setMobileMenu && props.setMobileMenu(false);
        } else {
            console.log('empty search');
        }
    }

    return (
        <div className="flex w-full min-w-64 p-4">
            <div className="flex w-full bg-c1 rounded-2xl border border-c8/[.2] ">
                <input
                    className="w-full p-2 bg-c1 focus:outline-none rounded-2xl "
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        event.key === 'Enter' &&
                        search(searchTerm)
                    }}
                />

                <button
                    className="bg-primary text-white p-2 ml-2 rounded-xl"
                    onClick={() => search(searchTerm)}
                >Search
                </button>
            </div>


        </div>
    );
}

export default SearchBar;