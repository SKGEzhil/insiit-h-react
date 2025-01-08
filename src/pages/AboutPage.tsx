import FooterComponent from "../components/homePage/footerComponent.tsx";


function AboutPage() {

    const content1 = "The most surprising thing about IIT Hyderabad is its futuristic campus, built with a blend of modern architecture and sustainability. The sprawling campus is not only a hub for cutting-edge research but also a place where innovation meets nature. Students here share their academic journey alongside scenic views, serene lakes, and a vibrant community of peers.\n" +
        "\n" +
        "Another unique aspect of IIT Hyderabad is the flexibility of its curriculum, where students can tailor their academic experience by choosing interdisciplinary courses, electives, and projects that match their interests and career goals.\n" +
        "\n" +
        "But these are just two of the countless little things that make IIT Hyderabad special. From our collaborative research culture to our thriving student activities, there’s so much more to discover about life here."


    const content2 = "\n" +
        "This website was created to bridge the gap between what we, the students and alumni, know and what" +
        " aspirants want to learn. It’s a place where curious minds can ask questions, and our community of" +
        " students will share insights, experiences, and guidance to help you prepare for an exciting" +
        " journey at IIT Hyderabad."

    const imageSrc = "https://camo.githubusercontent.com/ca1d5fd586913719c7d708c7ba7cdc081658f44acdf98ced8ccaf98038912d24/68747470733a2f2f692e6962622e636f2f634c444c62664e2f494d472d323333382d322e6a7067"

  return (
      <>
          <div className={`flex justify-center`}>
              <div className={`max-w-5xl`}>
                  <h1 className={`mb-6`}>About Us</h1>
                  <p className={`whitespace-pre-wrap`}>{content1}</p>
                  <p className={`whitespace-pre-wrap`}>
                      {content2}
                  </p>

                  {/*About developers*/}
                  <div>
                      <h2 className={`mt-6 mb-6`}>Developers</h2>
                      <div className={`flex justify-center items-center gap-5`}>
                          <DeveloperCard imageSrc={imageSrc} name={"Karthik Gnana Ezhil S"}/>
                          <DeveloperCard imageSrc={imageSrc} name={"Karthik Gnana Ezhil S"}/>
                          <DeveloperCard imageSrc={imageSrc} name={"Karthik Gnana Ezhil S"}/>
                      </div>
                  </div>
              </div>
          </div>
          <div className={`mt-12`}>
                <FooterComponent/>
          </div>
      </>
  );
}

const DeveloperCard = ({ imageSrc, name }) => {
    return (
        <div className="flex flex-col w-60 flex-wrap items-center bg-white p-4 rounded-lg border">
            <div className="w-48 h-48 rounded-full overflow-hidden">
                <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-xl font-semibold">{name}</p>
        </div>
    );
};


export default AboutPage;