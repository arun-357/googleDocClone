import mongoose from "mongoose";
import { Server } from "socket.io";
import Document from "./document.js";

mongoose.connect("mongodb://localhost/google-doc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const io = new Server(3001, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (data) => {
      socket.broadcast.to(documentId).emit("receive-changes", data);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data: data });
    });
  });
});

async function findOrCreateDocument(documentId) {
  if (documentId == null) return;
  const document = await Document.findById(documentId);
  if (document) return document;
  return Document.create({ _id: documentId, data: "" });
}
