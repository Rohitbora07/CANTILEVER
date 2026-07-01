import { motion } from "motion/react";
import { Clock, ArrowRight } from "lucide-react";

const related = [
    {
        id: 1,
        title: "Building with Vite in 2025: A Complete Setup Guide",
        excerpt: "Everything you need to know about setting up a modern Vite project with React, Tailwind, and all the tooling you need.",
        cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
        category: "Technology",
        readTime: 11,
        date: "Jun 10, 2025",
        author: {
            name: "James Okafor",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        },
    },
    {
        id: 2,
        title: "The Art of Minimalist Design in Modern Web Development",
        excerpt: "Exploring how removing friction from interfaces creates more intuitive and beautiful user experiences.",
        cover: "https://images.unsplash.com/photo-1545239351-cefa43af60f3?w=600&h=400&fit=crop",
        category: "Design",
        readTime: 6,
        date: "Jun 24, 2025",
        author: {
            name: "Alex Morgan",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        },
    },
    {
        id: 3,
        title: "The Rise of Edge Computing: What Developers Need to Know",
        excerpt: "Edge computing is reshaping how we build and deploy applications. Here's what it means for your next project.",
        cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        category: "Technology",
        readTime: 8,
        date: "May 8, 2025",
        author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
        },
    },
];

export default function RelatedBlogs() {
    return (
        <section className="mt-16 pt-12 border-t border-stone-100">
            <div className="flex items-center justify-between mb-7">
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                    More to read
                </h2>
                <button className="flex items-center gap-1 text-sm font-medium text-[#0077CC] hover:text-[#005FA3] transition-colors">
                    View all
                    <ArrowRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((blog, i) => (
                    <motion.article
                        key={blog.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 * i }}
                        className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                            <img
                                src={blog.cover}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-semibold text-[#0077CC] bg-[#E0F0FF] px-2.5 py-1 rounded-lg">
                                    {blog.category}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-stone-400">
                                    <Clock size={10} />
                                    {blog.readTime} min
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-stone-900 font-serif leading-snug line-clamp-2 mb-3 group-hover:text-[#0077CC] transition-colors">
                                {blog.title}
                            </h3>
                            <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                                <img
                                    src={blog.author.avatar}
                                    alt={blog.author.name}
                                    className="w-5 h-5 rounded-full object-cover"
                                />
                                <span className="text-[11px] text-stone-500 font-medium">
                                    {blog.author.name}
                                </span>
                                <span className="text-[11px] text-stone-300 ml-auto">
                                    {blog.date}
                                </span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}