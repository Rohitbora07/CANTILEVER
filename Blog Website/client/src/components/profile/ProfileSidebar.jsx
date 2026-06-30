import { motion } from "motion/react";
import { Hash, TrendingUp } from "lucide-react";

const categories = [
    { name: "Technology", count: 22, color: "#0077CC" },
    { name: "Design", count: 8, color: "#7c3aed" },
    { name: "Health", count: 4, color: "#059669" },
];

const topPosts = [
    {
        title: "Why TypeScript Is No Longer Optional for Serious Projects",
        views: "11.4k",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&h=80&fit=crop",
    },
    {
        title: "Building with Vite in 2025: A Complete Setup Guide",
        views: "8.9k",
        cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=80&h=80&fit=crop",
    },
    {
        title: "The Rise of Edge Computing: What Developers Need to Know",
        views: "6.3k",
        cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=80&h=80&fit=crop",
    },
];



export default function ProfileSidebar() {
    return (
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-5">

            {/* Categories written in */}
            <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden"
            >
                <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-2">
                    <Hash size={14} className="text-[#0077CC]" />
                    <h3 className="text-sm font-semibold text-stone-800">Writes about</h3>
                </div>
                <ul className="p-4 space-y-2">
                    {categories.map(({ name, count, color }, i) => (
                        <motion.li
                            key={name}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.06 * i }}
                        >
                            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">
                                        {name}
                                    </span>
                                </div>
                                <span className="text-xs text-stone-400 font-medium bg-stone-100 px-2 py-0.5 rounded-md">
                                    {count} posts
                                </span>
                            </button>

                            {/* Category progress bar */}
                            <div className="mx-3 mt-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(count / 34) * 100}%` }}
                                    transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Top posts */}
            <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden"
            >
                <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-2">
                    <TrendingUp size={14} className="text-[#0077CC]" />
                    <h3 className="text-sm font-semibold text-stone-800">Top articles</h3>
                </div>
                <ul className="divide-y divide-stone-100">
                    {topPosts.map((post, i) => (
                        <motion.li
                            key={post.title}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.06 * i }}
                            className="flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 transition-colors cursor-pointer group"
                        >
                            <span className="text-lg font-bold text-stone-100 font-serif w-6 flex-shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-[#0077CC] transition-colors">
                                    {post.title}
                                </p>
                                <p className="text-[10px] text-stone-400 mt-0.5">
                                    {post.views} views
                                </p>
                            </div>
                            <img
                                src={post.cover}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

        </div>
    );
}