import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenLine, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import BlogsFilterBar from "../../components/writer/BlogFilterBar";
import BlogGridCard from "../../components/writer/BlogGridCard";
import BlogListRow from "../../components/writer/BlogListRow";

const allBlogs = [
    {
        id: 1,
        title: "The Art of Minimalist Design in Modern Web Development",
        excerpt: "Exploring how removing friction from interfaces creates more intuitive and beautiful user experiences across platforms.",
        cover: "https://images.unsplash.com/photo-1545239351-cefa43af60f3?w=600&h=400&fit=crop",
        status: "Published",
        category: "Design",
        date: "Jun 24, 2025",
        views: 5820,
        likes: 312,
        comments: 47,
        bookmarks: 88,
        readTime: 6,
    },
    {
        id: 2,
        title: "Why TypeScript Is No Longer Optional for Serious Projects",
        excerpt: "A deep dive into how TypeScript's type system saves thousands of hours in debugging and makes large codebases manageable.",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        status: "Published",
        category: "Technology",
        date: "Jun 18, 2025",
        views: 11430,
        likes: 724,
        comments: 103,
        bookmarks: 215,
        readTime: 9,
    },
    {
        id: 3,
        title: "Building with Vite in 2025: A Complete Setup Guide",
        excerpt: "Everything you need to know about setting up a modern Vite project with React, Tailwind, and all the tooling you need.",
        cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
        status: "Published",
        category: "Technology",
        date: "Jun 10, 2025",
        views: 8940,
        likes: 519,
        comments: 76,
        bookmarks: 142,
        readTime: 11,
    },
    {
        id: 4,
        title: "The Psychology Behind Great Product Copy",
        excerpt: "Words shape how users feel about your product. Learn the psychological principles behind copy that converts and retains.",
        cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
        status: "Published",
        category: "Design",
        date: "May 30, 2025",
        views: 4210,
        likes: 198,
        comments: 31,
        bookmarks: 67,
        readTime: 7,
    },
    {
        id: 5,
        title: "A Beginner's Guide to Motion Design with Framer Motion",
        excerpt: "From zero to beautiful animations — a complete walkthrough of Motion React for React developers building delightful UIs.",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
        status: "Draft",
        category: "Design",
        date: "Jun 26, 2025",
        views: 0,
        likes: 0,
        comments: 0,
        bookmarks: 0,
        readTime: 8,
    },
    {
        id: 6,
        title: "State Management in 2025: Do You Still Need Redux?",
        excerpt: "With Zustand, Jotai, and React Query maturing rapidly, is Redux still worth reaching for on new projects in 2025?",
        cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        status: "Draft",
        category: "Technology",
        date: "Jun 25, 2025",
        views: 0,
        likes: 0,
        comments: 0,
        bookmarks: 0,
        readTime: 10,
    },
    {
        id: 7,
        title: "How Remote Work Changed the Way We Think About Productivity",
        excerpt: "Three years after the great experiment, what have we actually learned about focus, output, and the office's real purpose?",
        cover: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop",
        status: "Archived",
        category: "Business",
        date: "Jan 12, 2025",
        views: 3100,
        likes: 145,
        comments: 22,
        bookmarks: 40,
        readTime: 5,
    },
    {
        id: 8,
        title: "Designing for Accessibility: Beyond the Basics",
        excerpt: "Accessibility isn't a checkbox — it's a design philosophy that makes products better for everyone, not just those with disabilities.",
        cover: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
        status: "Published",
        category: "Design",
        date: "May 15, 2025",
        views: 2870,
        likes: 177,
        comments: 29,
        bookmarks: 55,
        readTime: 6,
    },
];

const ITEMS_PER_PAGE = 6;

export default function MyBlogs() {
    const [activeTab, setActiveTab] = useState("All");
    const [viewMode, setViewMode] = useState("grid");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = allBlogs.filter((b) => {
        const matchTab =
            activeTab === "All" || b.status === activeTab;
        const matchSearch =
            !search ||
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.category.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1);
    };

    const handleSearch = (val) => {
        setSearch(val);
        setPage(1);
    };

    const counts = {
        All: allBlogs.length,
        Published: allBlogs.filter((b) => b.status === "Published").length,
        Draft: allBlogs.filter((b) => b.status === "Draft").length,
        Archived: allBlogs.filter((b) => b.status === "Archived").length,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen bg-stone-50 mt-28"
        >
            {/* Top header */}
            <header className="bg-white border-b border-stone-100 sticky top-0 z-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-sm font-semibold text-stone-800">My posts</h1>
                        <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                            {allBlogs.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* View toggle */}
                        <div className="hidden sm:flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                            {[
                                { mode: "grid", icon: LayoutGrid },
                                { mode: "list", icon: List },
                            ].map(({ mode, icon: Icon }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === mode
                                            ? "bg-[#E0F0FF] text-[#0077CC]"
                                            : "text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                                        }`}
                                >
                                    <Icon size={15} />
                                </button>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 bg-[#0077CC] hover:bg-[#005FA3] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                            <PenLine size={14} />
                            New post
                        </motion.button>
                    </div>
                </div>
            </header>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-8">

                {/* Summary pills */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 mb-6 flex-wrap"
                >
                    {Object.entries(counts).map(([label, count]) => (
                        <div key={label} className="flex items-center gap-1.5 text-xs text-stone-500">
                            <span className="font-semibold text-stone-800">{count}</span>
                            {label}
                        </div>
                    ))}
                </motion.div>

                {/* Filter bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-6"
                >
                    <BlogsFilterBar
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        onSearch={handleSearch}
                    />
                </motion.div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-stone-500">
                        Showing{" "}
                        <span className="font-semibold text-stone-700">
                            {filtered.length}
                        </span>{" "}
                        post{filtered.length !== 1 ? "s" : ""}
                        {activeTab !== "All" && (
                            <span className="text-stone-400"> in {activeTab}</span>
                        )}
                    </p>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {paginated.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
                                <PenLine size={22} className="text-stone-300" />
                            </div>
                            <h3 className="text-stone-700 font-semibold mb-1">
                                No posts found
                            </h3>
                            <p className="text-sm text-stone-400 max-w-xs">
                                {search
                                    ? `No posts match "${search}". Try a different search term.`
                                    : `You don't have any ${activeTab.toLowerCase()} posts yet.`}
                            </p>
                            {!search && (
                                <button className="mt-5 flex items-center gap-2 bg-[#0077CC] hover:bg-[#005FA3] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                                    <PenLine size={14} />
                                    Write your first post
                                </button>
                            )}
                        </motion.div>
                    ) : viewMode === "grid" ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                        >
                            {paginated.map((blog, i) => (
                                <BlogGridCard key={blog.id} blog={blog} delay={0.04 * i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden px-6"
                        >
                            {paginated.map((blog, i) => (
                                <BlogListRow key={blog.id} blog={blog} delay={0.04 * i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-2 mt-10"
                    >
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={15} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${page === p
                                        ? "bg-[#0077CC] text-white border border-[#0077CC]"
                                        : "border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}