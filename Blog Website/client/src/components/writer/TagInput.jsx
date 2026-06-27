import { useState, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TagInput() {
    const [tags, setTags] = useState(["Design", "Technology"]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const addTag = (value) => {
        const trimmed = value.trim().replace(/,+$/, "");
        if (trimmed && !tags.includes(trimmed) && tags.length < 8) {
            setTags([...tags, trimmed]);
        }
        setInput("");
    };

    const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(input);
        }
        if (e.key === "Backspace" && !input && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
                Tags
                <span className="ml-2 text-stone-400 font-normal text-xs">
                    Up to 8 tags
                </span>
            </label>
            <div
                onClick={() => inputRef.current?.focus()}
                className="min-h-[48px] w-full rounded-xl border border-stone-200 bg-white px-3 py-2 flex flex-wrap gap-2 cursor-text focus-within:border-[#0077CC] focus-within:ring-2 focus-within:ring-[#E0F0FF] transition-all"
            >
                <AnimatePresence>
                    {tags.map((tag) => (
                        <motion.span
                            key={tag}
                            className="flex items-center gap-1.5 bg-[#E0F0FF] text-[#005FA3] text-xs font-medium px-3 py-1 rounded-lg"
                        >
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="text-[#0077CC] hover:text-[#005FA3] transition-colors"
                            >
                                <X size={11} />
                            </button>
                        </motion.span>
                    ))}
                </AnimatePresence>
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => { if (input.trim()) addTag(input); }}
                    placeholder={tags.length === 0 ? "Add tags…" : ""}
                    className="flex-1 min-w-[120px] outline-none text-sm text-stone-700 placeholder:text-stone-400 bg-transparent py-0.5"
                />
            </div>
            <p className="text-xs text-stone-400 mt-1.5">
                Press Enter or comma to add a tag
            </p>
        </div>
    );
}