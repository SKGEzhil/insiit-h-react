import {useDispatch, useSelector} from "react-redux";
import {navigateTo} from "../store/slices/navigationSlice.ts";
import {useNavigate} from "react-router-dom";
import MediaQuery from "react-responsive";
import {TiThMenu} from "react-icons/ti";
import {FaWindowClose} from "react-icons/fa";
import React, {useState} from "react";
import SearchBar from "./searchBar.tsx";
import {tagDict} from "../config/constants.ts";
import TagComponent from "./tagComponent.tsx";
import {useAuth} from "../context/authContext.tsx";
import {IoMdArrowDropright} from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import appIcon from "../assets/logo/icon.png";

type NavigationStateType = {
    navigationSlice: {
        current: string;
    };
}

/**
 *
 * @memberOf Components
 * @returns {React.Element} The HeaderComponent
 *
 * @description
 * The HeaderComponent contains the navigation bar for the website.
 *
 * @example
 * return <HeaderComponent/>
 */
function HeaderComponent() {
    const currentPage = useSelector((state:NavigationStateType) => state.navigationSlice.current);
    const {profile, login, logout} = useAuth();
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed w-full z-20 top-0">
            {/* Backdrop blur and gradient container */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/75 backdrop-blur-md border-b border-slate-200/50" />
            
            {/* Main header content */}
            <div className="relative">
                <div className="max-w-7xl mx-auto h-16">
                    <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
                        {/* Left section */}
                        <div className="flex items-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMobileMenu(!mobileMenu)}
                                className="tablet:hidden text-slate-700 hover:text-slate-900 transition-colors"
                            >
                                <TiThMenu className="w-5 h-5" />
                            </motion.button>
                            {/* Icon before logo */}
                            {/* <img src={appIcon} alt="Site Icon" className="h-8 object-cover " /> */}
                            <motion.div
                                className="cursor-pointer relative group"
                                onClick={() => navigate('/')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <h1 className="text-2xl font-roundf font-bold text-slate-800">
                                    InsIIT
                                </h1>
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                            </motion.div>
                        </div>

                        {/* Center section - Navigation */}
                        <div className="hidden tablet:flex items-center">
                            <NavContainer setMobileMenu={setMobileMenu}/>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                className="hidden sm:flex px-4 py-1.5 rounded-full text-sm bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/ask')}
                            >
                                Ask a question
                            </motion.button>

                            <motion.button
                                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    backgroundColor: profile ? 'rgb(248, 113, 113)' : 'rgb(59, 130, 246)',
                                    color: 'white',
                                }}
                                onClick={() => profile ? logout() : login()}
                            >
                                {profile ? 'Logout' : 'Login'}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-0 top-16 bg-white/95 backdrop-blur-md z-50 overflow-y-auto tablet:hidden"
                        >
                            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                                <motion.button
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileMenu(false)}
                                >
                                    <FaWindowClose className="w-5 h-5 text-slate-600" />
                                </motion.button>

                                <div className="flex justify-center mb-6">
                                    <SearchBar setMobileMenu={setMobileMenu} onSearch={() => {}} />
                                </div>

                                <nav className="space-y-2">
                                    <NavContainer setMobileMenu={setMobileMenu}/>
                                </nav>

                                {currentPage === 'forum' && (
                                    <motion.div 
                                        className="mt-8 p-4 bg-slate-50 rounded-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h2 className="text-base font-medium text-slate-900 mb-3">Popular Tags</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {tagDict.map((tag, index) => (
                                                <motion.div 
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setMobileMenu(false)}
                                                >
                                                    <TagComponent tag={tag} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export const NavContainer = (props: {setMobileMenu: (bool: boolean) => void}) => {
    const currentPage = useSelector((state: NavigationStateType) => state.navigationSlice.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {profile} = useAuth();

    return (
        <div className="flex tablet:items-center flex-col tablet:flex-row tablet:space-x-1">
            <div className="flex tablet:items-center flex-col tablet:flex-row tablet:space-x-1">
                {[
                    { label: "Home", path: "/", page: "home" },
                    { label: "Public Forum", path: "/forum", page: "forum" },
                    { label: "FAQs", path: "/faq", page: "faq" },
                    { label: "About Us", path: "/about", page: "about" }
                ].map((item) => (
                    <NavButton
                        key={item.page}
                        onClick={() => {
                            dispatch(navigateTo(item.page));
                            navigate(item.path);
                            props.setMobileMenu(false);
                        }}
                        page={item.page}
                    >
                        {item.label}
                    </NavButton>
                ))}

                <NavButton
                    dropdownItems={['Academics', 'Courses', 'Campus Life', 'Clubs']}
                    onClick={(index) => {
                        dispatch(navigateTo("insights"));
                        navigate(index === 0 ? "/academics" : "/others");
                        props.setMobileMenu(false);
                    }}
                    page="insights"
                >
                    Insights
                </NavButton>

                {/* Profile and Admin links at the end */}
                {profile && (
                    <NavButton
                        onClick={() => {
                            dispatch(navigateTo("profile"));
                            navigate(`/profile/${profile.email}`);
                            props.setMobileMenu(false);
                        }}
                        page="profile"
                    >
                        Profile
                    </NavButton>
                )}
                {profile?.role === 'admin' && (
                    <NavButton
                        onClick={() => {
                            dispatch(navigateTo("admin"));
                            navigate("/admin");
                            props.setMobileMenu(false);
                        }}
                        page="admin"
                    >
                        Admin
                    </NavButton>
                )}
            </div>
        </div>
    );
}

export const NavButton = (props: {page: string, onClick: (index?: number) => void, children: React.ReactNode, dropdownItems?: string[]}) => {
    const currentPage = useSelector((state: NavigationStateType) => state.navigationSlice.current);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <div 
            className="relative group"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
        >
            <motion.button
                className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                    currentPage === props.page 
                        ? 'text-blue-600' 
                        : 'text-slate-600 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !props.dropdownItems && props.onClick()}
            >
                <span className="relative z-10">{props.children}</span>
                {currentPage === props.page && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                )}
            </motion.button>

            {props.dropdownItems && (
                <AnimatePresence>
                    {isDropdownVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 overflow-hidden"
                        >
                            {props.dropdownItems.map((item, index) => (
                                <motion.div
                                    key={item}
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                                    whileHover={{ x: 2 }}
                                    onClick={() => {
                                        props.onClick(index);
                                        setDropdownVisible(false);
                                    }}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}

export default HeaderComponent;