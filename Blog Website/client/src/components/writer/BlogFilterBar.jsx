import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const tabs = ["All", "Published", "Draft"];

const sortOptions = [
    "Newest first",
    "Oldest first",
    "Most viewed",
    "Most liked",
    "Most commented",
];

const categories = [
    "All categories",
    "Technology",
    "Design",
    "Business",
    "Science",
    "Culture",
    "Health",
    "Travel",
];

export default function BlogsFilterBar({ activeTab, onTabChange, onSearch }) {
    const [sortOpen, setSortOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const [sort, setSort] = useState("Newest first");
    const [category, setCategory] = useState("All categories");

    return (
        <div className="space-y-4">
            {/* Status tabs */}
            <div className="flex items-center gap-1 border-b border-stone-100 pb-0">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${activeTab === tab
                                ? "text-[#0077CC]"
                                : "text-stone-500 hover:text-stone-800"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="tab-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0077CC] rounded-full"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Search + filters row */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                        type="text"
                        placeholder="Search your posts…"
                        onChange={(e) => onSearch?.(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all"
                    />
                </div>

                {/* Category dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setCatOpen(!catOpen); setSortOpen(false); }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-600 hover:border-stone-300 transition-all focus:outline-none"
                    >
                        <SlidersHorizontal size={14} className="text-stone-400" />
                        {category}
                        <ChevronDown
                            size={13}
                            className={`text-stone-400 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    <AnimatePresence>
                        {catOpen && (
                            <motion.ul
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-20 top-full mt-1.5 right-0 w-48 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden"
                            >
                                {categories.map((c) => (
                                    <li key={c}>
                                        <button
                                            onClick={() => { setCategory(c); setCatOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-stone-50 ${category === c
                                                    ? "text-[#0077CC] font-medium bg-[#E0F0FF]"
                                                    : "text-stone-700"
                                                }`}
                                        >
                                            {c}
                                        </button>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setSortOpen(!sortOpen); setCatOpen(false); }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-600 hover:border-stone-300 transition-all focus:outline-none"
                    >
                        {sort}
                        <ChevronDown
                            size={13}
                            className={`text-stone-400 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    <AnimatePresence>
                        {sortOpen && (
                            <motion.ul
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-20 top-full mt-1.5 right-0 w-48 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden"
                            >
                                {sortOptions.map((s) => (
                                    <li key={s}>
                                        <button
                                            onClick={() => { setSort(s); setSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-stone-50 ${sort === s
                                                    ? "text-[#0077CC] font-medium bg-[#E0F0FF]"
                                                    : "text-stone-700"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}