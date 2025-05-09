import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import tlLogo from "../assets/logo/tl_logo.jpeg";
import { getShowTinkerersLabSupport } from "../services/userServices";

/**
 * FooterComponent
 *
 * @memberOf Components
 * @returns {JSX.Element} The rendered FooterComponent component.
 */

const FooterComponent: React.FC = () => {
    const [showTinkerersLab, setShowTinkerersLab] = useState(false);

    useEffect(() => {
        getShowTinkerersLabSupport().then(setShowTinkerersLab);
    }, []);

    return (
        <footer className="bg-gray-900">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-white">InsIIT</h1>
                            <span className="ml-2 px-2 py-1 bg-blue-500 text-xs font-medium text-white rounded-full">BETA</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your comprehensive guide to IIT Hyderabad. Get insights, share experiences, and connect with the community.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/SKGEzhil/insiit-h-react" className="text-gray-400 hover:text-white transition-colors">
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/company/your-company" className="text-gray-400 hover:text-white transition-colors">
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/your-handle" className="text-gray-400 hover:text-white transition-colors">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <NavLink to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <a href="mailto:skgezhil2005@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <NavLink to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    FAQ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">Resources</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://iith.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    IITH Website
                                </a>
                            </li>
                            <li>
                                <a href="https://aims.iith.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    AIMS Portal
                                </a>
                            </li>
                            <li>
                                <a href="https://library.iith.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Library
                                </a>
                            </li>
                            <li>
                                <a href="https://hostel.iith.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Hostel Portal
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">Get in Touch</h2>
                        <p className="text-gray-400 text-sm">
                            Have questions? We'd love to hear from you.
                        </p>
                        <a 
                            href="mailto:skgezhil2005@gmail.com"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Contact Us
                        </a>
                        {showTinkerersLab && (
                            <div className="flex justify-center mt-10 pt-10">
                                <div className="flex items-center space-x-3 border border-gray-300 rounded-xl bg-white/10 px-6 py-3 shadow-sm">
                                    <img src={tlLogo} alt="Tinkerers' Lab Logo" className="w-16 h-16 rounded-full object-cover border border-gray-300 bg-white p-1 shadow" />
                                    <div className="flex flex-col text-left">
                                        <span className="text-gray-400 text-base font-medium leading-tight">With support from</span>
                                        <span className="text-gray-400 text-base font-medium leading-tight">Tinkerers' Lab</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} InsIIT. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Made with ❤️ by students of IIT Hyderabad
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;