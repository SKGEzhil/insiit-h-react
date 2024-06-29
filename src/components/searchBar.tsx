import {useState} from "react";
import {useDispatch} from "react-redux";
import {searchQuestionThunk} from "../store/actions/questionActions.ts";
import {useNavigate} from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
        <button
            onClick={() => {
                console.log(searchTerm);
                searchTerm ?
                    navigate(`/search?query=${encodeURIComponent(searchTerm)}`) : console.log('empty search');
            }}
        >Search</button>
    </div>
  );
}

export default SearchBar;