"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import "./EditorRTE.css";

export default function EditorRTE({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true, // Permite pegar imagenes en base64
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (const item of items) {
          if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = () => {
              const src = reader.result;
              editor.commands.setImage({ src });
            };
            if (file) reader.readAsDataURL(file);
            return true;
          }
        }

        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded p-2">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="btn"
        >
          Negrita
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="btn"
        >
          Italica
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          minHeight: "300px",
        }}
      />
    </div>
  );
}
