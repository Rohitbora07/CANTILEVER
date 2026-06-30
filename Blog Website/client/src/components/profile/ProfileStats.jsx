import { motion } from "motion/react";
import { Eye, Heart, FileText, Users } from "lucide-react";

const stats = [
    { icon: FileText, label: "Articles", value: "34", color: "#0077CC", bg: "#E0F0FF" },
    { icon: Eye, label: "Total views", value: "48.3k", color: "#7c3aed", bg: "#f5f3ff" },
    { icon: Heart, label: "Total likes", value: "12.8k", color: "#e11d48", bg: "#fff1f2" },
    { icon: Users, label: "Followers", value: "2,140", color: "#059669", bg: "#ecfdf5" },
];

export default function ProfileStats() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-7">
            {stats.map(({ icon: Icon, label, value, color, bg }, i) => (
                <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 * i }}
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