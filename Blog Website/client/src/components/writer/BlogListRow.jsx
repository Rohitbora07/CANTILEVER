import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Eye, Heart, MessageSquare, Bookmark,
    MoreHorizontal, Edit2, Trash2, ExternalLink, Copy,
} from "lucide-react";

const statusStyles = {
    Published: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Draft: "bg-amber-50  text-amber-600  border-amber-100",
    Archived: "bg-stone-100 text-stone-500  border-stone-200",
};

export default function BlogListRow({ blog, delay = 0 }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay, ease: "easeOut" }}
            className="group flex items-center gap-5 py-5 border-b border-stone-100 last:border-0 hover:bg-stone-50/60 -mx-6 px-6 transition-colors duration-200"
        >
            {/* Thumbnail */}
            <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Main info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${statusStyles[blog.status]}`}
                    >
                        {blog.status}
                    </span>
                    <span className="text-[10px] text-[#0077CC] font-medium">
                        {blog.category}
                    </span>
                    <span className="text-[10px] text-stone-400 hidden sm:inline">
                        · {blog.date}
                    </span>
                </div>
                <p className="text-sm font-semibold text-stone-800 truncate font-serif">
                    {blog.title}
                </p>
                <p className="text-xs text-stone-400 mt-0.5 truncate hidden md:block">
                    {blog.excerpt}
                </p>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex items-center gap-5 flex-shrink-0 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                    <Eye size={13} /> {blog.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1.5">
                    <Heart size={13} /> {blog.likes}
                </span>
                <span className="flex items-center gap-1.5">
                    <MessageSquare size={13} /> {blog.comments}
                </span>
                <span className="flex items-center gap-1.5">
                    <Bookmark size={13} /> {blog.bookmarks}
                </span>
            </div>

            {/* Read time */}
            <span className="hidden xl:block text-xs text-stone-300 flex-shrink-0">
                {blog.readTime} min
            </span>

            {/* Context menu */}
            <div className="relative flex-shrink-0">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <MoreHorizontal size={16} />
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
        </motion.div>
    );
}