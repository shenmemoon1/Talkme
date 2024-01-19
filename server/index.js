// 引入 Express 框架
const express = require("express");
// 引入 Cors 中间件，处理跨域请求
const cors = require("cors");
// 引入 Mongoose，用于 MongoDB 数据库连接
const mongoose = require("mongoose");
//api
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const socket = require("socket.io");

// 创建 Express 应用程序
const app = express();
// 引入 dotenv 模块，用于从环境变量中加载配置
require("dotenv").config();

// 使用 Cors 中间件，允许跨域请求
app.use(cors());
// 使用 Express 内置的中间件解析 JSON 请求体
app.use(express.json());
//使用中间件
app.use("/api/auth", userRoute);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTION SUCCESSFU...");
  })
  .catch((err) => {
    console.error("DB CONNECTION ERROR:", err.message);
  });

// 启动服务器，监听指定端口或默认端口 3000
const server = app.listen(process.env.PORT || 3000, () => {
  // 在控制台输出服务器启动信息，包括监听的端口号
  console.log(
    `Listening on port: http://localhost:${process.env.PORT || 3000}`
  );
});

const io = socket(server, {
  cors: {
    origin: "https://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
  });
  if (sendUserSocket) {
    socket.to(sendUserSocket).emit("msg-recieve", data.msg);
  }
});
