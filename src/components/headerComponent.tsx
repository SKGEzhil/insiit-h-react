import ProtectedButton from "./protectedButton.tsx";
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

function HeaderComponent() {

    const currentPage = useSelector((state) => state.navigationSlice.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <div className="bg-bg-2 text-center z-20 my-0 p-1 fixed w-full">
            <div className="flex w-full justify-between items-center">
                <div className="mx-4 flex items-center">
                    <button
                        onClick={() => {
                            setMobileMenu(!mobileMenu)
                        }}
                        className="tablet:hidden"
                    >
                        <TiThMenu className="text-white mr-2"/>
                    </button>
                    <h1 className="text-3xl text-left font-bold">InsIIT-H</h1>
                </div>
                <div>
                    <ProtectedButton onClick={() => {
                    }}>
                        Login
                    </ProtectedButton>
                </div>
            </div>

            {/* For mobile screens */}
            {
                mobileMenu &&
                <div className=" w-screen h-screen bg-bg-3 overflow-scroll ">
                    <div className="mb-36">
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setMobileMenu(false)
                                }}
                                className="m-2"
                            >
                                <FaWindowClose size={20} className="text-white mx-4"/>
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

            <MediaQuery minWidth={640}>
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            dispatch(navigateTo("home"));
                            navigate("/");
                            console.log('CURRENT PAGE', currentPage)
                        }}
                        className={currentPage === 'home' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                        Home
                    </button>
                    <button
                        onClick={() => {
                            dispatch(navigateTo("forum"));
                            navigate("/forum");
                            console.log('CURRENT PAGE', currentPage)
                        }}
                        className={currentPage === 'forum' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                        Public Forum
                    </button>
                    <button
                        onClick={() => {
                            dispatch(navigateTo("ask"));
                            navigate("/forum");
                            console.log('CURRENT PAGE', currentPage)
                        }}
                        className={currentPage === 'ask' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                        FAQs
                    </button>
                    <button
                        onClick={() => {
                            dispatch(navigateTo("insights"));
                            navigate("/academics");
                            console.log('CURRENT PAGE', currentPage)
                        }}
                        className={currentPage === 'insights' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                        Insights
                    </button>
                    <button
                        onClick={() => {
                            dispatch(navigateTo("josaa"));
                            navigate("/forum");
                            console.log('CURRENT PAGE', currentPage)
                        }}
                        className={currentPage === 'josaa' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                        JoSAA
                    </button>
                    <button
                        onClick={() => {
                            dispatch(navigateTo("about"));
                            navigate("/forum");
                            console.log('CURRENT PAGE', currentPage)
                        }}
                        className={currentPage === 'about' ? 'bg-primary w-full min-w-20 max-w-64' : 'bg-bg-3 w-full min-w-20 max-w-64'}>
                        About Us
                    </button>
                </div>
            </MediaQuery>

        </div>
    );
}

export const NavContainer = (props: {setMobileMenu: (bool) => void}) => {

    const currentPage = useSelector((state) => state.navigationSlice.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <button
                className="bg-primary text-white w-full py-2 my-2 rounded-lg"
                onClick={() => {
                navigate('/ask')
            }}>
                Ask a question
            </button>
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
                onClick={() => {
                    dispatch(navigateTo("academics"));
                    navigate("/academics");
                    console.log('CURRENT PAGE', currentPage)
                    props.setMobileMenu(false);

                }} page={"academics"}>
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
        </>
    );
}

export const NavButton = (props: {page: string, onClick: () => void, children: React.ReactNode}) => {

    const currentPage = useSelector((state) => state.navigationSlice.current);

    return (
        <button
            onClick={props.onClick}
            className={currentPage === props.page ? 'text-primary font-bold text-left flex py-0' : 'text-left flex py-0'}>
            {props.children}
        </button>
    )
}

export default HeaderComponent;