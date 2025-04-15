import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserQuestionsThunk } from "../store/actions/userActions";
import { useAuth } from "../context/authContext";
import QuestionListItem from "../components/questionListItem";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineKey, HiOutlineAcademicCap } from "react-icons/hi2";
import { AppDispatch } from "../store/store";
import { motion } from "framer-motion";

function ProfilePage() {
    const { email } = useParams<{ email: string }>();
    const dispatch = useDispatch<never>();
    const { profile } = useAuth();
    const userQuestions = useSelector((state: any) => state.userSlice.questions);

    useEffect(() => {
        if (email) {
            console.log("Fetching user questions for email2: ", email);
            dispatch(getUserQuestionsThunk({ emailId: email })).then((res: any) => {
                if (res.error) {
                    console.error("Error getting user questions: ", res.error);
                } else {
                    console.log("User questions fetched successfully");
                }
            });
        }
    }, [dispatch, email]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* User Info Section */}
                <motion.div 
                    className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
                    <div className="absolute inset-0 bg-grid-blue-900/[0.02] bg-[size:20px_20px]" />
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-inner">
                                    {profile?.photoUrl ? (
                                        <img 
                                            src={profile.photoUrl} 
                                            alt={profile.name} 
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <HiOutlineUser className="w-16 h-16 text-blue-400" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                                    {profile?.role}
                                </div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {profile?.name}
                                </h1>
                                <p className="text-gray-600 mt-2">{profile?.email}</p>
                                
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 bg-blue-50 rounded-lg p-3">
                                        <HiOutlineEnvelope className="w-5 h-5 text-blue-500" />
                                        <span className="text-gray-700">{profile?.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-indigo-50 rounded-lg p-3">
                                        <HiOutlineAcademicCap className="w-5 h-5 text-indigo-500" />
                                        <span className="text-gray-700 capitalize">{profile?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Questions Section */}
                <motion.div 
                    className="bg-white rounded-2xl shadow-lg p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            My Questions
                        </h2>
                        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                            {userQuestions?.length || 0} Questions
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {userQuestions?.length > 0 ? (
                            userQuestions.map((question: any) => (
                                <motion.div
                                    key={question._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <QuestionListItem question={question} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <HiOutlineAcademicCap className="w-8 h-8 text-blue-400" />
                                </div>
                                <p className="text-gray-500">No questions asked yet</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default ProfilePage; 