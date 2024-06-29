import ProtectedButton from "./protectedButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {navigateTo} from "../store/slices/navigationSlice.ts";
import {useNavigate} from "react-router-dom";

function HeaderComponent() {



    const currentPage = useSelector((state) => state.navigationSlice.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
      <div className="bg-bg-2 text-center z-20 my-0 p-3 fixed w-full">
          <div className="flex w-full justify-between items-center">
              <div className="mx-4">
                  <h1 className="text-3xl text-left font-bold">InsIIT</h1>
                  <p className="text-xl text-left">All the Insights you need!</p>
              </div>
              <div>
                  <ProtectedButton onClick={() => {
                  }}>
                      Login
                  </ProtectedButton>
              </div>
          </div>
          <div className="flex justify-center">
              <button
                  onClick={() => {
                     dispatch(navigateTo("home"));
                     navigate("/forum");
                     console.log('CURRENT PAGE', currentPage)
                  }}
                  className={currentPage === 'home' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                  Public Forum
              </button>
              <button
                  onClick={() => {
                      dispatch(navigateTo("ask"));
                      navigate("/");
                      console.log('CURRENT PAGE', currentPage)
                  }}
                  className={currentPage === 'ask' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                  FAQs
              </button>
              <button
                  onClick={() => {
                      dispatch(navigateTo("insights"));
                      navigate("/");
                      console.log('CURRENT PAGE', currentPage)
                  }}
                  className={currentPage === 'insights' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                  Insights
              </button>
              <button
                  onClick={() => {
                      dispatch(navigateTo("josaa"));
                      navigate("/");
                      console.log('CURRENT PAGE', currentPage)
                  }}
                  className={currentPage === 'josaa' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                  JoSAA
              </button>
              <button
                  onClick={() => {
                      dispatch(navigateTo("about"));
                      navigate("/");
                      console.log('CURRENT PAGE', currentPage)
                  }}
                  className={currentPage === 'about' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                  About Us
              </button>
          </div>

      </div>
  );
}

export default HeaderComponent;