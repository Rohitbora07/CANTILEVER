import { Bold, Italic, Underline, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote, Code, Code2, Link, Image, Minus, AlignLeft, AlignCenter, } from "lucide-react";


const Divider = () => (
    <div className="w-px h-5 bg-stone-200 mx-1 flex-shrink-0" />
);

const ToolbarButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        title={label}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 ${active
            ? "bg-[#E0F0FF] text-[#0077CC]"
            : "text-stone-500 hover:bg-stone-100 hover:text-stone-700"
            }`}
    >
        <Icon size={15} />
    </button>
);

export default function BlogEditorToolbar({ editor }) {
    if (!editor) return null;

    // Helper to prompt for a URL when adding links
    const setCustomLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // If cancelled
        if (url === null) return;

        // If empty, remove link
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // Update link
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    // Helper to prompt for an image URL
    const addCustomImage = () => {
        const url = window.prompt("Enter image URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const tools = [
        [
            {
                key: "h2",
                icon: Heading2,
                label: "Heading 2",
                active: editor.isActive("heading", { level: 2 }),
                command: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
            },
            {
                key: "h3",
                icon: Heading3,
                label: "Heading 3",
                active: editor.isActive("heading", { level: 3 }),
                command: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
            },
        ],
        [
            {
                key: "bold",
                icon: Bold,
                label: "Bold",
                active: editor.isActive("bold"),
                command: () => editor.chain().focus().toggleBold().run()
            },
            {
                key: "italic",
                icon: Italic,
                label: "Italic",
                active: editor.isActive("italic"),
                command: () => editor.chain().focus().toggleItalic().run()
            },
            {
                key: "underline",
                icon: Underline,
                label: "Underline",
                active: editor.isActive("underline"),
                command: () => editor.chain().focus().toggleUnderline().run()
            },
            {
                key: "strike",
                icon: Strikethrough,
                label: "Strikethrough",
                active: editor.isActive("strike"),
                command: () => editor.chain().focus().toggleStrike().run()
            },
        ],
        [
            {
                key: "ul",
                icon: List,
                label: "Bullet list",
                active: editor.isActive("bulletList"),
                command: () => editor.chain().focus().toggleBulletList().run()
            },
            {
                key: "ol",
                icon: ListOrdered,
                label: "Ordered list",
                active: editor.isActive("orderedList"),
                command: () => editor.chain().focus().toggleOrderedList().run()
            },
            {
                key: "quote",
                icon: Quote,
                label: "Blockquote",
                active: editor.isActive("blockquote"),
                command: () => editor.chain().focus().toggleBlockquote().run()
            },
        ],
        [
            {
                key: "code",
                icon: Code,
                label: "Inline code",
                active: editor.isActive("code"),
                command: () => editor.chain().focus().toggleCode().run()
            },
            {
                key: "codeblock",
                icon: Code2,
                label: "Code block",
                active: editor.isActive("codeBlock"),
                command: () => editor.chain().focus().toggleCodeBlock().run()
            },
        ],
        [
            {
                key: "link",
                icon: Link,
                label: "Insert link",
                active: editor.isActive("link"),
                command: setCustomLink
            },
            {
                key: "image",
                icon: Image,
                label: "Insert image",
                active: editor.isActive("image"),
                command: addCustomImage
            },
            {
                key: "hr",
                icon: Minus,
                label: "Horizontal rule",
                active: false,
                command: () => editor.chain().focus().setHorizontalRule().run()
            },
        ],
        [
            {
                key: "alignLeft",
                icon: AlignLeft,
                label: "Align left",
                active: editor.isActive({ textAlign: "left" }),
                command: () => editor.chain().focus().setTextAlign("left").run()
            },
            {
                key: "alignCenter",
                icon: AlignCenter,
                label: "Align center",
                active: editor.isActive({ textAlign: "center" }),
                command: () => editor.chain().focus().setTextAlign("center").run()
            },
        ],
    ];

    return (
        <div className="sticky top-[72px] z-10 bg-white/95 backdrop-blur-sm border-b border-stone-100 -mx-6 px-6 py-2 mb-6">
            <div className="flex items-center flex-wrap gap-0.5">
                {tools.map((group, gi) => (
                    <div key={gi} className="flex items-center">
                        {gi > 0 && <Divider />}
                        {group.map(({ key, icon, label, active, command }) => (
                            <ToolbarButton
                                key={key}
                                icon={icon}
                                label={label}
                                active={active}
                                onClick={command}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}