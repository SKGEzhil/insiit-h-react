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

type NavigationStateType = {
    navigationSlice: {
        current: string;
    };
}

/**
 *
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
        <div className="bg-white text-center z-20 my-0 p-1 fixed w-full">
            <div className="flex w-full justify-between items-center">
                <div className="mx-4 flex items-center">
                    <button
                        onClick={() => {
                            setMobileMenu(!mobileMenu)
                        }}
                        className="tablet:hidden"
                    >
                        <TiThMenu className="text-black mr-2"/>
                    </button>
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <h1 className="text-3xl text-left font-bold">InsIIT-H</h1>
                    </div>
                </div>
                <div className="flex">

                {/* For larger screens */}
                    <MediaQuery minWidth={640}>
                        <NavContainer setMobileMenu={setMobileMenu}/>
                    </MediaQuery>

                    <button
                        className="font-bold text-black rounded-lg px-4"
                        onClick={() => {
                        profile ? logout() : login();
                    }}>
                        {profile ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>

            {/* For mobile screens */}
            {
                mobileMenu &&
                <div className=" w-screen h-screen bg-white overflow-scroll ">
                    <div className="mb-36">
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setMobileMenu(false)
                                }}
                                className="m-2"
                            >
                                <FaWindowClose size={20} className="text-c9 mx-4"/>
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <SearchBar setMobileMenu={setMobileMenu}/>
                        </div>
                        <div className="flex flex-col justify-start">
                            <NavContainer setMobileMenu={setMobileMenu}/>
                        </div>
                        {
                            currentPage === 'forum' &&
                            <div className="p-4 pr-16">
                                <h2 className="text-xl font-bold text-left my-3">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {tagDict.map((tag, index) => (
                                        <div onClick={() => {
                                            setMobileMenu(false);
                                        }}>
                                            <TagComponent tag={tag} key={index}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>

                </div>
            }

        </div>
    );
}

export const NavContainer = (props: {setMobileMenu: (bool: boolean) => void}) => {

    const currentPage = useSelector((state: NavigationStateType) => state.navigationSlice.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {profile} = useAuth();


    return (
        <>
            <div className="flex justify-start">
                <button
                    className="bg-primary py-2 px-4 my-2 rounded-lg"
                    onClick={() => {
                        navigate('/ask')
                    }}>
                    Ask a question
                </button>
            </div>

            <NavButton
                onClick={() => {
                    dispatch(navigateTo("home"));
                    navigate("/");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);
                }}
                page={"home"}>
                Home
            </NavButton>
            <NavButton
                onClick={() => {
                    dispatch(navigateTo("forum"));
                    navigate("/forum");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);

                }} page={"forum"}>
                Public Forum
            </NavButton>
            <NavButton
                onClick={() => {
                    dispatch(navigateTo("faq"));
                    navigate("/forum");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);

                }} page={"faq"}>
                FAQs
            </NavButton>
            <NavButton
                dropdownItems={['Academics', 'Courses', 'Campus Life', 'Clubs']}
                onClick={(index) => {
                    dispatch(navigateTo("insights"));

                    switch (index) {
                        case 0:
                            navigate("/academics");
                            break;
                        case 1:
                            navigate("/others");
                            break;
                        case 2:
                            navigate("/others");
                            break;
                        case 3:
                            navigate("/others");
                            break;
                        default:
                            navigate("/others");
                    }

                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);
                }} page={"insights"}>
                Insights
            </NavButton>
            <NavButton
                onClick={() => {
                    dispatch(navigateTo("josaa"));
                    navigate("/forum");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);

                }} page={"josaa"}>
                JoSAA
            </NavButton>
            <NavButton
                onClick={() => {
                    dispatch(navigateTo("about"));
                    navigate("/forum");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);
                }} page={"about"}>
                About Us
            </NavButton>

            {
                profile?.role === 'admin' &&
                <NavButton
                onClick={() => {
                    dispatch(navigateTo("admin"));
                    navigate("/admin");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);
                }} page={"admin"}>
                Admin
            </NavButton>}
        </>
    );
}

export const NavButton = (props: {page: string, onClick: (index?: number) => void, children: React.ReactNode, dropdownItems?: string[]}) => {

    const currentPage = useSelector((state: NavigationStateType) => state.navigationSlice.current);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <div className="relative flex flex-col items-start tablet:items-center justify-center"
             onMouseEnter={() => setDropdownVisible(true)}
             onMouseLeave={() => setDropdownVisible(false)}
        >
            <div className='flex justify-start items-center'>
                <button
                    onClick={() => {
                        !props.dropdownItems ? props.onClick() : setDropdownVisible(!isDropdownVisible)
                    }}
                    className={currentPage === props.page ? 'text-primary font-bold text-nowrap text-left ' +
                        'flex py-0 items-center' : `${(props.dropdownItems && isDropdownVisible) ? 'text-primary font-bold tablet:text-black' : ''} text-black text-left text-nowrap items-center flex py-0`}>
                    {props.children}
                </button>
                {
                    props.dropdownItems &&
                    <MediaQuery maxWidth={640}>
                        <IoMdArrowDropright onClick={() => !props.dropdownItems ? props.onClick() : setDropdownVisible(!isDropdownVisible)}/>
                    </MediaQuery>

                }
            </div>
            {isDropdownVisible && props.dropdownItems && (
                <div className="tablet:absolute mx-4 tablet:mx-0 top-full bg-white tablet:shadow-lg tablet:rounded-lg z-10">
                    {props.dropdownItems.map((item, index) => (
                        <div
                            onClick={() => {
                                props.onClick(index)
                                setDropdownVisible(false)
                            }}
                            key={index} className="dropdown-item p-2 w-full cursor-pointer tablet:hover:bg-gray-200">
                            <p className='text-left whitespace-nowrap'>{item}</p>
                        </div>
                    ))}
                </div>
            )}
            <MediaQuery minWidth={640}>
                <div className={`w-10 h-1 rounded-xl bg-primary ${currentPage !== props.page && 'hidden'}`}>
                </div>
            </MediaQuery>
        </div>
    )
}

export default HeaderComponent;