import { motion } from "motion/react";
import { Eye, Heart, MessageSquare, Bookmark, MoreHorizontal, Edit2, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const statusStyles = {
    Published: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Draft: "bg-amber-50 text-amber-600 border-amber-100",
    Archived: "bg-stone-100 text-stone-500 border-stone-200",
};

export default function RecentBlogRow({ blog, delay = 0 }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay, ease: "easeOut" }}
            className="group flex items-center gap-4 py-4 border-b border-stone-100 last:border-0 hover:bg-stone-50/60 -mx-2 px-2 rounded-xl transition-colors duration-200"
        >
            {/* Cover thumbnail */}
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${statusStyles[blog.status] ?? statusStyles["Draft"]
                            }`}
                    >
                        {blog.status}
                    </span>
                    <span className="text-xs text-stone-400">{blog.category}</span>
                </div>
                <p className="text-sm font-semibold text-stone-800 truncate leading-snug">
                    {blog.title}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{blog.date}</p>
            </div>

            {/* Stats — hidden on small screens */}
            <div className="hidden lg:flex items-center gap-5 text-xs text-stone-400 flex-shrink-0">
                <span className="flex items-center gap-1.5">
                    <Eye size={13} />
                    {blog.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1.5">
                    <Heart size={13} />
                    {blog.likes}
                </span>
                <span className="flex items-center gap-1.5">
                    <MessageSquare size={13} />
                    {blog.comments}
                </span>
                <span className="flex items-center gap-1.5">
                    <Bookmark size={13} />
                    {blog.bookmarks}
                </span>
            </div>

            {/* Actions */}
            <div className="relative flex-shrink-0">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <MoreHorizontal size={16} />
                </button>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-10 w-44 bg-white border border-stone-200 rounded-xl shadow-lg z-20 overflow-hidden"
                        >
                            {[
                                { icon: Edit2, label: "Edit post" },
                                { icon: ExternalLink, label: "View live" },
                                { icon: Trash2, label: "Delete", danger: true },
                            ].map(({ icon: Icon, label, danger }) => (
                                <button
                                    key={label}
                                    onClick={() => setMenuOpen(false)}
                                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-stone-50 ${danger ? "text-red-500 hover:bg-red-50" : "text-stone-700"
                                        }`}
                                >
                                    <Icon size={14} />
                                    {label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}