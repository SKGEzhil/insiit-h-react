import React, { useState, useRef, useEffect } from "react";

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
    const [heights, setHeights] = useState<number[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Calculate heights dynamically whenever the component renders
        const calculateHeights = () => {
            const calculatedHeights = contentRefs.current.map((ref) => ref?.scrollHeight || 0);
            setHeights(calculatedHeights);
        };

        calculateHeights();

        // Recalculate heights on window resize to handle dynamic content changes
        window.addEventListener("resize", calculateHeights);

        return () => {
            window.removeEventListener("resize", calculateHeights);
        };
    }, [props.faqs]);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            {props.faqs.map((faq, index) => (
                <div key={index} className={`mb-3 border rounded-lg ${activeIndex === index ? "divide-y" : ""}`}>
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left p-4 hover:font-semibold transition-all rounded-lg focus:outline-none"
                    >
                        <span className="flex text-black justify-between items-center">
                            <span>{faq.question}</span>
                            <span>{activeIndex === index ? "−" : "+"}</span>
                        </span>
                    </button>
                    <div
                        ref={(el) => (contentRefs.current[index] = el)}
                        className="overflow-hidden transition-all duration-300"
                        style={{
                            maxHeight: activeIndex === index ? `${heights[index]}px` : "0",
                        }}
                    >
                        <div className="p-4 rounded-b-lg text-left">
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;