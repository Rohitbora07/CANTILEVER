// import React from "react";
import { motion } from "motion/react";
import { Star, Clock3, Calendar, Eye, Heart, ArrowRight } from "lucide-react";



export default function FeaturedBlog({blog}) {
    // const blog = FEATURED_BLOG;

    return (
        <section className="mb-16">

            <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center bg-stone-50/50">
                    <Star size={13} className="text-[#0077CC]" />
                </div>
                <h2 className="text-xl font-serif font-medium tracking-tight text-stone-900">Featured Story</h2>
            </div>


            <motion.div
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >

                <div className="relative h-72 sm:h-96 overflow-hidden bg-stone-100">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                        src={blog.coverImage.url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-stone-950/5 to-transparent" />


                    <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 rounded-md bg-[#E0F0FF] text-[#005FA3] border border-[#C8D8E8] text-[11px] font-medium tracking-wider uppercase">
                            {blog.category}
                        </span>
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <h3 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 tracking-tight leading-snug mb-4 group-hover:text-[#0077CC] transition-colors duration-200">
                        {blog.title}
                    </h3>

                    {/* <p className="text-stone-600 font-normal leading-relaxed text-base mb-8 max-w-3xl">
                        {blog.description}
                    </p> */}


                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-stone-100">

                        <div className="flex items-center gap-3.5">
                            <img
                                src={blog.author.profileImg}
                                alt={blog.author.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200 bg-stone-50"
                            />
                            <div>
                                <p className="font-medium text-stone-900 text-sm">{blog.author.name}</p>
                                <div className="flex items-center gap-3.5 text-xs text-stone-400 mt-1">
                                    <span className="flex items-center gap-1.5">
                                        <Clock3 size={12} className="text-stone-400" />
                                        {blog.readTime || "-"}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={12} className="text-stone-400" />
                                        {blog.date || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="flex items-center justify-between sm:justify-end gap-6">
                            <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <Eye size={13} className="text-stone-400" />
                                    {blog.views || "-"}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Heart size={13} className="text-stone-400" />
                                    {/* {blog.likes.toLocaleString()} */}
                                </span>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#0077CC] hover:bg-[#005FA3] text-white text-sm font-medium rounded-xl shadow-sm transition-colors duration-200"
                            >
                                Read Story <ArrowRight size={14} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}