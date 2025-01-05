

function FeaturesComponent() {
  return (
      <>
          <div className={`mt-16`}>
              <div>
                  <h2>Features</h2>
                  <div className={`flex justify-center gap-5 mt-10`}>
                      <FeatureCard
                          title="Public Forum"
                          description="This is a place where students can ask questions about the college happenings and can get answers from the IITH community."
                          linkText="Learn more"
                          color="bg-blue-500"
                          linkHref="#"
                      />
                      <FeatureCard
                          title="Insights"
                          description="More information about the college, the courses offered and about the clubs. This will help students make an informed decision."
                          linkText="Learn more"
                            color="bg-red-500"
                          linkHref="#"
                      />
                      <FeatureCard
                          title="Rank Prediction"
                          description="Here, students can predict their seat availability based on their rank and the previous year's data."
                          linkText="Learn more"
                            color="bg-green-500"
                          linkHref="#"
                      />
                      <FeatureCard
                          title="First Feature"
                          description="This is a description of the first feature of our website. We are going to briefly outline what this feature does."
                          linkText="Learn more"
                            color="bg-yellow-500"
                          linkHref="#"
                      />
                  </div>

              </div>
          </div>
      </>

  );
}

import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, linkText, linkHref, color }) => {
    return (
        <div className="relative p-6 bg-gray-100 shadow-lg rounded-2xl w-80 text-left">
            <div className={`absolute -top-4 left-6 w-12 h-12 ${color} rounded-full shadow-md`}></div>
            <div className="mt-6">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-500 mt-2">{description}</p>
                <a
                    href={linkHref}
                    className="text-blue-500 font-semibold mt-4 inline-block"
                >
                    {linkText}
                </a>
            </div>
        </div>
    );
};


export default FeaturesComponent;