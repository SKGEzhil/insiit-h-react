import React from "react";
import Accordion from "./accordian.tsx";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

interface FAQ {
    question: string;
    answer: string;
}

interface RootState {
    faqSlice: {
        faqs: FAQ[];
    };
}

/**
 * FAQSection component
 *
 * @memberOf Components
 * @returns {JSX.Element} The rendered FAQSection component.
 */
const FAQSection: React.FC = () => {
    const faqs = useSelector((state: RootState) => state.faqSlice.faqs);

    return (
        <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <FaQuestionCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about IIT Hyderabad
                    </p>
                </motion.div>
                <Accordion faqs={faqs} />
            </div>
        </div>
    );
};

export default FAQSection;