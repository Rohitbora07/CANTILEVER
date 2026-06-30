import { useState } from "react";
import { motion } from "motion/react";
import api from "../api/axios";
import { UPDATE_PROFILE_ROUTE } from "../constants/route"
import { useLocation, useNavigate } from "react-router-dom";
import { User, Globe, CheckCircle2, Bell, } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import AvatarUpload from "../components/settings/AvatarUpload";
import SettingsSection from "../components/settings/SettingsSection";
import DangerZone from "../components/settings/DangerZone";
import userAuthStore from "../store/authStore";

const Field = ({ label, hint, children }) => (
    <div>
        <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-stone-700">{label}</label>
            {hint && <span className="text-xs text-stone-400">{hint}</span>}
        </div>
        {children}
    </div>
);

const Input = ({ icon: Icon, ...props }) => (
    <div className="relative">
        {Icon && (
            <Icon
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
        )}
        <input
            {...props}
            className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all`}
        />
    </div>
);

const Textarea = (props) => (
    <textarea
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#0077CC] focus:ring-2 focus:ring-[#E0F0FF] transition-all resize-none leading-relaxed"
    />
);




export default function UpdateProfile() {
    const [activeNav, setActiveNav] = useState("profile");
    const BIO_LIMIT = 200;

    const location = useLocation();
    const editable = location.pathname.includes("/profile/update");
    const navigate = useNavigate();
    const [security, setSecurity] = useState(false);

    const user = userAuthStore((state) => state.user);

    const [userName, setUserName] = useState(user?.name || "");
    const [userEmail, setUserEmail] = useState(user?.email || "");
    const [userBio, setUserBio] = useState(user?.bio || "");
    const [userInstagram, setUserInstagram] = useState(user?.instagram || "");
    const [userTwitter, setUserTwitter] = useState(user?.twitter || "");
    const [userLinkedIn, setUserLinkedIn] = useState(user?.linkedin || "");
    const [userGithub, setUserGithub] = useState(user?.github || "");
    const [profileImg, setprofileImg] = useState(user?.profileImg || "");
    const [userLocation, setUserLocation] = useState(user?.location || "");

    const [lastLoadedUserId, setLastLoadedUserId] = useState(user?.id || null);

    if (user && user.id !== lastLoadedUserId) {
        setUserName(user.name || "");
        setUserEmail(user.email || "");
        setUserBio(user.bio || "");
        setUserInstagram(user.instagram || "");
        setUserTwitter(user.twitter || "");
        setUserLinkedIn(user.linkedin || "");
        setUserGithub(user.github || "");
        setprofileImg(user.profileImg || "");
        setLastLoadedUserId(user.id);
        setUserLocation(user.location || "");
    }

    const charCount = userBio.length;


    const updateUserProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userName);
            formData.append("email", userEmail);
            formData.append("bio", userBio);
            formData.append("instagram", userInstagram);
            formData.append("twitter", userTwitter);
            formData.append("linkedin", userLinkedIn);
            formData.append("github", userGithub);
            formData.append("profileImg", profileImg);
            formData.append("location", userLocation);

            console.log(profileImg, "asdas")

            const { data } = await api.put(UPDATE_PROFILE_ROUTE, formData)
            console.log(data)

        } catch (error) {
            console.error("Error updating user profile:", error.response.data.message);
        }
    }

    const SOCIAL_LINKS = [
        { label: "GitHub", icon: FaGithub, value: userGithub, onChange: setUserGithub, placeholder: `https://github.com/${userName || "username"}` },
        { label: "Twitter", icon: FaTwitter, value: userTwitter, onChange: setUserTwitter, placeholder: `https://twitter.com/${userName || "username"}` },
        { label: "LinkedIn", icon: FaLinkedin, value: userLinkedIn, onChange: setUserLinkedIn, placeholder: `https://linkedin.com/in/${userName || "username"}` },
        { label: "Instagram", icon: Globe, value: userInstagram, onChange: setUserInstagram, placeholder: `https://instagram.com/${userName || "username"}` },
    ];

    const navItems = [
    { key: "profile", label: "Profile", setAction: () => setSecurity(false) },
    { key: "social", label: "My Blogs" },
    { key: "notifications", label: "Notifications" },
    { key: "security", label: "Security", setAction: () => setSecurity(true) },
];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen bg-stone-50 mt-20"
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                <div className="flex gap-8 xl:gap-12 items-start">

                    <div className="hidden lg:block w-52 flex-shrink-0 sticky top-24">
                        <nav className="space-y-1">
                            {navItems.map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveNav(key)
                                        key.setAction
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 ${activeNav === key
                                        ? "bg-[#E0F0FF] text-[#0077CC]"
                                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
                                        }`}
                                >
                                    {key === "profile" && <User size={15} />}
                                    {key === "social" && <Globe size={15} />}
                                    {key === "notifications" && <Bell size={15} />}
                                    {key === "security" && <FaGithub size={15} />}
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>


                    {
                        !security ?
                        <div className="flex-1 min-w-0 max-w-2xl space-y-5">


                            <div className="flex lg:hidden items-center gap-1 bg-white border border-stone-200 rounded-xl p-1 mb-6">
                                {navItems.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveNav(key)}
                                        className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${activeNav === key
                                            ? "bg-[#0077CC] text-white"
                                            : "text-stone-500 hover:text-stone-800"
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <SettingsSection
                                title="Profile information"
                                description="This is how your public profile will appear to other readers and writers."
                                delay={0.05}
                            >
                                <div className="space-y-6">
                                    <AvatarUpload profile={profileImg} setProfile={setprofileImg} editable={editable} />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Field label="Full name">
                                            <Input
                                                icon={User}
                                                type="text"
                                                value={userName}
                                                disabled={!editable}
                                                placeholder="Your full name"
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </Field>
                                        <Field label="Email address">
                                            <Input
                                                type="email"
                                                value={userEmail}
                                                disabled={!editable}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                placeholder="you@example.com"
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Bio" hint={`${charCount} / ${BIO_LIMIT}`}>
                                        <Textarea
                                            rows={4}
                                            value={userBio}
                                            disabled={!editable}
                                            onChange={(e) => setUserBio(e.target.value)}
                                            placeholder="Tell readers a little about yourself…"
                                            maxLength={BIO_LIMIT}
                                        />
                                    </Field>
                                    <Field label="Location">
                                        <Input
                                            type="text"
                                            value={userLocation}
                                            disabled={!editable}
                                            onChange={(e) => setUserLocation(e.target.value)}
                                            placeholder="Your location"
                                        />
                                    </Field>
                                </div>
                            </SettingsSection>

                            <SettingsSection
                                title="Social links"
                                description="Add links to your personal website and social profiles."
                                delay={0.1}
                            >
                                <div className="space-y-4">
                                    {SOCIAL_LINKS.map((link, index) => (
                                        <Field key={index} label={link.label}>
                                            <Input
                                                icon={link.icon}
                                                type="text"
                                                value={link.value}
                                                disabled={!editable}
                                                onChange={(e) => link.onChange(e.target.value)}
                                                placeholder={link.placeholder}
                                            />
                                        </Field>
                                    ))}
                                </div>
                            </SettingsSection>

                            {
                                editable ?
                                    <div className="flex items-center justify-between pt-2 pb-8">
                                        <p className="text-xs text-stone-400">
                                            Changes are saved to your public profile immediately.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={updateUserProfile}
                                            className="flex items-center gap-2 text-sm font-semibold text-white bg-[#0077CC] hover:bg-[#005FA3] px-6 py-2.5 rounded-xl transition-colors"
                                        >
                                            <CheckCircle2 size={14} />
                                            Save changes
                                        </motion.button>
                                    </div>
                                    :
                                    <div className="flex items-center justify-between pt-2 pb-8">
                                        <p className="text-xs text-stone-400">
                                            Changes are saved to your public profile immediately.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => navigate("/profile/update")}
                                            className="flex items-center gap-2 text-sm font-semibold text-white bg-[#0077CC] hover:bg-[#005FA3] px-6 py-2.5 rounded-xl transition-colors"
                                        >
                                            <CheckCircle2 size={14} />
                                            Edit Profile
                                        </motion.button>
                                    </div>
                            }

                        </div> 
                        :
                        <DangerZone />
                    }
                    

                </div>
            </div>

        </motion.div>
    );
}