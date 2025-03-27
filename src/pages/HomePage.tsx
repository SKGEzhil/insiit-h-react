import HeroComponent from "../components/homePage/heroComponent.tsx";
import FeaturesComponent from "../components/homePage/featuresComponent.tsx";
import FaqSection from "../components/homePage/faqSection.tsx";
import FooterComponent from "../components/footerComponent.tsx";
import {useEffect} from "react";
import {getFaqsThunk} from "../store/actions/faqActions.ts";
import {useDispatch} from "react-redux";

/**
 * Home page component.\
 * Starting page of the website.
 * @memberof Pages
 * @return {JSX.Element}
 */
function HomePage() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFaqsThunk({page: 1, limit: 3}));
    }, [dispatch]);

  return (
    <div>
        <HeroComponent/>
        <FeaturesComponent/>
        <FaqSection/>
        <FooterComponent/>
    </div>
  );
}

export default HomePage;