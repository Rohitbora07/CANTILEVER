import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown} from "lucide-react"; 
const Select = ({ label, value, onChange, options }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <label className="block text-sm font-medium text-stone-700 mb-2">
                {label}
            </label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-700 hover:border-stone-300 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all"
            >
                <span className={value ? "text-stone-800" : "text-stone-400"}>
                    {value || `Select ${label}`}
                </span>
                <ChevronDown
                    size={15}
                    className={`text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden max-h-52 overflow-y-auto"
                    >
                        {options.map((opt) => (
                            <li key={opt}>
                                <button
                                    type="button"
                                    onClick={() => { onChange(opt); setOpen(false); }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-stone-50 ${value === opt ? "text-[#0077CC] font-medium bg-[#E0F0FF]" : "text-stone-700"
                                        }`}
                                >
                                    {opt}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Select