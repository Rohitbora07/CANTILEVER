import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, PenLine } from "lucide-react";
import CoverImageUpload from "../../components/writer/CoverImageUpload";
import BlogEditorToolbar from "../../components/writer/BlogEditorToolbar";
import PublishSidebar from "../../components/writer/PublishSidebar";

const wordCount = (text) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
};

const readTime = (words) => Math.max(1, Math.ceil(words / 200));

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");

    const words = wordCount(content);
    const minutes = readTime(words);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen bg-white"
        >
            {/* Top bar */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-stone-100">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors text-sm font-medium">
                            <ArrowLeft size={16} />
                            <span className="hidden sm:inline">Back</span>
                        </button>

                        <div className="w-px h-5 bg-stone-200" />

                        <div className="flex items-center gap-2">
                            <PenLine size={16} className="text-[#0077CC]" />
                            <span className="text-sm font-semibold text-stone-800">
                                New post
                            </span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-5 text-xs text-stone-400 font-medium">
                        <span>{words.toLocaleString()} words</span>
                        <span>{minutes} min read</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                            Draft
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:hidden">
                        <button className="text-xs text-stone-500 border border-stone-200 rounded-lg px-3 py-1.5 hover:bg-stone-50 transition-colors">
                            Draft
                        </button>
                        <button className="text-xs bg-[#0077CC] hover:bg-[#005FA3] text-white rounded-lg px-3 py-1.5 font-semibold transition-colors">
                            Publish
                        </button>
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
                <div className="flex gap-10 xl:gap-14 items-start">

                    {/* Editor area */}
                    <div className="flex-1 min-w-0">

                        {/* Cover image */}
                        <CoverImageUpload />

                        {/* Title */}
                        <div className="mb-4">
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Your post title…"
                                rows={2}
                                className="w-full resize-none outline-none text-[#0D1B2A] placeholder:text-stone-300 leading-tight font-serif"
                                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2 }}
                            />
                        </div>

                        {/* Subtitle */}
                        <div className="mb-8">
                            <textarea
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="A brief subtitle or description…"
                                rows={2}
                                className="w-full resize-none outline-none text-stone-500 placeholder:text-stone-300 leading-relaxed"
                                style={{ fontSize: "1.15rem" }}
                            />
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-stone-100" />
                            <span className="text-xs text-stone-300 font-medium tracking-widest uppercase">
                                Write
                            </span>
                            <div className="flex-1 h-px bg-stone-100" />
                        </div>

                        {/* Toolbar */}
                        <BlogEditorToolbar />

                        {/* Content editor */}
                        <div className="relative">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Start writing your story…

Use the toolbar above to format text, add headings, insert images, quotes, code blocks, and more.

Your work is saved automatically."
                                className="w-full min-h-[520px] resize-none outline-none text-stone-700 placeholder:text-stone-300 leading-[1.85] text-[1.0625rem]"
                            />

                            {/* Word count badge (bottom of textarea area) */}
                            {content.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-end mt-4 gap-4"
                                >
                                    <span className="text-xs text-stone-300 font-medium">
                                        {words} word{words !== 1 ? "s" : ""} · {minutes} min read
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        {/* Bottom gutter spacer */}
                        <div className="h-16" />
                    </div>

                    {/* Sidebar */}
                    <PublishSidebar
                        onPublish={() => alert("Publishing…")}
                        onDraft={() => alert("Saved as draft.")}
                        onPreview={() => alert("Preview mode coming soon.")}
                    />
                </div>
            </div>
        </motion.div>
    );
}