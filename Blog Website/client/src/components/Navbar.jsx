import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, ChevronRight, Menu, PenSquare, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom"
import userAuthStore from "../store/authStore";
import api from "../api/axios";
import { CURRENT_USER_ROUTE } from "../constants/route";

const NAV_LINKS = ["Home", "Explore", "Bookmarks", "Profile"];

function Navbar({ onSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const navigate = useNavigate()
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const user = userAuthStore((state) => state.user);
    const setUser = userAuthStore((state) => state.setUser)
    

    useEffect(() =>{
        const currentUser = async () => {
            try {
                const {data} = await api.get(CURRENT_USER_ROUTE)
                console.log(data.user.name)
                setUser(data.user)
            } catch (error) {
                console.log(error)
            }
            
        }
        currentUser()
    },[setUser])


    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 left-0 right-0 z-50 "
        >
            <div className="mx-auto max-w-[1500px] px-6 lg:px-8 ">
                <div className="flex items-center justify-between rounded-3xl border border-[#C8D8E8]  px-7 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-[#FFFFFF]">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0077CC] text-white">
                            <PenSquare size={16} />
                        </div>

                        <span className="text-xl font-bold tracking-tight text-stone-900">
                            The Daily Binge
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        {NAV_LINKS.map((link, i) => (
                            <motion.a
                                key={link}
                                href="#"
                                whileHover={{ scale: 1.05 }}
                                className={`relative rounded-2xl px-5 py-2 text-sm font-medium transition-colors ${i === 0
                                    ? "text-stone-900"
                                    : "text-stone-500 hover:text-stone-900"
                                    }`}
                            >
                                {link}

                                {i === 0 && (
                                    <motion.div
                                        layoutId="navActive"
                                        className="absolute inset-0 -z-10 rounded-2xl bg-stone-100"
                                    />
                                )}
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={onSearchOpen}
                            className="rounded-2xl p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                        >
                            <Search size={18} />
                        </button>

                        <button
                            className="relative rounded-2xl p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                        >
                            <Bell size={18} />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                        </button>

                        {
                            user ?
                                <div
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="rounded-full w-10 h-10 bg-[#0D1B2A] flex items-center justify-center text-white transition-colors hover:hover:bg-[#0077CC]">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                :
                                <button
                                    onClick={() => navigate("/sign-in")}
                                    className="rounded-2xl  bg-[#0D1B2A] px-5 py-2 text-sm font-semibold text-white transition-colors hover:hover:bg-[#0077CC]">
                                    {"Sign In"}
                                </button>
                        }

                        {
                            profileMenuOpen && setUser &&
                            <div className="absolute top-16 right-6 w-48 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-50">
                                <button
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        navigate("/profile");
                                    }}
                                    className="block w-full px-4 py-3 text-left text-stone-700 transition-colors hover:bg-stone-100"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        navigate("/settings");
                                    }}
                                    className="block w-full px-4 py-3 text-left text-stone-700 transition-colors hover:bg-stone-100"
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        navigate("/sign-out");
                                    }}
                                    className="block w-full px-4 py-3 text-left text-stone-700 transition-colors hover:bg-stone-100"
                                >
                                    Sign Out
                                </button>
                            </div>
                        }



                        <button
                            className="rounded-2xl p-2.5 text-stone-500 transition-colors hover:hover:bg-[#EBF1F8] hover:text-stone-900 md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>

                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mx-6 mt-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-xl md:hidden"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="flex items-center justify-between rounded-2xl px-4 py-3 text-stone-700 transition-colors hover:bg-stone-100"
                            >
                                {link}
                                <ChevronRight size={16} className="text-stone-400" />
                            </a>
                        ))}

                        <button className="mt-4 w-full rounded-2xl bg-[#0077CC] py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800">
                            Sign In
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;