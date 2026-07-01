import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenLine, ChevronLeft, ChevronRight, Eye, ThumbsUp, MessageSquare } from "lucide-react";
import BlogsFilterBar from "../../components/writer/BlogFilterBar";
import BlogGridCard from "../../components/writer/BlogGridCard";
import { useParams } from "react-router-dom";
import { USER_BLOGS } from "../../constants/route";
import api from "../../api/axios";
import userAuthStore from "../../store/authStore";

const ITEMS_PER_PAGE = 6;

export default function MyBlogs() {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [editable, setEditable] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userId } = useParams();
    const user = userAuthStore((state) => state.user);

    useEffect(() => {
        const getUserBlogs = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(USER_BLOGS(userId));
                setBlogs(data.blogs);
                if (userId === user?._id || (data.blogs && data.blogs.length > 0 && data.blogs[0].author?._id === user?._id)) {
                    setEditable(true);
                }
            } catch (error) {
                console.error("Error fetching user blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        if (userId) getUserBlogs();
    }, [userId, user]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1);
    };

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch =
            blog.title?.toLowerCase().includes(search.toLowerCase()) ||
            blog.category?.toLowerCase().includes(search.toLowerCase()) ||
            blog.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

        if (activeTab === "All") return matchesSearch;

        const matchesTab =
            blog.status?.toLowerCase() === activeTab.toLowerCase() ||
            blog.category?.toLowerCase() === activeTab.toLowerCase();

        return matchesSearch && matchesTab;
    });

    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const paginatedBlogs = filteredBlogs.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const stats = {
        totalViews: blogs.reduce((acc, curr) => acc + (curr.views || 0), 0),
        totalLikes: blogs.reduce((acc, curr) => acc + (curr.likes || 0), 0),
        totalComments: blogs.reduce((acc, curr) => acc + (curr.commentsCount || 0), 0),
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0077CC]"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen bg-stone-50 mt-20 md:mt-28"
        >
            <header className="bg-white border-b border-stone-100 sticky top-0 z-20 shadow-xs">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-base font-semibold text-stone-800">
                            {editable ? "My posts" : "User posts"}
                        </h1>
                        <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                            {filteredBlogs.length}
                        </span>
                    </div>
                </div>
            </header>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-8">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-3 gap-4 mb-8 text-center sm:text-left"
                >
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-xl text-[#0077CC]"><Eye size={18} /></div>
                        <div>
                            <p className="text-xs text-stone-400 font-medium uppercase">Total Views</p>
                            <p className="text-lg font-bold text-stone-800">{stats.totalViews}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                        <div className="p-2 bg-rose-50 rounded-xl text-rose-500"><ThumbsUp size={17} /></div>
                        <div>
                            <p className="text-xs text-stone-400 font-medium uppercase">Likes Received</p>
                            <p className="text-lg font-bold text-stone-800">{stats.totalLikes}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><MessageSquare size={17} /></div>
                        <div>
                            <p className="text-xs text-stone-400 font-medium uppercase">Comments</p>
                            <p className="text-lg font-bold text-stone-800">{stats.totalComments}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs mb-6"
                >
                    <BlogsFilterBar
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        onSearch={handleSearch}
                    />
                </motion.div>

                <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-stone-500">
                        Showing{" "}
                        <span className="font-semibold text-stone-700">
                            {filteredBlogs.length}
                        </span>{" "}
                        post{filteredBlogs.length !== 1 ? "s" : ""}
                        {activeTab !== "All" && (
                            <span className="text-stone-400"> in {activeTab}</span>
                        )}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {paginatedBlogs.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
                                <PenLine size={22} className="text-stone-300" />
                            </div>
                            <h3 className="text-stone-700 font-semibold mb-1">
                                No posts found
                            </h3>
                            <p className="text-sm text-stone-400 max-w-xs px-4">
                                {search
                                    ? `No posts match "${search}". Try a different search term.`
                                    : `There aren't any "${activeTab}" posts available right now.`}
                            </p>
                        </motion.div>
                    ) :  (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {paginatedBlogs.map((blog, i) => (
                                <BlogGridCard key={blog._id} blog={blog} delay={0.04 * i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination Controls */}
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
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-white"
                        >
                            <ChevronLeft size={15} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${page === p
                                        ? "bg-[#0077CC] text-white border border-[#0077CC]"
                                        : "border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50 bg-white"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-white"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}