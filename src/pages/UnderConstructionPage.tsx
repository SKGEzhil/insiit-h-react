import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineCog } from 'react-icons/hi';

/**
 * Under Construction Page - Renders a page indicating the content is under construction
 * @memberof Pages
 * @returns {JSX.Element} Under Construction Page
 */
function UnderConstructionPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-4">
            <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-grid-orange-900/[0.02] bg-[size:60px_60px]" />
                
                {/* Animated Blobs */}
                <motion.div 
                    className="absolute -top-20 -left-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
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
                    className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
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

                {/* Main Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-gray-100/50"
                >
                    <div className="text-center">
                        {/* Construction Icon */}
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2
                            }}
                            className="relative mb-8"
                        >
                            <HiOutlineCog className="w-24 h-24 mx-auto text-amber-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-3xl -z-10 rounded-full" />
                        </motion.div>

                        {/* Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Under Construction</h2>
                            <p className="text-gray-500 max-w-md mx-auto">
                                We're working hard to bring you something amazing! This page is currently under construction.
                            </p>
                        </motion.div>

                        {/* Home Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8"
                        >
                            <button
                                onClick={() => navigate('/')}
                                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <HiOutlineHome className="w-5 h-5 mr-2" />
                                Back to Home
                                <motion.span 
                                    className="absolute inset-0 rounded-xl bg-amber-400 opacity-0 transition-opacity duration-200"
                                    initial={false}
                                />
                            </button>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-12 flex justify-center gap-4"
                        >
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-amber-500"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default UnderConstructionPage; 