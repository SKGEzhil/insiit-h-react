import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchBar(props: {setMobileMenu?: (bool) => void}) {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = (searchTerm) => {
      console.log(searchTerm);
      if(searchTerm) {
          navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
          props.setMobileMenu && props.setMobileMenu(false);
      } else {
          console.log('empty search');
      }
  }

  return (
    <div className="flex w-full min-w-64 p-4">
      <input
          className="w-full p-2 bg-bg-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
          onKeyDown={() => {search(searchTerm)}}
      />
        <button
            onClick={() => search(searchTerm)}
        >Search</button>
    </div>
  );
}

export default SearchBar;