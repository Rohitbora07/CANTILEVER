import { motion } from "motion/react";
import { Eye, Clock, Calendar } from "lucide-react";
import BlogShareBar from "../components/blog/BlogShareBar";
import BlogAuthorCard from "../components/blog/BlogAuthorCard";
import BlogComments from "../components/blog/BlogComments";
import RelatedBlogs from "../components/blog/RelatedBlogs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_SINGLE_BLOG } from "../constants/route";
import api from "../api/axios";

// const blog = {
//     category: "Technology",
//     title: "Why TypeScript Is No Longer Optional for Serious Projects",
//     subtitle:
//         "A deep dive into how TypeScript's type system saves thousands of hours in debugging and makes large codebases manageable.",
//     cover:
//         "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&h=700&fit=crop",
//     author: {
//         name: "Sarah Chen",
//         role: "Staff Writer",
//         avatar:
//             "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face",
//     },
//     publishedAt: "June 18, 2025",
//     readTime: 9,
//     views: 11430,
//     tags: ["TypeScript", "JavaScript", "Web Dev", "Developer Experience", "Tooling"],
// };

export default function BlogDetails() {

    const { slug } = useParams()
    const [blog, setBlog] = useState(null)
    const [author, setAuthor] = useState(null)

    useEffect(() => {
        const getSingleBlog = async () => {
            try {
                const { data } = await api.get(GET_SINGLE_BLOG(slug))
                console.log(data.blog)
                setBlog(data.blog)
                setAuthor(data.blog.author)
            } catch (error) {
                console.log(error)
            }
        }
        getSingleBlog()
    }, [slug])

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-white mt-28"
        >

            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-8"
            >
                <div className="max-w-3xl mx-auto text-center">
                    {/* Category */}
                    <span className="inline-block text-xs font-bold text-[#0077CC] bg-[#E0F0FF] px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                        {blog.category}
                    </span>

                    {/* Title */}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-5">
                        {blog.title}
                    </h1>

                    {/* Subtitle */}
                    {/* <p className="text-stone-500 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                        {blog.subtitle}
                    </p> */}

                    {/* Author + meta row */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                            <img
                                src={author.profileImg}
                                alt={author.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-100"
                            />
                            <div className="text-left">
                                <p className="text-sm font-semibold text-stone-800">
                                    {author.name}
                                </p>
                                <p className="text-xs text-stone-400">{author.role}</p>
                            </div>
                        </div>

                        <div className="w-px h-8 bg-stone-200 hidden sm:block" />

                        <div className="flex items-center gap-4 text-xs text-stone-500">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={13} className="text-stone-400" />
                                {blog.publishedAt}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={13} className="text-stone-400" />
                                {blog.readTime || "-"} min read
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Eye size={13} className="text-stone-400" />
                                {blog.views.toLocaleString() || "-"} views
                            </span>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Cover image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 mb-12"
            >
                <div className="rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: "21/9" }}>
                    <img
                        src={blog.coverImage.url}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            {/* Body: share | article | toc */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex gap-8 xl:gap-14 items-center justify-center">

                    {/* Share bar — left sticky column */}
                    <div className="hidden lg:flex flex-col items-center sticky top-20 flex-shrink-0 pt-2">
                        <BlogShareBar />
                    </div>

                    {/* Article body */}
                    <article className="flex-1 min-w-0 max-w-2xl">

                        {/* Mobile share bar */}
                        <div className="flex lg:hidden items-center gap-3 mb-8 pb-6 border-b border-stone-100">
                            <BlogShareBar />
                        </div>

                        {/* Prose */}
                        <div
                            className="prose-content text-stone-700 leading-[1.9] text-[1.0625rem]"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >

                            <div>{blog.content}</div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-stone-100">
                            {blog.tags.map((tag) => (
                                <button
                                    key={tag}
                                    className="text-xs font-medium text-stone-600 bg-stone-50 hover:bg-[#E0F0FF] hover:text-[#0077CC] border border-stone-200 hover:border-[#C8D8E8] px-3 py-1.5 rounded-xl transition-all"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <div className="mt-10">
                            <BlogAuthorCard author={author} />
                        </div>

                        {/* Comments */}
                        <BlogComments />

                        {/* Related */}
                        <RelatedBlogs />

                        <div className="h-16" />
                    </article>

                </div>
            </div>
        </motion.div>
    );
}