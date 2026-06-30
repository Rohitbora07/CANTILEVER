import { motion } from "motion/react";
import {
    Globe,
    MapPin, CalendarDays, UserPlus, UserCheck,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useState } from "react";

const author = {
    name: "Sarah Chen",
    role: "Staff Writer",
    avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&h=400&fit=crop",
    bio: "Writer and software engineer based in San Francisco. I cover design systems, developer tooling, and the intersection of craft and code. Former engineer at Stripe and Linear.",
    location: "San Francisco, CA",
    website: "sarahchen.dev",
    github: "sarahchen",
    linkedin: "sarah-chen",
    twitter: "@sarahchendev",
    joinedDate: "March 2022",
};

const socials = [
    { icon: Globe, label: author.website, href: "#" },
    { icon: FaGithub, label: author.github, href: "#" },
    { icon: FaTwitter, label: author.twitter, href: "#" },
    { icon: FaLinkedin, label: author.linkedin, href: "#" },
];

export default function ProfileHeader() {
    const [following, setFollowing] = useState(false);

    return (
        <div>
            {/* Cover image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full overflow-hidden bg-stone-100"
                style={{ aspectRatio: "21/5" }}
            >
                <img
                    src={author.cover}
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
                            src={author.avatar}
                            alt={author.name}
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
                            {author.name}
                        </h1>
                        <span className="text-xs font-semibold text-[#0077CC] bg-[#E0F0FF] px-2.5 py-1 rounded-lg">
                            {author.role}
                        </span>
                    </div>

                    <p className="text-stone-500 text-sm leading-relaxed max-w-xl mb-5">
                        {author.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5">
                        <span className="flex items-center gap-1.5 text-xs text-stone-500">
                            <MapPin size={13} className="text-stone-400" />
                            {author.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-stone-500">
                            <CalendarDays size={13} className="text-stone-400" />
                            Joined {author.joinedDate}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {socials.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#0077CC] bg-stone-50 hover:bg-[#E0F0FF] border border-stone-200 hover:border-[#C8D8E8] px-3 py-1.5 rounded-xl transition-all duration-200"
                            >
                                <Icon size={12} />
                                {label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}