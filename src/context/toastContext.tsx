import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

type toastContextType = {
    showToast: ({status, message}: toastArgsType) => void | null;
};

type toastArgsType = {
    status: string;
    message: string;
};

const ToastContext = createContext<toastContextType>(
    {
        showToast: () => {
        },
    }
);

export function ToastProvider({children}: { children: React.ReactNode}) {

    const [toastMessage, showToast] = useState<{ status: string, message: string } | null>(null);

    useEffect(() => {
        if (toastMessage) {

            toastMessage.status === 'success' ?

                toast.success(`${toastMessage.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                }) :

                toast.error(`${toastMessage.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });

            showToast(null);
        }
    }, [toastMessage]);

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
        </ToastContext.Provider>
    );

}

export const useShowToast = () => useContext(ToastContext);