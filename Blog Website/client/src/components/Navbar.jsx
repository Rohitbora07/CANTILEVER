import { motion, AnimatePresence } from "motion/react";
import { Bell, ChevronRight, Menu, PenSquare, Search, X } from "lucide-react";

const NAV_LINKS = ["Home", "Explore", "Bookmarks", "Profile"];

function Navbar({ onSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen }) {
    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 left-0 right-0 z-50 "
        >
            <div className="mx-auto max-w-[1500px] px-6 lg:px-8 ">
                <div className="flex items-center justify-between rounded-3xl border border-stone-200  px-7 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-[#FCFCFA] ">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
                            <PenSquare size={16} />
                        </div>

                        <span className="text-xl font-bold tracking-tight text-stone-900">
                            Inkwell
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

                        <button className="rounded-2xl  bg-black px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800">
                            Sign In
                        </button>

                        <button
                            className="rounded-2xl p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 md:hidden"
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

                        <button className="mt-4 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800">
                            Sign In
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;