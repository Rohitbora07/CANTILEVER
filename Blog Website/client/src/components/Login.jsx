import  { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle authenticated login logic
    };

    return (
        <div className="min-h-screen bg-[#FCFCFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased text-stone-900">

            {/* Branding and Header */}
            <div className="sm:mx-auto w-full max-w-md text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Minimalist text logo replacing flashy icon brands */}
                    <span className="font-serif italic text-2xl tracking-tight text-stone-900">
                        The Journal <span className="text-[#C98A5B]">.</span>
                    </span>
                    <h2 className="mt-4 text-2xl font-serif font-normal tracking-tight text-stone-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-stone-500">
                        Or{" "}
                        <a href="#" className="font-medium text-[#C98A5B] hover:text-[#B67A4B] underline underline-offset-4 transition-colors">
                            create a new reader account
                        </a>
                    </p>
                </motion.div>
            </div>

            {/* Main Authentication Card */}
            <div className="mt-8 sm:mx-auto w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white py-8 px-4 border border-stone-200 rounded-2xl shadow-sm sm:px-10"
                >
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Email Field Wrapper */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-stone-600 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                                    <Mail size={15} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full pl-10 pr-4 py-2.5 sm:text-sm bg-[#FCFCFA] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#C98A5B] focus:ring-1 focus:ring-[#C98A5B] transition-all"
                                    placeholder="name@domain.com"
                                />
                            </div>
                        </div>

                        {/* Password Field Wrapper */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-stone-600">
                                    Password
                                </label>
                                <div className="text-xs">
                                    <a href="#" className="font-medium text-[#B67A4B] hover:text-stone-900 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                                    <Lock size={15} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full pl-10 pr-10 py-2.5 sm:text-sm bg-[#FCFCFA] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#C98A5B] focus:ring-1 focus:ring-[#C98A5B] transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me Toggle */}
                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#C98A5B] focus:ring-[#C98A5B] border-stone-300 rounded accent-[#C98A5B]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs text-stone-600">
                                    Remember this device
                                </label>
                            </div>
                        </div>

                        {/* Premium CTA Button */}
                        <div className="pt-2">
                            <motion.button
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#C98A5B] hover:bg-[#B67A4B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C98A5B] transition-colors duration-200"
                            >
                                Sign In <ArrowRight size={14} />
                            </motion.button>
                        </div>
                    </form>

                    {/* Clean Segment Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-stone-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-wider">
                                <span className="px-3 bg-white text-stone-400">Secure Reader Access</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Utility Links */}
            <div className="mt-8 text-center text-xs text-stone-400 space-x-4">
                <a href="#" className="hover:text-stone-600 transition-colors">Privacy Policy</a>
                <span>&bull;</span>
                <a href="#" className="hover:text-stone-600 transition-colors">Terms of Service</a>
            </div>
        </div>
    );
}