import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import Quill from "quill";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  // Connect to socket server
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // load document from server
  useEffect(() => {
    if (socket === null || quill === null) return;

    socket.once("load-document", (data) => {
      quill.setContents(data);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  // save document to server
  useEffect(() => {
    if (socket === null || quill === null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // Send changes to server
  useEffect(() => {
    interface Delta {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ops: any[];
    }
    if (socket === null || quill === null) return;
    const handler = (delta: Delta, oldDelta: Delta, source: string) => {
      if (source !== "user") return;
      socket?.emit("send-changes", delta);
    };
    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill]);

  // Receive changes from server
  useEffect(() => {
    if (socket === null || quill === null) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (delta: any) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface WrapperElement extends HTMLDivElement {}

  const initializeQuill = useCallback((wrapper: WrapperElement | null) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor: HTMLDivElement = document.createElement("div");
    wrapper.append(editor);
    const q: Quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return <div className="container" ref={initializeQuill}></div>;
}
