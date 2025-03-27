import FooterComponent from "../components/footerComponent.tsx";
import { motion, useScroll, useTransform } from "framer-motion";
import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";
import { HiOutlineLightBulb, HiOutlineUsers, HiOutlineChatBubbleLeftRight, HiOutlineAcademicCap } from "react-icons/hi2";

/**
 * @namespace Pages
 */

/**
 * About page of the website
 *
 * @memberof Pages
 * @returns {JSX.Element}
 */
function AboutPage() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const milestones = [
        {
            year: "2024",
            title: "The Beginning",
            description: "Started with a vision to help IITH students navigate college life better through a collaborative platform."
        },
        {
            year: "2025",
            title: "Building & Expanding",
            description: "Successfully developed the website and expanding our team to create a stronger community."
        },
        {
            year: "Future",
            title: "Vision Ahead",
            description: "Aiming to reach all IITH aspirants and become the go-to platform for comprehensive IITH guidance."
        }
    ];

    const impactStats = [
        { 
            icon: <HiOutlineUsers className="w-8 h-8" />,
            number: "500+",
            label: "Active Users",
            description: "Students actively engaging and sharing knowledge"
        },
        {
            icon: <HiOutlineChatBubbleLeftRight className="w-8 h-8" />,
            number: "1000+",
            label: "Questions Answered",
            description: "Doubts cleared by our community"
        },
        {
            icon: <HiOutlineLightBulb className="w-8 h-8" />,
            number: "50+",
            label: "Topics Covered",
            description: "From academics to campus life"
        },
        {
            icon: <HiOutlineAcademicCap className="w-8 h-8" />,
            number: "15+",
            label: "Departments",
            description: "Cross-disciplinary knowledge sharing"
        }
    ];

    return (
        <motion.div 
            className="min-h-screen relative bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background Elements */}
            <motion.div 
                className="fixed inset-0 overflow-hidden z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200 via-indigo-100 to-white" />
                <motion.div 
                    className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-300/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-300/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                />
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Hero Section */}
                <motion.div 
                    className="relative h-[60vh] overflow-hidden flex items-center flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="absolute inset-0">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        />
                        <motion.div 
                            className="absolute inset-0 bg-[linear-gradient(to_right,#4444ff10_1px,transparent_1px),linear-gradient(to_bottom,#4444ff10_1px,transparent_1px)] bg-[size:4rem_4rem]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        />
                        <motion.div 
                            className="absolute inset-0 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div 
                            className="max-w-4xl mx-auto text-center"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div 
                                className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_0_20px_rgba(37,99,235,0.2)] mb-6"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <span className="text-xs font-medium bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">InsIIT v1.0</span>
                            </motion.div>
                            <motion.h1 
                                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Our Story
                            </motion.h1>
                            <motion.p 
                                className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                InsIIT started with a simple idea: to create a space where IITH students could share their experiences 
                                and help each other navigate college life better.
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="container mx-auto px-4 relative flex-grow">
                    {/* Mission Section */}
                    <motion.div 
                        className="max-w-4xl mx-auto -mt-20 mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] transition-all duration-500">
                            <motion.h2 
                                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                Our Mission
                            </motion.h2>
                            <motion.p 
                                className="text-base text-gray-700 leading-relaxed mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                We believe that every student's journey at IIT Hyderabad is unique and valuable. Our mission is to create 
                                a platform where these experiences can be shared, questions can be answered, and a supportive community can thrive.
                            </motion.p>
                            <motion.p 
                                className="text-base text-gray-700 leading-relaxed"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                Whether you're a prospective student wondering about life at IITH, a current student seeking academic guidance, 
                                or an alumnus wanting to give back to the community - InsIIT is your platform to connect, share, and grow together.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Team Section */}
                    <motion.div 
                        className="max-w-6xl mx-auto mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-12">
                            <motion.h2 
                                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Meet Our Team
                            </motion.h2>
                            <motion.p 
                                className="text-base text-gray-700 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                The passionate developers behind InsIIT who are dedicated to making the IITH experience better for everyone.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DeveloperCard 
                                imageSrc={"https://camo.githubusercontent.com/ca1d5fd586913719c7d708c7ba7cdc081658f44acdf98ced8ccaf98038912d24/68747470733a2f2f692e6962622e636f2f634c444c62664e2f494d472d323333382d322e6a7067"}
                                name="Jaideep Nirmal AJ"
                                role="Ideation & Vision"
                                socialLinks={{
                                    github: "https://github.com/example",
                                    linkedin: "https://www.linkedin.com/in/jaideep-nirmal-a-j-4035b7291/",
                                    // twitter: "https://twitter.com/example"
                                }}
                            />
                            <DeveloperCard 
                                imageSrc={"https://camo.githubusercontent.com/ca1d5fd586913719c7d708c7ba7cdc081658f44acdf98ced8ccaf98038912d24/68747470733a2f2f692e6962622e636f2f634c444c62664e2f494d472d323333382d322e6a7067"}
                                name="Karthik Gnana Ezhil S"
                                role="Development Lead"
                                socialLinks={{
                                    github: "https://github.com/SKGEzhil",
                                    linkedin: "https://in.linkedin.com/in/skgezhil2005",
                                    instagram: "https://instagram.com/skgezhil2005"
                                }}
                            />
                            <DeveloperCard 
                                imageSrc={"https://media-hosting.imagekit.io/6ba29d71f9e34a92/Image%203-27-25%20at%205.03%E2%80%AFPM.JPG?Expires=1837683296&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RwzRIKGR3tM6x3ajFmq4-WjinvzBZeLCCUTVD4l5PG7ifYtS1uwgINfkFEfxcqx8PoS2L-3BGvassrV8jaSVy9NxBfDe1-xSxS1xJrEmmIIEqpZJkupS-I0Z5Fs3Y7RwMG3ymLLB9oauBwLQW0SatyFyBBIU-0ThLbokD0I1LbhSCXF99nTWR4WRwH2f14Wc-ms9W1Ien6ccsmsTFkucT6Rb~ifG~~ypikfr-myNyimRgYJa51fmTzsvlUbCkUMfi~-maUv7KcXcIhxqR3gnV6vkd3oLY567lngy9SL4QteDlbX-dYkDzUiW7Kn~IZN8QsrQLajuWrqibp9WY7FqZQ__"}
                                name="Hadassah B"
                                role="Design Lead"
                                socialLinks={{
                                    // github: "https://github.com/example",
                                    linkedin: "https://www.linkedin.com/in/hadassah-boddu-82918a30b/",
                                    // twitter: "https://twitter.com/example"
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Impact Stats */}
                    <motion.div 
                        className="max-w-6xl mx-auto mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2 
                            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Our Impact
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {impactStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] transition-all duration-500 group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <motion.div 
                                        className="text-blue-500 mb-4 transform group-hover:scale-110 transition-transform duration-500"
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <div className="text-2xl font-bold text-gray-800 mb-2">{stat.number}</div>
                                    <div className="text-sm font-semibold text-gray-700 mb-2">{stat.label}</div>
                                    <div className="text-sm text-gray-600">{stat.description}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Journey Timeline */}
                    <motion.div 
                        className="max-w-4xl mx-auto mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2 
                            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Our Journey
                        </motion.h2>
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <div className="flex-shrink-0 w-20 pt-1">
                                        <div className="text-sm font-bold text-blue-500">{milestone.year}</div>
                                    </div>
                                    <div className="flex-grow">
                                        <motion.div 
                                            className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] transition-all duration-500"
                                            whileHover={{ x: 2 }}
                                        >
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">{milestone.title}</h3>
                                            <p className="text-sm text-gray-700">{milestone.description}</p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Join Us Section */}
                    <motion.div 
                        className="max-w-4xl mx-auto mb-24 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-12 border border-white/30 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] transition-all duration-500">
                            <motion.h2 
                                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Join Our Community
                            </motion.h2>
                            <motion.p 
                                className="text-base text-gray-700 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Be part of the growing IITH community. Share your experiences, ask questions, and help others.
                            </motion.p>
                            <motion.button
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-auto">
                    <FooterComponent />
                </div>
            </div>
        </motion.div>
    );
}

