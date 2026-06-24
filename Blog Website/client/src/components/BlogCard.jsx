import { motion } from "motion/react";
import { Bookmark, Clock3, Heart } from "lucide-react";


export function BlogCard({ blog, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
            className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
        >
            <div className="relative h-48 overflow-hidden bg-stone-100">
                <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale-[10%]"
                />

                <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#F5E6D8] border border-[#E7C8AA] text-[#B67A4B] text-[10px] font-medium tracking-wider uppercase">
                        {blog.category}
                    </span>
                </div>

                <button
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/95 border border-stone-200 text-stone-500 hover:text-[#B67A4B] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <Bookmark size={13} />
                </button>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                    <h3 className="font-serif font-normal text-stone-900 leading-snug text-lg mb-2 group-hover:text-[#B67A4B] transition-colors duration-200 line-clamp-2">
                        {blog.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-5 line-clamp-2">
                        {blog.description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                    <div className="flex items-center gap-2.5">
                        <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-stone-200"
                        />
                        <div>
                            <p className="text-xs font-medium text-stone-800">{blog.author.name}</p>
                            <p className="text-[10px] text-stone-400 font-mono mt-0.5">{blog.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium">
                        <span className="flex items-center gap-1">
                            <Clock3 size={11} className="text-stone-400" />
                            {blog.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart size={11} className="text-stone-400" />
                            {blog.likes}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}