import {QuestionModel} from "../models/questionModel.ts";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../store/slices/paginatorSlice.ts";

function PaginatorComponent(props: {question: QuestionModel, page: string}) {

    const limit = 5;

    const currentPage = useSelector((state) => state.paginatorSlice.page);
    const dispatch = useDispatch();

  return (
      props.question ?
          props.question.totalQues ?
    <div className="flex justify-center items-center">
      <button
          className={currentPage === 1 ? 'hidden' : ''}
          onClick={() => {
              props.page === 'home' ?
                  dispatch(setPage(currentPage-1)) : null;
          }}
      >
          Previous</button>
        {
                           props.question.totalQues/limit > 5 ?
                [...Array(5).keys()].map((i) => {
                    return <button
                        onClick={() => {
                            props.page === 'home' ?
                                dispatch(setPage(i+1)) : null;
                        }}
                        key={i}>{i+1}</button>
                }) :

            [...Array(Math.ceil(props.question.totalQues/limit)).keys()].map((i) => {
                return <button
                    onClick={() => {
                        props.page === 'home' ?
                            dispatch(setPage(i+1)) : null;
                    }}
                    key={i}>{i+1}</button>
            })
        }
        <p>...</p>
        {
                props.question.totalQues/limit > 5 ?
                    <button
                        onClick={() => {
                            props.page === 'home' ?
                                dispatch(setPage(Math.ceil(props.question.totalQues/limit))) : null;
                        }}
                    >{Math.ceil(props.question.totalQues/limit)}
                    </button>
            : ''
        }
      <button
          className={currentPage === Math.ceil(props.question.totalQues/limit) ? 'hidden' : ''}
            onClick={() => {
                props.page === 'home' ?
                    dispatch(setPage(currentPage+1)) : null;
            }}
      >Next
      </button>
    </div> : '' : ''
  );
}

export default PaginatorComponent;