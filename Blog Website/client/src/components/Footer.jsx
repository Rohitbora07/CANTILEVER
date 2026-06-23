import { motion } from "motion/react";
import { ArrowUp, ChevronRight, PenSquare } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";



function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-24 rounded-t-[42px] border-t border-stone-200 bg-[#FCFCFA]"
        >
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-[1500px] mx-auto px-6 lg:px-8 py-20"
            >
                <div className="grid gap-14 sm:grid-cols-3 lg:grid-cols-3 md:mx-20">

                    <motion.div  className="sm:col-span-2 lg:col-span-2 ">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C98A5B] text-white"
                            ><PenSquare size={18} /></div>

                            <span className="text-2xl font-bold tracking-tight text-stone-900">The Daily Binge</span>
                        </div>

                        <p className="mt-6 leading-7 text-stone-600">
                            Discover thoughtful stories, share your ideas, and connect with readers who appreciate meaningful writing.
                        </p>

                        <div className="mt-8 flex gap-3">

                            {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (

                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: .95 }}
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-900 hover:text-white"
                                >
                                    <Icon size={17} />
                                </motion.a>

                            ))}

                        </div>

                    </motion.div>
                    <div className="col-span-3 sm:col-span-1 flex justify-center sm:justify-center lg:justify-between gap-10 lg:gap-20">
                        <motion.div >
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-stone-900">
                                Explore
                            </h3>
                            {["Home", "Blogs", "Categories", "About"].map((link) => (
                                <motion.a
                                    key={link}
                                    href="#"
                                    whileHover={{ x: 6 }}
                                    className="group flex items-center gap-2 py-2 text-[15px] text-stone-600 transition-colors hover:text-stone-900"
                                >
                                    <ChevronRight
                                        size={15}
                                        className="text-[#C98A5B] transition-transform group-hover:translate-x-1"
                                    />
                                    {link}
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div >

                            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-stone-900">
                                Resources
                            </h3>

                            {[
                                "Privacy Policy",
                                "Terms of Service",
                                "Contact",
                                "FAQ",
                            ].map((link) => (

                                <motion.a
                                    key={link}
                                    href="#"
                                    whileHover={{ x: 6 }}
                                    className="group flex items-center gap-2 py-2 text-[15px] text-stone-600 transition-colors hover:text-stone-900"
                                >
                                    <ChevronRight
                                        size={15}
                                        className="text-[#C98A5B] transition-transform group-hover:translate-x-1"
                                    />
                                    {link}
                                </motion.a>

                            ))}

                        </motion.div>
                    </div>

                </div>

                <div className="my-14 h-px bg-stone-200" />

                <motion.div
                    
                    className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
                >

                    <div>

                        <p className="text-sm font-medium text-stone-800">
                            © 2026 The Daily Binge
                        </p>

                        <p className="mt-1 text-sm text-stone-500">
                            Crafted with care for writers, readers, and storytellers.
                        </p>

                    </div>

                    <motion.button
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        className="flex items-center gap-2 self-start rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition-all hover:border-[#C98A5B] hover:text-[#C98A5B]"
                    >
                        <ArrowUp size={16} />
                        Back to top
                    </motion.button>

                </motion.div>

            </motion.div>

        </motion.footer>
    );
}

export default Footer;