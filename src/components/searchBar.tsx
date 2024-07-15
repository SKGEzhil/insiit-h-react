import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchBar(props: { setMobileMenu?: (bool: boolean) => void }) {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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