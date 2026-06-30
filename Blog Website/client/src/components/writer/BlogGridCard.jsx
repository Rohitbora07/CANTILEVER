import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Eye, Heart, MessageSquare, Bookmark,
    MoreHorizontal, Edit2, Trash2, ExternalLink, Copy,
} from "lucide-react";

const statusStyles = {
    Published: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    Draft: "bg-amber-50  text-amber-600  border border-amber-100",
    Archived: "bg-stone-100 text-stone-500  border border-stone-200",
};

export default function BlogGridCard({ blog, delay = 0 }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay, ease: "easeOut" }}
            className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
            {/* Cover */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Status badge */}
                <span
                    className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm ${statusStyles[blog.status]}`}
                >
                    {blog.status}
                </span>

                {/* Menu button */}
                <div className="absolute top-3 right-3">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm text-stone-600 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                        <MoreHorizontal size={15} />
                    </button>

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.ul
                                initial={{ opacity: 0, scale: 0.94, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-10 w-44 bg-white border border-stone-200 rounded-xl shadow-lg z-20 overflow-hidden"
                            >
                                {[
                                    { icon: Edit2, label: "Edit post" },
                                    { icon: ExternalLink, label: "View live" },
                                    { icon: Copy, label: "Duplicate" },
                                    { icon: Trash2, label: "Delete", danger: true },
                                ].map(({ icon: Icon, label, danger }) => (
                                    <li key={label}>
                                        <button
                                            onClick={() => setMenuOpen(false)}
                                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-stone-50 ${danger ? "text-red-500 hover:bg-red-50" : "text-stone-700"
                                                }`}
                                        >
                                            <Icon size={14} />
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Body */}
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[10px] font-semibold text-[#0077CC] bg-[#E0F0FF] px-2 py-0.5 rounded-md">
                        {blog.category}
                    </span>
                    <span className="text-[10px] text-stone-400">{blog.date}</span>
                </div>

                <h3 className="text-sm font-semibold text-stone-900 leading-snug line-clamp-2 mb-2 font-serif">
                    {blog.title}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-4">
                    {blog.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-stone-400 pt-4 border-t border-stone-100">
                    <span className="flex items-center gap-1.5">
                        <Eye size={12} /> {blog.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Heart size={12} /> {blog.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MessageSquare size={12} /> {blog.comments}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Bookmark size={12} /> {blog.bookmarks}
                    </span>

                    <div className="flex-1" />

                    <span className="text-stone-300">{blog.readTime} min read</span>
                </div>
            </div>
        </motion.div>
    );
}