import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Eye, Heart, Bookmark, Clock, ArrowRight } from "lucide-react";

const blogs = [
    {
        id: 1,
        title: "Why TypeScript Is No Longer Optional for Serious Projects",
        excerpt: "A deep dive into how TypeScript's type system saves thousands of hours in debugging and makes large codebases manageable.",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&h=450&fit=crop",
        category: "Technology",
        date: "Jun 18, 2025",
        readTime: 9,
        views: 11430,
        likes: 724,
        bookmarks: 215,
    },
    {
        id: 2,
        title: "The Rise of Edge Computing: What Developers Need to Know",
        excerpt: "Edge computing is reshaping how we build and deploy applications. Here's what it means for your next project.",
        cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&h=450&fit=crop",
        category: "Technology",
        date: "May 8, 2025",
        readTime: 8,
        views: 6320,
        likes: 289,
        bookmarks: 98,
    },
    {
        id: 3,
        title: "Science of Sleep: What Research Says About Deep Rest",
        excerpt: "New research reveals surprising truths about sleep architecture, dreaming, and the habits that actually improve rest quality.",
        cover: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=700&h=450&fit=crop",
        category: "Health",
        date: "Apr 18, 2025",
        readTime: 7,
        views: 5410,
        likes: 331,
        bookmarks: 120,
    },
    {
        id: 4,
        title: "Building with Vite in 2025: A Complete Setup Guide",
        excerpt: "Everything you need to know about setting up a modern Vite project with React, Tailwind, and the tooling you need.",
        cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=700&h=450&fit=crop",
        category: "Technology",
        date: "Jun 10, 2025",
        readTime: 11,
        views: 8940,
        likes: 519,
        bookmarks: 142,
    },
    {
        id: 5,
        title: "Designing for Accessibility: Beyond the Basics",
        excerpt: "Accessibility is a design philosophy that makes products better for everyone, not just those with disabilities.",
        cover: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&h=450&fit=crop",
        category: "Design",
        date: "May 15, 2025",
        readTime: 6,
        views: 2870,
        likes: 177,
        bookmarks: 55,
    },
    {
        id: 6,
        title: "The Psychology Behind Great Product Copy",
        excerpt: "Words shape how users feel about your product. Learn the psychological principles behind copy that converts.",
        cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=450&fit=crop",
        category: "Design",
        date: "May 30, 2025",
        readTime: 7,
        views: 4210,
        likes: 198,
        bookmarks: 67,
    },
];

const tabs = ["All", "Technology", "Design", "Health"];

export default function ProfileBlogGrid() {
    const [activeTab, setActiveTab] = useState("All");

    const filtered =
        activeTab === "All" ? blogs : blogs.filter((b) => b.category === activeTab);

    return (
        <div>
            {/* Section heading + tabs */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                    Articles
                </h2>

                <div className="flex items-center gap-1 border border-stone-200 rounded-xl bg-white p-1">
                    {tabs.map((tab) => (
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
                            key={blog.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.05 * i }}
                            className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                        >
                            <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                                <img
                                    src={blog.cover}
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