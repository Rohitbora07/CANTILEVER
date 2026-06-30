import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Trash2 } from "lucide-react";
import { assets } from "../../../public/assets/assets";

export default function AvatarUpload({ profile, setProfile, editable }) {
    const inputRef = useRef(null);

    const src = profile
        ? profile instanceof File
            ? URL.createObjectURL(profile)
            : profile
        : assets.upload_area;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfile(file);
        }
    };

    return (
        <div className="mb-10">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!editable}
                onChange={handleFileChange}
            />

            <AnimatePresence mode="wait">
                {profile ? (
                    <motion.div
                    key="profile"
                    className="relative w-full flex flex-col items-center justify-center gap-3"
                    >
                        <motion.div
                            key="profile"
                            className="relative w-32 h-32 rounded-full overflow-hidden group cursor-pointer"
                        >
                            <img
                                src={src}
                                alt="Avatar"
                                onClick={() => inputRef.current?.click()}
                                className="w-full h-full object-cover"
                            />


                        </motion.div>
                        {
                            editable && <div className=" transition-opacity flex items-center justify-center gap-5">
                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    className="p-2 rounded-full border border-black text-black "
                                >
                                    <Camera size={16} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setProfile(null)}
                                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        }
                        
                    </motion.div>
                ) : (
                    <motion.div
                        key="placeholder"
                        onClick={() => inputRef.current?.click()}
                        className="w-32 h-32 rounded-full border-2 border-dashed border-stone-300 bg-stone-100 flex items-center justify-center cursor-pointer hover:border-[#0077CC] hover:bg-[#EAF5FF] transition-all"
                    >
                        <Camera size={24} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}