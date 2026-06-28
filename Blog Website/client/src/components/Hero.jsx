// import React from "react";
import { motion } from "motion/react";
import { Flame, ArrowRight, PenSquare, BookOpen, Clock3, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FLOAT_CARDS = [
    {
        title: "Building AI-First Products",
        category: "AI",
        color: "#C98A5B",
        rotate: -6,
        x: 30,
        y: 20,
        delay: 0,
        author: "Sarah Jenkins",
        avatarColor: "bg-stone-200 text-stone-700"
    },
    {
        title: "React 19 Deep Dive",
        category: "React",
        color: "#C98A5B",
        rotate: 4,
        x: 60,
        y: 120,
        delay: 0.3,
        author: "David Kroll",
        avatarColor: "bg-stone-300 text-stone-800"
    },
    {
        title: "Design Systems at Scale",
        category: "Design",
        color: "#C98A5B",
        rotate: -3,
        x: 10,
        y: 200,
        delay: 0.6,
        author: "Elena Rostova",
        avatarColor: "bg-stone-200 text-stone-700"
    },
];

export default function Hero() {
    const navigate = useNavigate()
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-[#E8F0F8]">
            {/* BG Blobs & Grid Pattern */}
            <div className="absolute inset-0 -z-10">
                {/* Soft Warm Beige Blobs */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#B67A4B]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-stone-200/20 rounded-full blur-3xl"
                />

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">


                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium uppercase tracking-wider mb-8"
                        >
                            <Flame size={13} className="text-[#C98A5B]" />
                            50,000+ Articles Published
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl sm:text-6xl lg:text-7xl  font-normal tracking-tight text-stone-900 leading-[1.1] mb-6"
                        >
                            Discover{" "}
                            <span className="relative inline-block  text-stone-900">
                                Stories
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded-full origin-left"
                                />
                            </span>{" "}
                            That Matter
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="text-lg text-stone-600 font-normal leading-relaxed mb-10 max-w-xl"
                        >
                            Read thousands of carefully curated insights from independent developers, designers, creators, and literary voices around the world. Every story offers a pristine new perspective.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ backgroundColor: "#005FA3", color: "white", borderColor: "black" }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-7 py-3.5 bg-[#0077CC] text-white font-medium rounded-lg shadow-sm border shadow-stone-200 transition-colors duration-200"
                            >
                                Start Reading <ArrowRight size={16} />
                            </motion.button>

                            <motion.button
                            onClick={()=> navigate("/create-blog")}
                                whileHover={{ backgroundColor: "#FCFCFA", borderColor: "#78716c" }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-7 py-3.5 bg-white border border-stone-300 text-stone-700 font-medium rounded-lg shadow-sm transition-all duration-200"
                            >
                                <PenSquare size={16} className="text-stone-500" />
                                Write Story
                            </motion.button>
                        </motion.div>


                    </div>

                    {/* Right - Floating Editorial Cards */}
                    <div className="hidden lg:block relative h-[520px]">
                        {FLOAT_CARDS.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40, rotate: card.rotate }}
                                animate={{
                                    opacity: 1,
                                    y: [card.y, card.y - 12, card.y],
                                    rotate: [card.rotate, card.rotate + 1, card.rotate],
                                    x: [card.x, card.x + 6, card.x],
                                }}
                                transition={{
                                    opacity: { delay: card.delay + 0.4, duration: 0.5 },
                                    y: { delay: card.delay + 0.4, duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { delay: card.delay + 0.4, duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                                    x: { delay: card.delay + 0.4, duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
                                }}
                                style={{ position: "absolute", left: card.x, top: card.y }}
                                whileHover={{ scale: 1.03, zIndex: 10, shadow: "0 10px 25px -5px rgba(120,113,108,0.15)" }}
                                className="w-76 bg-[#FFFFFF] rounded-xl p-5 border border-stone-200 cursor-pointer shadow-md transition-shadow duration-200"
                            >
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-stone-100 text-[#C98A5B] border border-stone-200 text-[11px] font-medium tracking-wide uppercase mb-3.5">
                                    <BookOpen size={10} />
                                    {card.category}
                                </div>

                                <h3 className=" font-medium text-stone-900 text-base leading-snug mb-4">
                                    {card.title}
                                </h3>

                                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full ${card.avatarColor} flex items-center justify-center text-[9px] font-bold`}>
                                            {card.author.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium text-stone-600">{card.author}</span>
                                    </div>
                                    <span className="text-xs text-stone-400 flex items-center gap-1">
                                        <Clock3 size={11} /> 5 min
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Subtle Stats Badge / Floating Pill */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-4 right-4 bg-[#FFFFFF] rounded-xl px-4 py-3 shadow-md border border-stone-200 flex items-center gap-3.5"
                        >
                            <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center">
                                <TrendingUp size={16} className="text-[#C98A5B]" />
                            </div>
                            <div>
                                <p className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">This week</p>
                                <p className="font-medium text-stone-800 text-sm">+2,400 new stories</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
