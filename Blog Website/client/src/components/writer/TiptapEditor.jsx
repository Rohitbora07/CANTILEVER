import { BubbleMenu } from "@tiptap/react/menus";
import { EditorContent } from "@tiptap/react"

export default function TiptapEditor({ editor }) {
    if (!editor) return null;

    return (
        <div className="prose max-w-none min-h-[400px] focus:outline-none">
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="flex gap-1 bg-stone-900 text-white rounded-lg p-1 shadow-xl">
                    <button 
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`px-2 py-1 text-xs ${editor.isActive('bold') ? 'text-amber-400' : ''}`}
                    >
                        Bold
                    </button>
                    <button 
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`px-2 py-1 text-xs ${editor.isActive('highlight') ? 'text-amber-400' : ''}`}
                    >
                        Highlight
                    </button>
                </div>
            </BubbleMenu>
            
            <EditorContent editor={editor} />
        </div>
    );
}