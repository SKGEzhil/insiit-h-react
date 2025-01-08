import {useNavigate} from "react-router-dom";
import {base_route} from "../../routes.tsx";

function HeroComponent() {

    const navigate = useNavigate();

  return (
      <>
              <div className={`flex justify-center items-center pt-10`}>
                  <div className={`text-left w-96`}>
                      <h1>InsIIT - The insight to all your questions</h1>
                      <p>This is a website by IITH students for aspirants that gives easy
                          access to reliable information to oncoming freshers,
                          and help make the right decision</p>

                      {/*TODO: Add a button to ask a question*/}
                      <button
                          onClick={() => {
                              navigate(`${base_route}/ask`);
                          }}
                          className={`bg-black text-white rounded-md mt-4 mx-0 px-4`}>Ask your Question</button>
                  </div>
                  <div className={`pl-10`}>
                      <img src="https://via.placeholder.com/400x250" alt="IITH Logo"/>
                  </div>
              </div>
      </>
  );
}

export default HeroComponent;