import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';

/**
 * Error Page - Renders 404 Page
 * @memberof Pages
 * @returns {JSX.Element} Error Page
 */
function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
            <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-grid-blue-900/[0.02] bg-[size:60px_60px]" />
                
                {/* Animated Blobs */}
                <motion.div 
                    className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
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
                    className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
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
                        {/* 404 Number */}
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2
                            }}
                            className="relative"
                        >
                            <h1 className="text-9xl font-bold text-gray-900">
                                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">4</span>
                                <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">0</span>
                                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">4</span>
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full" />
                        </motion.div>

                        {/* Error Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Oops! The page you're looking for doesn't exist or has been moved.
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
                                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <HiOutlineHome className="w-5 h-5 mr-2" />
                                Back to Home
                                <motion.span 
                                    className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 transition-opacity duration-200"
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
                                    className="w-2 h-2 rounded-full bg-blue-500"
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

export default ErrorPage;