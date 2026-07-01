import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Heart, Reply, ChevronDown } from "lucide-react";

const initialComments = [
    {
        id: 1,
        author: "James Okafor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        date: "Jun 19, 2025",
        text: "This is exactly what I needed. I've been on the fence about TypeScript for a new project and this sealed it. The refactoring argument alone is worth the learning curve.",
        likes: 24,
        liked: false,
        replies: [
            {
                id: 11,
                author: "Sarah Chen",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
                date: "Jun 19, 2025",
                text: "Thanks James! Yes, I find the refactoring story is always the most convincing thing for skeptics. Once you've done a major rename across 80 files without a single runtime bug, it's hard to go back.",
                likes: 8,
                liked: false,
                isAuthor: true,
            },
        ],
    },
    {
        id: 2,
        author: "Priya Nair",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        date: "Jun 20, 2025",
        text: "Great piece. One thing I'd add — the ecosystem support has become phenomenal. Almost every major library ships first-class types now, which removes the last major friction point.",
        likes: 17,
        liked: false,
        replies: [],
    },
    {
        id: 3,
        author: "Tom Brennan",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        date: "Jun 22, 2025",
        text: "The section on migration is gold. Most teams I know get paralyzed thinking they have to rewrite everything. Starting with strict: false and moving incrementally is genuinely the way.",
        likes: 11,
        liked: false,
        replies: [],
    },
];

function CommentItem({ comment, isReply = false }) {
    const [liked, setLiked] = useState(comment.liked);
    const [likes, setLikes] = useState(comment.likes);
    const [showReplyBox, setShowReplyBox] = useState(false);

    return (
        <div className={`flex gap-3.5 ${isReply ? "mt-4 ml-10" : ""}`}>
            <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
                <div className="bg-stone-50 rounded-2xl px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-semibold text-stone-800">
                            {comment.author}
                        </span>
                        {comment.isAuthor && (
                            <span className="text-[10px] font-bold text-white bg-[#0077CC] px-2 py-0.5 rounded-md">
                                Author
                            </span>
                        )}
                        <span className="text-xs text-stone-400">{comment.date}</span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{comment.text}</p>
                </div>

                <div className="flex items-center gap-4 mt-2 pl-1">
                    <button
                        onClick={() => { setLiked(!liked); setLikes((n) => liked ? n - 1 : n + 1); }}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? "text-red-500" : "text-stone-400 hover:text-red-400"
                            }`}
                    >
                        <Heart size={13} fill={liked ? "currentColor" : "none"} />
                        {likes}
                    </button>
                    {!isReply && (
                        <button
                            onClick={() => setShowReplyBox(!showReplyBox)}
                            className="flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-[#0077CC] transition-colors"
                        >
                            <Reply size={13} />
                            Reply
                        </button>
                    )}
                </div>

                {/* Reply box */}
                <AnimatePresence>
                    {showReplyBox && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 ml-0 overflow-hidden"
                        >
                            <div className="flex gap-3">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                                    alt="You"
                                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1"
                                />
                                <div className="flex-1">
                                    <textarea
                                        rows={2}
                                        placeholder="Write a reply…"
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all resize-none leading-relaxed"
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button
                                            onClick={() => setShowReplyBox(false)}
                                            className="text-xs text-stone-500 hover:text-stone-700 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button className="text-xs font-semibold text-white bg-[#0077CC] hover:bg-[#005FA3] px-4 py-1.5 rounded-lg transition-colors">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Nested replies */}
                {comment.replies?.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                ))}
            </div>
        </div>
    );
}

export default function BlogComments() {
    const [comment, setComment] = useState("");
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? initialComments : initialComments.slice(0, 2);

    return (
        <section className="mt-14">
            <div className="flex items-center gap-2.5 mb-7">
                <MessageSquare size={18} className="text-stone-700" />
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                    {initialComments.length} Comments
                </h2>
            </div>

            {/* Comment form */}
            <div className="flex gap-4 mb-8">
                <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                    alt="You"
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Share your thoughts on this article…"
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all resize-none leading-relaxed"
                    />
                    <AnimatePresence>
                        {comment.trim() && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2 }}
                                className="flex justify-end gap-2 mt-2"
                            >
                                <button
                                    onClick={() => setComment("")}
                                    className="text-sm text-stone-500 hover:text-stone-700 px-4 py-2 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="text-sm font-semibold text-white bg-[#0077CC] hover:bg-[#005FA3] px-5 py-2 rounded-xl transition-colors"
                                >
                                    Post comment
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Comment list */}
            <div className="space-y-6">
                {visible.map((c) => (
                    <CommentItem key={c.id} comment={c} />
                ))}
            </div>

            {!showAll && initialComments.length > 2 && (
                <button
                    onClick={() => setShowAll(true)}
                    className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[#0077CC] hover:text-[#005FA3] transition-colors"
                >
                    <ChevronDown size={15} />
                    Show {initialComments.length - 2} more comment{initialComments.length - 2 !== 1 ? "s" : ""}
                </button>
            )}
        </section>
    );
}