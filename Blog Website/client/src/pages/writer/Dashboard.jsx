import { motion } from "motion/react";
import {
    Eye,
    Heart,
    Bookmark,
    FileText,
    TrendingUp,
    ArrowRight,
} from "lucide-react";
import StatsCard from "../../components/writer/StatusCard";
import RecentBlogRow from "../../components/writer/RecentBlogRow";
import QuickActions from "../../components/writer/QuickAction";
const stats = [
    {
        icon: Eye,
        label: "Total views",
        value: "48,291",
        change: 12,
        changeLabel: "vs last 30 days",
        color: "#0077CC",
    },
    {
        icon: Heart,
        label: "Total likes",
        value: "3,847",
        change: 8,
        changeLabel: "vs last 30 days",
        color: "#e11d48",
    },
    {
        icon: Bookmark,
        label: "Bookmarks",
        value: "1,203",
        change: -3,
        changeLabel: "vs last 30 days",
        color: "#7c3aed",
    },
    {
        icon: FileText,
        label: "Published posts",
        value: "34",
        change: 0,
        changeLabel: "2 drafts in progress",
        color: "#059669",
    },
];

const recentBlogs = [
    {
        title: "The Art of Minimalist Design in Modern Web Development",
        cover:
            "https://images.unsplash.com/photo-1545239351-cefa43af60f3?w=120&h=120&fit=crop",
        status: "Published",
        category: "Design",
        date: "Jun 24, 2025",
        views: 5820,
        likes: 312,
        comments: 47,
        bookmarks: 88,
    },
    {
        title: "Why TypeScript Is No Longer Optional for Serious Projects",
        cover:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&h=120&fit=crop",
        status: "Published",
        category: "Technology",
        date: "Jun 18, 2025",
        views: 11430,
        likes: 724,
        comments: 103,
        bookmarks: 215,
    },
    {
        title: "Building with Vite in 2025: A Complete Setup Guide",
        cover:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=120&h=120&fit=crop",
        status: "Published",
        category: "Technology",
        date: "Jun 10, 2025",
        views: 8940,
        likes: 519,
        comments: 76,
        bookmarks: 142,
    },
    {
        title: "A Beginner's Guide to Motion Design with Framer Motion",
        cover:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop",
        status: "Draft",
        category: "Design",
        date: "Jun 26, 2025",
        views: 0,
        likes: 0,
        comments: 0,
        bookmarks: 0,
    },
    {
        title: "State Management in 2025: Do You Still Need Redux?",
        cover:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&h=120&fit=crop",
        status: "Draft",
        category: "Technology",
        date: "Jun 25, 2025",
        views: 0,
        likes: 0,
        comments: 0,
        bookmarks: 0,
    },
];

const analyticsData = [
    { day: "Mon", views: 620 },
    { day: "Tue", views: 890 },
    { day: "Wed", views: 1140 },
    { day: "Thu", views: 780 },
    { day: "Fri", views: 1320 },
    { day: "Sat", views: 960 },
    { day: "Sun", views: 540 },
];

const maxViews = Math.max(...analyticsData.map((d) => d.views));

export default function WriterDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-stone-50 mt-20"
        >

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-8">

                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-stone-900 font-serif">
                        Good morning, Alex 👋
                    </h2>
                    <p className="text-stone-500 text-sm mt-1">
                        Here's how your content is performing this week.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatsCard key={stat.label} {...stat} delay={0.05 * i} />
                    ))}
                </div>

                {/* Main two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left: Recent blogs + Analytics */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Analytics mini chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-sm font-semibold text-stone-800">
                                        Views this week
                                    </h2>
                                    <p className="text-xs text-stone-400 mt-0.5">
                                        Jun 20 – Jun 26, 2025
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                    <TrendingUp size={12} />
                                    +12% this week
                                </div>
                            </div>

                            {/* Bar chart */}
                            <div className="flex items-end gap-2.5 h-32">
                                {analyticsData.map((d, i) => (
                                    <motion.div
                                        key={d.day}
                                        initial={{ scaleY: 0, originY: 1 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                                        className="flex-1 flex flex-col items-center gap-1.5"
                                        style={{ originY: "bottom" }}
                                    >
                                        <div className="w-full relative group" style={{ height: "96px" }}>
                                            <div
                                                className="absolute bottom-0 w-full rounded-t-lg bg-[#E0F0FF] hover:bg-[#0077CC] transition-colors duration-200 cursor-pointer"
                                                style={{
                                                    height: `${(d.views / maxViews) * 96}px`,
                                                }}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    {d.views.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-stone-400 font-medium">
                                            {d.day}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent blogs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden"
                        >
                            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-stone-800">
                                    Recent posts
                                </h2>
                                <button className="flex items-center gap-1 text-xs text-[#0077CC] hover:text-[#005FA3] font-medium transition-colors">
                                    View all
                                    <ArrowRight size={12} />
                                </button>
                            </div>

                            <div className="px-6 py-2">
                                {recentBlogs.map((blog, i) => (
                                    <RecentBlogRow key={blog.title} blog={blog} delay={0.05 * i} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Quick actions + Activity */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <QuickActions />
                        </motion.div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}