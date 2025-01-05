import HeroComponent from "../components/homePage/heroComponent.tsx";
import FeaturesComponent from "../components/homePage/featuresComponent.tsx";
import FaqSection from "../components/homePage/faqSection.tsx";
import FooterComponent from "../components/homePage/footerComponent.tsx";

/**
 * Home page component.\
 * Starting page of the website.
 * @method HomePage
 * @return JSX.Element
 */
function HomePage() {
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