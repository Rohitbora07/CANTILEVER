import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatsCard({ icon: Icon, label, value, change, changeLabel, color, delay = 0 }) {
    const isPositive = change > 0;
    const isNeutral = change === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: color + "18" }}
                >
                    <Icon size={18} style={{ color }} />
                </div>

                <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${isNeutral
                            ? "bg-stone-100 text-stone-500"
                            : isPositive
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                        }`}
                >
                    {isNeutral ? (
                        <Minus size={11} />
                    ) : isPositive ? (
                        <TrendingUp size={11} />
                    ) : (
                        <TrendingDown size={11} />
                    )}
                    {isNeutral ? "No change" : `${isPositive ? "+" : ""}${change}%`}
                </span>
            </div>

            <p className="text-2xl font-bold text-stone-900 mb-1 tracking-tight">
                {value}
            </p>
            <p className="text-sm text-stone-500 font-medium">{label}</p>
            {changeLabel && (
                <p className="text-xs text-stone-400 mt-1">{changeLabel}</p>
            )}
        </motion.div>
    );
}