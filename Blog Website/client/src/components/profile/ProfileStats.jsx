import { motion } from "motion/react";
import { Eye, Heart, Users, FileText } from "lucide-react";



export default function ProfileStats({user}) {
    const stats = [
    { icon: Heart, label: "Total likes", value: user?.totalLikes, color: "#e11d48", bg: "#fff1f2" },
    { icon: Users, label: "Followers", value: user?.followers, color: "#059669", bg: "#ecfdf5" },
    { icon: Users, label: "Following", value: user?.following, color: "#2563eb", bg: "#eff6ff" },
    { icon: Eye, label: "Total views", value: user?.totalViews, color: "#f59e0b", bg: "#fffbeb" },
    { icon: FileText, label: "Total blogs", value: user?.totalBlogs, color: "#7c3aed", bg: "#f3e8ff" }
];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-7">
            {stats.map(({ icon: Icon, label, value, color, bg }) => (
                <motion.div
                    key={label}
                    className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex items-center gap-4"
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: bg }}
                    >
                        <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-stone-900 leading-none mb-0.5">
                            {value}
                        </p>
                        <p className="text-xs text-stone-500 font-medium">{label}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}