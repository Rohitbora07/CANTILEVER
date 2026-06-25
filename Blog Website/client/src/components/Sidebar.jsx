// import React from "react";
import { motion } from "motion/react";
import { Folder, TrendingUp, Star, Tag, ChevronRight, Hash, Code2, Cpu, Zap, Briefcase, Film, DollarSign, Map, Coffee, Gamepad2, Utensils } from "lucide-react";

const CATEGORIES = [
    { icon: Code2, label: "Technology", count: 1240 },
    { icon: Cpu, label: "Programming", count: 985 },
    { icon: Zap, label: "AI", count: 762 },
    { icon: Briefcase, label: "Business", count: 534 },
    { icon: Film, label: "Movies", count: 421 },
    { icon: DollarSign, label: "Finance", count: 389 },
    { icon: Map, label: "Travel", count: 317 },
    { icon: Coffee, label: "Lifestyle", count: 276 },
    { icon: Gamepad2, label: "Gaming", count: 248 },
    { icon: Utensils, label: "Food", count: 193 },
];

// Preserving architecture - mocking structural dependencies for data mapping
const TRENDING_TOPICS = [
    { label: "Web Architecture", posts: 42300 },
    { label: "Product Philosophy", posts: 28100 },
    { label: "Creative Writing", posts: 19400 },
    { label: "Minimalist Design", posts: 12500 }
];

const LATEST_TOPICS = [
    "The Future of Micro-Frontends",
    "Type Systems in Modern Development",
    "Typography Rules for Digital Publishers",
    "The Artisan Economy"
];

const POPULAR_TAGS = [
    "react", "nextjs", "tailwind", "editorial", "writing", "indie-biz", "ui-ux", "ai-ethics"
];

export default function Sidebar() {
    return (
        <aside className="space-y-6">

            {/* Categories */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-5"
            >
                <h3 className="font-serif font-medium text-stone-900 mb-4 flex items-center gap-2 text-base">
                    <Folder size={16} className="text-[#0077CC]" />
                    Categories
                </h3>
                <div className="space-y-1">
                    {CATEGORIES.map((cat, i) => (
                        <motion.a
                            key={cat.label}
                            href="#"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            whileHover={{ x: 4 }}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-stone-50 group transition-colors"
                        >
                            <div className="flex items-center gap-2.5">
                                <cat.icon size={15} className="text-stone-400 group-hover:text-[#0077CC] transition-colors" />
                                <span className="text-sm text-stone-600 group-hover:text-stone-900 font-medium transition-colors">{cat.label}</span>
                            </div>
                            <span className="text-xs text-stone-500 bg-stone-100 group-hover:bg-[#EBF1F8] group-hover:text-[#0077CC] px-2 py-0.5 rounded transition-colors font-medium">
                                {cat.count.toLocaleString()}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-5"
            >
                <h3 className="font-serif font-medium text-stone-900 mb-4 flex items-center gap-2 text-base">
                    <TrendingUp size={16} className="text-[#0077CC]" />
                    Trending Topics
                </h3>
                <div className="space-y-2">
                    {TRENDING_TOPICS.map((topic, i) => (
                        <motion.a
                            key={topic.label}
                            href="#"
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-stone-50 group transition-colors"
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-xs font-mono font-bold text-stone-300 w-5">0{i + 1}</span>
                                <Hash size={13} className="text-stone-400 group-hover:text-[#0077CC]" />
                                <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">{topic.label}</span>
                            </div>
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: [0.8, 1.02, 1] }}
                                transition={{ delay: i * 0.1 }}
                                className="text-xs text-[#0077CC] bg-stone-50 group-hover:bg-[#EBF1F8] px-2 py-0.5 rounded font-medium"
                            >
                                {(topic.posts / 1000).toFixed(1)}K
                            </motion.span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Latest Topics */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-5"
            >
                <h3 className="font-serif font-medium text-stone-900 mb-4 flex items-center gap-2 text-base">
                    <Star size={16} className="text-[#0077CC]" />
                    Latest Topics
                </h3>
                <div className="space-y-2">
                    {LATEST_TOPICS.map((topic) => (
                        <motion.a
                            key={topic}
                            href="#"
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-1 py-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors"
                        >
                            <ChevronRight size={14} className="text-stone-400 shrink-0" />
                            <span className="truncate">{topic}</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-5"
            >
                <h3 className="font-serif font-medium text-stone-900 mb-4 flex items-center gap-2 text-base">
                    <Tag size={16} className="text-[#0077CC]" />
                    Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.map((tag, i) => (
                        <motion.a
                            key={tag}
                            href="#"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className="px-3 py-1 text-xs font-medium rounded bg-[#EBF1F8] text-[#4A6580] border border-[#C8D8E8] hover:bg-stone-200/50 hover:text-stone-900 hover:border-stone-300 transition-colors cursor-pointer"
                        >
                            #{tag}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </aside>
    );
}