import dotenv from "dotenv";
import "./db";
import moment from "moment-timezone";
import app from "./app";

dotenv.config();

const { PORT } = process.env;

const handleListening = () => console.log(`Listening on port: ${PORT}`);

const server = app.listen(PORT, handleListening);

const listen = require("socket.io");

const io = listen(server);
io.on("connection", (socket) => {
  socket.on("client message", (data1, data2, data3) => {
    const memberNumber = socket.adapter.rooms.size;
    const momentTime = moment(new Date(data3.time)).format("MM.DD Ahh:mm");
    io.emit("server message", data1.message, data2.userID, momentTime, memberNumber);
  });
  socket.on("client leave message", (data1, data2, data3) => {
    const memberNumber = socket.adapter.rooms.size;
    const momentTime = moment(new Date(data3.time)).format("MM.DD Ahh:mm");
    io.emit("server leave message", data1.message, data2.userID, momentTime, memberNumber);
  });
});
io.on("disconnect", () => {});
