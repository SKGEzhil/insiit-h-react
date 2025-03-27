import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {login} from "../services/userServices.ts";
import { useAuth } from "../context/authContext.tsx";

/**
 * This layout is used to protect routes
 * - It checks if the user is ***authorized*** when the component is mounted
 * - If the user is authorized, it renders the ***outlet***
 * - If not authorized, it renders an ***error*** message
 *
 * **Pages**
 * - AdminPage
 *
 * @memberof Layouts
 * @returns {Outlet|JSX.Element}
 *
 * @example
 * return
 *      <ProtectedRoute>
 *          <AdminPage/>
 *      </ProtectedRoute>
 *
 */

interface ProtectedRouteProps {
    requireAdmin?: boolean;
    heading?: string;
    subheading?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAdmin = false, heading, subheading }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loginStep, setLoginStep] = useState<string>("");
    const {profile, login: googleLogin, isLoading} = useAuth();

    const loginUser = async () => {
        try {
            setError(null);

            // Step 1: If no profile, trigger Google login
            if (!profile) {
                setLoginStep("Initializing Google Sign-In...");
                await googleLogin();
                return; // The auth context will handle the rest after Google login
            }

            if (requireAdmin) {
                // Step 2: Once we have a profile, attempt backend login
                setLoginStep("Authenticating with backend...");
                await login().then((response) => {
                    console.log(response);
                    setLoginStep("Authentication successful!");
                    setIsAuthorized(true);
                });
            }
        } catch (err: any) {
            console.error('Error:', err.message);
            setError(err.message || 'An error occurred during authentication');
            setIsAuthorized(false);
        }
    };

    // useEffect(() => {
    //     if (!isAuthorized && !error) {
    //         loginUser();
    //     }
    // }, [profile]); // Re-run when profile changes

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-b1 via-b2 to-b3">
                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full mx-4">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                        <div className="relative w-24 h-24">
                            {/* Animated rings */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-b6 via-b7 to-b6 animate-pulse opacity-20"></div>
                            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-b7/40 to-transparent border border-b6/20"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-b6/20 border-l-b7 animate-spin-slow"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-b6/20 border-r-b7 animate-spin"></div>
                            {/* Center dot */}
                            <div className="absolute inset-[42%] rounded-full bg-b7 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="mt-16 space-y-8">
                        {/* Progress Steps */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${loginStep.includes("Google") ? "bg-b7 animate-pulse" : "bg-b3"}`}></div>
                                <div className={`flex-1 text-sm font-medium ${loginStep.includes("Google") ? "text-b7" : "text-b4"}`}>
                                    Google Authentication
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${loginStep.includes("backend") ? "bg-b7 animate-pulse" : "bg-b3"}`}></div>
                                <div className={`flex-1 text-sm font-medium ${loginStep.includes("backend") ? "text-b7" : "text-b4"}`}>
                                    Backend Verification
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${loginStep.includes("successful") ? "bg-b7 animate-pulse" : "bg-b3"}`}></div>
                                <div className={`flex-1 text-sm font-medium ${loginStep.includes("successful") ? "text-b7" : "text-b4"}`}>
                                    Session Setup
                                </div>
                            </div>
                        </div>

                        {/* Loading Bar */}
                        <div className="relative h-1 bg-b2 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-b6 to-b7 animate-loading-bar rounded-full"></div>
                        </div>

                        {/* Status Message */}
                        <div className="text-center space-y-3">
                            <p className="text-lg font-medium text-b8">{loginStep}</p>
                            <div className="space-y-1">
                                <p className="text-sm text-b5">Securing your session with end-to-end encryption</p>
                                <p className="text-xs text-b4">Your data is protected with industry-standard security</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || (!isAuthorized && !profile)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-b1 via-b2 to-b3">
                <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full mx-4">
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-b8">{heading}</h2>
                            <p className="text-b5">{subheading}</p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                                <div className="flex items-center space-x-3 text-red-600">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={loginUser}
                            className="group relative w-full bg-white text-b8 rounded-xl p-0.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-b6 via-b7 to-b6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-white hover:bg-white/90 rounded-[10px] px-6 py-3.5 transition-colors">
                                <div className="flex items-center justify-center space-x-3">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="font-medium tracking-wide text-b8 group-hover:text-b7 transition-colors">Sign in with Google</span>
                                </div>
                            </div>
                        </button>

                        <div className="text-center space-y-2">
                            <p className="text-xs text-b4">By continuing, you agree to our</p>
                            <div className="flex items-center justify-center space-x-2 text-xs">
                                <a href="#" className="text-b7 hover:text-b8 transition-colors">Terms of Service</a>
                                <span className="text-b4">•</span>
                                <a href="#" className="text-b7 hover:text-b8 transition-colors">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;

// Add this to your global CSS or tailwind.config.js
const style = document.createElement('style');
style.textContent = `
@keyframes loading-bar {
    0% { width: 0; }
    50% { width: 70%; }
    100% { width: 100%; }
}
.animate-loading-bar {
    animation: loading-bar 2s ease-in-out infinite;
}
`;
document.head.appendChild(style);