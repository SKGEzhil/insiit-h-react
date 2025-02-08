import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {endProgress, startProgress} from "../store/slices/progressSlice.ts";

/**
 * This hook is used to show progress bar when loading
 * @memberof Hooks
 */
export function useProgress(){

    type RootState = {
        progressSlice: {
            value: number;
        };
        questionSlice: {
            loading: boolean;
        };
    }

    const dispatch = useDispatch();
    const progress = useSelector((state: RootState) => state.progressSlice.value);

    const loading = useSelector((state: RootState) => state.questionSlice.loading);

    useEffect(() => {
        if (loading) {
            dispatch(startProgress());
        } else {
            dispatch(endProgress());
        }
    }, [loading]);

    return { progress };
}