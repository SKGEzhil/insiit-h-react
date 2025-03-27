import {base_route} from "../../routes.tsx";
import { motion } from "framer-motion";
import { FaComments, FaLightbulb, FaChartLine, FaUsers } from "react-icons/fa";

/**
 * FeaturesComponent
 *
 * @memberOf Components
 * @returns {JSX.Element} The rendered FeaturesComponent component.
 */

function FeaturesComponent() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="py-20 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Discover Our Features
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to make informed decisions about your journey at IIT Hyderabad
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <FeatureCard
                        title="Public Forum"
                        description="Engage with the IITH community, ask questions, and get answers from students who've been there."
                        linkText="Join Discussion"
                        color="from-blue-500 to-blue-600"
                        icon={<FaComments className="w-6 h-6" />}
                        linkHref={`${base_route}/forum`}
                        fadeInUp={fadeInUp}
                    />
                    <FeatureCard
                        title="Insights"
                        description="Comprehensive information about courses, clubs, and campus life to help you make the right choice."
                        linkText="Explore"
                        color="from-purple-500 to-purple-600"
                        icon={<FaLightbulb className="w-6 h-6" />}
                        linkHref={`${base_route}/academics`}
                        fadeInUp={fadeInUp}
                    />
                    <FeatureCard
                        title="Rank Prediction"
                        description="Predict your chances of admission based on historical data and current trends."
                        linkText="Check Now"
                        color="from-green-500 to-green-600"
                        icon={<FaChartLine className="w-6 h-6" />}
                        linkHref="#"
                        fadeInUp={fadeInUp}
                    />
                    <FeatureCard
                        title="Community"
                        description="Connect with current students and alumni to get firsthand experiences and guidance."
                        linkText="Connect"
                        color="from-orange-500 to-orange-600"
                        icon={<FaUsers className="w-6 h-6" />}
                        linkHref="#"
                        fadeInUp={fadeInUp}
                    />
                </motion.div>
            </div>
        </div>
    );
}

interface FeatureCardProps {
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    color: string;
    icon: React.ReactNode;
    fadeInUp: {
        initial: { opacity: number; y: number };
        animate: { 
            opacity: number; 
            y: number;
            transition: { duration: number };
        };
    };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
    title, 
    description, 
    linkText, 
    linkHref, 
    color,
    icon,
    fadeInUp
}) => {
    return (
        <motion.div 
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
            variants={fadeInUp}
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color} rounded-t-2xl`} />
            <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white mb-6`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>
                <motion.a
                    href={linkHref}
                    className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors"
                    whileHover={{ x: 5 }}
                >
                    {linkText}
                    <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.a>
            </div>
        </motion.div>
    );
};

export default FeaturesComponent;