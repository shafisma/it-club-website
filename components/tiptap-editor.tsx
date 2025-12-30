"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
  Strikethrough,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = "Write your blog post content here...",
}: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "text-foreground",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "text-foreground font-bold",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-inside",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-inside",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-auto font-mono text-sm",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-primary pl-4 italic",
          },
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    event.target.value = "";
  };

  const addImage = () => {
    const choice = confirm(
      "Click OK to upload an image, or Cancel to enter a URL"
    );
    if (choice) {
      // Trigger file input
      document.getElementById("image-upload-input")?.click();
    } else {
      // Ask for URL
      const url = prompt("Enter the image URL:");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  };

  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-200px)]">
      {/* Hidden file input for image upload */}
      <input
        type="file"
        id="image-upload-input"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="border-b-2 border-black bg-gray-50 dark:bg-gray-800 p-3 flex flex-wrap gap-2 sticky top-0 z-10">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("bold")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("italic")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("strike")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("code")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Inline Code"
        >
          <Code className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Headings */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm font-bold ${
            editor.isActive("heading", { level: 1 })
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Heading 1"
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm font-bold ${
            editor.isActive("heading", { level: 2 })
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Heading 2"
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm font-bold ${
            editor.isActive("heading", { level: 3 })
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Heading 3"
        >
          H3
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("bulletList")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("orderedList")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("blockquote")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Quote"
        >
          <Quote className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
            editor.isActive("codeBlock")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-foreground"
          }`}
          title="Code Block"
        >
          <Code className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Links & Images */}
        <button
          onClick={addLink}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-foreground"
          title="Insert Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>

        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-foreground"
          title="Insert Image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-foreground disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-foreground disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <style jsx global>{`
          .ProseMirror {
            min-height: 100%;
            padding: 2rem;
            outline: none;
          }
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
        `}</style>
        <EditorContent
          editor={editor}
          className="prose prose-lg dark:prose-invert max-w-4xl mx-auto h-full [&_.ProseMirror]:min-h-[calc(100vh-250px)] [&_.ProseMirror]:outline-none"
        />
      </div>
    </div>
  );
}
