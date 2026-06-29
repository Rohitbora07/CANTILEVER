import { useState, useRef } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../../../public/assets/assets"

export default function CoverImageUpload({preview, setPreview}) {
    // const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    const src = !preview ? assets.upload_area : preview instanceof File ? URL.createObjectURL(preview) : preview

    // let url = null;
    // const handleFile = (file) => {
    //     if (!file || !file.type.startsWith("image/")) return;
    //     url = URL.createObjectURL(file);
    //     // setPreview(url);
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     setDragging(false);
    //     const file = e.dataTransfer.files[0];
    //     // handleFile(file);
    // };

    // const handleChange = (e) => {
    //     const file = e.target.files[0];
    //     handleFile(file);
    // };

    return (
        <div className="mb-8">
            <AnimatePresence mode="wait">
                {preview ? (
                    <motion.div
                        key="preview"
                        className="relative w-full rounded-2xl overflow-hidden group"
                        style={{ aspectRatio: "16/7" }}
                    >
                        <img
                            src={src}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                        />
                        {/* <input onChange={(e) => setPreview(e.target.files[0])} type='file' hidden /> */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button
                                onClick={() => inputRef.current?.click()}
                                className="flex items-center gap-2 bg-white text-stone-800 text-sm font-medium px-4 py-2 rounded-xl hover:bg-stone-50 transition-colors"
                            >
                                <Upload size={15} />
                                Replace
                            </button>
                            <button
                                onClick={() => setPreview(null)}
                                className="flex items-center gap-2 bg-white/20 border border-white/40 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
                            >
                                <X size={15} />
                                Remove
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        // onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className={`w-full rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-3 transition-all duration-200 ${dragging
                                ? "border-[#0077CC] bg-[#E0F0FF]"
                                : "border-stone-200 bg-stone-50 hover:border-[#C8D8E8] hover:bg-stone-100"
                            }`}
                        style={{ aspectRatio: "16/7" }}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                            <ImagePlus size={22} className="text-stone-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-stone-700 text-sm font-medium">
                                Upload a cover image
                            </p>
                            <p className="text-stone-400 text-xs mt-1">
                                Drag & drop or click — PNG, JPG, WebP up to 5MB
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPreview(e.target.files[0])}
            />
        </div>
    );
}