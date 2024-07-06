import {useState} from "react";
import {useDispatch} from "react-redux";
import {searchQuestionThunk} from "../store/actions/questionActions.ts";
import {useNavigate} from "react-router-dom";

function SearchBar(props: {setMobileMenu?: (bool) => void}) {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="flex w-full min-w-64 p-4">
      <input
          className="w-full p-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
        <button
            onClick={() => {
                console.log(searchTerm);
                if(searchTerm) {
                    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
                    props.setMobileMenu && props.setMobileMenu(false);
                } else {
                    console.log('empty search');
                }
            }}
        >Search</button>
    </div>
  );
}

export default SearchBar;