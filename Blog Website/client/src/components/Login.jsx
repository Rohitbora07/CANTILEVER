import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail, Eye, EyeOff, ArrowLeft, CircleDashed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { LOGIN_ROUTE } from "../constants/route";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const {data} = await api.post(LOGIN_ROUTE,{
                email, password
            })
            navigate("/")
            console.log(data)
        }catch(err){
            console.log(err)
            setError(err.response.data.message)
        }finally{
            setLoading(false)
        }
    };

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#FCFCFA] flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased text-stone-900">

            <div className="mt-8 sm:mx-auto w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white py-8 px-4 border border-stone-200 rounded-2xl shadow-sm sm:px-10"
                >
                    <div className="sm:mx-auto w-full mb-6 max-w-md px-4">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute left-0">
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="inline-flex items-center justify-center p-2 rounded-xl text-stone-400 hover:text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-200"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <span className="font-serif font-extrabold italic text-2xl tracking-tight text-[#0077CC] block">
                                    The Daily Binge
                                </span>
                                <h2 className="mt-1 text-2xl font-serif font-normal tracking-tight text-stone-900">
                                    Welcome Back
                                </h2>
                            </motion.div>
                        </div>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit}>

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-2.5 sm:text-sm bg-[#FCFCFA] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-1 focus:ring-[#0077CC] transition-all"
                                    placeholder="name@domain.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-stone-600">
                                    Password
                                </label>
                                <div className="text-xs">
                                    <a href="#" className="font-medium text-[#005FA3] hover:text-stone-900 transition-colors">
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value) }
                                    className="block w-full pl-10 pr-10 py-2.5 sm:text-sm bg-[#FCFCFA] border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-1 focus:ring-[#0077CC] transition-all"
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


                        <div className="pt-2">
                            <motion.button
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#0077CC] hover:bg-[#005FA3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077CC] transition-colors duration-200"
                            >
                            {
                                loading ? <CircleDashed size={14} className=" animate-spin" /> :
                                <p className="flex items-center gap-2">Sign In <ArrowRight size={14} /></p>
                            }
                                
                            </motion.button>
                        </div>
                        { error && 
                        <div className="text-red-500 text-sm mt-2 flex items-center gap-2">{error}</div>
                        }
                    </form>
                    <p className="mt-3 flex gap-2 flex-col items-center justify-center text-sm text-stone-500">
                        Don't have an account ??{" "}
                        <p
                            onClick={() => navigate("/sign-up")}
                            className="font-medium text-[#0077CC] hover:text-[#005FA3] underline underline-offset-4 transition-colors">
                            create a new reader account
                        </p>
                    </p>

                </motion.div>
            </div>

        </div>
    );
}