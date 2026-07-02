import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

export const extensions = [
    StarterKit.configure(),
    Image.configure(),
    Link.configure(),
    Underline.configure(),
    Highlight.configure(),
    Placeholder.configure({
        placeholder: "Start writing..."
    }),
    TextAlign.configure({
        types: ["heading", "paragraph"]
    })
];