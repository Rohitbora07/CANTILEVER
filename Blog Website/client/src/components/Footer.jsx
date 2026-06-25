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
            className="mt-24 rounded-t-[42px] border-t border-[#1E3040] bg-[#0D1B2A]"
        >
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-[1500px] mx-auto px-6 lg:px-8 py-20"
            >
                <div className="grid gap-14 sm:grid-cols-3 lg:grid-cols-3 md:mx-20">

                    <motion.div className="sm:col-span-2 lg:col-span-2">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0077CC] text-white"
                            ><PenSquare size={18} /></div>

                            <span className="text-2xl font-bold tracking-tight text-[#FFFFFF]">The Daily Binge</span>
                        </div>

                        <p className="mt-6 leading-7 text-[#8BA3BB]">
                            Discover thoughtful stories, share your ideas, and connect with readers who appreciate meaningful writing.
                        </p>

                        <div className="mt-8 flex gap-3">

                            {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (

                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: .95 }}
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#1E3040] bg-[#142030] text-[#8BA3BB] transition-colors hover:bg-[#0077CC] hover:text-white"
                                >
                                    <Icon size={17} />
                                </motion.a>

                            ))}

                        </div>

                    </motion.div>
                    <div className="col-span-3 sm:col-span-1 flex justify-center sm:justify-center lg:justify-between gap-10 lg:gap-20">
                        <motion.div>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-[#FFFFFF]">
                                Explore
                            </h3>
                            {["Home", "Blogs", "Categories", "About"].map((link) => (
                                <motion.a
                                    key={link}
                                    href="#"
                                    whileHover={{ x: 6 }}
                                    className="group flex items-center gap-2 py-2 text-[15px] text-[#8BA3BB] transition-colors hover:text-[#FFFFFF]"
                                >
                                    <ChevronRight
                                        size={15}
                                        className="text-[#0077CC] transition-transform group-hover:translate-x-1"
                                    />
                                    {link}
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div>

                            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-[#FFFFFF]">
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
                                    className="group flex items-center gap-2 py-2 text-[15px] text-[#8BA3BB] transition-colors hover:text-[#FFFFFF]"
                                >
                                    <ChevronRight
                                        size={15}
                                        className="text-[#0077CC] transition-transform group-hover:translate-x-1"
                                    />
                                    {link}
                                </motion.a>

                            ))}

                        </motion.div>
                    </div>

                </div>

                <div className="my-14 h-px bg-[#1E3040]" />

                <motion.div
                    className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
                >

                    <div>

                        <p className="text-sm font-medium text-[#D4E4F0]">
                            © 2026 The Daily Binge
                        </p>

                        <p className="mt-1 text-sm text-[#8BA3BB]">
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
                        className="flex items-center gap-2 self-start rounded-2xl border border-[#1E3040] bg-[#142030] px-5 py-3 text-sm font-medium text-[#8BA3BB] transition-all hover:border-[#0077CC] hover:text-[#0077CC]"
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