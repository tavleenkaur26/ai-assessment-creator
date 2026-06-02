import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import { connectDB } from "./services/db";
import assignmentRoutes from "./routes/assignmentRoutes";
import pdfRoutes from "./routes/pdfRoutes";

dotenv.config()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

app.use(cors())
app.use(express.json())
app.use("/assignments", assignmentRoutes);
app.use("/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send("Backend running")
})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)
})
connectDB();


server.listen(5001, () => {
  console.log("Server running on port 5001")
})