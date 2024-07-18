import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

/**
 * @typedef {Object} toastContextType
 * @property {function(toastArgsType): void | null} showToast - Function to show a toast message.
 */
type toastContextType = {
    showToast: ({status, message}: toastArgsType) => void | null;
};

/**
 * @typedef {Object} toastArgsType
 * @property {string} status - The status of the toast message.
 * @property {string} message - The content of the toast message.
 */
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

/**
 * ToastProvider component.
 * @param {Object} props - The props.
 * @param {React.ReactNode} props.children - The children nodes.
 * @returns {React.Element} The rendered element.
 */
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