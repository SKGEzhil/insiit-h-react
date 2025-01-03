import React, { useState, useRef, useEffect } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

function Accordion (props: { faqs: FAQItem[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [heights, setHeights] = useState<number[]>([]); // To store each panel's height
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Calculate and store the height of each panel
        const calculatedHeights = contentRefs.current.map((ref) => ref?.scrollHeight || 0);
        setHeights(calculatedHeights);
    }, []);

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
};

export default Accordion;