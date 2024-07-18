import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

/**
 * PaginatorComponent is a functional component that renders a paginator.
 * @returns {React.Element} The rendered paginator.
 */
function PaginatorComponent() {


    const currentPage = useSelector((state) => state.paginatorSlice.page);

    const navigate = useNavigate();


    /**
     * Function to update only the page query parameter.
     * @method updatePageParam
     * @param {number} newPage - The new page number.
     */
    const updatePageParam = (newPage: number) => {
        /** @type {URLSearchParams} The current query parameters. */
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