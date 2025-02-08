import React, {useEffect} from "react";
import Accordion from "./accordian.tsx";
import {useDispatch, useSelector} from "react-redux";

const FAQPage: React.FC = () => {

    const faqs = useSelector((state) => state.faqSlice.faqs);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-8">Frequently Asked Questions</h1>
            <Accordion faqs={faqs} />
        </div>
    );
};

export default FAQPage;