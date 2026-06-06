require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.get("/", (req, res) => {
  res.send("API Running...");
});
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.get("/api/fields", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "Field A",
      water: 40,
      status: false
    },
    {
      _id: "2",
      name: "Field B",
      water: 70,
      status: true
    }
  ]);
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("newPost", (data) => {
    io.emit("postUpdate", data); // broadcast to all users
  });
});

server.listen(5000, () => console.log("Server running"));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/crop", require("./routes/cropRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));
