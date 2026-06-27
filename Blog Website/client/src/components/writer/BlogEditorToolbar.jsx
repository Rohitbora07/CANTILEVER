import {Bold,Italic,Underline,Strikethrough,Heading2,Heading3,List,ListOrdered,Quote,Code,Code2,Link,Image,Minus,AlignLeft,AlignCenter,} from "lucide-react";
import { useState } from "react";

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

export default function BlogEditorToolbar() {
    const [active, setActive] = useState({});

    const toggle = (key) =>
        setActive((prev) => ({ ...prev, [key]: !prev[key] }));

    const tools = [
        [
            { key: "h2", icon: Heading2, label: "Heading 2" },
            { key: "h3", icon: Heading3, label: "Heading 3" },
        ],
        [
            { key: "bold", icon: Bold, label: "Bold" },
            { key: "italic", icon: Italic, label: "Italic" },
            { key: "underline", icon: Underline, label: "Underline" },
            { key: "strike", icon: Strikethrough, label: "Strikethrough" },
        ],
        [
            { key: "ul", icon: List, label: "Bullet list" },
            { key: "ol", icon: ListOrdered, label: "Ordered list" },
            { key: "quote", icon: Quote, label: "Blockquote" },
        ],
        [
            { key: "code", icon: Code, label: "Inline code" },
            { key: "codeblock", icon: Code2, label: "Code block" },
        ],
        [
            { key: "link", icon: Link, label: "Insert link" },
            { key: "image", icon: Image, label: "Insert image" },
            { key: "hr", icon: Minus, label: "Horizontal rule" },
        ],
        [
            { key: "alignLeft", icon: AlignLeft, label: "Align left" },
            { key: "alignCenter", icon: AlignCenter, label: "Align center" },
        ],
    ];

    return (
        <div className="sticky top-[72px] z-10 bg-white/95 backdrop-blur-sm border-b border-stone-100 -mx-6 px-6 py-2 mb-6">
            <div className="flex items-center flex-wrap gap-0.5">
                {tools.map((group, gi) => (
                    <div key={gi} className="flex items-center">
                        {gi > 0 && <Divider />}
                        {group.map(({ key, icon, label }) => (
                            <ToolbarButton
                                key={key}
                                icon={icon}
                                label={label}
                                active={active[key]}
                                onClick={() => toggle(key)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}