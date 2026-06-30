import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Trash2, Lock, ChevronDown } from "lucide-react";

function ExpandableAction({ icon: Icon, title, description, buttonLabel, buttonStyle, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-stone-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors text-left"
            >
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-stone-500" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800">{title}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{description}</p>
                </div>
                <ChevronDown
                    size={15}
                    className={`text-stone-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-1 border-t border-stone-100">
                            {children}
                            <div className="flex justify-end mt-4">
                                <button className={`text-sm font-semibold px-5 py-2 rounded-xl transition-colors ${buttonStyle}`}>
                                    {buttonLabel}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function DangerZone() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden"
        >
            <div className="px-7 py-5 border-b border-red-100 flex items-center gap-2.5">
                <AlertTriangle size={16} className="text-red-400" />
                <div>
                    <h2 className="text-base font-semibold text-stone-900">Danger zone</h2>
                    <p className="text-xs text-stone-400 mt-0.5">
                        These actions are permanent and cannot be reversed.
                    </p>
                </div>
            </div>

            <div className="px-7 py-6 space-y-3">
                {/* Change password */}
                <ExpandableAction
                    icon={Lock}
                    title="Change password"
                    description="Update the password used to sign in to your account."
                    buttonLabel="Update password"
                    buttonStyle="text-white bg-stone-800 hover:bg-stone-900"
                >
                    <div className="space-y-3 mt-3">
                        {[
                            { label: "Current password", placeholder: "Enter current password" },
                            { label: "New password", placeholder: "At least 8 characters" },
                            { label: "Confirm password", placeholder: "Repeat new password" },
                        ].map(({ label, placeholder }) => (
                            <div key={label}>
                                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                                    {label}
                                </label>
                                <input
                                    type="password"
                                    placeholder={placeholder}
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </ExpandableAction>

                {/* Delete account */}
                <ExpandableAction
                    icon={Trash2}
                    title="Delete account"
                    description="Permanently remove your account and all associated data."
                    buttonLabel="Delete my account"
                    buttonStyle="text-white bg-red-500 hover:bg-red-600"
                >
                    <div className="mt-3 p-3.5 bg-red-50 border border-red-100 rounded-xl mb-3">
                        <p className="text-xs text-red-600 leading-relaxed">
                            This will permanently delete your profile, all published articles,
                            comments, and account data. This action <strong>cannot</strong> be undone.
                        </p>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1.5">
                            Type <strong>DELETE</strong> to confirm
                        </label>
                        <input
                            type="text"
                            placeholder="DELETE"
                            className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm text-stone-700 placeholder:text-red-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                        />
                    </div>
                </ExpandableAction>
            </div>
        </motion.div>
    );
}