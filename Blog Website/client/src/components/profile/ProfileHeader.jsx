import { motion } from "motion/react";
import {MapPin, CalendarDays, UserPlus, UserCheck,} from "lucide-react";
// import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useState } from "react"


export default function ProfileHeader({ user }) {
    const [following, setFollowing] = useState(false);
        const makeDate = (date) => {
            const createdAt = new Date(date);
            const options = { year: 'numeric', month: 'long' };
            return createdAt.toLocaleDateString(undefined, options);
        }


    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full overflow-hidden bg-stone-100"
                style={{ aspectRatio: "21/5" }}
            >
                <img
                    src={user.backgroundImg}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
                {/* Avatar + action row */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-14 mb-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                    >
                        <img
                            src={user.profileImg}
                            alt={user.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-md"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        className="flex items-center gap-2.5 sm:mb-1"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setFollowing(!following)}
                            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 ${following
                                ? "bg-stone-100 text-stone-700 border border-stone-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                                : "bg-[#0077CC] text-white hover:bg-[#005FA3]"
                                }`}
                        >
                            {following ? (
                                <><UserCheck size={15} />Following</>
                            ) : (
                                <><UserPlus size={15} />Follow</>
                            )}
                        </motion.button>
                    </motion.div>
                </div>

                {/* Name + bio block */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="pb-7 border-b border-stone-100"
                >
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                            {user.name}
                        </h1>
                        <span className="text-xs font-semibold text-[#0077CC] bg-[#E0F0FF] px-2.5 py-1 rounded-lg">
                            {user.role}
                        </span>
                    </div>

                    <p className="text-stone-500 text-sm leading-relaxed max-w-xl mb-5">
                        {user.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5">
                        <span className="flex items-center gap-1.5 text-xs text-stone-500">
                            <MapPin size={13} className="text-stone-400" />
                            {user.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-stone-500">
                            <CalendarDays size={13} className="text-stone-400" />
                            Joined {user && makeDate(user.createdAt)}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* {socials.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#0077CC] bg-stone-50 hover:bg-[#E0F0FF] border border-stone-200 hover:border-[#C8D8E8] px-3 py-1.5 rounded-xl transition-all duration-200"
                            >
                                <Icon size={12} />
                                {label}
                            </a>
                        ))} */}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}