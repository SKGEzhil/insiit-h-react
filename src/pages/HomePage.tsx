import HeroComponent from "../components/homePage/heroComponent.tsx";
import FeaturesComponent from "../components/homePage/featuresComponent.tsx";
import FaqSection from "../components/homePage/faqSection.tsx";

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
    </div>
  );
}

export default HomePage;