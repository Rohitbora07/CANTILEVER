import { motion } from "motion/react";
import { Heart, MessageSquare, Bookmark, UserPlus, Eye } from "lucide-react";

const iconMap = {
    like: { icon: Heart, color: "#e11d48", bg: "#fff1f2" },
    comment: { icon: MessageSquare, color: "#0077CC", bg: "#E0F0FF" },
    bookmark: { icon: Bookmark, color: "#7c3aed", bg: "#f5f3ff" },
    follow: { icon: UserPlus, color: "#059669", bg: "#ecfdf5" },
    view: { icon: Eye, color: "#d97706", bg: "#fffbeb" },
};

const activities = [
    {
        type: "like",
        user: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
        action: "liked your post",
        target: "The Art of Minimalist Design",
        time: "2m ago",
    },
    {
        type: "comment",
        user: "James Okafor",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        action: "commented on",
        target: "Why TypeScript Matters",
        time: "14m ago",
    },
    {
        type: "bookmark",
        user: "Priya Nair",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        action: "bookmarked",
        target: "Building with Vite in 2025",
        time: "1h ago",
    },
    {
        type: "follow",
        user: "Tom Brennan",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        action: "started following you",
        target: null,
        time: "3h ago",
    },
    {
        type: "view",
        user: "Anonymous",
        avatar: null,
        action: "Your post hit",
        target: "1,000 views",
        time: "5h ago",
    },
];

export default function ActivityFeed() {
    return (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-100">
                <h2 className="text-sm font-semibold text-stone-800">
                    Recent activity
                </h2>
            </div>

            <ul className="divide-y divide-stone-100">
                {activities.map((item, i) => {
                    const { icon: Icon, color, bg } = iconMap[item.type];
                    return (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 * i }}
                            className="flex items-start gap-3 px-6 py-4 hover:bg-stone-50/50 transition-colors"
                        >
                            {/* Avatar or icon */}
                            <div className="relative flex-shrink-0">
                                {item.avatar ? (
                                    <img
                                        src={item.avatar}
                                        alt={item.user}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-stone-500"
                                        style={{ background: bg }}
                                    >
                                        ?
                                    </div>
                                )}
                                <span
                                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                                    style={{ background: bg }}
                                >
                                    <Icon size={9} style={{ color }} />
                                </span>
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    <span className="font-semibold text-stone-800">
                                        {item.user}
                                    </span>{" "}
                                    {item.action}
                                    {item.target && (
                                        <>
                                            {" "}
                                            <span className="font-medium text-[#0077CC]">
                                                {item.target}
                                            </span>
                                        </>
                                    )}
                                </p>
                                <p className="text-[10px] text-stone-400 mt-0.5">{item.time}</p>
                            </div>
                        </motion.li>
                    );
                })}
            </ul>

            <div className="px-6 py-3 border-t border-stone-100">
                <button className="text-xs text-[#0077CC] hover:text-[#005FA3] font-medium transition-colors">
                    View all activity →
                </button>
            </div>
        </div>
    );
}