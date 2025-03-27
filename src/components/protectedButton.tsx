import {useAuth} from "../context/authContext.tsx";
import React from "react";

interface buttonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

/**
 * `ProtectedButton` is a React component that renders a button.
 * - If the user is **not authenticated**, clicking the button will trigger the **login process**.
 * - If the user is **authenticated**, it will execute the `onClick` function passed in the `buttonProps`.
 *
 * @memberOf Components
 * @param {Object} buttonProps - The properties for the button.
 * @param {function} buttonProps.onClick - The function to be executed when the button is clicked.
 * @param {React.ReactNode} buttonProps.children - The child elements to be rendered inside the button.
 * @param {string} [buttonProps.className] - Optional custom class name for styling the button.
 *
 * @returns {JSX.Element} The button element.
 */

function ProtectedButton(buttonProps: buttonProps) {
    const {profile, login, setPostLoginAction} = useAuth();
    return (
        <button
            onClick={() => {
                if(!profile) {
                    setPostLoginAction(() => buttonProps.onClick);
                    login();
                } else {
                    buttonProps.onClick();
                }
            }}
            className={buttonProps.className || "font-bold py-2 px-4 text-c1 bg-primary rounded-xl text-nowrap"}
        >
            {buttonProps.children}
        </button>
    );
}

export default ProtectedButton;