import React from "react";

const FooterComponent: React.FC = () => {
    return (
        <footer className="bg-black text-white py-6">
            <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
                {/* Left Section */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">InsIIT</h1>
                    <p className="text-sm mt-1">All the insights you need</p>
                </div>

                {/* Middle Section */}
                <div className="text-center text-sm mt-4 md:mt-0">
                    <p>Developed by students of IIT Hyderabad</p>
                </div>

                {/* Right Section */}
                <div className="flex mt-4 md:mt-0 space-x-4">
                    <div className="w-5 h-5 bg-white"></div>
                    <div className="w-5 h-5 bg-white"></div>
                    <div className="w-5 h-5 bg-white"></div>
                </div>
            </div>

            <hr className="border-gray-700 my-6" />

            {/* Bottom Links */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 text-center sm:text-left text-sm space-y-4 sm:space-y-0">
                <div>
                    <p className="mb-2 font-bold">About Us</p>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="hover:underline">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Devs
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="mb-2 font-bold">About IITH</p>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="hover:underline">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Link 2
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Link 3
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="mb-2 font-bold">Links</p>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="hover:underline">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Link 2
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Link 3
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;