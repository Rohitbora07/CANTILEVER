import { motion } from "motion/react";

export default function SettingsSection({ title, description, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden"
        >
            {/* Section header */}
            <div className="px-7 py-5 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">{title}</h2>
                {description && (
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Content */}
            <div className="px-7 py-6">{children}</div>
        </motion.div>
    );
}