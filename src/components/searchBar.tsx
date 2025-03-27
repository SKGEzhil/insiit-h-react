import {useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 * `SearchBar` is a React component that renders a search bar.
 *
 * @memberOf Components
 * @param {Object} props - The properties for the search bar.
 * @param {function} props.setMobileMenu - The function to show and hide menu while using mobile screen.
 * @param {function} props.onSearch - The function to be executed when the search button is clicked.
 *
 * @returns {JSX.Element} The search bar element.
 */
function SearchBar(props: { setMobileMenu?: (bool: boolean) => void, onSearch: (searchTerm: string) => void }) {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const search = (searchTerm: string) => {
        if (searchTerm) {
            props.onSearch(searchTerm);
            props.setMobileMenu && props.setMobileMenu(false);
        }
    }

    return (
        <div className="flex w-full min-w-64 p-4">
            <div className="flex w-full rounded-2xl border border-b8/[.2] ">
                <input
                    className="w-full focus:outline-none rounded-2xl "
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
                    className=" text-b10 border-l border-b8/[.2] px-4 hover:bg-c2 rounded-r-2xl mr-0 my-0"
                    onClick={() => search(searchTerm)}
                >Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;