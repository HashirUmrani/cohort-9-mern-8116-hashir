import "../noteEditor.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";

import { createNote, getNoteById, updatedNote } from "../services/note.api";

const NoteEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [heading, setHeading] = useState("");
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  useEffect(() => {
    if (!isEditMode || !editor) {
      return;
    }

    let isMounted = true;

    const loadNote = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getNoteById({ id });

        if (!isMounted) {
          return;
        }

        const noteHeading = data.note.heading || "";
        const noteContent = data.note.content || "";

        setHeading(noteHeading);

        if (!editor.isDestroyed) {
          editor.commands.setContent(noteContent);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load a note", error);
        setError(error.message || "Failed to load note.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNote();

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode, editor]);

  const handleSave = async () => {
    if (!heading.trim()) {
      setError("Please enter a note heading.");
      return;
    }

    if (!editor || editor.isDestroyed || editor.isEmpty) {
      setError("Please enter some note content.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const content = editor.getHTML();

      if (isEditMode) {
        await updatedNote({
          id,
          heading: heading.trim(),
          content,
        });
      } else {
        await createNote({
          heading: heading.trim(),
          content,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save note", error);
      setError(error.message || "Failed to save note.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="note-editor-loading">Loading note...</div>;
  }

  if (!editor || editor.isDestroyed) {
    return <div className="note-editor-loading">Loading editor...</div>;
  }

  return (
    <div className="note-editor">
      <div className="note-editor-header">
        <input
          type="text"
          value={heading}
          onChange={(event) => {
            setHeading(event.target.value);
            setError("");
          }}
          placeholder="Note heading"
          className="note-editor-heading"
          disabled={isSaving}
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !heading.trim()}
          className="save-note-btn"
        >
          {isSaving ? "Saving..." : isEditMode ? "Update Note" : "Save Note"}
        </button>
      </div>

      {error && <p className="note-editor-error">{error}</p>}

      <div className="note-editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            title="Bold"
            className={editor.isActive("bold") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={isSaving}
          >
            <Bold size={17} />
          </button>

          <button
            type="button"
            title="Italic"
            className={editor.isActive("italic") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={isSaving}
          >
            <Italic size={17} />
          </button>

          <button
            type="button"
            title="Underline"
            className={editor.isActive("underline") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={isSaving}
          >
            <UnderlineIcon size={17} />
          </button>

          <button
            type="button"
            title="Strikethrough"
            className={editor.isActive("strike") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={isSaving}
          >
            <Strikethrough size={17} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            title="Heading 1"
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={isSaving}
          >
            <Heading1 size={18} />
          </button>

          <button
            type="button"
            title="Heading 2"
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={isSaving}
          >
            <Heading2 size={18} />
          </button>

          <button
            type="button"
            title="Heading 3"
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={isSaving}
          >
            <Heading3 size={18} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            title="Bullet List"
            className={editor.isActive("bulletList") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={isSaving}
          >
            <List size={18} />
          </button>

          <button
            type="button"
            title="Numbered List"
            className={editor.isActive("orderedList") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={isSaving}
          >
            <ListOrdered size={18} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            title="Blockquote"
            className={editor.isActive("blockquote") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={isSaving}
          >
            <Quote size={17} />
          </button>

          <button
            type="button"
            title="Code Block"
            className={editor.isActive("codeBlock") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={isSaving}
          >
            <Code size={17} />
          </button>

          <button
            type="button"
            title="Clear Formatting"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            disabled={isSaving}
          >
            <RemoveFormatting size={17} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={isSaving || !editor.can().undo()}
          >
            <Undo2 size={17} />
          </button>

          <button
            type="button"
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={isSaving || !editor.can().redo()}
          >
            <Redo2 size={17} />
          </button>
        </div>
      </div>

      <div className="note-editor-body">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NoteEditor;
