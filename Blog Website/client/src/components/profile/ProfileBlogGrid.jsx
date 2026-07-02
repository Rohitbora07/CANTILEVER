import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Eye, Heart, Bookmark, Clock, ArrowRight } from "lucide-react";

export default function ProfileBlogGrid({ blogs, user }) {
    const [activeTab, setActiveTab] = useState("All");
    const myCategory = [...new Set(blogs.map((blog) => blog.category))];

    // console.log(blogs[0].coverImage.url);
    const filtered =
        activeTab === "All" ? blogs : blogs.filter((b) => b.category === activeTab);

    return (
        <div>
            {/* Section heading + tabs */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-lg font-bold flex gap-1 text-stone-900 font-serif">
                    Blogs by <p className="text-[#0077CC]">{user?.name}</p>
                </h2>

                <div className="flex items-center gap-1 border border-stone-200 rounded-xl bg-white p-1">
                    {myCategory.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${activeTab === tab
                                    ? "bg-[#0077CC] text-white shadow-sm"
                                    : "text-stone-500 hover:text-stone-800"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                    {filtered.map((blog, i) => (
                        <motion.article
                            key={blog._id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.05 * i }}
                            className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                        >
                            <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                                <img
                                    src={blog?.coverImage.url}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-semibold text-[#0077CC] bg-[#E0F0FF] px-2.5 py-1 rounded-lg">
                                        {blog.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-stone-400">
                                        <Clock size={11} />
                                        {blog.readTime} min
                                    </span>
                                </div>

                                <h3 className="font-serif text-sm font-bold text-stone-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#0077CC] transition-colors flex-1">
                                    {blog.title}
                                </h3>

                                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-4">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                                    <span className="text-xs text-stone-400">{blog.date}</span>
                                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                                        <span className="flex items-center gap-1">
                                            <Eye size={12} />
                                            {blog.views >= 1000
                                                ? `${(blog.views / 1000).toFixed(1)}k`
                                                : blog.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart size={12} />
                                            {blog.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Bookmark size={12} />
                                            {blog.bookmarks}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Load more */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mt-8"
            >
                <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 text-sm font-semibold text-[#0077CC] border border-[#C8D8E8] bg-[#E0F0FF] hover:bg-[#0077CC] hover:text-white px-6 py-2.5 rounded-xl transition-all duration-200"
                >
                    Load more articles
                    <ArrowRight size={14} />
                </motion.button>
            </motion.div>
        </div>
    );
}