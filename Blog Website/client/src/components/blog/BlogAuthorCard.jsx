import { motion } from "motion/react";
import {ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function BlogAuthorCard({author}) {
    const navigate = useNavigate()
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-stone-200 rounded-2xl shadow-sm p-7"
        >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Avatar */}
                <img
                    src={author.profileImg}
                    alt={author.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-stone-100 flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between  gap-4 flex-wrap mb-3">
                        <div>
                            <p className="text-xs font-semibold text-[#0077CC] uppercase tracking-wider mb-1">
                                Written by
                            </p>
                            <h3 className="text-lg font-bold text-stone-900 font-serif">
                                {author.name}
                            </h3>
                            <p className="text-xs text-stone-400 mt-0.5">{author.role}</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03, }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(`/profile/${author._id}`)}
                            className="flex text-sm items-center gap-2 font-semibold text-white bg-[#0077CC] hover:bg-[#005FA3] px-5 py-2 rounded-xl transition-colors"
                        >
                            Go to profile <ArrowRight size={16} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}