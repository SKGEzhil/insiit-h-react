import {useState} from "react";
import {useDispatch} from "react-redux";
import {searchQuestionThunk} from "../store/actions/questionActions.ts";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch<never>();

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
                dispatch(searchQuestionThunk({searchTerm: searchTerm})) : console.log('empty search');
            }}
        >Search</button>
    </div>
  );
}

export default SearchBar;