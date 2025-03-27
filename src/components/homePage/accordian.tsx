import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

/**
 * FAQItem is an interface that defines the structure of an FAQ item.
 * @typedef {Object} FAQItem
 * @property {string} question - The question.
 * @property {string} answer - The answer.
 */
interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Accordion is a functional component that renders an accordion of FAQ items.
 *
 * @memberOf Components
 * @param {Object} props - The properties passed to the component.
 * @param {FAQItem[]} props.faqs - The FAQ items to render.
 * @param {string} props.faqs.question - The question.
 * @param {string} props.faqs.answer - The answer.
 * @returns {React.Element} The rendered accordion.
 */
function Accordion(props: { faqs: FAQItem[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {props.faqs.map((faq, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100
                        ${activeIndex === index ? 'ring-2 ring-blue-100' : ''}`}
                >
                    <motion.button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left p-6 focus:outline-none"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</span>
                            <motion.div
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className={`flex-shrink-0 ${activeIndex === index ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                                <FaChevronDown className="w-5 h-5" />
                            </motion.div>
                        </div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: "auto",
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.3, ease: "easeOut" },
                                        opacity: { duration: 0.2, delay: 0.1 }
                                    }
                                }}
                                exit={{ 
                                    height: 0,
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.3, ease: "easeIn" },
                                        opacity: { duration: 0.2 }
                                    }
                                }}
                                className="overflow-hidden bg-blue-50/30"
                            >
                                <motion.div 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ 
                                        y: 0, 
                                        opacity: 1,
                                        transition: { delay: 0.1 }
                                    }}
                                    exit={{ y: -10, opacity: 0 }}
                                    className="p-6 pt-0 text-gray-600 leading-relaxed"
                                >
                                    <div className="border-t border-gray-100 pt-4">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}

export default Accordion;