import SearchPage from "../pages/SearchPage.tsx";
import ProtectedButton from "../components/protectedButton.tsx";
import {useNavigate} from "react-router-dom";
import MediaQuery from "react-responsive";

function RelatedQnsLayout() {

    const navigate = useNavigate();

  return (
      <div className="flex justify-center">
          <div className="w-full max-w-5xl">
              <div className="flex flex-row items-center justify-between">
                  <p className="text-left font-bold text-xl mx-6">Is your question similar to any of these questions ?</p>
                  <MediaQuery minWidth={640}>
                      <ProtectedButton onClick={() => {
                          navigate('/ask')
                      }}>
                          Ask new question
                      </ProtectedButton>
                  </MediaQuery>
              </div>
              <SearchPage/>
              <div className="tablet:hidden">
                  <ProtectedButton onClick={() => {
                      navigate('/ask')
                  }}>
                      Ask new question
                  </ProtectedButton>
              </div>

          </div>
      </div>
  );
}

export default RelatedQnsLayout;