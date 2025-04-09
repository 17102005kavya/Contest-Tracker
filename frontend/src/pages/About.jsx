import { motion } from "framer-motion";
import { FiCode, FiAward, FiBook, FiHeart, FiGlobe, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Header from "../components/Header";
const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Header/>
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 mix-blend-overlay"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                Hello, I'm Kavya Nair Puthiyedath
                            </span>
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            A passionate developer building tools to help coders track and participate in programming contests.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:w-1/3 mb-10 lg:mb-0"
                        >
                            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                                {/* Replace with your actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                                    KN
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="lg:w-2/3 lg:pl-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    I'm a full-stack developer with a passion for creating tools that help fellow programmers improve their skills and track their progress.
                                </p>
                                <p>
                                    This Contest Tracker is my personal project born from my own need to keep up with coding competitions across multiple platforms.
                                </p>
                                <p>
                                    When I'm not coding, you can find me solving problems on competitive programming platforms, contributing to open source, or mentoring aspiring developers.
                                </p>
                            </div>
                            
                            <div className="mt-8 flex space-x-4">
                                <a 
                                    href="https://github.com/yourusername" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <FiGithub className="h-6 w-6" />
                                </a>
                                <a 
                                    href="https://linkedin.com/in/yourprofile" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <FiLinkedin className="h-6 w-6" />
                                </a>
                                <a 
                                    href="https://twitter.com/yourhandle" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-blue-50 text-blue-400 hover:bg-blue-100 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <FiTwitter className="h-6 w-6" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Project Story Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The Story Behind Contest Tracker</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <FiCode className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">The Problem</h3>
                                <p className="text-gray-700">
                                    As an active competitive programmer, I struggled to keep track of all the coding contests across different platforms. Missing deadlines and forgetting about competitions was frustrating.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                    <FiHeart className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                                <p className="text-gray-700">
                                    I built Contest Tracker to centralize all programming competitions in one place. Now you can bookmark contests, get reminders, and track your participation history - everything I wished I had as a competitive programmer.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Makes Contest Tracker Special</h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <FiBook className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Comprehensive Tracking</h3>
                                <p className="text-gray-600 text-sm">
                                    Track contests from multiple platforms in one dashboard with personalized bookmarks.
                                </p>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                    <FiAward className="h-5 w-5 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Performance Insights</h3>
                                <p className="text-gray-600 text-sm">
                                    Analyze your contest history to identify strengths and areas for improvement.
                                </p>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <FiGlobe className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Multi-Platform</h3>
                                <p className="text-gray-600 text-sm">
                                    Supports contests from Codeforces, LeetCode, AtCoder, and more in one place.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to Elevate Your Competitive Programming?</h2>
                        <p className="text-blue-100 text-xl mb-8">
                            Join me in building the ultimate tool for competitive programmers.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a 
                                href="/" 
                                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            >
                                Try Contest Tracker
                            </a>
                            <a 
                                href="https://github.com/yourusername/contest-tracker" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;