import {useNavigate} from "react-router-dom";

/**
 * PaginatorComponent is a functional component that renders a paginator.
 *
 * @memberOf Components
 * @param {Object} props - The properties for the paginator.
 * @param {number} props.currentPage - The current page number.
 * @returns {React.Element} The rendered paginator.
 */
function PaginatorComponent(props: {currentPage: number}) {


    // const currentPage = useSelector((state) => state.paginatorSlice.page);

    const navigate = useNavigate();

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
          className={props.currentPage === 1 ? 'hidden text-c8' : 'text-c8'}
          onClick={() => {
              updatePageParam(props.currentPage-1);
          }}
      >
          Previous</button>

      <button
            className="text-c8"
            onClick={() => {
                updatePageParam(props.currentPage+1);
            }}
      >Next
      </button>
    </div>
  );
}

export default PaginatorComponent;