interface SocialLinks {
    github?: string;
    linkedin?: string;
    instagram?: string;
}

interface DeveloperCardProps {
    imageSrc: string;
    name: string;
    role: string;
    socialLinks: SocialLinks;
}

const DeveloperCard = ({ imageSrc, name, role, socialLinks }: DeveloperCardProps) => {
    return (
        <motion.div 
            className="bg-white/20 backdrop-blur-xl p-6 rounded-xl border border-white/30 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.2)] transition-all duration-300 group relative overflow-hidden"
            whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 20 
                }
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            
            <div className="flex flex-col items-center text-center relative z-10">
                <motion.div 
                    className="relative w-24 h-24 mb-4 group-hover:scale-105 transition-transform duration-300"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }}
                >
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.4, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                    <div 
                        className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300"
                    >
                        <motion.img 
                            src={imageSrc} 
                            alt={name} 
                            className="w-full h-full object-cover"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                        />
                    </div>
                </motion.div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
                    <p className="text-sm text-blue-500 mb-4">{role}</p>
                </div>
                <div className="flex gap-4">
                    {socialLinks.github && (
                        <motion.a 
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                            whileHover={{ 
                                scale: 1.1,
                                y: -2,
                                transition: { type: "spring", stiffness: 400, damping: 15 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaGithub size={18} />
                        </motion.a>
                    )}
                    {socialLinks.linkedin && (
                        <motion.a 
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                            whileHover={{ 
                                scale: 1.1,
                                y: -2,
                                transition: { type: "spring", stiffness: 400, damping: 15 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaLinkedin size={18} />
                        </motion.a>
                    )}
                    {socialLinks.instagram && (
                        <motion.a 
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                            whileHover={{ 
                                scale: 1.1,
                                y: -2,
                                transition: { type: "spring", stiffness: 400, damping: 15 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaInstagram size={18} />
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;