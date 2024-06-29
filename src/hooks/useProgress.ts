import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {endProgress, startProgress} from "../store/slices/progressSlice.ts";

export function useProgress(){
    const dispatch = useDispatch();
    const progress = useSelector((state) => state.progressSlice.value);

    const loading = useSelector((state) => state.questionSlice.loading);

    useEffect(() => {
        if (loading) {
            dispatch(startProgress());
        } else {
            dispatch(endProgress());
        }
    }, [loading]);

    return { progress };
}