import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";




export default function ProfileSidebar({ blogs }) {
    const navigate = useNavigate();

    return (
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-5">

            {/* Top posts */}
            <div
                className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden"
            >
                <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-2">
                    <TrendingUp size={14} className="text-[#0077CC]" />
                    <h3 className="text-sm font-semibold text-stone-800">Top articles</h3>
                </div>
                <ul className="divide-y divide-stone-100">
                    {blogs.map((post, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.06 * i }}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            className="flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 transition-colors cursor-pointer group"
                        >
                            <span className="text-lg font-bold text-stone-500 font-serif w-6 flex-shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-[#0077CC] transition-colors">
                                    {post.title}
                                </p>
                                <p className="text-[10px] text-stone-400 mt-0.5">
                                    {post.totalViews || 0} views
                                </p>
                            </div>
                            {/* <img
                                src={post.coverImage.url}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            /> */}
                        </motion.li>
                    ))}
                </ul>
            </div>

        </div>
    );
}