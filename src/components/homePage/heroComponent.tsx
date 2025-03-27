import {useNavigate} from "react-router-dom";
import {base_route} from "../../routes.tsx";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import { HiOutlineQuestionMarkCircle, HiOutlineUserGroup, HiOutlineChatBubbleLeftRight, HiOutlineAcademicCap, HiOutlineBookOpen } from "react-icons/hi2";

/**
 * HeroComponent
 *
 * @memberOf Components
 * @returns {JSX.Element} The rendered HeroComponent component.
 */

function HeroComponent() {
    const navigate = useNavigate();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-blue-900/[0.02] bg-[size:60px_60px]" />
            
            {/* Animated Blobs */}
            <motion.div 
                className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div 
                className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className="container mx-auto px-4 relative z-10 h-full">
                <motion.div 
                    className="flex flex-col md:flex-row items-center justify-between h-full pt-16 md:pt-20"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <motion.div 
                        className="text-left max-w-2xl mb-10 md:mb-0"
                        variants={fadeInUp}
                    >
                        <motion.h1 
                            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                            variants={fadeInUp}
                        >
                            InsIIT - Your Gateway to{" "}
                            <span className="text-blue-600">IIT Hyderabad</span>
                        </motion.h1>
                        <motion.p 
                            className="text-xl text-gray-600 mb-8 leading-relaxed"
                            variants={fadeInUp}
                        >
                            Get reliable insights from IITH students to make informed decisions about your academic journey. 
                            Connect with our community and discover everything you need to know about life at IIT Hyderabad.
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <button
                                onClick={() => navigate(`${base_route}/ask`)}
                                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <FaQuestionCircle className="mr-2" />
                                Ask Your Question
                                <motion.span 
                                    className="absolute inset-0 rounded-full bg-blue-400 opacity-0 transition-opacity duration-300"
                                    initial={false}
                                />
                            </button>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        className="relative"
                        variants={fadeInUp}
                    >
                        <div className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src="https://static.theprint.in/wp-content/uploads/2019/02/10thAniversary-1-e1550671813784.jpg" 
                                alt="IITH Campus" 
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <motion.div 
                            className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto mt-16 px-4">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Active Users */}
                    <motion.div 
                        variants={fadeInUp}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="relative bg-gradient-to-br from-white via-white to-blue-50/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/10 group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/90 to-blue-600/90 rounded-lg mb-4 shadow-md shadow-blue-500/10 transform group-hover:rotate-3 transition-transform duration-300">
                            <HiOutlineUserGroup className="w-6 h-6 text-white" />
                        </div>
                        <motion.h3 
                            className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            500+
                        </motion.h3>
                        <p className="text-gray-500 text-sm tracking-wide">Active Students</p>
                    </motion.div>

                    {/* Questions Answered */}
                    <motion.div 
                        variants={fadeInUp}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="relative bg-gradient-to-br from-white via-white to-green-50/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100/10 group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-600/5 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/90 to-green-600/90 rounded-lg mb-4 shadow-md shadow-green-500/10 transform group-hover:rotate-3 transition-transform duration-300">
                            <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-white" />
                        </div>
                        <motion.h3 
                            className="text-3xl font-semibold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            1000+
                        </motion.h3>
                        <p className="text-gray-500 text-sm tracking-wide">Questions Answered</p>
                    </motion.div>

                    {/* Expert Contributors */}
                    <motion.div 
                        variants={fadeInUp}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="relative bg-gradient-to-br from-white via-white to-blue-50/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/10 group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/90 to-blue-600/90 rounded-lg mb-4 shadow-md shadow-blue-500/10 transform group-hover:rotate-3 transition-transform duration-300">
                            <HiOutlineAcademicCap className="w-6 h-6 text-white" />
                        </div>
                        <motion.h3 
                            className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            50+
                        </motion.h3>
                        <p className="text-gray-500 text-sm tracking-wide">Expert Contributors</p>
                    </motion.div>

                    {/* Topics Covered */}
                    <motion.div 
                        variants={fadeInUp}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="relative bg-gradient-to-br from-white via-white to-amber-50/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100/10 group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500/90 to-amber-600/90 rounded-lg mb-4 shadow-md shadow-amber-500/10 transform group-hover:rotate-3 transition-transform duration-300">
                            <HiOutlineBookOpen className="w-6 h-6 text-white" />
                        </div>
                        <motion.h3 
                            className="text-3xl font-semibold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            100+
                        </motion.h3>
                        <p className="text-gray-500 text-sm tracking-wide">Topics Covered</p>
                    </motion.div>
                </motion.div>

                {/* Trust Banner */}
                <div className="mt-16 relative overflow-hidden rounded-2xl">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-xl"></div>
                    <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]"></div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>

                    {/* Content */}
                    <div className="relative px-8 py-16 md:py-16">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-lg rounded-full text-sm font-medium text-white mb-4">
                                🎓 Your Journey at IITH Starts Here
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                Discover the Inside Story of<br />IIT Hyderabad
                            </h2>
                            <p className="text-lg text-blue-50 max-w-2xl mx-auto leading-relaxed">
                                From academic insights to campus life experiences, get authentic perspectives 
                                from current students and recent graduates. Make informed decisions about 
                                your future at IITH.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                                <button 
                                    onClick={() => navigate(`/ask`)}
                                    className="group px-8 py-3.5 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/10 w-full sm:w-auto relative overflow-hidden"
                                >
                                    <span className="relative z-10">Join Community</span>
                                    <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-white/20 to-transparent transition-transform duration-300"></div>
                                </button>
                                <button 
                                    onClick={() => navigate('/forum')}
                                    className="group px-8 py-3.5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center gap-2"
                                >
                                    Explore More
                                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroComponent;