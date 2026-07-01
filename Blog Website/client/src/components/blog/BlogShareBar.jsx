import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Bookmark, Link2, Check } from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa"

export default function BlogShareBar() {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [likes, setLikes] = useState(724);
    const [bookmarks, setBookmarks] = useState(215);

    const handleLike = () => {
        setLiked(!liked);
        setLikes((n) => (liked ? n - 1 : n + 1));
    };
    const handleSave = () => {
        setSaved(!saved);
        setBookmarks((n) => (saved ? n - 1 : n + 1));
    };
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-row lg:flex-col items-center gap-3"
        >
            {/* Like */}
            <div className="flex flex-col items-center gap-1">
                <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${liked
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-white border-stone-200 text-stone-400 hover:border-red-200 hover:text-red-400"
                        }`}
                >
                    <Heart size={17} fill={liked ? "currentColor" : "none"} />
                </motion.button>
                <span className="text-[10px] font-medium text-stone-400">{likes}</span>
            </div>

            {/* Bookmark */}
            <div className="flex flex-col items-center gap-1">
                <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${saved
                            ? "bg-[#E0F0FF] border-[#C8D8E8] text-[#0077CC]"
                            : "bg-white border-stone-200 text-stone-400 hover:border-[#C8D8E8] hover:text-[#0077CC]"
                        }`}
                >
                    <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
                </motion.button>
                <span className="text-[10px] font-medium text-stone-400">{bookmarks}</span>
            </div>

            <div className="w-full h-px bg-stone-100 hidden lg:block" />

            {/* Twitter */}
            <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 transition-all"
            >
                <FaTwitter size={15} />
            </motion.button>

            {/* LinkedIn */}
            <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 transition-all"
            >
                <FaLinkedin size={15} />
            </motion.button>

            {/* Facebook */}
            <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 transition-all"
            >
                <FaFacebook size={15} />
            </motion.button>

            <div className="w-full h-px bg-stone-100 hidden lg:block" />

            {/* Copy link */}
            <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${copied
                        ? "bg-emerald-50 border-emerald-200 text-emerald-500"
                        : "bg-white border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-700"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span
                            key="check"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Check size={15} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="link"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Link2 size={15} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
}