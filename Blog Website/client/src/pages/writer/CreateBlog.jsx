import { useState } from "react";
import { motion } from "motion/react";
import CoverImageUpload from "../../components/writer/CoverImageUpload";
import BlogEditorToolbar from "../../components/writer/BlogEditorToolbar";
import PublishSidebar from "../../components/writer/PublishSidebar";
import api from "../../api/axios";
import { CREATE_BLOG } from "../../constants/route";
import { useNavigate } from "react-router-dom";

const wordCount = (text) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
};

const readTime = (words) => Math.max(1, Math.ceil(words / 200));

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [category, setCategory] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [allowComments, setAllowComments] = useState(true);
    const [tags, setTags] = useState([]);

    const [slug, setSlug] = useState("")

    const words = wordCount(content);
    const minutes = readTime(words);

    const navigate = useNavigate()


    

    const handlePublish = async () => {
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("content", content)
            formData.append("category", category)
            tags.forEach( tag => {
                formData.append("tags", tag)
            })
            formData.append("visibility", visibility)
            formData.append("coverImage", coverImage)
            formData.append("allowComments", allowComments)
            const {data} = await api.post(CREATE_BLOG,formData)
            console.log(data.blog)
            setSlug(data.blog.slug)
            navigate(`/blog/${slug}`)
        } catch (err) {
            console.log("Error:", err.response.data.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen bg-white mt-20"
        >
            {/* Top bar */}

            {/* Body */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
                <div className="flex gap-10 xl:gap-14 items-start">

                    {/* Editor area */}
                    <div className="flex-1 min-w-0">

                        {/* Cover image */}
                        <CoverImageUpload preview={coverImage} setPreview={setCoverImage} />

                        {/* Title */}
                        <p className="text-3xl font-medium text-stone-500 mb-2 font-serif">Title</p>
                        <div className="mb-4 border-2 backdrop:blur-sm border-stone-300 rounded-lg p-4">
                        
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Your post title…"
                                rows={2}
                                className="w-full resize-none outline-none text-[#0D1B2A] placeholder:text-stone-300 font-serif text-base"
                            />
                        </div>

                        {/* Subtitle */}
                        <p className="text-3xl font-medium text-stone-500 mb-2 font-serif">Subtitle</p>
                        <div className="mb-8 border-2 backdrop:blur-sm border-stone-300 rounded-lg p-4">
                            <textarea
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="A brief subtitle or description…"
                                rows={2}
                                className="w-full resize-none outline-none text-stone-500 placeholder:text-stone-300 font-serif text-base"
                            />
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-stone-500" />
                            <span className="text-xs text-stone-600 font-medium tracking-widest uppercase">
                                Write
                            </span>
                            <div className="flex-1 h-px bg-stone-500" />
                        </div>

                        {/* Toolbar */}
                        <BlogEditorToolbar />

                        {/* Content editor */}
                        <div className="relative border border-stone-300 rounded-3xl p-6">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Start writing your story…
Use the toolbar above to format text, add headings, insert images, quotes, code blocks, and more.
Your work is saved automatically."
                                className="w-full min-h-[520px] resize-none outline-none text-stone-700 placeholder:text-stone-300 leading-[1.85]  text-[1.0625rem]"
                            />

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
                        onPublish={handlePublish}
                        onDraft={() => alert("Saved as draft.")}
                        setCategory={setCategory}
                        category={category}
                        setVisibility={setVisibility}
                        visibility={visibility}
                        setAllowComments={setAllowComments}
                        allowComments={allowComments}
                        tags={tags}
                        setTags={setTags}
                    />
                </div>
            </div>
        </motion.div>
    );
}