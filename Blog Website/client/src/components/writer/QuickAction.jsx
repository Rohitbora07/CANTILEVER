import { motion } from "motion/react";
import { PenLine, BarChart2, BookOpen, Settings, Users, Rss } from "lucide-react";

const actions = [
    {
        icon: PenLine,
        label: "New post",
        description: "Start writing",
        color: "#0077CC",
        bg: "#E0F0FF",
        primary: true,
    },
    {
        icon: BarChart2,
        label: "Analytics",
        description: "View insights",
        color: "#7c3aed",
        bg: "#f5f3ff",
    },
    {
        icon: BookOpen,
        label: "My blogs",
        description: "Manage posts",
        color: "#059669",
        bg: "#ecfdf5",
    },
    {
        icon: Users,
        label: "Audience",
        description: "Your followers",
        color: "#d97706",
        bg: "#fffbeb",
    },
    {
        icon: Rss,
        label: "Newsletter",
        description: "Manage list",
        color: "#e11d48",
        bg: "#fff1f2",
    },
    {
        icon: Settings,
        label: "Settings",
        description: "Edit profile",
        color: "#64748b",
        bg: "#f1f5f9",
    },
];

export default function QuickActions() {
    return (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-100">
                <h2 className="text-sm font-semibold text-stone-800">Quick actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2.5">
                {actions.map(({ icon: Icon, label, description, color, bg, primary }, i) => (
                    <motion.button
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * i }}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 border ${primary
                                ? "bg-[#0077CC] border-[#0077CC] hover:bg-[#005FA3] hover:border-[#005FA3]"
                                : "bg-stone-50 border-stone-100 hover:bg-stone-100 hover:border-stone-200"
                            }`}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={
                                primary
                                    ? { background: "rgba(255,255,255,0.2)" }
                                    : { background: bg }
                            }
                        >
                            <Icon
                                size={16}
                                style={primary ? { color: "#fff" } : { color }}
                            />
                        </div>
                        <div className="min-w-0">
                            <p
                                className={`text-xs font-semibold truncate ${primary ? "text-white" : "text-stone-800"
                                    }`}
                            >
                                {label}
                            </p>
                            <p
                                className={`text-[10px] truncate mt-0.5 ${primary ? "text-blue-100" : "text-stone-400"
                                    }`}
                            >
                                {description}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}