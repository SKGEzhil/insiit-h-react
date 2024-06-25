import {useAuth} from "../context/authContext.tsx";
import React from "react";

interface buttonProps {
    onClick: () => void;
    children: React.ReactNode;
}

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
            className="font-bold py-2 px-4"
        >
            {buttonProps.children}
        </button>
    );
}

export default ProtectedButton;