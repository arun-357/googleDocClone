import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions: any[] = [
  [{ header: [1, 2, 3, false] }], // Headings (H1, H2, H3, Normal text)
  ["bold", "italic", "underline", "strike"], // Basic text formatting
  [{ color: [] }, { background: [] }], // Text & Background color
  [{ font: [] }], // Font selection
  [{ align: [] }], // Text alignment
  [{ list: "ordered" }, { list: "bullet" }], // Lists (ordered & unordered)
  [{ indent: "-1" }, { indent: "+1" }], // Indentation
  ["blockquote", "code-block"], // Blockquotes & Code blocks
  ["link", "image", "video"], // Media embedding
  ["clean"], // Remove formatting
];

export default function TextEditor() {
  interface WrapperElement extends HTMLDivElement {}

  const initializeQuill = useCallback((wrapper: WrapperElement | null) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor: HTMLDivElement = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
  }, []);
  return <div className="container" ref={initializeQuill}></div>;
}
