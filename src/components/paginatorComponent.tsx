import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function PaginatorComponent() {


    const currentPage = useSelector((state) => state.paginatorSlice.page);

    const navigate = useNavigate();


    // Function to update only the page query parameter
    const updatePageParam = (newPage: number) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', newPage.toString());

        // Construct the new path
        const newPath = `${location.pathname}?${queryParams.toString()}`;

        // Navigate to the new path
        navigate(newPath);
    };

  return (
    <div className="flex justify-center items-center">
      <button
          className={currentPage === 1 ? 'hidden text-c8' : 'text-c8'}
          onClick={() => {
              updatePageParam(currentPage-1);
          }}
      >
          Previous</button>

      <button
            className="text-c8"
            onClick={() => {
                updatePageParam(currentPage+1);
            }}
      >Next
      </button>
    </div>
  );
}

export default PaginatorComponent;