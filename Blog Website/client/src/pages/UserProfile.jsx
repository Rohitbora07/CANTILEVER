import { motion } from "motion/react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileBlogGrid from "../components/profile/ProfileBlogGrid";
import ProfileSidebar from "../components/profile/ProfileSidebar";

export default function UserProfile() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen bg-stone-50"
        >
            {/* Header: cover + avatar + name + bio + socials */}
            <div className="bg-white border-b border-stone-100 pb-0">
                <ProfileHeader />
            </div>

            {/* Stats bar */}
            <div className="bg-white border-b border-stone-100">
                <ProfileStats />
            </div>

            {/* Body: blog grid + sidebar */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
                <div className="flex gap-8 xl:gap-12 items-start">
                    {/* Blog grid */}
                    <div className="flex-1 min-w-0">
                        <ProfileBlogGrid />
                    </div>

                    {/* Sidebar */}
                    <ProfileSidebar />
                </div>
            </div>
        </motion.div>
    );
}