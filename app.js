const express = require("express");
const app = express();
const http = require("http");
const PORT = 3000;
const socketIo = require("socket.io");
const path = require("path");
const server = http.createServer(app);

const io = socketIo(server);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
