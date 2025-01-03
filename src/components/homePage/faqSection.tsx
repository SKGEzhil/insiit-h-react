import React, {useEffect} from "react";
import Accordion from "../accordian.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getFaqsThunk} from "../../store/actions/faqActions.ts";

const FAQPage: React.FC = () => {

    const faqs = useSelector((state) => state.faqSlice.faqs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFaqsThunk({page: 1, limit: 3}));
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-8">Frequently Asked Questions</h1>
            <Accordion faqs={faqs} />
        </div>
    );
};

export default FAQPage;