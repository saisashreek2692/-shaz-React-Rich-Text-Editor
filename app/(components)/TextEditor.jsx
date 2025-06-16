"use client";
import { useRef, useState, useEffect } from "react";
import {
  Bold, Italic, Underline, Image, Link,
  List, ListOrdered, Heading1, Heading2, Heading3
} from "lucide-react";

const ToolbarButton = ({ icon: Icon, onClick, title, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md transition-all duration-150
      ${active
        ? "bg-blue-500 text-white shadow"
        : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"}
    `}
    title={title}
    type="button"
  >
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{title}</span>
  </button>
);

export default function TextEditor() {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState([]);

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateActiveFormats();
  };

  const insertImage = () => {
    const url = prompt("Enter image URL");
    if (url) format("insertImage", url);
  };

  const insertLink = () => {
    const url = prompt("Enter URL");
    if (url) format("createLink", url);
  };

  const updateActiveFormats = () => {
    const formats = [];
    if (document.queryCommandState("bold")) formats.push("bold");
    if (document.queryCommandState("italic")) formats.push("italic");
    if (document.queryCommandState("underline")) formats.push("underline");
    if (document.queryCommandState("insertUnorderedList")) formats.push("ul");
    if (document.queryCommandState("insertOrderedList")) formats.push("ol");
    const formatBlock = document.queryCommandValue("formatBlock").toLowerCase();
    if (formatBlock === "h1") formats.push("h1");
    if (formatBlock === "h2") formats.push("h2");
    if (formatBlock === "h3") formats.push("h3");
    setActiveFormats(formats);
  };

  useEffect(() => {
    const handler = () => updateActiveFormats();
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl border-2 border-gray-300 dark:border-zinc-600 rounded-xl shadow-md bg-white dark:bg-zinc-900 p-6 space-y-6">
        {/* Toolbar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
          <ToolbarButton icon={Bold} title="Bold" active={activeFormats.includes("bold")} onClick={() => format("bold")} />
          <ToolbarButton icon={Italic} title="Italic" active={activeFormats.includes("italic")} onClick={() => format("italic")} />
          <ToolbarButton icon={Underline} title="Underline" active={activeFormats.includes("underline")} onClick={() => format("underline")} />
          <ToolbarButton icon={Heading1} title="Heading 1" active={activeFormats.includes("h1")} onClick={() => format("formatBlock", "h1")} />
          <ToolbarButton icon={Heading2} title="Heading 2" active={activeFormats.includes("h2")} onClick={() => format("formatBlock", "h2")} />
          <ToolbarButton icon={Heading3} title="Heading 3" active={activeFormats.includes("h3")} onClick={() => format("formatBlock", "h3")} />
          <ToolbarButton icon={List} title="Bullet List" active={activeFormats.includes("ul")} onClick={() => format("insertUnorderedList")} />
          <ToolbarButton icon={ListOrdered} title="Numbered List" active={activeFormats.includes("ol")} onClick={() => format("insertOrderedList")} />
          <ToolbarButton icon={Link} title="Insert Link" onClick={insertLink} />
          <ToolbarButton icon={Image} title="Insert Image" onClick={insertImage} />
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          className="w-full min-h-[200px] max-h-[400px] overflow-y-auto p-4 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white outline-none"
          suppressContentEditableWarning={true}
          onInput={updateActiveFormats}
          onClick={updateActiveFormats}
        >
          <p>Start writing here...</p>
        </div>
      </div>
    </div>
  );
}
